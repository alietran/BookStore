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
import { getSellerBook } from "../../../redux/action/bookAction";
import { NavLink, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
export default function BestSellerBook() {
  const { errorAddCart } = useSelector((state) => state.CartReducer);
  const enqueueSnackbar = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { bookList, bestSellerBook } = useSelector(
    (state) => state.BookReducer
  );
  useEffect(() => {
    if (bestSellerBook === null) {
      dispatch(getSellerBook());
    }
  }, [bestSellerBook]);

  const handleAddToCart = (bookDetail) => {
    console.log("idBook", bookDetail);

    const cart = {
      name: bookDetail?.name,
      price: bookDetail?.price,
      image: bookDetail?.image,
      id: bookDetail?.id,
      quantity: 1,
      warehouse: bookDetail?.quantity,
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

    if (bookDetail.quantity === 0 || errorAddCart) {
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

  console.log("bestSellerBook", bestSellerBook);
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
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
  };
  return (
    <Container className={` ${classes.bestSell}`} maxWidth="lg">
      {/* <Box className="bg-white  rounded-md"> */}
      <Typography
        variant="h5"
        component="h2"
        sx={{ color: "#57b159", marginTop: "15px" }}
      >
        Sách bán chạy trong tuần
      </Typography>

      <Box className=" bg-white rounded-md ">
        <Slider {...settings}>
          {bestSellerBook?.data.map((product, index) => (
            <div className="flex px-6  mt-10" style={{ height: "850px" }}>
              <Grid
                container
                spacing={2}
                className="py-6 my-4 rounded-md relative"
                style={{
                  boxShadow: "rgb(0 0 0 / 24%) 0px 0px 8px 1px",
                  borderRadius: "15px",
                  height: "250px",
                  marginTop: "-30px",
                }}
              >
                <div className="absolute -top-2 left-0">
                  <img src="./img/hot.svg" alt="" height={80} width={80} />
                </div>
                <Grid xs={4} className="  rounded-md">
                  <NavLink to={`/productDetail/${product?.book?.id}`}>
                    {" "}
                    <div className="  w-full ">
                      <img
                        style={{
                          height: "210px",
                          maxWidth: "195px",
                        }}
                        src={product?.book?.image}
                      />
                    </div>
                  </NavLink>
                </Grid>

                <Grid
                  xs={8}
                  sx={{
                    paddingLeft: "5px",
                    // textAlign: "center",
                    // alignItems: "center",
                    // marginLeft:
                    display: "flex !important",
                    justifyContent: "space-between !important",
                    flexDirection: "column !important",
                    wordWrap: "break-word",
                  }}
                  className="px-10 flex flex-col"
                >
                  <div className="mt-4 flex  justify-center truncate">
                    {/* <div className=" text-gray-700 text-center"> */}
                    <NavLink
                      to={`/productDetail/${product?.book?._id}`}
                      className="truncate"
                    >
                      <h3 aria-hidden="true" className="  text-slate-800 ">
                        {product?.book?.name}
                      </h3>
                    </NavLink>
                    {/* </div> */}
                  </div>
                  {/* <h3 className=" ml-2">{product?.book?.name}</h3> */}
                  <p className="text-red-500 font-bold ml-2 text-lg mb-0">
                    {product?.book?.price.toLocaleString()} đ
                  </p>
                  <div
                    className=" line-clamp-4 leading-6 text-left ml-2 "
                    dangerouslySetInnerHTML={{ __html: product?.book?.desc }}
                  ></div>

                  <Button
                    sx={{ width: "150px", cursor: "pointer" }}
                    className="ml-2 mt-3"
                    variant="contained"
                    onClick={() => {
                      handleAddToCart(product?.book);
                    }}
                  >
                    Thêm vào giỏ
                  </Button>
                </Grid>
              </Grid>
            </div>
          ))}
        </Slider>
      </Box>
    </Container>
  );
}
