import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { toast } from "react-toastify";
import { logout } from "@/lib/actions/logoutAction";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/logo_white.svg";
import ProfileImg from "./ProfileImg";
import Dropdown from "./Dropdown";
import Badge from "./Badge";
import Modal from "./Modal";
import AddFavoryModal from "../common/AddFavoryModal";

export default function LoggedInHeader({
  image,
  nickname,
}: {
  image: string | null;
  nickname: string;
}) {
  const [open, setIsOpen] = useState(false);
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
          await logout();
          localStorage.removeItem("userId"); // 추후 내 정보 조회 적용 시, 제거 예정
          toast.success("로그아웃에 성공했습니다");
        } catch {
          toast.error("로그아웃에 실패했습니다");
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
        <div className="flex items-center gap-3 md:gap-5">
          <Badge
            size="lg"
            className="flex items-center gap-1"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="h-4 w-4 stroke-3 text-green-600 md:h-5 md:w-5" />
            <h6 className="hidden md:block">등록하기</h6>
          </Badge>
          {open && (
            <Modal onClose={() => setIsOpen(false)}>
              <AddFavoryModal onClose={() => setIsOpen(false)} />
            </Modal>
          )}
          <Link
            href="/search"
            className="transition-opacity duration-200 hover:opacity-80"
          >
            <Search className="h-6 w-6 text-white md:h-8 md:w-8" />
          </Link>
          <Dropdown
            options={options}
            trigger={<ProfileImg src={image} size="sm" clickable />}
          />
        </div>
      </div>
    </header>
  );
}
