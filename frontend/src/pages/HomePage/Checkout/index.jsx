import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Box,
  Tab,
  Stack,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import Address from "./Address";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import { NavLink } from "react-router-dom";
import useStyles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentList } from "../../../redux/action/paymentAction";
import { createOrder } from "../../../redux/action/orderAction";

export default function Checkout() {
  const classes = useStyles();
  const { address, addressItem } = useSelector((state) => state.OrderReducer);
  console.log("addressItem", addressItem);
  const [value, setValue] = React.useState("1");
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  let totalPrice = cart?.reduce(
    (total, item) =>
      // console.log("item", item)
      (total = total + item.price * item.quantity),
    0
  );
  
  let orderItem = [];
   cart?.map((item, index) => (
     // return [...order1, { productId: item.id, quantity: item.quantity }];
     orderItem.push({ productId: item.id, quantity: item.quantity })
   ));
   console.log("orderItem24", orderItem);
  // useEffect(() => {

   
  // }, [cart]);


  const handleSubmit = () => {
    let order = {
      totalPrice,
      items: orderItem,
      address :  address ? address : addressItem[0],
      paymentMethod: "63079da2cd7d0340e8be170c",
      notes: "",
    };
    console.log("order", order);
    dispatch(createOrder(order));

  };

  return (
    <Box className="m-5">
      <Container maxWidth="lg">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={8}>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                backgroundColor: "#fff",
                borderRadius: "10px",
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      sx={{
                        flexDirection: "row",
                        textTransform: "none !important",
                      }}
                      label="Nhận hàng tại nhà"
                      value="1"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Address />
                </TabPanel>
              </TabContext>
            </Box>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                backgroundColor: "#fff",
                borderRadius: "10px",
                marginTop: "20px",
                padding: "10px",
              }}
            >
              <h3>Ghi chú cho đơn hàng</h3>
              <TextField
                fullWidth
                notched="true"
                autoFocus="false"
                size="small"
                type="text"
                label="Nhập thông tin ghi chú cho nhà bán hàng"
                className="header__navigationBar-text "
                sx={{
                  backgroundColor: "transparent",
                  outline: "none !important",
                  border: "none !important",
                  "&:hover": {
                    border: "none",
                    outline: "none",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                backgroundColor: "#fff",
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <PaymentMethod />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                backgroundColor: "#fff",
                borderRadius: "10px",
              }}
            >
              <div class="cart__wrapper-content--right">
                <div
                  class="cart__wrapper-content--info"
                  style={{ padding: "10px 0" }}
                >
                  <Typography
                    component="div"
                    variant="subtitle1"
                    sx={{ marginBottom: "10px", padding: "0 20px 0 20px" }}
                  >
                    Thông tin đơn hàng
                  </Typography>
                  {cart.map((item, index) => (
                    <div class="info-voucher flex px-4">
                      <div class={classes["info-text"]}>
                        <img src={item.image} alt="" />
                      </div>
                      <div class={classes["info-product"]}>
                        <p>{item.name}</p>
                        <p>Số lượng: {item.quantity}</p>
                        <p className="text-red-500">
                          {item.price.toLocaleString()} ₫
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Box>
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <div className={classes["cart__wrapper-content--payment"]}>
                <div className={classes["cart__wrapper-content--info"]}>
                  <h4 className="text-xl">Thanh toán</h4>
                  <div className={classes["info-payment"]}>
                    <table className={classes["payment-tab"]}>
                      <tbody>
                        <tr>
                          <td>Tạm tính </td>
                          <td>
                            <span> {totalPrice.toLocaleString()} ₫</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Phí vận chuyển </td>
                          <td>
                            <span>Miễn phí</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Tổng tiền </td>
                          <td>
                            <span
                              style={{
                                color: "red",
                                fontSize: "18px",
                                fontWeight: "500",
                              }}
                            >
                              {totalPrice.toLocaleString()} ₫
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="items-end">(Đã bao gồm thuế)</div>
                  </div>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                      marginTop: "15px",
                      color: "#fff",
                      width: "100%",
                      border: "none",
                      padding: "10px",
                      fontWeight: 500,
                      borderRadius: "5px",
                      // backgroundColor: "#1435c3",
                    }}
                  >
                    THANH TOÁN
                  </Button>
                </div>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
