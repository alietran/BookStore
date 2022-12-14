import {
  Box,
  Button,
  collapseClasses,
  Container,
  Grid,
  Link,
  Rating,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import HomeIcon from "@mui/icons-material/Home";
import useStyles from "./style";
import StarIcon from "@mui/icons-material/Star";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getDetailBook } from "../../../redux/action/bookAction";
import { useSnackbar } from "notistack";
import { useHistory, useParams } from "react-router-dom";
import Label from "../../../components/Label";
import RatingItem from "../UserInfo/Rating/RatingItem";
import { getRatingDetail } from "../../../redux/action/ratingAction";
import Fancybox from "./FancyBox";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ProductDetail(props) {
  const { ratingDetail } = useSelector((state) => state.RatingReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [openComment, setOpenComment] = useState(false);
  const [warningtext, setwarningtext] = useState(false);
  const [value, setValue] = React.useState("1");
  const { successDetailBook } = useSelector((state) => state.BookReducer);
  const { enqueueSnackbar } = useSnackbar();
  const { errorAddCart } = useSelector((state) => state.CartReducer);
  const [phoneNumberFormat, setFormatPhone] = useState();
  console.log("errorAddCart", errorAddCart);
  console.log("successDetailBook", successDetailBook);

  useEffect(() => {
    if (id) {
      dispatch(getDetailBook(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(getRatingDetail(id));
    }
  }, [id]);

  console.log("ratingDetail,", ratingDetail);
  //  const ratingMovie = totalReview / totalReviewer;
  const totalReview = ratingDetail?.data.reduce((total, item) => {
    return total + item.rating;
  }, 0);

  const ratingMovie = totalReview / ratingDetail?.result;
  console.log("ratingMovie,", ratingMovie);
  const [imageURL, setImageURL] = useState(successDetailBook?.data.image);
  const [itemImg, seItemImage] = useState(0);
  //  const [sliderImg, setSliderImg] = useState(successDetailBook?.data.gallery[0]);
  const userLogin = JSON.parse(localStorage.getItem("user"));
  const cart =localStorage.getItem("cart") ?  JSON.parse(localStorage.getItem("cart")) : null;
  console.log("userLogin", userLogin);
  console.log("cart", cart);

  // console.log("successDetailBook", successDetailBook?.data.image);
  const bookDetail = successDetailBook?.data;

  console.log("bookDetail", bookDetail);
  const handleChangeImage = (item, index) => {
    // console.log("item", item);
    setImageURL(item);
    seItemImage(index);
    // console.log("itemImg", itemImg);
  };
  const handleBuy = () => {
    handleAddToCart();
    history.push("/checkout");
  };
  const handleAddToCart = () => {
    console.log("bookDetail", bookDetail);
    // if(cart.filter((item)=>item.id ===)
    const cart = {
      name: bookDetail.name,
      price: bookDetail.price,
      image: bookDetail.image,
      id: bookDetail.id,
      quantity: 1,
      warehouse: bookDetail.quantity,
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
          Xem gi??? h??ng
        </Button>
      </>
    );

    console.log("bookDetail.quantity", bookDetail.quantity);
    console.log("cart", cart);
    console.log("errorAddCartwere", errorAddCart);



    if ( errorAddCart) {
      //bookDetail.quantity: sl sp th??m v??o gi??? h??ng
      enqueueSnackbar("S??? l?????ng ???? v?????t qu?? gi???i h???n trong kho!", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Th??m v??o gi??? h??ng th??nh c??ng!", {
        variant: "success",
        autoHideDuration: 1000,
        action,
      });
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          data: cart,
        },
      });
    }
  };
  useEffect(()=>{
    dispatch({
      type: "RESET_CART",

    });
  },[])

  const changeNumber = (phone) => {
    let formated_phone =
      phone.substring(0, 3) + +phone.substring(3, 6) + "xxxx";

    console.log("formated_phone", formated_phone);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return (
    <Box classNameName="m-5 ">
      <Container maxWidth="lg">
        <div className="productDetail__wrapper py-16">
          <div className={classes["productDetail__wrapper-breadcrumbs"]}>
            <div className={classes.breadcrumbsIcon}>
              <Link className={classes.breadcrumbsIconLink} href="/">
                <HomeIcon />
                {/* <img src="https://www.w3schools.com/w3css/w3css_images.asp" alt=""/> */}
              </Link>
              <span className="css-rhmj3t pl-2"> &gt; </span>
            </div>
            <div className={classes.breadcrumbsName}>
              <Link to="" className={classes.breadcrumbsLink}>
                {/* name */}
                {bookDetail?.name}
              </Link>
            </div>
          </div>

          <div className={classes["productDetail__wrapper-content"]}>
            <div className={classes["productDetail__wrapper-content--left"]}>
              <div className={classes["productDetail__wrapper-content--box"]}>
                <div className={classes.box__content}>
                  <div className={classes["box__content-left"]}>
                    <div className="box__content-left--img">
                      <div className={classes.img__box}>
                        <div className={classes.img__content}>
                          {/* <img src={imageURL ? imageURL : bookDetail?.image} /> */}
                          <img src={bookDetail?.image} alt="" />
                        </div>
                      </div>
                      <div className={classes["img__library"]}>
                        <div className={classes["img__library-content"]}>
                          <div
                            className={classes["img__library-content--item"]}
                          >
                            {/* {bookDetail?.gallery.map((image,index)=>(
                              
                            ))} */}
                            {bookDetail?.gallery?.map((item, index) => {
                              // console.log("index", item[index]);
                              return (
                                <Fancybox options={{ infinite: false }}>
                                  <img
                                    data-fancybox="gallery"
                                    src={item}
                                    key={index}
                                    onMouseOut={() =>
                                      handleChangeImage(item, index)
                                    }
                                    alt=""
                                  />
                                </Fancybox>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes["box__content-right"]}>
                    <div className="content__title">
                      <h1 className="font-bold">{bookDetail?.name}</h1>
                      <div className="content__trademark flex">
                        <Rating
                          value={ratingMovie.toFixed(1)}
                          precision={0.5}
                          readOnly
                        />
                        {/* <StarIcon sx={{ color: "gold" }} />
                        <StarIcon sx={{ color: "gold" }} />
                        <StarIcon sx={{ color: "gold" }} />
                        <StarIcon sx={{ color: "gold" }} />
                        <StarIcon sx={{ color: "gold" }} /> */}
                        <span className="mb-3">
                          (Xem {ratingDetail?.result} l?????t ????nh gi??)
                        </span>
                      </div>
                      <div className="leading-3">
                        {" "}
                        <p>T??c Gi???: {bookDetail?.authorId.name}</p>
                        <p>Th??? lo???i: {bookDetail?.idCate.name}</p>
                        <p>Nh?? xu???t b???n: {bookDetail?.publisher}</p>
                        <p>Nh?? ph??t h??nh:{bookDetail?.issuer?.name}</p>
                      </div>
                    </div>
                    <div className="content__price">
                      <div className="content__price--title text-red-500 text-2xl font-medium">
                        {bookDetail?.price.toLocaleString()} ???
                      </div>
                    </div>
                    <div className={classes.content__line}>
                      <div className={classes.line}></div>
                    </div>
                    <div>
                      Kho: {bookDetail?.quantity}{" "}
                      <Label
                        variant="ghost"
                        color={bookDetail?.quantity > 0 ? "success" : "error"}
                      >
                        {" "}
                        {bookDetail?.quantity > 0 ? "C??n h??ng " : "H???t h??ng"}
                      </Label>
                    </div>
                    {bookDetail?.quantity === 0 ? (
                      " "
                    ) : (
                      <>
                        {" "}
                        <div className={classes.content__button}>
                          <Button
                            onClick={handleBuy}
                            variant="contained"
                            className={`${classes["content__button--buy"]} ${classes.buttonAction}`}
                          >
                            Mua Ngay
                          </Button>
                          <button
                            onClick={handleAddToCart}
                            className={`${classes["content__button--add"]} ${classes.buttonAction}   `}
                          >
                            Th??m v??o gi???
                          </button>
                        </div>
                        <div className="content__line">
                          <div className="line"></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={classes["productDetail__wrapper-content--right"]}>
              <div className={classes["productDetail__wrapper-content--info"]}>
                <div className={classes["info-policy"]}>
                  <h4 className="font-bold">Ch??nh s??ch kinh doanh</h4>
                  <div className="info-policy--ship flex my-3">
                    <div className="ship-img">
                      <img src="../../../../img/svgexport-25.svg" alt="" />
                    </div>
                    <div className="ship-text ml-2">Mi???n ph?? v???n chuy???n </div>
                  </div>
                  <div className="info-policy--ship flex my-3">
                    <div className="ship-img">
                      <img
                        style={{
                          filter:
                            "invert(38%) sepia(90%) saturate(1644%) hue-rotate(126deg) brightness(94%) contrast(103%)",
                        }}
                        src=".../../../../img/svgexport-17.svg"
                        alt=""
                      />
                    </div>
                    <div className="ship-text ml-2">
                      Cam k???t ch??nh h??ng 100%
                    </div>
                  </div>
                  <div className="info-policy--ship flex my-3">
                    <div className="ship-img">
                      <img
                        style={{
                          filter:
                            "invert(38%) sepia(90%) saturate(1644%) hue-rotate(126deg) brightness(94%) contrast(103%)",
                        }}
                        src="../../../../img/svgexport-18.svg"
                        alt=""
                      />
                    </div>
                    <div className="ship-text ml-2">?????i tr??? trong 7 ng??y</div>
                  </div>
                </div>

                <Link>Xem chi ti???t</Link>
              </div>
            </div>
          </div>

          <div className={classes["productDetail__wrapper-desc"]}>
            <div className={classes.desc__title}>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="M?? t???" value="1" />
                      <Tab label="Th??ng tin chi ti???t" value="2" />
                      <Tab label="????nh gi?? s???n ph???m" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div className="desc__left">
                      <div
                        dangerouslySetInnerHTML={{ __html: bookDetail?.desc }}
                      ></div>
                    </div>
                  </TabPanel>
                  <TabPanel value="2">
                    <table
                      className={classes.infoDetail}
                      style={{
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      <tr>
                        <td className="font-bold text-center">T??c gi???</td>
                        <td>{bookDetail?.authorId.name}</td>
                      </tr>
                      <tr>
                        <td className="font-bold  text-center">
                          Nh?? ph??t h??nh
                        </td>
                        <td>{bookDetail?.issuer?.name}</td>
                      </tr>
                      <tr>
                        <td className="font-bold  text-center">K??ch th?????c</td>
                        <td>{bookDetail?.size}</td>
                      </tr>
                      <tr>
                        <td className="font-bold  text-center">B??a</td>
                        <td>{bookDetail?.bookCover}</td>
                      </tr>
                      <tr>
                        <td className="font-bold  text-center">S??? trang</td>
                        <td>{bookDetail?.bookCover}</td>
                      </tr>
                      <tr>
                        <td className="font-bold">NXB</td>
                        <td>{bookDetail?.publisher}</td>
                      </tr>
                    </table>
                  </TabPanel>
                  <TabPanel value="3">
                    <div>
                      {ratingDetail?.result === 0 ? (
                        <p>Hi???n ch??a c?? ????nh gi?? n??o </p>
                      ) : (
                        <>
                          {ratingDetail?.data
                            .filter(
                              (item) =>
                                item.hidden === false && item.active === true
                            )
                            .map((item, index) => {
                              console.log("item", item);
                              return (
                                <div className="flex mb-3">
                                  <div className="mr-3 w-16">
                                    <img
                                      src={
                                        item?.order
                                          ? item?.order?.user.avatar
                                          : "http://www.gravatar.com/avatar/3008476a9614994b2538c9faa1b7e808?s=100"
                                      }
                                      alt="avatar"
                                      style={{  height: "40px" }}
                                    />
                                  </div>
                                  <div className="leading-6">
                                    <p className="mb-2">
                                      {item?.order?.user?.phoneNumber
                                        ? (item?.order?.user?.phoneNumber.substring(
                                            0,
                                            3
                                          ) +
                                          item?.order?.user?.phoneNumber.substring(
                                            3,
                                            6
                                          ) +
                                          "xxxx")
                                        : item?.order?.user?.fullName}
                                    </p>
                                    <Rating
                                      readOnly
                                      value={item.rating}
                                      size={"medium"}
                                    />
                                    <p className="text-slate-300">
                                      {moment(item.createdAt).format(
                                        "DD/MM/YYYY, h:mm a"
                                      )}
                                    </p>
                                    <p> {item.content}</p>
                                    {item.imageRating[0] === "" ? (
                                      ""
                                    ) : (
                                      <div className="mt-3 flex ">
                                        {item?.imageRating?.map(
                                          (img, index) => {
                                            return (
                                              <img
                                                src={img}
                                                alt=""
                                                style={{
                                                  width: "80px",
                                                  height: "80px",
                                                  marginRight: "10px",
                                                }}
                                              />
                                            );
                                          }
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          <hr />
                        </>
                      )}
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
