"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MediaItem } from "@/lib/types/media";
import {
  AddFavoryRequest,
  addFavoryRequestSchema,
  MediaType,
} from "@/lib/types/favories";
import { useMyData } from "@/lib/hooks/useUsers";
import { useAddMedia, useMediaExists } from "@/lib/hooks/useMedia";
import { useAddFavory } from "@/lib/hooks/useFavories";
import { MEDIA_TYPE_TRANSLATE_MAP } from "@/lib/utils/constants";
import Image from "next/image";
import logo from "@/assets/logo/logo_green.svg";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Badge from "../ui/Badge";
import MediaSelector from "../ui/MediaSelector";

export default function AddFavoryForm({ mediaType }: { mediaType: MediaType }) {
  const { data: me } = useMyData();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AddFavoryRequest>({
    resolver: zodResolver(addFavoryRequestSchema),
    mode: "onChange",
    defaultValues: {
      mediaId: undefined,
      title: "",
      content: "",
      tagNames: [],
    },
  });
  const tags = watch("tagNames") || [];
  const [tagInput, setTagInput] = useState("");
  const [tagInputError, setTagInputError] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null); // 선택된 미디어 정보
  const translatedMediaType =
    MEDIA_TYPE_TRANSLATE_MAP[mediaType.toLowerCase()] || mediaType;
  const addMedia = useAddMedia();
  const addFavory = useAddFavory();
  const [mediaId, setMediaId] = useState<number | null>(null);
  const [registering, setRegistering] = useState(false);
  const [registrationDone, setRegistrationDone] = useState(false);
  const { data: existingMedia, refetch: checkMedia } = useMediaExists(
    selectedMedia?.externalId || "",
  );

  const handleSelect = (item: MediaItem | null) => {
    setSelectedMedia(item);
  };

  // 선택된 미디어 존재 여부 확인
  useEffect(() => {
    if (!selectedMedia || !selectedMedia.externalId) return;
    checkMedia();
  }, [selectedMedia, checkMedia]);

  // 존재하는 미디어일 때 mediaId 세팅
  useEffect(() => {
    if (existingMedia?.mediaId != null) {
      setMediaId(existingMedia.mediaId); // 미디어가 이미 존재하는 경우 mediaId 설정
    }
  }, [existingMedia]);

  useEffect(() => {
    if (!selectedMedia) return; // 미디어 선택 전
    if (existingMedia === undefined) return; // 아직 조회 안 끝남 → API 결과 기다려야 함
    if (registering) return; // 등록 중이면  중복 실행 방지
    if (registrationDone) return; // 이미 등록 완료면 중복 방지
    if (existingMedia?.mediaId != null) return; // 미디어 존재하면 등록 필요 없음

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

  const updateTags = (newTags: string[]) => {
    setValue("tagNames", newTags, { shouldValidate: true });
  };

  const onKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      e.preventDefault();

      const cleaned = e.currentTarget.value.replace(/\s+/g, "");
      const newTag = cleaned.trim();

      if (!newTag) return;
      if (tags.includes(newTag)) return setTagInputError("중복된 태그입니다");
      if (newTag.length > 10)
        return setTagInputError("10자 이내로 입력해 주세요");
      if (tags.length >= 3)
        return setTagInputError("최대 3개까지 입력할 수 있습니다");

      updateTags([...tags, newTag]);
      setTagInput("");
      setTagInputError("");
    }
  };

  const onSubmit = async (data: AddFavoryRequest) => {
    if (!me || !mediaId) return;

    try {
      const res = await addFavory.mutateAsync({
        ...data,
        mediaId: mediaId,
        userId: me.id,
      } as AddFavoryRequest & { userId: number });
      setSelectedMedia(null);
      toast.success("감상평이 등록되었습니다");
      router.push(`/favories/${res.mediaType.toLowerCase()}/${res.id}`);
    } catch {
      toast.error("감상평 등록에 실패했습니다");
    }
  };

  return (
    <main className="mx-auto max-w-[660px] min-w-[344px] rounded-xl bg-white shadow-lg md:rounded-2xl">
      <div className="space-y-[42px] p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="로고 아이콘"
            className="w-[86px] md:w-[114px]"
          />
          <h2 className="text-black-500 md:text-2lg text-center text-[15px] font-semibold">
            {translatedMediaType} 감상평 등록하기
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <MediaSelector type={mediaType} onSelect={handleSelect} />
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
            <div className="mb-[42px]">
              <Input
                placeholder="태그를 작성해 보세요"
                label="태그"
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  setTagInputError("");
                }}
                onKeyDown={onKeyDownTag}
                error={tagInputError || errors.tagNames?.message}
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={tag}
                    clickable={false}
                    className="flex items-center gap-1"
                  >
                    #{tag}
                    <X
                      className="text-black-200 hover:text-black-300 h-[10px] w-[10px] cursor-pointer md:h-3 md:w-3"
                      strokeWidth={2}
                      onClick={() =>
                        updateTags(tags.filter((_, i) => i !== index))
                      }
                    />
                  </Badge>
                ))}
              </div>
            </div>
            <input type="hidden" {...register("mediaId")} />
          </div>
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            disabled={!isValid || !mediaId}
          >
            등록하기
          </Button>
        </form>
      </div>
    </main>
  );
}
