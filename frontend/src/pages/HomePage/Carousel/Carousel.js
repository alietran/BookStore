import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./style.css"
import { Autoplay, Pagination, Navigation } from "swiper";


export default function Carousel() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper text-gray-500"
      >
        <SwiperSlide>
          <img className="w-full  " src="../img/255037.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full h-[32.5rem]"
            src="../img/4696ff9c5d77ffe13ffccc5173533965.webp"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img className="w-full " src="../img/251335.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full " src="../img/247158.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
