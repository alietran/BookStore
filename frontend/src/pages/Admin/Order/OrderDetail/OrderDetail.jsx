import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
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
// import Info from "./Info";

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

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  orderDetailList = orderDetailList?.data.filter(
    (item) => item.order.id === params.orderId
  );

  
  useEffect(function () {
    dispatch(getAllDetailOrder());
    // return () => {
    //   dispatch({ type: "RESET_RECEIPT_DETAIL" });
    // };
  }, []);
  console.log("orderDetailList", orderDetailList);
  return (
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
                {" "}
                {orderDetailList &&
                orderDetailList[0]?.order.inventoryStatus ? (
                  <Chip
                    label="Đã nhập kho"
                    color="success"
                    sx={{ fontSize: 18, fontWeight: 600 }}
                  />
                ) : (
                  <Chip
                    label="Chưa nhập kho"
                    color="warning"
                    sx={{ fontSize: 18, fontWeight: 600 }}
                  />
                )}
              </span>
            </span>
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Stack>
      <Box sx={{ width: "100%", typography: "body1" }}>
        {/* <Info
          // receiptDetailList={successDetailReceipt?.data.receiptId.supplierId}
          // totalPriceReceiptDetail={
          //   successDetailReceipt?.data.totalPriceReceiptDetail
          // }
          receiptDetailList={receiptDetailList}
        /> */}
      </Box>
    </Container>
  );
}
