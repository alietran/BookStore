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
import React, { useState } from "react";
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

export default function ProductDetail() {
    const [openComment, setOpenComment] = useState(false);
    const [warningtext, setwarningtext] = useState(false);
    const [value, setValue] = React.useState("1");

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
              <span className="css-rhmj3t px-1"> &gt; </span>
            </div>
            <div className={classes.breadcrumbsName}>
              <Link to="" className={classes.breadcrumbsLink}>
                name
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
                          <img src="../../../../img/2.webp" />
                        </div>
                      </div>
                      <div className="img__library">
                        <div className={classes["img__library-content"]}>
                          <div
                            className={classes["img__library-content--item"]}
                          >
                            <img src="../../../../img/phone.webp" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes["box__content-left--line"]}>
                      <div className={classes.line}></div>
                    </div>
                  </div>
                  <div className={classes["box__content-right"]}>
                    <div className="content__title">
                      <h1>Name</h1>
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
                      <div className="content__price--title ">Giá</div>
                    </div>

                    <div className={classes.content__line}>
                      <div className={classes.line}></div>
                    </div>

                    <div className="content__title-discount">
                      Choose one of the following promotions
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
                          <span className="box-title-price">GIas giamr</span>{" "}
                          off
                        </div>
                        <div className={classes["box-expiryDay"]}>
                          <div className="box-expiryDay-day">
                            Expiry Date: 27/7/2022
                          </div>
                          <div className={classes["box-expiryDay-apply"]}>
                            Apply
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.content__button}>
                      <Button
                        variant="contained"
                        className={`${classes["content__button--buy"]} ${classes.buttonAction}`}
                      >
                        BUY NOW
                      </Button>
                      <button
                        className={`${classes["content__button--add"]} ${classes.buttonAction}   `}
                      >
                        ADD TO CART
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
                  <h4>Sales policy</h4>
                  <div className="info-policy--ship flex my-3">
                    <div className="ship-img">
                      <img src="../../../../img/svgexport-25.svg" alt="" />
                    </div>
                    <div className="ship-text ml-2">
                      Free delivery for orders from $50AUD{" "}
                    </div>
                  </div>
                  <div className="info-policy--ship flex my-3">
                    <div className="ship-img">
                      <img src=".../../../../img/svgexport-17.svg" alt="" />
                    </div>
                    <div className="ship-text ml-2">100% genuine guarantee</div>
                  </div>
                  <div className="info-policy--ship flex my-3">
                    <div className="ship-img">
                      <img src="../../../../img/svgexport-18.svg" alt="" />
                    </div>
                    <div className="ship-text ml-2">Return within 10 days</div>
                  </div>
                </div>
                {/* <div className="info-service">
              <h4>Dịch vụ khác</h4>
              <div className="info-policy--ship">
                <div className="ship-img">
                  <img src="../../../../assets/img/setting-icon.svg" alt="" />
                </div>
                <div className="ship-text">Repair of the same price $6AUD </div>
              </div>
              <div className="info-policy--ship">
                <div className="ship-img">
                  <img src="../ ../../../../../assets/img/computer-icon.svg" alt=""/>
                </div>
                <div className="ship-text">Computer and laptop cleaning.</div>
              </div>
              <div className="info-policy--ship">
                <div className="ship-img">
                  <img src="../../../../assets/img/shield-icon.svg" alt=""/>
                </div>
                <div className="ship-text">Home warranty.</div>
              </div>
            </div> */}
                <Link>See details</Link>
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
                      <div>
                        Giới thiệu Chuột máy tính Asus TUF Gaming M3 Asus TUF
                        Gaming M3 là một con chuột chơi game nhỏ gọn mang đến sự
                        thoải mái, hiệu suất và độ tin cậy mà các game thủ yêu
                        cầu. Chuột tiện dụng và nhẹ cho các trò chơi kéo dài,
                        với cảm biến quang có độ chính xác cao mang lại cho bạn
                        lợi thế trong trận chiến. Được hỗ trợ bởi các công tắc
                        20 triệu lần nhấp và lớp phủ chuyên dụng cho độ bền đặc
                        biệt. Nó cũng có tính năng chiếu sáng Aura Sync RGB tùy
                        biến để bạn có thể tùy chỉnh trong phong cách cá nhân
                        hóa. THIẾT KẾ ERGONOMIC & LIGHTWEIGHT TUF Gaming M3 có
                        một thiết kế nhỏ gọn và nhẹ được tối ưu hóa để chơi trò
                        chơi FPS nhanh bằng cách sử dụng vuốt hoặc nắm ngón tay.
                        Thiết kế công thái học và nhẹ, thoải mái cho nhiều giờ
                        chơi, với hình dạng được tối ưu hóa giúp tăng cường cả
                        xử lý và kiểm soát.
                      </div>
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
                    {/* {commentListDisplay.comment?.map((comment, index) => (
                      <div
                        key={`${comment?.createAt}`}
                        className={classes.itemDis}
                        id={`idComment${comment?.createAt}`}
                      >
                        <div className={classes.infoUser}>
                          <div className={classes.left}>
                            <span className={classes.avatar}>
                              <img
                                src={`https://i.pravatar.cc/150?u=${comment?._id}`}
                                alt="avatar"
                                className={classes.avatarImg}
                              />
                            </span>
                            <span className={classes.liveUser}>
                              <p className={classes.userName}>
                                {comment.userId?.userName}
                              </p>
                              <p className={classes.timePost}>
                                {moment(comment?.createAt).fromNow()}
                              </p>
                            </span>
                          </div>
                          <div className={classes.right}>
                            <p className="text-success">{comment.rating}</p>
                            <Rating
                              value={comment.rating}
                              precision={0.5}
                              readOnly
                            />
                          </div>
                          <div className="clearfix"></div>
                        </div>
                        <div className="py-3 mb-3 border-bottom">
                          {comment.content}
                        </div>
                        <span
                          className="d-inline-block"
                          style={{ cursor: "pointer" }}
                        >
                          <span className="mr-2">
                            <ThumbUpIcon
                              style={{
                                color: "#73757673",
                              }}
                            />
                          </span>
                          <span style={{ color: "#737576" }}>
                            <span>0</span> Thích
                          </span>
                        </span>
                      </div>
                    ))} */}

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
              {/* <Grid container spacing={2}>
                <Grid item xs={8}>
                  <div className="desc__left">
                    <h5>Description</h5>
                    <div>
                      Giới thiệu Chuột máy tính Asus TUF Gaming M3 Asus TUF
                      Gaming M3 là một con chuột chơi game nhỏ gọn mang đến sự
                      thoải mái, hiệu suất và độ tin cậy mà các game thủ yêu
                      cầu. Chuột tiện dụng và nhẹ cho các trò chơi kéo dài, với
                      cảm biến quang có độ chính xác cao mang lại cho bạn lợi
                      thế trong trận chiến. Được hỗ trợ bởi các công tắc 20
                      triệu lần nhấp và lớp phủ chuyên dụng cho độ bền đặc biệt.
                      Nó cũng có tính năng chiếu sáng Aura Sync RGB tùy biến để
                      bạn có thể tùy chỉnh trong phong cách cá nhân hóa. THIẾT
                      KẾ ERGONOMIC & LIGHTWEIGHT TUF Gaming M3 có một thiết kế
                      nhỏ gọn và nhẹ được tối ưu hóa để chơi trò chơi FPS nhanh
                      bằng cách sử dụng vuốt hoặc nắm ngón tay. Thiết kế công
                      thái học và nhẹ, thoải mái cho nhiều giờ chơi, với hình
                      dạng được tối ưu hóa giúp tăng cường cả xử lý và kiểm
                      soát.
                    </div>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="desc__right">
                    <h5>Thông tin chi tiết</h5>
                    <div>
                      {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
              {/* <table
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
                    </div>
                  </div>
                </Grid>
              </Grid> */}
            </div>
          </div>
        </div>
      </Container>
    </Box>
  );
}
