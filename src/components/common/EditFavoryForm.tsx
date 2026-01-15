"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { MediaItem } from "@/lib/types/media";
import {
  EditFavoryRequest,
  editFavoryRequestSchema,
  MediaType,
} from "@/lib/types/favories";
import { useEditFavory, useFavoryDetail } from "@/lib/hooks/useFavories";
import { useMyData } from "@/lib/hooks/useUsers";
import { MEDIA_TYPE_TRANSLATE_MAP } from "@/lib/utils/constants";
import Image from "next/image";
import logo from "@/assets/logo/logo_green.svg";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Badge from "../ui/Badge";
import LoadingSpinner from "../ui/LoadingSpinner";
import MediaSelector from "../ui/MediaSelector";
import RetryError from "../ui/RetryError";

export default function EditFavoryForm({
  mediaType,
}: {
  mediaType: MediaType;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<EditFavoryRequest>({
    resolver: zodResolver(editFavoryRequestSchema),
    mode: "onChange",
  });

  const tags = watch("tagNames") || [];
  const [tagInput, setTagInput] = useState("");
  const [tagInputError, setTagInputError] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const translatedMediaType =
    MEDIA_TYPE_TRANSLATE_MAP[mediaType.toLowerCase()] || mediaType;
  const { data: me } = useMyData();
  const {
    data: favoryData,
    isLoading,
    isError,
    error,
    refetch,
  } = useFavoryDetail(id);
  const { mutate } = useEditFavory(id);
  const [initialData, setInitialData] = useState<EditFavoryRequest | null>(
    null,
  );
  const selectedMedia: MediaItem | null = favoryData
    ? {
        title: favoryData.mediaTitle,
        creator: favoryData.mediaCreator,
        year: favoryData.mediaYear,
        imageUrl: favoryData.mediaImageUrl,
        mediaType: favoryData.mediaType,
        externalId: favoryData.mediaId.toString(), // 추후 일치시키기
      }
    : null;

  useEffect(() => {
    if (!isError) return;

    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        toast.error("존재하지 않는 감상평입니다");
        router.replace("/favories");
      }
    }
  }, [isError, error, router]);

  useEffect(() => {
    if (!favoryData || !me) return;

    if (favoryData.userId !== me.id) {
      toast.error("편집 권한이 없습니다");
      router.replace("/favories");
    }
  }, [favoryData, me, router]);

  useEffect(() => {
    if (favoryData) {
      const init = {
        title: favoryData.title,
        content: favoryData.content,
        tagNames: favoryData.tags?.map((tag) => tag.name) || [],
      };
      reset(init);
      setInitialData(init);
    }
  }, [favoryData, reset]);

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

  const onSubmit = (data: EditFavoryRequest) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("감상평이 수정되었습니다");
        router.push(`/favories/${mediaType}/${id}`);
      },
      onError: () => {
        toast.error("감상평 수정에 실패했습니다");
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (isError)
    return (
      <div className="relatvie z-10 -mx-4 -my-[52px] bg-white md:mx-0 md:-my-[70px] lg:-my-[100px]">
        <div className="flex h-full min-h-[80vh] items-center justify-center">
          <RetryError onRetry={refetch} />
        </div>
      </div>
    );

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
            {translatedMediaType} 감상평 수정하기
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <MediaSelector type={mediaType} disabled selected={selectedMedia} />
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
          </div>
          <Button
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            disabled={
              !isValid ||
              !initialData ||
              JSON.stringify(initialData) === JSON.stringify(watch())
            }
          >
            수정하기
          </Button>
        </form>
      </div>
    </main>
  );
}
