"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { MediaItem } from "@/lib/types/media";
import { AddFavoryRequest, addFavoryRequestSchema } from "@/lib/types/favories";
import { useAddMedia, useMediaExists } from "@/lib/hooks/useMedia";
import { useAddFavory } from "@/lib/hooks/useFavories";
import { MEDIA_TYPE_TRANSLATE_MAP } from "@/lib/utils/constants";
import Image from "next/image";
import logo from "@/assets/logo/logo_green.svg";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import MusicSelector from "@/components/ui/MusicSelector";
import MovieSelector from "@/components/ui/MovieSelector";
import DramaSelector from "@/components/ui/DramaSelector";
import BookSelector from "@/components/ui/BookSelector";

interface MediaSelectorProps {
  onSelect: (item: MediaItem | null) => void;
}

const selectorMap: Record<string, React.ComponentType<MediaSelectorProps>> = {
  music: MusicSelector,
  movie: MovieSelector,
  drama: DramaSelector,
  book: BookSelector,
};

export default function AddFavoryForm({ mediaType }: { mediaType: string }) {
  // 추후 내 정보 조회 적용 시, 제거 예정
  const storedId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const userId = storedId ? Number(storedId) : undefined;
  const Selector = selectorMap[mediaType];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AddFavoryRequest>({
    resolver: zodResolver(addFavoryRequestSchema),
    mode: "onChange",
    defaultValues: {
      userId: userId,
      mediaId: undefined,
      title: "",
      content: "",
    },
  });

  // 선택된 미디어 정보
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const translatedMediaType = MEDIA_TYPE_TRANSLATE_MAP[mediaType] || mediaType;
  const addMedia = useAddMedia();
  const addFavory = useAddFavory();
  const [mediaId, setMediaId] = useState<number | null>(null);
  const [registering, setRegistering] = useState(false);
  const [registrationDone, setRegistrationDone] = useState(false);
  const { data: existingMedia, refetch: checkMedia } = useMediaExists(
    selectedMedia?.externalId || "",
  );

  const handleSelect = (item: MediaItem | null) => {
    setSelectedMedia(
      item
        ? {
            externalId: item.externalId,
            mediaType: item.mediaType,
            title: item.title,
            creator: item.creator,
            year: item.year,
            imageUrl: item.imageUrl,
          }
        : null,
    );
  };

  // 선택된 미디어 존재 여부 확인
  useEffect(() => {
    if (!selectedMedia || !selectedMedia.externalId) return;
    checkMedia();
  }, [selectedMedia, checkMedia]);

  // 존재하는 미디어일 때 mediaId 세팅
  useEffect(() => {
    if (existingMedia?.mediaId != null) {
      // 미디어가 이미 존재하는 경우 mediaId 설정
      setMediaId(existingMedia.mediaId);
    }
  }, [existingMedia]);

  useEffect(() => {
    if (!selectedMedia) return; // 미디어 선택 전
    if (existingMedia === undefined) return; // 아직 조회 안 끝남 → API 결과 기다려야 함
    if (registering) return; // 등록 중이면  중복 실행 방지
    if (existingMedia?.mediaId != null) return; // 등록 중이면  중복 실행 방지
    if (registrationDone) return; // 이미 등록 완료면 중복 방지

    // 외부 API 조회 → media 없음 → 등록 필요
    const registerMedia = async () => {
      setRegistering(true);
      try {
        const res = await addMedia.mutateAsync({
          externalId: selectedMedia.externalId,
          mediaType: selectedMedia.mediaType,
          title: selectedMedia.title,
          creator: selectedMedia.creator ?? null,
          year: selectedMedia.year ?? null,
          imageUrl: selectedMedia.imageUrl ?? null,
        });
        setMediaId(res.id);
        setRegistrationDone(true); // 등록 완료 표시
      } catch {
        toast.error("잠시후 다시 시도해 주세요");
        setMediaId(null);
      } finally {
        setRegistering(false);
      }
    };
    registerMedia();
  }, [existingMedia, selectedMedia, addMedia, registering, registrationDone]);

  useEffect(() => {
    if (mediaId) setValue("mediaId", mediaId);
  }, [mediaId, setValue]);

  // 감상평 등록
  const onSubmit = async (data: AddFavoryRequest) => {
    try {
      await addFavory.mutateAsync({
        ...data,
        mediaId: mediaId!,
      });
      toast.success("감상평이 등록되었습니다");
    } catch {
      toast.error("감상평 등록에 실패했습니다");
    }
  };

  return (
    <main className="mx-auto max-w-[660px] min-w-[344px] rounded-xl bg-white shadow-lg md:rounded-2xl">
      <div className="space-y-[42px] p-4 lg:space-y-[52px] lg:p-6">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="로고 아이콘"
            className="w-[86px] md:w-[114px] lg:w-[134px]"
          />
          <h2 className="text-black-500 md:text-2lg text-center text-[15px] font-semibold lg:text-xl">
            {translatedMediaType} 감상평 등록하기
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {Selector && <Selector onSelect={handleSelect} />}
            <div className="mb-6">
              <Input
                {...register("title")}
                placeholder="감상평의 제목을 입력해 주세요"
                label="제목"
                required
                error={errors.title?.message}
              />
            </div>
            <div className="mb-6">
              <Textarea
                {...register("content")}
                placeholder="감상평을 자유롭게 작성해 주세요"
                label="내용"
                variant="form"
                required
                error={errors.content?.message}
              />
            </div>
            <input type="hidden" {...register("mediaId")} />
          </div>
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            disabled={!isValid}
          >
            등록하기
          </Button>
        </form>
      </div>
    </main>
  );
}
