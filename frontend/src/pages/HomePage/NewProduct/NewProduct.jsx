import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";

import ProductItem from "../../../components/ProductItem/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import useStyles from "./style";
import { useSelector } from "react-redux";



export default function NewProduct() {
  const classes = useStyles();
   const { bookList } = useSelector((state) => state.BookReducer);
 
 

  function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#b7b6b4",paddingTop:"3px", width: "20px", height: "22px" }}
      onClick={onClick}
    />
  );
  }
  function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#b7b6b4",paddingTop:"3px", width: "20px", height: "22px" }}
      onClick={onClick}
    />
  );
}

  var settings = {
    // dots: true,
    nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,

    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  };
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
        {/* grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-7 */}

        <Box className=" border-t-2 mt-3 px-5 pb-5 ">
          <Slider {...settings}>
            {bookList?.data.map((product, index) => (
              <div>
                <p className={classes.productNew}>New</p>

                <ProductItem
                  className={classes.productItem}
                  product={product}
                />
              </div>
            ))}
       
          </Slider>
        </Box>
      </Box>
    </Container>
  );
}
