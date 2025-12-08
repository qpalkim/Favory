"use client";
import { useFavoryList } from "@/lib/hooks/useFavories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Banner from "./Banner";
import BannerSkeleton from "../skeleton/BannerSkeleton";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export default function BannerWrapper() {
  const { data, isLoading, isError } = useFavoryList({
    sort: "latest",
  });
  if (isLoading) return <BannerSkeleton />;
  if (isError) return <div>에러가 발생했습니다</div>;
  const favories = data?.content?.slice(0, 4) ?? [];

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      slidesPerView={1}
      effect="fade"
      speed={800}
      rewind={true}
      fadeEffect={{ crossFade: true }}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
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
