import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions/logoutAction";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo_white.svg";
import ProfileImg from "./ProfileImg";
import Dropdown from "./Dropdown";

export default function LoggedInHeader({
  image,
  nickname,
}: {
  image: string | null;
  nickname: string;
}) {
  const router = useRouter();
  const options = [
    {
      label: "마이 페이지",
      onClick: () => router.push(`/profile/@${nickname}`),
    },
    {
      label: "로그아웃",
      onClick: async () => {
        try {
          const res = await logout();
          if (res.status) {
            localStorage.removeItem("userId"); // 추후 내 정보 조회 적용 시, 제거 예정
            console.log("로그아웃에 성공했습니다");
          } else {
            console.error("로그아웃에 실패했습니다");
          }
        } catch (err) {
          console.error("알 수 없는 에러", err);
        }
      },
    },
  ];

  return (
    <header className="fixed z-50 w-full bg-green-500 shadow-lg">
      <div className="relative mx-auto flex h-10 max-w-[1448px] items-center justify-between px-6 transition-all md:h-12">
        <Link href="/">
          <Image
            src={logo}
            alt="헤더 로고"
            className="w-[86px] transition-opacity hover:opacity-80 md:w-[101px]"
          />
        </Link>
        <Dropdown
          options={options}
          trigger={<ProfileImg src={image} size="sm" clickable />}
        />
      </div>
    </header>
  );
}
