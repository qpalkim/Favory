# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 소개

Favory는 음악·영화·드라마·도서에 대한 감상평을 기록하고 공유하는 웹 서비스입니다. 사용자는 Open API로 작품 정보를 조회한 뒤 감상평을 작성하고, 다른 사용자의 감상평에 댓글을 달며 소통합니다. 배포 주소: https://favory.vercel.app/

## 자주 쓰는 명령어

```bash
npm run dev            # 개발 서버 실행
npm run build           # 프로덕션 빌드
npm run start           # 빌드 결과 실행
npm run lint            # ESLint (next/core-web-vitals + next/typescript)
npm test                # Jest 전체 테스트 실행
npm test -- <경로/패턴>  # 특정 테스트 파일만 실행
npm test -- -t "<이름>" # 특정 테스트 이름으로 실행
npx prettier --write .  # 포맷팅 (별도 스크립트 없음, prettier-plugin-tailwindcss 적용)
```

테스트는 `src/lib/__tests__/`에 모여 있으며 jest + ts-jest(jsdom) + @testing-library/react로 hooks·유틸·일부 컴포넌트를 검증합니다.

## 아키텍처

### 프론트엔드 ↔ 백엔드 프록시 구조

이 저장소는 별도의 외부 백엔드(`NEXT_PUBLIC_API_URL`)를 프록시하는 Next.js(App Router) 프론트엔드입니다. 브라우저는 백엔드를 직접 호출하지 않고 catch-all 라우트 핸들러 `src/app/api/[...endpoint]/route.ts`를 거칩니다.

- `src/lib/network/axiosClientHelper.ts`: 클라이언트 → `/api`(Next.js route handler)로 요청 (`withCredentials: true`)
- `src/lib/network/axiosServerHelper.ts`: route handler → 실제 백엔드로 요청. 요청 인터셉터가 쿠키의 `accessToken`을 `Authorization` 헤더에 주입하고, 응답 인터셉터가 401/403/500 발생 시 `refreshToken`으로 토큰을 재발급받아 원 요청을 재시도
- route handler의 POST는 로그인/OAuth 로그인 응답에서 `accessToken`/`refreshToken`을 꺼내 httpOnly 쿠키로 저장하고, 클라이언트로 보내는 응답 바디에서는 토큰을 제거(`omit`)
- 인증 상태 확인: `src/lib/auth/getAuth.ts` (서버 전용, `next/headers`의 `cookies` 사용)

라우트 보호는 두 겹입니다: `src/middleware.ts`는 `/profile` 경로만 `accessToken` 쿠키 유무로 가드하고, `src/app/(protected)/layout.tsx`는 `getAuth()`로 로그인 여부를 확인해 미로그인 시 `/login`으로 redirect합니다. `(protected)` 라우트 그룹(`add`, `favories` 등록/수정, `profile`)은 후자로 보호됩니다.

### 데이터 레이어 3단 구조

도메인별(favories, comments, media, search, users, oauth, auth)로 아래 패턴이 반복됩니다. 새 기능을 추가할 때도 이 순서를 따르세요.

1. `src/lib/types/<domain>.ts` — zod 스키마 정의 + `z.infer`로 타입 export (요청/응답 스키마 모두 여기)
2. `src/lib/apis/<domain>.ts` — `axiosClientHelper`로 실제 호출, 응답을 `safeResponse(data, schema)`(`src/lib/network/safeResponse.ts`)로 zod 검증 후 반환 (검증 실패 시 콘솔 에러 + throw)
3. `src/lib/hooks/use<Domain>.ts` — TanStack Query로 apis 함수를 감싼 `useQuery`/`useMutation` 훅. mutation은 성공 시 관련 `queryKey`를 invalidate

컴포넌트는 hooks만 사용하고 apis/axios를 직접 다루지 않습니다.

### 라우팅 구조

- `(landing)`: 랜딩 페이지 (인증 불필요)
- `(protected)`: 로그인 필요 — `add/[mediaType]`, `favories/[mediaType]/[id]/edit`, `profile/[nickname]`
- `favories`, `favories/[mediaType]/[id]`, `search`, `login`, `signup`: 공개 라우트
- 미디어 카테고리는 `MUSIC | MOVIE | DRAMA | BOOK` (`mediaTypeCategorySchema`, `src/lib/types/favories.ts`)

### 기타 규칙

- 에러 응답 포맷은 `src/lib/network/errorResponse.ts`에서 통일 (axios 에러를 status별로 `NextResponse.json`으로 변환: 400/401/기타)
- 절대경로 임포트: `@/*` → `src/*`
- className 병합은 `src/lib/cn.ts`의 `cn()`(clsx + tailwind-merge) 사용

## 커밋/PR 컨벤션

커밋 메시지는 `타입/FAVORY-<이슈번호>-<설명> (#PR번호)` 형식을 따릅니다 (예: `feat/FAVORY-86-좋아요-등록-취소-API`). PR 템플릿(`.github/PULL_REQUEST_TEMPLATE.md`)에 베이스 브랜치 확인, 커밋 컨벤션 준수, Assignee/Label 지정 체크리스트가 있습니다.
