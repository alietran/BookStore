import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
import "./style.css";
import Slider from "react-slick";

import { Navigation, Pagination, Autoplay } from "swiper";

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="content relative overflow-hidden ">
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

      <Slider {...settings}>
        <div className="relative">
          <div>
            {" "}
            <div className="content__image">
              <img src="./img/carousel.webp" />
            </div>
            <div className="absolute top-44 left-48 w-4/12">
              <h3
                className="text-6xl font-bold leading-6 content__word"
                style={{ color: "#57b159" }}
              >
                Tri thức là
              </h3>
              <h3
                className="text-5xl font-bold"
                style={{
                  color: "black",
                }}
              >
                Sức mạnh
              </h3>
              <div
                style={{
                  content: "",
                  borderBottom: "5px solid #57b159",
                  width: "40%",
                  marginBottom: "24px",
                }}
              ></div>
              <p className="text-lg">
                Tất cả những gì con người làm, nghĩ hoặc trở thành được bảo tồn
                một cách kỳ diệu trên những trang sách
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div>
            {" "}
            <div className="content__image">
              <img src="./img/slider1-2.jpg.webp" />
            </div>
            <div className="absolute top-44 left-48  w-4/12">
              <h3
                className="text-6xl font-bold leading-6 content__word"
                style={{ color: "#57b159" }}
              >
                Tri thức là
              </h3>
              <h3
                className="text-5xl font-bold"
                style={{
                  color: "black",
                }}
              >
                Sức mạnh
              </h3>
              <div
                style={{
                  content: "",
                  borderBottom: "5px solid #57b159",
                  width: "40%",
                  marginBottom: "24px",
                }}
              ></div>
              <p className="text-lg">
                Tất cả những gì con người làm, nghĩ hoặc trở thành được bảo tồn
                một cách kỳ diệu trên những trang sách
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div>
            {" "}
            <div className="content__image">
              <img src="./img/slider1-3.jpg.webp" />
            </div>
            <div className="absolute top-44 left-48  w-4/12">
              <h3
                className="text-6xl font-bold leading-6 content__word"
                style={{ color: "#57b159" }}
              >
                Tri thức là
              </h3>
              <h3
                className="text-5xl font-bold"
                style={{
                  color: "black",
                }}
              >
                Sức mạnh
              </h3>
              <div
                style={{
                  content: "",
                  borderBottom: "5px solid #57b159",
                  width: "40%",
                  marginBottom: "24px",
                }}
              ></div>
              <p className="text-lg">
                Tất cả những gì con người làm, nghĩ hoặc trở thành được bảo tồn
                một cách kỳ diệu trên những trang sách
              </p>
            </div>
          </div>
        </div>
      </Slider>

      {/* <div className="content__image">
        <img src="./img/carousel.webp" />
      </div>
      <div className="content__word absolute top-40 left-48   w-4/12">
        <h3
          className="text-6xl font-bold leading-6"
          style={{ color: "#57b159" }}
        >
          Tri thức là
        </h3>
        <h3
          className="text-5xl font-bold"
          style={{
            color: "black",
          }}
        >
          Sức mạnh
        </h3>
        <div
          style={{
            content: "",
            borderBottom: "5px solid #57b159",
            width: "40%",
            marginBottom: "24px",
          }}
        ></div>
        <p className="text-lg">
          Tất cả những gì con người làm, nghĩ hoặc trở thành được bảo tồn một
          cách kỳ diệu trên những trang sách
        </p>
      </div> */}
    </div>
  );
}
