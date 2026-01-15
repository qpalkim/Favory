import { useProfile } from "@/lib/contexts/ProfileContext";
import { PROFILE_TABS } from "@/lib/utils/constants";
import CommentContent from "./CommentContent";
import FavoryContent from "./FavoryContent";

export default function ProfileContent() {
  const { tab } = useProfile();
  if (tab === PROFILE_TABS.COMMENT.id) return <CommentContent />;

  const tabs = Object.values(PROFILE_TABS).filter(
    (t) => t.id !== PROFILE_TABS.COMMENT.id,
  );

  const currentTab = tabs.find((t) => t.id === tab);
  if (!currentTab) return null;

  return <FavoryContent type={currentTab.id} label={currentTab.label} />;
}
