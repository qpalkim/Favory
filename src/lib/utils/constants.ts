import {
  BookOpen,
  Clapperboard,
  LucideIcon,
  MessageCircleMore,
  Music4,
  Tv,
} from "lucide-react";
import { MediaType } from "../types/favories";
import { SearchCategory } from "../types/search";

export const CATEGORY_LABEL_MAP: Record<SearchCategory, string> = {
  MUSIC: "음악",
  MOVIE: "영화",
  DRAMA: "드라마",
  BOOK: "도서",
  PROFILE: "프로필",
};

export const CREATOR_FALLBACK = {
  MUSIC: "가수 정보 없음",
  MOVIE: "감독 정보 없음",
  DRAMA: "방송사 정보 없음",
  BOOK: "작가 정보 없음",
};

export const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "등록순", value: "oldest" },
];

export const CATEGORY_BUTTON: Record<MediaType, { icon: LucideIcon, text: string }> = {
  MUSIC: { icon: Music4, text: "지금 들으러 가기" },
  MOVIE: { icon: Clapperboard, text: "지금 보러 가기" },
  DRAMA: { icon: Tv, text: "지금 보러 가기" },
  BOOK: { icon: BookOpen, text: "지금 읽으러 가기" },
};

export const MEDIA_TYPE_META = {
  MUSIC: {
    id: "MUSIC",
    label: "음악",
    icon: Music4,
  },
  MOVIE: {
    id: "MOVIE",
    label: "영화",
    icon: Clapperboard,
  },
  DRAMA: {
    id: "DRAMA",
    label: "드라마",
    icon: Tv,
  },
  BOOK: {
    id: "BOOK",
    label: "도서",
    icon: BookOpen,
  },
  COMMENT: {
    id: "COMMENT",
    label: "댓글",
    icon: MessageCircleMore,
  },
} as const;

export const SEARCH_MEDIA_CATEGORY_OPTIONS: {
  label: string;
  value: SearchCategory | undefined;
}[] = [
    { label: "전체", value: undefined },
    { label: "음악", value: "MUSIC" },
    { label: "영화", value: "MOVIE" },
    { label: "드라마", value: "DRAMA" },
    { label: "도서", value: "BOOK" },
    { label: "프로필", value: "PROFILE" },
  ];