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

export default function Info({ receiptDetailList }) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  // const receiptId = receiptDetailList[0]?.receiptId;
  console.log("receiptDetailList", receiptDetailList);
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
        <Grid item xs={6} sx={{ marginBottom: "50px" }}>
          <Typography
            variant="h6"
            sx={{ marginLeft: 1, marginBottom: 2 }}
          >
            Thông tin nhà cung cấp
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
                Tên nhà cung cấp:
                <span className="ml-6 font-normal">
                  {" "}
                  {receiptDetailList &&
                    receiptDetailList[0]?.receiptId.supplierId?.name}
                </span>
              </p>
              <p className="font-semibold">
                Số điện thoại nhà cung cấp:{" "}
                <span className="ml-6 font-normal">
                  {receiptDetailList &&
                    receiptDetailList[0]?.receiptId.supplierId?.phoneNumber}
                </span>
              </p>
              <p className="font-semibold">
                Địa chỉ nhà cung cấp:{" "}
                <span className="ml-6 font-normal">
                  {receiptDetailList &&
                    receiptDetailList[0]?.receiptId.supplierId?.address}
                </span>
              </p>
              {/* <p className="font-semibold">
                Tổng tiền:{" "}
                <span className="ml-6 font-normal">
                  {receiptDetailList &&
                    receiptDetailList[0]?.receiptId.totalPriceReceipt?.toLocaleString(
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
              rowCount={receiptDetailList?.result}
            />
            <TableBody>
              {receiptDetailList
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row) => {
                  const {
                    _id,
                    bookId: { image, name },
                    price,
                    amount,
                  } = row;
                  return (
                    <TableRow hover key={_id} tabIndex={-1} _id="checkbox">
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell align="flex">
                        <div className="flex">
                          <img
                            className="w-16 h-16 mr-4"
                            src={image}
                            alt={name}
                          />
                          <div className="items-center flex">{name}</div>
                        </div>
                      </TableCell>
                      <TableCell align="flex">
                        {price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                      <TableCell align="flex">{amount}</TableCell>
                      <TableCell align="flex">
                        {(price * amount * 1).toLocaleString("it-IT", {
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
                  {receiptDetailList &&
                    receiptDetailList[0]?.receiptId.totalPriceReceipt?.toLocaleString(
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
          count={receiptDetailList?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}
