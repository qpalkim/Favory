import { MessageCircleMore, FolderOpen } from "lucide-react";

interface EmptyProps {
  type: "comment" | "myComment" | "myFavory";
  category?: string;
}

const EMPTY_MESSAGES = {
  comment: {
    title: "아직 댓글이 없어요",
    description: "가장 먼저 댓글을 남겨 보세요",
    Icon: MessageCircleMore,
  },
  myComment: {
    title: "아직 작성한 댓글이 없어요",
    description: "댓글을 작성하고, 다른 사람들과 소통해 보세요",
    Icon: MessageCircleMore,
  },
  myFavory: {
    title: (category: string) => `아직 작성한 ${category} 감상평이 없어요`,
    description: "작성한 감상평이 다른 사람들에게 영감을 줄 수 있어요",
    Icon: FolderOpen,
  },
};

export default function Empty({ type, category }: EmptyProps) {
  const { title, description, Icon } = EMPTY_MESSAGES[type];
  const displayTitle =
    type === "myFavory" && category
      ? (title as (category: string) => string)(category)
      : (title as string);

  return (
    <div className="flex flex-col items-center">
      <Icon className="text-black-100 h-[42px] w-[42px] stroke-1 md:h-[52px] md:w-[52px]" />
      <h2 className="text-black-500 md:text-2lg mt-4 text-lg font-semibold md:mt-6">
        {displayTitle}
      </h2>
      <p className="text-black-200 md:text-md mt-2 text-sm">{description}</p>
    </div>
  );
}
