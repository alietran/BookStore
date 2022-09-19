import {
  Card,
  Container,
  Grid,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Label from "../../../../components/Label";
import UserListHead from "../../../../components/user/UserListHead";
import { getOrderByUser } from "../../../../redux/action/orderAction";
import CustomizedSteppers from "../../CustomStep/CustomizedSteppers";
import useStyles from "./style";
import HomeIcon from "@mui/icons-material/Home";

export default function OrderHistoryDetail() {
  const classes = useStyles();
  const id = useParams();
  const dispatch = useDispatch();
  let { orderByUser } = useSelector((state) => state.OrderReducer);
  console.log("orderByUser", orderByUser);
  const TABLE_HEAD = [
    { id: "product", label: "Sản phẩm", alignRight: false },
    { id: "price", label: "Giá", alignRight: false },
    { id: "amount", label: "Số lượng", alignRight: false },
    { id: "total", label: "Tổng tiền", alignRight: false },
  ];
  useEffect(() => {
    if (!orderByUser) {
      dispatch(getOrderByUser());
    }
  }, [orderByUser]);

  orderByUser = orderByUser?.filter((item) => item.id === id.receiptId);

  return (
    <div>
      <Container>
        <div className={classes["productDetail__wrapper-breadcrumbs"]}>
          <div className={classes.breadcrumbsIcon}>
            <Link className={classes.breadcrumbsIconLink} href="/">
              <HomeIcon />
              {/* <img src="https://www.w3schools.com/w3css/w3css_images.asp" alt=""/> */}
            </Link>
            <span className="css-rhmj3t pl-2"> &gt; </span>
          </div>
          <div className={classes.breadcrumbsName}>
            <Link className={classes.breadcrumbsIconLink} href="/userInfo">
              {/* name */}
              Đơn hàng
            </Link>
            <span className="css-rhmj3t px-2"> &gt; </span>
          </div>

          <div className={classes.breadcrumbsName}>
            <Link to="" className={classes.breadcrumbsLink}>
              {/* name */}
              Chi tiết đơn hàng
            </Link>
          </div>
        </div>
        <Container
          sx={{
            paddingRight: "0px !important",
            paddingLeft: "0px !important",
            backgroundColor: "white",
            margin: "30px auto",
          }}
        >
          {orderByUser?.map((orderDetail, index) => {
            if (orderDetail.id === id.receiptId) {
              return (
                <div style={{ padding: "30px " }}>
                  <Stack spacing={2}>
                    <div className="flex justify-between">
                      <Typography
                        variant="h4"
                        gutterBottom
                        className="font-normal text-gray-900"
                        sx={{ fontWeight: "400 !important" }}
                      >
                        Chi tiết đơn hàng{" "}
                        <span className="text-lg">
                          {" "}
                          #{orderDetail && orderDetail._id} -{" "}
                          <span>
                            <Label
                              variant="ghost"
                              color={
                                orderDetail &&
                                orderDetail.status === "Đang xử lý"
                                  ? "default"
                                  : orderDetail &&
                                    orderDetail.status === "Đang vận chuyển"
                                  ? "info"
                                  : orderDetail &&
                                    orderDetail.status === "Đã giao hàng"
                                  ? "success"
                                  : orderDetail &&
                                    orderDetail.status === "Đã nhận"
                                  ? "success"
                                  : orderDetail &&
                                    orderDetail.status === "Đã đánh giá"
                                  ? "warning"
                                  : "error"
                              }
                            >
                              {orderDetail && orderDetail.status}
                            </Label>

                            {/* )} */}
                          </span>
                        </span>
                      </Typography>
                    </div>
                  </Stack>
                  <CustomizedSteppers orderDetail={orderDetail} />
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6} sx={{ marginBottom: "50px" }}>
                      <Typography
                        variant="h6"
                        sx={{ marginLeft: 1, marginBottom: 2 }}
                      >
                        Địa chỉ giao hàng
                      </Typography>
                      <Card
                        sx={{
                          borderRadius: " 16px",
                          zIndex: 0,
                          padding: "24px",
                        }}
                      >
                        <div className="text-sm">
                          <p className="font-semibold">
                            Tên người nhận
                            <span className="ml-6 font-normal">
                              {" "}
                              {orderDetail && orderDetail.address?.fullName}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Số điện thoại :
                            <span className="ml-6 font-normal">
                              {orderDetail && orderDetail.address?.phoneNumber}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Địa chỉ
                            <span className="ml-6 font-normal">
                              {orderDetail &&
                                orderDetail.address?.address +
                                  ", " +
                                  orderDetail.address?.ward +
                                  ", " +
                                  orderDetail.address?.district +
                                  ", " +
                                  orderDetail.address?.city}
                            </span>
                          </p>
                          {/* <p className="font-semibold">
                Tổng tiền:{" "}
                <span className="ml-6 font-normal">
                  {orderDetailList &&
                    orderDetailList[0]?.receiptId.totalPriceReceipt?.toLocaleString(
                      "it-IT",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                </span>
              </p> */}
                        </div>
                      </Card>
                    </Grid>
                    <Grid item xs={6} sx={{ marginBottom: "50px" }}>
                      <Typography
                        variant="h6"
                        sx={{ marginLeft: 1, marginBottom: 2 }}
                      >
                        Thông tin thanh toán
                      </Typography>
                      <Card
                        sx={{
                          borderRadius: " 16px",
                          zIndex: 0,
                          padding: "24px",
                          paddingBottom: "25px",
                        }}
                      >
                        <div className="text-sm">
                          <p className="font-semibold">
                            Phương thức thanh toán
                            <span className="ml-6 font-normal">
                              {" "}
                              {orderDetail && orderDetail.paymentMethod?.name}
                            </span>
                          </p>

                          <p className="font-semibold">
                            Giảm giá:
                            <span className="ml-6 font-normal">
                              {orderDetail && orderDetail?.promotion
                                ? (orderDetail.promotion?.price).toLocaleString()
                                : 0}
                            </span>
                          </p>
                          <p className="font-semibold">
                            Số tiền khách cần trả :
                            <span className="ml-6 font-normal">
                              {orderDetail &&
                              orderDetail.paymentMethod?.name ===
                                "Thanh toán tiền mặt khi nhận hàng"
                                ? orderDetail.totalPrice?.toLocaleString()
                                : 0}
                            </span>
                          </p>

                          {/* <p className="font-semibold">
                Tổng tiền:{" "}
                <span className="ml-6 font-normal">
                  {orderDetailList &&
                    orderDetailList[0]?.receiptId.totalPriceReceipt?.toLocaleString(
                      "it-IT",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                </span>
              </p> */}
                        </div>
                      </Card>
                    </Grid>
                  </Grid>
                  <Card>
                    <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                        <UserListHead
                          headLabel={TABLE_HEAD}
                          //   rowCount={orderDetailList?.result}
                        />
                        <TableBody>
                          {orderDetail?.orderDetail.map((row) => {
                            const { book, _id, quantity, price } = row;
                            return (
                              <TableRow
                                hover
                                key={_id}
                                tabIndex={-1}
                                _id="checkbox"
                              >
                                <TableCell padding="checkbox"></TableCell>
                                <TableCell align="flex">
                                  <div className="flex">
                                    <img
                                      className="w-16 h-16 mr-4"
                                      src={book.image}
                                      alt={book.image}
                                    />
                                    <div className="items-center flex">
                                      {book.name}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell align="flex">
                                  {price.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </TableCell>
                                <TableCell align="flex">{quantity}</TableCell>
                                <TableCell align="flex">
                                  {(price * quantity * 1).toLocaleString(
                                    "it-IT",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}{" "}
                          <TableRow>
                            <TableCell rowSpan={2} />
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>Tổng cộng </TableCell>
                            <TableCell>
                              {" "}
                              {orderDetail &&
                                orderDetail.totalPrice?.toLocaleString(
                                  "it-IT",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </div>
              );
            }
          })}
        </Container>
      </Container>
    </div>
  );
}
