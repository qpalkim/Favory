import {
  MessageCircleMore,
  FolderOpen,
  Search,
  TextSearch,
} from "lucide-react";

interface EmptyProps {
  type:
    | "comment"
    | "myComment"
    | "favory"
    | "myFavory"
    | "search"
    | "recentSearch";
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
  favory: {
    title: "해당 카테고리의 감상평이 없어요",
    description: "가장 먼저 감상평을 작성해 보세요",
    Icon: FolderOpen,
  },
  myFavory: {
    title: (category: string) => `아직 작성한 ${category} 감상평이 없어요`,
    description: "작성한 감상평이 다른 사람들에게 영감을 줄 수 있어요",
    Icon: FolderOpen,
  },
  search: {
    title: "검색 결과가 없습니다",
    description:
      "다른 검색어로 다시 검색해 보세요\n띄어쓰기나 철자가 맞는지 확인해 보세요",
    Icon: Search,
  },
  recentSearch: {
    title: null,
    description: "최근 검색어가 없습니다",
    Icon: TextSearch,
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
      {displayTitle && (
        <h2 className="text-black-500 md:text-2lg mt-4 text-[15px] font-medium md:mt-6">
          {displayTitle}
        </h2>
      )}
      {description && (
        <p className="text-black-200 md:text-md mt-2 text-center text-sm whitespace-pre-line">
          {description}
        </p>
      )}
    </div>
  );
}
