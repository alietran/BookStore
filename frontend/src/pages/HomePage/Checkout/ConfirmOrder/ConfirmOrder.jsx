import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Item from "antd/lib/list/Item";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useHistory, useLocation, useParams } from "react-router-dom";
import paymentAPI from "../../../../api/paymentAPI";
import { PARTNERCODE, REQUESTID } from "../../../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  getDetailOrder,
} from "../../../../redux/action/orderAction";

import { Buffer } from "buffer";
import useStyles from "./style";

export default function ConfirmOrder() {
  const classes = useStyles();
  const history = useHistory();
  const [successMoMo, setSuccessMomMo] = useState(false);
  const search = useLocation().search;
  const { successCreateOrder, successDetailOrder } = useSelector(
    (state) => state.OrderReducer
  );
   
  const params = useParams();
  const message = new URLSearchParams(search).get("message");
  const orderId = new URLSearchParams(search).get("orderId");
  const amount = new URLSearchParams(search).get("amount");
  const resultCode = new URLSearchParams(search).get("resultCode");
  const extraData = new URLSearchParams(search).get("extraData");
  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state.PaymentReducer);
  const { discount, voucherId } = useSelector((state) => state.CartReducer);
  console.log("extraData", extraData);
  console.log("resultCode", resultCode);
  console.log("successCreateOrder", successCreateOrder);
  console.log("voucherId", voucherId);


  const decrypt_token = (data) => {
    let buffer = new Buffer(data, "base64");
    return JSON.parse(buffer.toString());
  };

  let orderInfo = decrypt_token(extraData);
  console.log("orderInfo", orderInfo);
  console.log("successMoMo", successMoMo);
  let { fullName, address, city, district, phoneNumber, ward } =
    orderInfo?.address;

  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  let totalPrice = cart?.reduce(
    (total, item) =>
      // console.log("item", item)
      (total = total + item.price * item.quantity),
    0
  );

  let orderItem = [];
  cart?.map((item, index) =>
    // return [...order1, { productId: item.id, quantity: item.quantity }];
    orderItem.push({ productId: item.id, quantity: item.quantity })
  );

  const createPaymentMoMo = JSON.parse(
    localStorage.getItem("createPaymentMoMo")
  );

  useEffect(() => {
    setSuccessMomMo(true);
  }, [successMoMo]);

  useEffect(() => {
    if (resultCode && createPaymentMoMo && successMoMo) {
      let item = JSON.parse(localStorage.getItem("order"));
      
      let order = {
        totalPrice: totalPrice - item.discount,
        items: item.items,
        address: item.address,
        paymentMethod: {
          name: item.paymentMethod.name,
          resultCode,
          message,
          orderId,
        },
        notes: "",
        promotion: item.promotion,
      };

      dispatch(createOrder(order));
    }
  }, [successMoMo]);

  useEffect(() => {
    if (successCreateOrder !== null) {
      localStorage.removeItem("createPaymentMoMo");
      localStorage.removeItem("cart");
      localStorage.removeItem("order");
    }
  }, [successCreateOrder]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <Container>
      <Box
        sx={{
          width: "80%",
          margin: "20px auto",
          height: "auto",
          boxShadow: " 0px 0px 39px -12px rgb(0, 0 ,0 , 0.75)",
          borderRadius: "35px !important",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            borderRadius: "35px !important",
          }}
        >
          <Item
            sx={{
              borderRadius: "35px !important",
            }}
          >
            <Grid
              sx={{
                borderRadius: "35px !important",
              }}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            >
              <Grid item xs={4}>
                <img
                  className="w-full h-full rounded-t-3xl"
                  src="../../../../img/bookstore.jpg"
                  alt=""
                />
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  borderRadius: "35px !important",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{ margin: "11px -20px !important" }}
                >
                  <Grid item xs={6}>
                    <Item>
                      <img
                        className="w-24 h-16"
                        src="../img/logo_white.png"
                        alt=""
                      />
                    </Item>
                  </Grid>
                  <Grid item xs={6}>
                    <Item className="flex justify-end">
                      <img
                        className="w-16 h-16"
                        src="../img/momo_logo.png"
                        alt=""
                      />
                    </Item>
                  </Grid>
                </Grid>

                {resultCode == 0 ? (
                  <div className={classes.checkoutTitle}>
                    THANH TOÁN THÀNH CÔNG
                  </div>
                ) : (
                  <div className={classes.checkoutTitle}>
                    THANH TOÁN THẤT BẠI
                  </div>
                )}

                <table className={classes.checkoutPopup}>
                  <tbody>
                    <tr>
                      <td>
                        <h3>Họ và tên:</h3>
                      </td>
                      <td>
                        <h3> {fullName}</h3>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h3>Số điện thoại:</h3>
                      </td>
                      <td>
                        <h3> {phoneNumber}</h3>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h3>Địa chỉ:</h3>
                      </td>
                      <td>
                        {" "}
                        {address}, {ward}, {district}, {city}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h3>Tổng tiền:</h3>
                      </td>
                      <td>
                        <h3> {(amount * 1).toLocaleString("vi-VI")} VNĐ</h3>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h3>Chi tiết sản phẩm:</h3>
                      </td>
                      <td>
                        {orderInfo?.cart.map((item, index) => (
                          <div>
                            <div className={classes.productInfo}>
                              {item.name} <b>x</b> {item.quantity}
                            </div>
                            <div>
                              ={" "}
                              {(item.quantity * item.price).toLocaleString(
                                "vi-VI"
                              )}
                              đ
                            </div>
                          </div>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h3>Mã giao dịch:</h3>
                      </td>
                      <td>
                        <h3>
                          <i> {orderId}</i>
                        </h3>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <Button
                  variant="contained"
                  className={classes.confirmButton}
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Xác nhận
                </Button>
                
              </Grid>
            </Grid>
          </Item>
        </Stack>
      </Box>
    </Container>
  );
}
