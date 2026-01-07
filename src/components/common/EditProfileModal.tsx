import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FileUp } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useEditMyData,
  useMyData,
  useProfileImageUrl,
} from "@/lib/hooks/useUsers";
import {
  EditProfileRequest,
  editProfileRequestSchema,
} from "@/lib/types/users";
import { ErrorResponse } from "@/lib/types/errors";
import Button from "../ui/Button";
import ProfileImage from "../ui/ProfileImage";
import Input from "../ui/Input";

interface EditProfileModalProps {
  onClose: () => void;
}

export default function EditProfileModal({ onClose }: EditProfileModalProps) {
  const { data: me } = useMyData();
  const editMyDataMutation = useEditMyData(me!.id);
  const uploadProfileImage = useProfileImageUrl();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<EditProfileRequest>({
    resolver: zodResolver(editProfileRequestSchema),
    mode: "onChange",
  });

  const watchProfileImage = watch("profileImageUrl");
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (!me) return;

    reset({
      nickname: me.nickname || "",
      profileImageUrl: me.profileImageUrl ?? undefined,
      profileMessage: me.profileMessage ?? undefined,
    });
  }, [me, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !me) return;

    uploadProfileImage.mutate(
      { id: me.id, file },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["me"] });
          toast.success("프로필 이미지 등록에 성공했습니다");
        },
        onError: () => {
          toast.error("프로필 이미지 등록에 실패했습니다");
        },
      },
    );
  };

  const onSubmit = async (data: EditProfileRequest) => {
    if (!me) return;

    const prevNickname = me.nickname;
    const nextNickname = data.nickname;

    try {
      await editMyDataMutation.mutateAsync(data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("프로필 수정에 성공했습니다");
      onClose();

      if (prevNickname !== nextNickname)
        router.replace(`/profile/@${nextNickname}`);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const status = error.response?.status;
      const field = error.response?.data?.field;

      if (status === 400) {
        if (field === "nickname") {
          setError("nickname", {
            type: "manual",
            message: "이미 존재하는 닉네임입니다",
          });
        }
        return;
      }
      toast.error("프로필 수정에 실패했습니다");
    }
  };

  return (
    <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <h4 className="text-black-500 text-lg font-semibold md:text-[20px]">
        프로필 수정하기
      </h4>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="flex items-center gap-3 md:gap-4">
          <ProfileImage
            src={watchProfileImage || me?.profileImageUrl || null}
            size="lg"
          />
          <input
            type="file"
            accept="image/*"
            id="profile-image-input"
            className="hidden"
            onChange={handleImageChange}
          />
          <Button
            variant="outline"
            onClick={() =>
              document.getElementById("profile-image-input")?.click()
            }
          >
            <FileUp
              className="h-4 w-4 text-green-600 md:h-[18px] md:w-[18px]"
              strokeWidth={1.5}
            />
            이미지 불러오기
          </Button>
        </div>
      </div>
      <div>
        <Input
          label="닉네임"
          required
          placeholder="닉네임을 입력해 주세요"
          {...register("nickname")}
          error={errors.nickname?.message}
        />
      </div>
      <div>
        <Input
          label="한 줄 소개"
          placeholder="나와 어울리는 한 줄을 입력해 보세요"
          {...register("profileMessage")}
          error={errors.profileMessage?.message}
        />
      </div>
      <div className="flex gap-2">
        <Button className="w-full" variant="outline" onClick={onClose}>
          취소하기
        </Button>
        <Button
          className="w-full"
          type="submit"
          isLoading={isSubmitting}
          disabled={!isValid}
        >
          수정하기
        </Button>
      </div>
    </form>
  );
}
