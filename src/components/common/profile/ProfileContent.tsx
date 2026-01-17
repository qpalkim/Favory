import { useProfile } from "@/lib/contexts/ProfileContext";
import { MEDIA_TYPE_META } from "@/lib/utils/constants";
import CommentContent from "./CommentContent";
import FavoryContent from "./FavoryContent";

export default function ProfileContent() {
  const { tab } = useProfile();
  if (tab === MEDIA_TYPE_META.COMMENT.id) return <CommentContent />;

  const tabs = Object.values(MEDIA_TYPE_META).filter(
    (t) => t.id !== MEDIA_TYPE_META.COMMENT.id,
  );

  const currentTab = tabs.find((t) => t.id === tab);
  if (!currentTab) return null;

  return <FavoryContent type={currentTab.id} label={currentTab.label} />;
}
