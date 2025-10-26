"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import { cn } from "@/lib/utils";

import { CarouselProps } from "@/types";

const Carousel = ({
  children,
  className,
  navigation = true,
  pagination = true,
  slidesPerView = 1,
  spaceBetween = 30,
  breakpoints,
}: CarouselProps) => {
  return (
    <div className={cn("relative", className)}>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          dynamicBullets: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {navigation && (
        <div className="w-full mt-2 flex justify-between items-center text-gray-4">
          <button
            className="swiper-button-prev flex items-center gap-2 text-default-black dark:text-white disabled:text-gray-4 dark:disabled:text-gray-2"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
            Previous
          </button>
          <button
            className="swiper-button-next flex items-center gap-2 text-default-black dark:text-white disabled:text-gray-4 dark:disabled:text-gray-2"
            aria-label="Next slide"
          >
            Next
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}

      {pagination && (
        <div className="swiper-pagination text-gray-4 z-20 absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center gap-2" />
      )}
    </div>
  );
};

export default Carousel;
