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
