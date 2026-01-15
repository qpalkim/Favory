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

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      slidesPerView={1}
      effect="fade"
      speed={800}
      rewind={true}
      fadeEffect={{ crossFade: true }}
      pagination={{ clickable: true }}
      autoplay={
        favories.length > 1
          ? {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
          : false
      }
      className="banner-swiper"
    >
      {favories.map((favory) => (
        <SwiperSlide key={favory.id}>
          <Banner type="latest" favory={favory} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
