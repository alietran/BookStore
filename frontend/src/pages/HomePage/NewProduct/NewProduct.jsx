import { Box, Container, Typography } from "@mui/material";
import React from "react";

import ProductItem from "../../../components/ProductItem/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function NewProduct() {
  return (
    <Container className="py-12" maxWidth="lg">
      <Box className="bg-white  rounded-md">
        <Typography
          variant="h5"
          component="h2"
          sx={{ padding: "18px 18px 0 18px" }}
        >
          Sách mới phát hành
        </Typography>

        <Box className=" border-t-2 mt-3 px-5 pb-5 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-7">
          {/* <Swiper
            spaceBetween={10}
            slidesPerView={3}
            navigation
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
          </Swiper> */}
          <ProductItem/>
          <ProductItem/>
          <ProductItem/>
          <ProductItem/>
          <ProductItem/>
        </Box>
      </Box>
    </Container>
  );
}
