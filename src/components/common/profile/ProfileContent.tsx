import { ProfileCategory } from "@/lib/types/users";
import MusicContent from "./MusicContent";
import MovieContent from "./MovieContent";
import DramaContent from "./DramaContent";
import BookContent from "./BookContent";
import CommentContent from "./CommentContent";

export default function ProfileContent({ tab }: { tab: ProfileCategory }) {
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
