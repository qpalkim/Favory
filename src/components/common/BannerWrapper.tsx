"use client";
import { useFavoryList } from "@/lib/hooks/useFavories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Banner from "./Banner";
import BannerSkeleton from "../skeleton/BannerSkeleton";
import RetryError from "../ui/RetryError";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function BannerWrapper() {
  const { data, isLoading, isError, refetch } = useFavoryList({
    page: 0,
    size: 4,
    sort: "latest",
  });

  if (isLoading && !data) return <BannerSkeleton />;
  if (isError) return <RetryError onRetry={refetch} />;
  const favories = data?.content ?? [];

  const shouldAutoplay = favories.length > 1;
  const autoplayOptions = shouldAutoplay ? {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }
    : false;

  return (
    <section aria-label="최신 감상평 배너">
      <Swiper
        aria-label="최신 감상평 슬라이드"
        modules={[Autoplay, EffectFade, Pagination]}
        slidesPerView={1}
        effect="fade"
        speed={800}
        rewind
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={autoplayOptions}
        className="banner-swiper"
      >
        {favories.map((favory) => (
          <SwiperSlide key={favory.id}>
            <Banner favory={favory} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
