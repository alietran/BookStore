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
import moment from "moment";
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
  getOrderList,
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
    href="/admin/orders"
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
    const { enqueueSnackbar } = useSnackbar();
  let { orderDetailList } = useSelector((state) => state.OrderDetailReducer);
  let { successUpdateOrder, orderList } = useSelector(
    (state) => state.OrderReducer
  );
  console.log("successUpdateOrder", successUpdateOrder);
  let { shipperList } = useSelector((state) => state.ShipperReducer);

  
  useEffect(() => {
    // get list user lần đầu
    if (!orderList) {
      dispatch(getOrderList());
    }
    // setLoading(false);
    return () => dispatch(resetOrder());
  }, [ successUpdateOrder]);

  
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
console.log("orderDetailList3534", orderDetailList);
  const [shipper, setShipper] = useState();
  console.log("shipper", shipper);
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  // const [orderDetailItem, setOrderDetailItem] = useState(orderDetailList);
  // useEffect(() => {
  //   if (orderDetailList) {
  //     let orderDetailListCopy = orderDetailList?.data?.filter(
  //       // params.orderId là app ghi sao thì điền vào
  //       (item) => item.order.id === params.orderId
  //     );
  //     setOrderDetailItem(orderDetailListCopy);
  //   }
  // }, [orderDetailList]);

  orderDetailList = orderDetailList?.data?.filter(
    // params.orderId là app ghi sao thì điền vào
    (item) => item?.order?.id === params.orderId
  );

  // console.log("orderDetailList343", orderDetailItem);
  // console.log("orderDetailList[0]", orderDetailList[0]);
  console.log("orderDetailList3454", orderDetailList);
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
    // console.log(first)
    if (
      orderDetailList[0]?.order?.paymentMethod?.name ===
      "Thanh toán bằng ví MoMo"
    ) {
     
       
    console.log("orderDetailList[0].order.promotion",orderDetailList[0].order.promotion);
      const { data } = await paymentAPI.refundMoMoPayment({
        // _id: idShowtime,
        amount: orderDetailList[0].order.totalPrice,
        transId: Number(orderDetailList[0].order.paymentMethod.transId),
      });
      console.log("123data", data);
      if (data?.resultCode == 0) {
        //  dispatch(updateOrder(id, { shipper, status: "Đang vận chuyển" }));
        dispatch(
          updateOrder(params.orderId, {
            status: "Đã hủy",
          })
        );
         enqueueSnackbar("Cập nhật trạng thái đơn hàng thành công!", {
           variant: "success",
         });
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
       enqueueSnackbar("Cập nhật trạng thái đơn hàng thành công!", {
         variant: "success",
       });
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
    enqueueSnackbar("Cập nhật trạng thái đơn hàng thành công!", { variant: "success" });
  };

  console.log("orderDetailList", orderDetailList);
  return (
    <>
      <Container
        sx={{
          paddingRight: "0px !important",
          paddingLeft: "0px !important",
          marginBottom: "50px",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          mt={3}
        >
          <Stack spacing={2} className="w-9/12">
            <div className="flex justify-between ">
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
                  </span>
                </span>
              </Typography>
            </div>

            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
            {orderDetailList &&
            (orderDetailList[0]?.order?.status === "Đã nhận" ||
              orderDetailList[0]?.order?.status === "Đã đánh giá") ? (
              <div>
                <p className=" text-sm mt-4">
                  Ngày đặt:{" "}
                  {moment(orderDetailList[0]?.order?.createdAt).format(
                    "h:mm a DD/MM/YYYY "
                  )}
                </p>
                <p className=" text-sm mt-4">
                  Ngày nhận:{" "}
                  {moment(orderDetailList[0]?.order.receiveDay).format(
                    "h:mm a DD/MM/YYYY"
                  )}
                </p>
              </div>
            ) : (
              orderDetailList &&
              (orderDetailList[0]?.order?.status !== "Đã nhận" ||
                orderDetailList[0]?.order?.status !== "Đã đánh giá") && (
                <div>
                  <p className=" text-sm mt-4">
                    Ngày đặt:{" "}
                    {moment(orderDetailList[0]?.order?.createdAt).format(
                      "h:mm a DD/MM/YYYY"
                    )}
                  </p>
                </div>
              )
            )}
          </Stack>
          {/* {orderDetailList && orderDetailList[0]?.order?.status} */}

          {orderDetailList &&
            orderDetailList[0]?.order?.status === "Đang xử lý" && (
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
                disabled={shipper ? false : true}
                  variant="contained"
                  sx={{ width: " 40%" }}
                  onClick={() => hanldeSubmit(shipper)}
                >
                  Giao hàng
                </Button>
              </Stack>
            )}

          {/* <div className="">
            {" "}
            <p className="text-right justify-end text-sm mt-4">
              Ngày đặt:{" "}
              {orderDetailList &&
                orderDetailList[0] &&
                moment(orderDetailList[0]?.order?.createdAt).format(
                  "DD/MM/YYYY"
                )}
            </p>
            {orderDetailList[0] &&
            (orderDetailList[0]?.order?.status === "Đã nhận" ||
              orderDetailList[0]?.order?.status === "Đã đánh giá") ? (
              <p className="text-right justify-end text-sm mt-4">
                Ngày nhận:{" "}
                {orderDetailList &&
                  moment(orderDetailList[0]?.order?.updatedAt).format(
                    "DD/MM/YYYY"
                  )}
              </p>
            ) : (
              ""
            )}
          </div> */}

          {/* {orderDetailList && orderDetailList[0]?.order.updatedAt ? (
            <p className="text-right justify-end text-sm mt-4">
              Ngày nhận:{" "}
              {moment(orderDetailList[0]?.order.updatedAt).format(
                "DD/MM/YYYY, h:mm a"
              )}
            </p>
          ) : (
            ""
          )} */}
        </Stack>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <OrderInfo orderDetailList={orderDetailList} />
        </Box>
      </Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="right"
        mt={3}
        position="fixed"
        bottom={0}
        right={50}
        sx={{
          backgroundColor: "white",
          left: "200px",
          width: "87%",
          height: "8%",
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
