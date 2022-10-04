import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
import  "./css/style.css"

import { Navigation, Pagination,Autoplay } from 'swiper';

export default function Carousel() {
  return (
    <div className="content relative">
      {/* <Swiper
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
      </Swiper> */}

      <div className="content__image">
        <img src="./img/carousel.webp"/>
      </div>
      <div className="content__word absolute top">
        <h3>Tri thức là</h3>
        <h3>Sức mạnh</h3>
      
      <p>Có rất nhiều ...</p>
      </div>
    </div>
  );
}
