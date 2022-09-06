import {
  Box,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import UserListHead from "../../../../components/user/UserListHead";

export default function OrderInfo({ orderDetailList }) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  // const receiptId = receiptDetailList[0]?.receiptId;
  console.log("receiptDetailList", orderDetailList);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TABLE_HEAD = [
    { id: "product", label: "Sản phẩm", alignRight: false },
    { id: "price", label: "Giá", alignRight: false },
    { id: "amount", label: "Số lượng", alignRight: false },
    { id: "total", label: "Tổng tiền", alignRight: false },
  ];

  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4} sx={{ marginBottom: "50px" }}>
          <Typography variant="h6" sx={{ marginLeft: 1, marginBottom: 2 }}>
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
                  {orderDetailList &&
                    orderDetailList[0]?.order.address?.fullName}
                </span>
              </p>
              <p className="font-semibold">
                Số điện thoại :
                <span className="ml-6 font-normal">
                  {orderDetailList &&
                    orderDetailList[0]?.order.address?.phoneNumber}
                </span>
              </p>
              <p className="font-semibold">
                Địa chỉ
                <span className="ml-6 font-normal">
                  {orderDetailList &&
                    orderDetailList[0]?.order.address?.address +
                      ", " +
                      orderDetailList[0]?.order.address?.ward +
                      ", " +
                      orderDetailList[0]?.order.address?.district +
                      ", " +
                      orderDetailList[0]?.order.address?.city}
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
        <Grid item xs={4} sx={{ marginBottom: "50px" }}>
          <Typography variant="h6" sx={{ marginLeft: 1, marginBottom: 2 }}>
            Thông tin thanh toán
          </Typography>
          <Card
            sx={{
              borderRadius: " 16px",
              zIndex: 0,
              padding: "24px",
              paddingBottom: "58px",
            }}
          >
            <div className="text-sm">
              <p className="font-semibold">
                Phương thức thanh toán
                <span className="ml-6 font-normal">
                  {" "}
                  {orderDetailList &&
                    orderDetailList[0]?.order.paymentMethod?.name}
                </span>
              </p>

              <p className="font-semibold">
                Giảm giá:
                <span className="ml-6 font-normal">
                  {orderDetailList &&
                  orderDetailList[0]?.order?.promotion ?
                     (orderDetailList[0]?.order.promotion?.price).toLocaleString()
                    : 0}
                </span>
              </p>
              <p className="font-semibold">
                Số tiền khách cần trả :
                <span className="ml-6 font-normal">
                  {orderDetailList &&
                  orderDetailList[0]?.order.paymentMethod?.name ===
                    "Thanh toán tiền mặt khi nhận hàng"
                    ? orderDetailList[0]?.order.totalPrice?.toLocaleString()
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
        <Grid item xs={4} sx={{ marginBottom: "50px" }}>
          <Typography variant="h6" sx={{ marginLeft: 1, marginBottom: 2 }}>
            Thông tin người giao hàng
          </Typography>
          <Card
            sx={{
              borderRadius: " 16px",
              zIndex: 0,
              padding: "24px",
              paddingBottom: "45px",
            }}
          >
            <div className="text-sm">
              <p className="font-semibold">
                Họ tên:
                <span className="ml-6 font-normal">
                  {" "}
                  {orderDetailList && orderDetailList[0]?.order?.shipper?.name}
                </span>
              </p>
              <p className="font-semibold">
                Số điện thoại:
                <span className="ml-6 font-normal">
                  {orderDetailList &&
                    orderDetailList[0]?.order?.shipper?.phoneNumber}
                </span>
              </p>
              <p className="font-semibold">
                Biển số xe
                <span className="ml-6 font-normal">
                  {" "}
                  {orderDetailList &&
                    orderDetailList[0]?.order.shipper?.license_plates}
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
              rowCount={orderDetailList?.result}
            />
            <TableBody>
              {orderDetailList
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => {
                  const { book, _id, quantity, price } = row;
                  return (
                    <TableRow hover key={_id} tabIndex={-1} _id="checkbox">
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell align="flex">
                        <div className="flex">
                          <img
                            className="w-16 h-16 mr-4"
                            src={book.image}
                            alt={book.image}
                          />
                          <div className="items-center flex">{book.name}</div>
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
                        {(price * quantity * 1).toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}{" "}
              <TableRow>
                <TableCell rowSpan={1} />
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Tổng cộng </TableCell>
                <TableCell>
                  {" "}
                  {orderDetailList &&
                    orderDetailList[0]?.order.totalPrice?.toLocaleString(
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

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orderDetailList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}
