import {
  BookOpen,
  Clapperboard,
  MessageCircleMore,
  Music4,
  Tv,
} from "lucide-react";

export const MEDIA_TYPE_TRANSLATE_MAP: Record<string, string> = {
  music: "음악",
  movie: "영화",
  drama: "드라마",
  book: "도서",
};

export const ALLOWED_MEDIA_TYPES = ["music", "movie", "drama", "book"];

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

export const CATEGORY_BUTTON = {
  MUSIC: { icon: Music4, text: "지금 들으러 가기" },
  MOVIE: { icon: Clapperboard, text: "지금 보러 가기" },
  DRAMA: { icon: Tv, text: "지금 보러 가기" },
  BOOK: { icon: BookOpen, text: "지금 읽으러 가기" },
};

export const PROFILE_TABS = {
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
