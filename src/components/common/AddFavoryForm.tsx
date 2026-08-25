"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { MediaItem } from "@/lib/types/media";
import {
  AddFavoryRequest,
  addFavoryRequestSchema,
  MediaTypeCategory,
} from "@/lib/types/favories";
import { useMyData } from "@/lib/hooks/useUsers";
import { useMediaRegistration } from "@/lib/hooks/useMediaRegistration";
import { useAddFavory } from "@/lib/hooks/useFavories";
import { CATEGORY_LABEL_MAP } from "@/lib/utils/constants";
import Image from "next/image";
import logo from "@/assets/logo/logo_green.svg";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Badge from "../ui/Badge";
import MediaSelector from "../ui/MediaSelector";

export default function AddFavoryForm({ mediaType }: { mediaType: MediaTypeCategory }) {
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
      title: "",
      content: "",
      tagNames: [],
    },
  });

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const { mediaId, isRegisteringMedia } = useMediaRegistration(selectedMedia);

  const mediaTypeLabel = CATEGORY_LABEL_MAP[mediaType] || mediaType;

  const tags = watch("tagNames") || [];
  const [tagInput, setTagInput] = useState("");
  const [tagInputError, setTagInputError] = useState("");

  const addFavory = useAddFavory();

  const handleSelectMedia = (item: MediaItem | null) => {
    setSelectedMedia(item);
  };

  const updateTags = (newTags: string[]) => {
    setValue("tagNames", newTags, { shouldValidate: true });
  };

  const removeTags = (idx: number) => {
    updateTags(tags.filter((_, i) => i !== idx));
  };

  const onKeyDownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    e.preventDefault();

    const value = e.currentTarget.value.replace(/\s+/g, "").trim();
    if (!value) return;

    if (tags.includes(value)) return setTagInputError("중복된 태그입니다");
    if (value.length > 10) return setTagInputError("10자 이내로 입력해 주세요");
    if (tags.length >= 6) return setTagInputError("최대 6개까지 입력할 수 있습니다");

    updateTags([...tags, value]);
    setTagInput("");
    setTagInputError("");
  };

  const onSubmit = async (data: AddFavoryRequest) => {
    if (!me) return;

    if (!mediaId) {
      toast.error("미디어 등록 중입니다, 잠시만 기다려 주세요.");
      return;
    }

    try {
      const res = await addFavory.mutateAsync({
        ...data,
        mediaId: mediaId,
        userId: me.id,
      } as AddFavoryRequest & { userId: number });
      setSelectedMedia(null);
      toast.success("감상평이 등록되었습니다.");
      router.push(`/favories/${res.mediaType.toLowerCase()}/${res.id}`);
    } catch {
      toast.error("감상평 등록에 실패했습니다.");
    }
  };

  return (
    <section aria-label="감상평 등록 폼" className="mx-auto max-w-[660px] min-w-[344px] rounded-xl bg-white shadow-lg md:rounded-2xl">
      <div className="space-y-10 p-4 md:p-6">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Favory 로고"
            className="w-[86px] md:w-[114px]"
          />
          <h2 className="text-black-500 md:text-2lg text-center text-[15px] font-semibold">
            {mediaTypeLabel} 감상평 등록하기
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <MediaSelector type={mediaType} onSelect={handleSelectMedia} />
          <Input
            required
            label="제목"
            placeholder="감상평의 제목을 입력해 주세요"
            {...register("title")}
            error={errors.title?.message}
          />

          <Textarea
            required
            label="내용"
            placeholder="감상평을 자유롭게 작성해 주세요"
            variant="form"
            {...register("content")}
            error={errors.content?.message}
          />

          <div className="mb-10">
            <Input
              label="태그"
              desc="태그를 입력한 후, Enter를 눌러 주세요"
              placeholder="각 10자 이하로 최대 6개까지 입력할 수 있어요"
              value={tagInput}
              onChange={(e) => {
                setTagInput(e.target.value);
                setTagInputError("");
              }}
              onKeyDown={onKeyDownTag}
              error={tagInputError || errors.tagNames?.message}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <Badge
                  key={tag}
                  clickable={false}
                  className="flex items-center gap-1"
                >
                  #{tag}
                  <X
                    className="text-black-200 hover:text-black-300 h-[10px] w-[10px] cursor-pointer md:h-3 md:w-3"
                    strokeWidth={2}
                    onClick={() => removeTags(idx)}
                  />
                </Badge>
              ))}
            </div>
          </div>
          <Button
            size="lg"
            type="submit"
            isLoading={isSubmitting}
            disabled={!isValid || !selectedMedia || isRegisteringMedia}
          >
            등록하기
          </Button>
        </form>
      </div>
    </section>
  );
}
