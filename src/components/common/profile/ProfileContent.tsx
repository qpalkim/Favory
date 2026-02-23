import { useSearchParams } from "next/navigation";
import { MEDIA_TYPE_META } from "@/lib/utils/constants";
import CommentContent from "./CommentContent";
import FavoryContent from "./FavoryContent";

export default function ProfileContent() {
  const searchParams = useSearchParams();
  const typeLabel = searchParams.get("type");

  const allTabs = Object.values(MEDIA_TYPE_META);

  const activeTab =
    allTabs.find((t) => t.label === typeLabel) ?? allTabs[0];

  if (!activeTab) return null;

  if (activeTab.id === MEDIA_TYPE_META.COMMENT.id) return <CommentContent />;

  return <FavoryContent label={activeTab.label} />;
}
