import { useProfile } from "@/lib/contexts/ProfileContext";
import { MEDIA_TYPE_META } from "@/lib/utils/constants";
import CommentContent from "./CommentContent";
import FavoryContent from "./FavoryContent";

export default function ProfileContent() {
  const { tab } = useProfile();
  if (tab === MEDIA_TYPE_META.COMMENT.id) return <CommentContent />;

  const mediaTabs = Object.values(MEDIA_TYPE_META).filter(
    (t) => t.id !== MEDIA_TYPE_META.COMMENT.id,
  );

  const activeTab = mediaTabs.find((t) => t.id === tab);
  if (!activeTab) return null;

  return <FavoryContent type={activeTab.id} label={activeTab.label} />;
}
