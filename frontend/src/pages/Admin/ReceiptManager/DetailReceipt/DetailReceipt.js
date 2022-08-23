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
import Info from "./Info";

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
    Danh sách phiếu nhập hàng{" "}
  </Link>,
  <Typography key="3" color="inherit">
    Chi tiết phiếu nhập hàng
  </Typography>,
];

export default function DetailReceipt() {
  let { receiptDetailList } = useSelector(
    (state) => state.ReceiptDetailReducer
  );

  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();

  receiptDetailList = receiptDetailList?.data.filter(
    (item) => item.receiptId.id === params.receiptId
  );

  useEffect(function () {
    dispatch(getAllDetailReceipt());
    // return () => {
    //   dispatch({ type: "RESET_RECEIPT_DETAIL" });
    // };
  }, []);
  console.log("receiptDetailList", receiptDetailList);
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
            Chi tiết phiếu nhập hàng{" "}
            <span className="text-lg">
              {" "}
              #{receiptDetailList && receiptDetailList[0]?.receiptId._id} -{" "}
              <span>
                {" "}
                {receiptDetailList &&
                receiptDetailList[0]?.receiptId.inventoryStatus ? (
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
        <Info
          // receiptDetailList={successDetailReceipt?.data.receiptId.supplierId}
          // totalPriceReceiptDetail={
          //   successDetailReceipt?.data.totalPriceReceiptDetail
          // }
          receiptDetailList={receiptDetailList}
        />
      </Box>
    </Container>
  );
}
