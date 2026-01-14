import { useProfile } from "@/lib/contexts/ProfileContext";
import MusicContent from "./MusicContent";
import MovieContent from "./MovieContent";
import DramaContent from "./DramaContent";
import BookContent from "./BookContent";
import CommentContent from "./CommentContent";

export default function ProfileContent() {
  const { tab } = useProfile();

  switch (tab) {
    case "MUSIC":
      return <MusicContent />;
    case "MOVIE":
      return <MovieContent />;
    case "DRAMA":
      return <DramaContent />;
    case "BOOK":
      return <BookContent />;
    case "COMMENT":
      return <CommentContent />;
    default:
      return null;
  }
}
