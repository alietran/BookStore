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
    <div className="content relative overflow-hidden pt-16">
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
            <div className="absolute top-6 left-12 w-4/12  lg:top-44 lg:left-48 lg:w-4/12">
              <h3
                className=" text-xs lg:text-6xl font-bold leading-3 lg:leading-6 content__word"
                style={{ color: "#57b159" }}
              >
                Tri th???c l??
              </h3>
              <h3
                className="text-sx lg:text-5xl font-bold"
                style={{
                  color: "black",
                }}
              >
                S???c m???nh
              </h3>
              <div
                style={{
                  content: "",
                  borderBottom: "5px solid #57b159",
                  width: "40%",
                  // marginBottom: "24px",
                }}
                className=" mb-2 lg:mb-6"
              ></div>
              <p className="truncate text-xs lg:text-lg lg:whitespace-normal">
                T???t c??? nh???ng g?? con ng?????i l??m, ngh?? ho???c tr??? th??nh ???????c b???o t???n
                m???t c??ch k??? di???u tr??n nh???ng trang s??ch
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
            <div className="absolute top-6 left-12 w-4/12  lg:top-44 lg:left-48 lg:w-4/12">
              <h3
                className=" text-xs lg:text-6xl font-bold leading-3 lg:leading-6 content__word"
                style={{ color: "#57b159" }}
              >
                Tri th???c l??
              </h3>
              <h3
                className="text-sx lg:text-5xl font-bold"
                style={{
                  color: "black",
                }}
              >
                S???c m???nh
              </h3>
              <div
                style={{
                  content: "",
                  borderBottom: "5px solid #57b159",
                  width: "40%",
                  // marginBottom: "24px",
                }}
                className=" mb-2 lg:mb-6"
              ></div>
              <p className="truncate text-xs lg:text-lg lg:whitespace-normal">
                T???t c??? nh???ng g?? con ng?????i l??m, ngh?? ho???c tr??? th??nh ???????c b???o t???n
                m???t c??ch k??? di???u tr??n nh???ng trang s??ch
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
            <div className="absolute top-6 left-12 w-4/12  lg:top-44 lg:left-48 lg:w-4/12">
              <h3
                className=" text-xs lg:text-6xl font-bold leading-3 lg:leading-6 content__word"
                style={{ color: "#57b159" }}
              >
                Tri th???c l??
              </h3>
              <h3
                className="text-sx lg:text-5xl font-bold"
                style={{
                  color: "black",
                }}
              >
                S???c m???nh
              </h3>
              <div
                style={{
                  content: "",
                  borderBottom: "5px solid #57b159",
                  width: "40%",
                  // marginBottom: "24px",
                }}
                className=" mb-2 lg:mb-6"
              ></div>
              <p className="truncate text-xs lg:text-lg lg:whitespace-normal">
                T???t c??? nh???ng g?? con ng?????i l??m, ngh?? ho???c tr??? th??nh ???????c b???o t???n
                m???t c??ch k??? di???u tr??n nh???ng trang s??ch
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
          Tri th???c l??
        </h3>
        <h3
          className="text-5xl font-bold"
          style={{
            color: "black",
          }}
        >
          S???c m???nh
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
          T???t c??? nh???ng g?? con ng?????i l??m, ngh?? ho???c tr??? th??nh ???????c b???o t???n m???t
          c??ch k??? di???u tr??n nh???ng trang s??ch
        </p>
      </div> */}
    </div>
  );
}
