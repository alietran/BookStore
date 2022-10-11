import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

import ProductItem from "../../../components/ProductItem/ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WestIcon from "@mui/icons-material/West";
import useStyles from "./style";
import { useDispatch, useSelector } from "react-redux";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import EastIcon from "@mui/icons-material/East";
import { getLatestBook, getSellerBook } from "../../../redux/action/bookAction";
import { NavLink, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
export default function NewProduct() {
  const { errorAddCart } = useSelector((state) => state.CartReducer);
  const enqueueSnackbar = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { latestBook } = useSelector((state) => state.BookReducer);

  const handleAddToCart = (product) => {
    console.log("product", product);

    const cart = {
      name: product?.name,
      price: product?.price,
      image: product?.image,
      id: product?.id,
      quantity: 1,
      warehouse: product?.quantity,
    };
    const action = (snackbarId) => (
      <>
        <Button
          variant="contained"
          className="py-1 px-1 text-xs"
          sx={{
            padding: "6px !important",
            fontSize: "12.5px !important",
            marginRight: "7px !important",
          }}
          onClick={() => {
            history.push("/cart");
          }}
        >
          Xem giỏ hàng
        </Button>
      </>
    );

    if (product.quantity === 0 || errorAddCart) {
      // enqueueSnackbar("Số lượng đã vượt quá giới hạn trong kho!", {
      //   variant: "error",
      // });
    } else {
      // enqueueSnackbar("Thêm vào giỏ hàng thành công!", {
      //   variant: "success",
      //   autoHideDuration: 1000,
      //   action,
      // });
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          data: cart,
        },
      });
    }
  };
  useEffect(() => {
    if (latestBook === null) {
      dispatch(getLatestBook());
    }
  }, [latestBook]);

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <WestIcon
        style={{ left: "-125px" }}
        onClick={onClick}
        className={`${classes.Arrow} Arrow`}
      />
    );
  }
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <EastIcon
        style={{ right: "-125px", height: "30px" }}
        onClick={onClick}
        className={`${classes.Arrow} Arrow`}
      />
    );
  }

  var settings = {
    // dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrow: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
  };
  return (
    <Container className={` ${classes.bestSell} m-3`} maxWidth="lg">
      {/* <Box className="bg-white  rounded-md"> */}
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: "#57b159", marginTop: "15px" }}
      >
        Sách mới phát hành
      </Typography>

      <Box className=" bg-white  grid grid-cols-4 gap-4  sm:grid-cols-2 lg:grid-cols-4">
        {latestBook?.data.map((product, index) => (
          <div className="flex  relative">
            <div
              className={`group bg-white text-center   duration-500 px-3 py-4 mt-6 mx-4 mb-5 ${classes.productItem}`}
              style={{
                boxShadow: "rgb(0 0 0 / 10%) 0px 0px 5px 2px",
                borderRadius: "15px",
                border: "1px solid white",
                width:"230px",
              }}
            >
              <div className="absolute -top-3 -right-1 z-10">
                <img src="./img/new.svg" alt="" height={80} width={80} />
              </div>
              <div className="  w-full relative">
                <img
                  style={{
                    height: "200px",
                    width: "200px",
                  }}
                  src={product?.image}
                  alt="Front of men&#039;s Basic Tee in black."
                  className=" object-contain w-full h-full top-0 left-0    lg:w-full lg:h-full"
                />
              </div>

              <div className="mt-4 flex  justify-center truncate">
                {/* <div className=" text-gray-700 text-center"> */}
                <NavLink
                  to={`/productDetail/${product?._id}`}
                  className="truncate"
                >
                  <span
                    aria-hidden="true"
                    className=" truncate text-slate-800 "
                  >
                    {product?.name}
                  </span>
                </NavLink>
                {/* </div> */}
              </div>
              <p className="mt-1  text-red-500 font-bold text-lg text-center">
                {product?.price.toLocaleString()} ₫
              </p>
              <Button
                sx={{ width: "150px", cursor: "pointer" }}
                className="ml-2 mt-3"
                variant="contained"
                onClick={() => {
                  handleAddToCart(product);
                }}
              >
                Thêm vào giỏ
              </Button>
              {/* <button>Thêm vào giỏ hàng</button> */}
            </div>
          </div>
        ))}
      </Box>
    </Container>
  );
}
