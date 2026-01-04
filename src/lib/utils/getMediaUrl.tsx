import { MediaType } from "../types/favories";

export const getMediaSearchUrl = (
  type: MediaType,
  title: string,
  creator?: string,
) => {
  const query = creator ? `${title} ${creator}` : title;

  switch (type) {
    case "MUSIC":
      return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
    case "MOVIE":
    case "DRAMA":
      return `https://www.google.com/search?q=${encodeURIComponent(`${query} 시청`)}`;
    case "BOOK":
      return `https://www.google.com/search?q=${encodeURIComponent(
        `${query} 책`,
      )}`;
  }
};
