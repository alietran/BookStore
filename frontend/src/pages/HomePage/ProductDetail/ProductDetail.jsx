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

//  const handleClickComment = () => {
//   //  if (!userLogin) {
//   //    isLogin();
//   //    return;
//   //  }
//    setOpenComment(true);
//    setwarningtext(false);
//  };

export default function ProductDetail(props) {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const [openComment, setOpenComment] = useState(false);
  const [warningtext, setwarningtext] = useState(false);
  const [value, setValue] = React.useState("1");
  const { successDetailBook } = useSelector((state) => state.BookReducer);
    const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    dispatch(getDetailBook(id));
  },[]);

  console.log("successDetailBook", successDetailBook);
  const bookDetail = successDetailBook?.data


const handleAddToCart = () => { 
  console.log("bookDetail", bookDetail);
  const cart = {
    name: bookDetail.name,
    price: bookDetail.price,
    image: bookDetail.image,
    id: bookDetail.id,
    quantity: 1,
  };
  console.log("cart", cart);
  dispatch({
    type: "ADD_TO_CART",
    payload: {
      data: cart,
    },
  }); 
     enqueueSnackbar("Thêm vào giỏ hàng thành công!", {
       variant: "success",
     });
};

  // const { cartList } = useSelector((state) => state.CartReducer);
  // console.log("cartList", cartList);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      href="/admin/dashboard"
      color="text.primary"
      sx={{ "&:hover": { color: "#212B36" } }}
    >
      Trang chủ
    </Link>,
    <Link
      underline="hover"
      key="2"
      href="/admin/users/account"
      color="text.primary"
      sx={{ "&:hover": { color: "#212B36" } }}
    >
      Người dùng{" "}
    </Link>,
    <Typography key="3" color="inherit">
      Danh sách
    </Typography>,
  ];
  return (
    <Box classNameName="m-5">
      <Container maxWidth="lg">
        <div className="productDetail__wrapper py-4">
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
                          <img src={bookDetail?.image} />
                        </div>
                      </div>
                      <div className={classes["img__library"]}>
                        <div className={classes["img__library-content"]}>
                          <div
                            className={classes["img__library-content--item"]}
                          >
                            {/* {bookDetail?.gallery.map((image,index)=>(
                              
                            ))} */}
                            {bookDetail?.gallery.map((item, index) => {
                              // console.log("index", item[index]);
                              return <img src={item} key={index} />;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes["box__content-right"]}>
                    <div className="content__title">
                      <h1>{bookDetail?.name}</h1>
                      <div className="content__trademark">
                        <StarIcon sx={{ color: "gold" }} />
                        <StarIcon sx={{ color: "gold" }} />
                        <StarIcon sx={{ color: "gold" }} />
                        <StarIcon sx={{ color: "gold" }} />
                        <StarIcon sx={{ color: "gold" }} />
                        <span>(Xem 12 lượt đánh giá)</span>
                      </div>
                    </div>

                    <div className="content__price">
                      <div className="content__price--title text-red-500 text-2xl font-medium">
                        {bookDetail?.price.toLocaleString()} ₫
                      </div>
                    </div>

                    <div className={classes.content__line}>
                      <div className={classes.line}></div>
                    </div>
                    <div>Kho: {bookDetail?.quantity}</div>
                    <div className="content__title-discount">
                      Chọn mã giảm giá
                    </div>

                    <div className={classes.content__discount}>
                      <div className={classes["content__discount-gift"]}>
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src="../../../../img/svgexport-15.svg"
                          alt="gift-icon"
                        />
                      </div>
                      <div className={classes["content__discount-box"]}>
                        <div className={classes["box-title"]}>
                          <span className="box-title-price">Giảm giá</span> off
                        </div>
                        <div className={classes["box-expiryDay"]}>
                          <div className="box-expiryDay-day">
                            Ngày hết hạn: 27/7/2022
                          </div>
                          <div className={classes["box-expiryDay-apply"]}>
                            Áp dụng
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.content__button}>
                      <Button
                        variant="contained"
                        className={`${classes["content__button--buy"]} ${classes.buttonAction}`}
                      >
                        Mua Ngay
                      </Button>
                      <button
                        onClick={handleAddToCart}
                        className={`${classes["content__button--add"]} ${classes.buttonAction}   `}
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                    <div className="content__line">
                      <div className="line"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes["productDetail__wrapper-content--right"]}>
              <div className={classes["productDetail__wrapper-content--info"]}>
                <div className={classes["info-policy"]}>
                  <h4>Chính sách kinh doanh</h4>
                  <div className="info-policy--ship flex my-3">
                    <div className="ship-img">
                      <img src="../../../../img/svgexport-25.svg" alt="" />
                    </div>
                    <div className="ship-text ml-2">Miễn phí vận chuyển </div>
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
                      Cam kết chính hãng 100%
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
                    <div className="ship-text ml-2">Đổi trả trong 7 ngày</div>
                  </div>
                </div>

                <Link>Xem chi tiết</Link>
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
                      <Tab label="Mô tả" value="1" />
                      <Tab label="Thông tin chi tiết" value="2" />
                      <Tab label="Bình luận" value="3" />
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
                      }}
                    >
                      <tr>
                        <td>Nhà cung cấp</td>
                        <td>Contact</td>
                      </tr>
                      <tr>
                        <td>Tác giả</td>
                        <td>Maria Anders</td>
                      </tr>
                      <tr>
                        <td>NXB</td>
                        <td>Francisco Chang</td>
                      </tr>
                      <tr>
                        <td>Kích thước</td>
                        <td>Roland Mendel</td>
                      </tr>
                      <tr>
                        <td>Bìa</td>
                        <td>Helen Bennett</td>
                      </tr>
                      <tr>
                        <td>Số trang</td>
                        <td>Yoshi Tannamuri</td>
                      </tr>
                      <tr>
                        <td>Nhà phát hành</td>
                        <td>Giovanni Rovelli</td>
                      </tr>
                    </table>
                  </TabPanel>
                  <TabPanel value="3">
                    <div className={classes.danhGia}>
                      <div
                        className={classes.inputRoot}
                        // onClick={handleClickComment}
                      >
                        <span className={classes.avatarReviewer}>
                          <img
                            src="../../../../img/phone.webp"
                            alt="avatar"
                            className={classes.avatarImg}
                          />
                        </span>
                        <input
                          className={classes.inputReviwer}
                          type="text"
                          placeholder="Bạn nghĩ gì về phim này?"
                          readOnly="readonly"
                        />

                        <span className={classes.imgReviewerStar}>
                          <Rating
                            value={5}
                            size={"medium"}
                            readOnly
                            precision={0.5}
                          />
                        </span>
                      </div>
                    </div>

                    <div className={classes.moreMovie}>
                      <Button
                        // onClick={() => setopenMore()}
                        variant="outlined"
                        className={classes.moreMovieButton}
                      >
                        XEM THÊM
                      </Button>
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
