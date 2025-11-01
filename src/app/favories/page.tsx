import { StaticImageData } from "next/image";
import Banner from "@/components/common/Banner";
import music from "@/assets/sos.png";

type CategoryType = "music" | "movie" | "drama" | "book";

interface SampleItem {
  id: string;
  category: CategoryType;
  title: string;
  creator: string;
  year: string;
  coverImg: StaticImageData | string;
  favoryTitle: string;
  content: string;
  nickname: string;
  profileImg: string | null;
  createdAt: string;
}

// 샘플 데이터
const sampleData: SampleItem[] = [
  {
    id: "1",
    category: "music",
    title: "Snooze",
    creator: "SZA",
    year: "2019년",
    coverImg: music,
    favoryTitle: "사랑의 달콤함과 불안함 사이",
    content: "잠시도 눈을 뗄 수 없는 마음을 부드럽게 녹여낸 곡",
    nickname: "qpalkim",
    profileImg: null,
    createdAt: "4시간 전",
  },
];

export default function Page() {
  const firstItem = sampleData[0];

  return (
    <>
      <Banner
        category={firstItem.category}
        type="latest"
        id={firstItem.id}
        title={firstItem.title}
        favoryTitle={firstItem.favoryTitle}
        year={firstItem.year}
        creator={firstItem.creator}
        coverImg={firstItem.coverImg}
      />
      <div>Favory 목록 페이지</div>
    </>
  );
}
