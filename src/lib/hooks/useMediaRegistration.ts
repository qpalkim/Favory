import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MediaItem } from "../types/media";
import { useAddMedia, useMediaExists } from "./useMedia";

// 선택된 미디어의 존재 여부를 조회하고, 존재하지 않으면 자동 등록해 mediaId를 확보하는 훅
export const useMediaRegistration = (selectedMedia: MediaItem | null) => {
  const [mediaId, setMediaId] = useState<number | null>(null);
  const [isRegisteringMedia, setIsRegisteringMedia] = useState(false);
  const [registrationDone, setRegistrationDone] = useState(false);

  const addMedia = useAddMedia();
  const { data: existingMedia, refetch: checkMedia } = useMediaExists(
    selectedMedia?.externalId || "",
  );

  // 미디어 선택이 바뀌면 이전 등록 상태 초기화
  useEffect(() => {
    setMediaId(null);
    setRegistrationDone(false);
  }, [selectedMedia]);

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

  // 존재하지 않는 미디어면 외부 API 조회 결과를 바탕으로 자동 등록
  useEffect(() => {
    if (!selectedMedia) return; // 미디어 선택 전
    if (existingMedia === undefined) return; // 아직 조회 안 끝남 → API 결과 기다려야 함
    if (isRegisteringMedia) return; // 등록 중이면 중복 실행 방지
    if (registrationDone) return; // 이미 등록 완료면 중복 방지
    if (existingMedia?.mediaId != null) return; // 미디어 존재하면 등록 필요 없음

    const registerMedia = async () => {
      setIsRegisteringMedia(true);
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
        setIsRegisteringMedia(false);
      }
    };
    registerMedia();
  }, [
    existingMedia,
    selectedMedia,
    addMedia,
    isRegisteringMedia,
    registrationDone,
  ]);

  return { mediaId, isRegisteringMedia };
};
