import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  Link,
  Link as RouterLink,
  useHistory,
  useParams,
} from "react-router-dom";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import {
  getAllDetailReceipt,
  getDetailReceipt,
} from "../../../../redux/action/receiptDetailAction";
import { getAllDetailOrder } from "../../../../redux/action/orderDetailAction";
import OrderInfo from "./OrderInfo";
import { getShipperList } from "../../../../redux/action/shipperAction";
import { useInsertionEffect } from "react";

import Label from "../../../../components/Label";
// import Info from "./Info";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import {
  resetCreateOrder,
  resetOrder,
  updateOrder,
} from "../../../../redux/action/orderAction";
import paymentAPI from "../../../../api/paymentAPI";

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
    href="/admin/receipts/list"
    color="text.primary"
    sx={{ "&:hover": { color: "#212B36" } }}
  >
    Danh sách đơn hàng{" "}
  </Link>,
  <Typography key="3" color="inherit">
    Chi tiết đơn hàng
  </Typography>,
];

export default function OrderDetail() {
  let { orderDetailList } = useSelector((state) => state.OrderDetailReducer);
  let { successUpdateOrder } = useSelector((state) => state.OrderReducer);
  let { shipperList } = useSelector((state) => state.ShipperReducer);

  const { enqueueSnackbar } = useSnackbar();
  console.log("shipperList", shipperList);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (!shipperList) {
      dispatch(getShipperList());
    }
  }, [shipperList]);
  useEffect(() => {
    if (!orderDetailList) {
      dispatch(getAllDetailOrder());
    }
  }, [orderDetailList]);

  const [shipper, setShipper] = useState();
  console.log("shipper", shipper);
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("shipper13", shipper);
  orderDetailList = orderDetailList?.data.filter(
    (item) => item.order.id === params.orderId
  );
  const handleChangeShipper = (event) => {
    setShipper(event.target.value);
    // getAllDetailOrder()
  };

  useEffect(() => {
    if (successUpdateOrder) {
      // enqueueSnackbar("Đơn hàng đang được vận chuyển!", { variant: "success" });
      dispatch(getAllDetailOrder());
    }
  }, [successUpdateOrder]);

  // useEffect(() => {
  //   if (successUpdateOrder) {
  //     setTimeout(() => {
  //       enqueueSnackbar("Đơn hàng đang được vận chuyển!", {
  //         variant: "success",
  //       });
  //     }, 100);
  //     return;
  //   }
  // }, [successUpdateOrder]);

  const handleCancel = async () => {
    if (
      orderDetailList[0]?.order?.paymentMethod?.name ===
      "Thanh toán bằng ví MoMo"
    ) {
      console.log("orderDetailList[0]", orderDetailList[0]);

      const { data } = await paymentAPI.refundMoMoPayment({
        // _id: idShowtime,
        amount: orderDetailList[0].order.totalPrice,
        transId: Number(orderDetailList[0].order.paymentMethod.transId),
      });
      console.log("123data", data);
      if (data?.resultCode == 0) {
        dispatch(
          updateOrder(params.orderId, {
            status: "Đã hủy",
          })
        );
        setOpen(false);
      } else {
        console.log("Error:", data?.messages);
      }
    } else {
      dispatch(
        updateOrder(params.orderId, {
          status: "Đã hủy",
        })
      );
      setOpen(false);
    }

    // dispatch(
    //   updateOrder(params.orderId, {
    //     status: "Đã hủy",
    //   })
    // );
    // setOpen(false);
  };

  const hanldeSubmit = (shipper) => {
    console.log("shipper id", shipper);
    console.log("342");
    const id = params.orderId;

    dispatch(updateOrder(id, { shipper, status: "Đang vận chuyển" }));
  };

  console.log("orderDetailList", orderDetailList);
  return (
    <>
      <Container
        sx={{ paddingRight: "0px !important", paddingLeft: "0px !important" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          mt={7.5}
        >
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
                  #{orderDetailList && orderDetailList[0]?.order._id} -{" "}
                  <span>
                    <Label
                      variant="ghost"
                      color={
                        orderDetailList &&
                        orderDetailList[0]?.order.status === "Đang xử lý"
                          ? "warning"
                          : orderDetailList &&
                            orderDetailList[0]?.order.status ===
                              "Đang vận chuyển"
                          ? "info"
                          : orderDetailList &&
                            orderDetailList[0]?.order.status === "Đã giao hàng"
                          ? "success"
                          : "error"
                      }
                    >
                      {orderDetailList && orderDetailList[0]?.order?.status}
                    </Label>
                    {/* <Chip
                      label={
                        orderDetailList && orderDetailList[0]?.order.status
                      }
                      color={
                        orderDetailList &&
                        orderDetailList[0]?.order.status === "Đang xử lý"
                          ? "warning"
                          : orderDetailList &&
                            orderDetailList[0]?.order.status ===
                              "Đang vận chuyển"
                          ? "info"
                          : orderDetailList &&
                            orderDetailList[0]?.order.status === "Đã giao hàng"
                          ? "success"
                          : "error"
                      }
                      sx={{ fontSize: 18, fontWeight: 600 }}
                    /> */}
                    {/* )} */}
                  </span>
                </span>
              </Typography>
            </div>

            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
          {/* {orderDetailList && orderDetailList[0]?.order?.status} */}
          {orderDetailList &&
          orderDetailList[0]?.order?.status === "Đang xử lý" ? (
            <Stack
              spacing={2}
              direction="row"
              alignItems="right"
              sx={{ width: "33%" }}
            >
              <FormControl fullWidth>
                <InputLabel id="gender">Shipper</InputLabel>
                <Select
                  labelId="shipper"
                  id="shipper"
                  value={shipper}
                  name="shipper"
                  label="Shipper"
                  onChange={handleChangeShipper}
                  // {...getFieldProps("gender")}
                >
                  {shipperList?.data.map((shipper, index) => {
                    console.log("shipper", shipper);
                    return (
                      <MenuItem value={shipper.id}>{shipper.name}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                sx={{ width: " 34%" }}
                onClick={() => hanldeSubmit(shipper)}
              >
                Giao hàng
              </Button>
              {/* <Typography
            variant="h5"
            gutterBottom
            className="font-normal text-gray-900 text-right "
            sx={{ fontWeight: "400 !important" }}
          >
            Shipper:{" "}
          </Typography> */}
            </Stack>
          ) : (
            ""
          )}
        </Stack>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <OrderInfo
            // receiptDetailList={successDetailReceipt?.data.receiptId.supplierId}
            // totalPriceReceiptDetail={
            //   successDetailReceipt?.data.totalPriceReceiptDetail
            // }
            orderDetailList={orderDetailList}
          />
        </Box>
      </Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="right"
        mt={7.5}
        position="fixed"
        bottom={0}
        right={50}
        sx={{
          backgroundColor: "white",
          left: "200px",
          width: "87%",
          height: "14%",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            history.push("/admin/orders");
          }}
        >
          Quay lại
        </Button>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="error"
          sx={{ marginRight: "63px", marginLeft: "10px" }}
          disabled={
            orderDetailList &&
            orderDetailList[0]?.order?.status !== "Đang xử lý"
              ? true
              : false
          }
        >
          Hủy đơn
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Hủy đơn"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn chắc chắn muốn hủy đơn hàng này
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Không
            </Button>
            <Button onClick={handleCancel}>Đồng ý</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
}
