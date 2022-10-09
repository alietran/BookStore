import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Breadcrumbs,
  Link,
  Chip,
} from "@mui/material";
import moment from "moment";
import { updateBook } from "../../../redux/action/bookAction";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { filter } from "lodash";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  getAllReceipt,
  resetReceiptList,
  updateReceipt,
} from "../../../redux/action/receiptAction";
import UserListToolbar from "../../../components/user/UserListToolbar";
import UserListHead from "../../../components/user/UserListHead";
import OptionAuthor from "../AuthorManager/OptionAuthor/OptionAuthor";
import OptionReceipt from "./OptionReceipt/OptionReceipt";
import { getAllDetailReceipt } from "../../../redux/action/receiptDetailAction";
import Loading from "../../../components/Loading/Loading";

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
    Phiếu nhập hàng{" "}
  </Link>,
  <Typography key="3" color="inherit">
    Danh sách
  </Typography>,
];

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "Mã phiếu nhập", alignRight: false },
  { id: "supplier", label: "Nhà cung cấp", alignRight: false },
  { id: "total", label: "Tổng tiền", alignRight: false },
  { id: "userCreated", label: "Người tạo đơn", alignRight: false },
  { id: "createdAt", label: "Ngày tạo đơn", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "", label: "Thao tác", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function changeActive(active) {
  if (active) {
    return "Active";
  } else {
    return "Banned";
  }
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function ReceiptManager() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // chỉ hiện thông báo alert nhập kho 1 lần cho dù nhập 2 sp
  const [alertSuccessUpdateReceipt, setAlertSuccessUpdateReceipt] =
    useState(false);
  const {
    successCreateReceipt,
    receiptList,
    successUpdateReceipt,
    loadingReceiptList,
  } = useSelector((state) => state.ReceiptReducer);
  console.log("receiptList", receiptList);
  console.log("successCreateReceipt", successCreateReceipt);
  console.log("successUpdateReceipt", successUpdateReceipt);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!receiptList?.data) {
      dispatch(getAllReceipt());
    }
    return () => dispatch(resetReceiptList());
  }, [receiptList]);

  useEffect(() => {
    if (successCreateReceipt || successUpdateReceipt) {
      dispatch(getAllReceipt());
    }
  }, [successCreateReceipt, successUpdateReceipt]);

  useEffect(() => {
    if (successCreateReceipt) {
      enqueueSnackbar("Tạo phiếu nhập thành công!", { variant: "success" });
      return;
    }
    if (successUpdateReceipt && alertSuccessUpdateReceipt) {
      setAlertSuccessUpdateReceipt(false);
      enqueueSnackbar("Nhập kho thành công!", { variant: "success" });
      return;
    }
  }, [successCreateReceipt, successUpdateReceipt]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = receiptList?.data?.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - receiptList?.result) : 0;

  const filteredUsers = applySortFilter(
    receiptList?.data,
    getComparator(order, orderBy),
    filterName
  );

  const onClickInventory = async (id, receiptdetail) => {
    await receiptdetail?.map((item, index) => {
      let data = {
        quantity: item.amount,
        inventoryStatus: true,
        bookId: item.bookId.id,
      };
      console.log("dat123123");
      setAlertSuccessUpdateReceipt(true);
      dispatch(updateReceipt(id, data));
    });
  };
  return (
    <Container
      sx={{ paddingRight: "0px !important", paddingLeft: "0px !important" }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        mt={3}
      >
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Danh sách phiếu nhập hàng
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          startIcon={<Icon icon={plusFill} />}
          onClick={() => history.push("/admin/receipts/create")}
          sx={{
            "&:hover": { color: "#fff" },
            textTransform: "none !important",
          }}
        >
          Thêm phiếu nhập
        </Button>
      </Stack>
      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          searchName={"Tìm tác giả"}
        />
        {loadingReceiptList ? (
          <Loading />
        ) : (
          <>
            {" "}
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={receiptList?.result}
                  // numSelected={selected.length}
                  // onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredUsers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      const {
                        _id,
                        totalPriceReceipt,
                        adminId: { fullName },
                        supplierId: { name },
                        inventoryStatus,
                        createdAt,
                        receiptdetail,
                      } = row;
                      console.log("receiptdetail", receiptdetail);

                      const isItemSelected = selected.indexOf(_id) !== -1;
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          _id="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox"></TableCell>

                          <TableCell align="left">{_id}</TableCell>
                          <TableCell align="center">{name}</TableCell>
                          <TableCell align="center">
                            {totalPriceReceipt.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}{" "}
                          </TableCell>
                          <TableCell align="center">{fullName}</TableCell>
                          <TableCell align="center">
                            {moment(createdAt).format("YYYY-MM-DD")}
                          </TableCell>

                          <TableCell align="center">
                            {inventoryStatus ? (
                              <Chip label="Đã nhập kho" color="success" />
                            ) : (
                              <Chip label="Chưa nhập kho" color="warning" />
                            )}
                          </TableCell>

                          <TableCell align="center">
                            <OptionReceipt
                              id={_id}
                              receipt={receiptdetail}
                              inventoryStatus={inventoryStatus}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {!inventoryStatus ? (
                              <Button
                                variant="contained"
                                sx={{
                                  margin: "10px",
                                  textTransform: "none !important",
                                }}
                                onClick={(e) =>
                                  onClickInventory(_id, receiptdetail)
                                }
                              >
                                Nhập kho
                              </Button>
                            ) : (
                              ""
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={receiptList?.result}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Card>
    </Container>
  );
}
