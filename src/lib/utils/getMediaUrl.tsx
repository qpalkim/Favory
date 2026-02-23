import { MediaTypeCategory } from "../types/favories";

export const getMediaSearchUrl = (
  type: MediaTypeCategory,
  title: string,
) => {

  switch (type) {
    case "MUSIC":
      return `https://open.spotify.com/search/${encodeURIComponent(title)}`;
    case "MOVIE":
    case "DRAMA":
      return `https://www.google.com/search?q=${encodeURIComponent(`${title} 시청`)}`;
    case "BOOK":
      return `https://www.google.com/search?q=${encodeURIComponent(
        `${title}`,
      )}`;
  }
};
