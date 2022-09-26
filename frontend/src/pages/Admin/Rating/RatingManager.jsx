import React, { useEffect } from "react";
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
  Rating,
  Box,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useSnackbar } from "notistack";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink } from "react-router-dom";
import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
// import UserListToolbar from "../../components/user";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, resetUserList } from "../../../redux/action/adminAction";
// import UserListToolbar from "../../components/user/UserListToolbar";
// import UserMoreMenu from "../components/user/UserMoreMenu";
import UserListHead from "../../../components/user/UserListHead";
import UserListToolbar from "../../../components/user/UserListToolbar";
import Label from "../../../components/Label";
import moment from "moment";
import {
  getShipperList,
  resetShipperList,
} from "../../../redux/action/shipperAction";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import {
  getAuthorList,
  resetAuthorList,
} from "../../../redux/action/authorAction";
import {
  getOrderList,
  resetOrder,
  updateOrder,
} from "../../../redux/action/orderAction";
import OptionRating from "./OptionRating/OptionRating";
import { getAllRating, updateRating } from "../../../redux/action/ratingAction";
import DoneIcon from "@mui/icons-material/Done";
import { useStyles } from "./style";
import CustomDialog from "../../../components/CustomDialog/CustomDialog";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: "Tên sản phẩm", alignRight: false },
  { id: "name", label: "Tên khách hàng", alignRight: false },

  { id: "date", label: "Nôi dung", alignRight: false },

  { id: "total", label: "Số sao", alignRight: false },
  { id: "status", label: "Ngày đánh giá", alignRight: false },
  { id: "status", label: "Trạng thái", alignRight: false },
  { id: "option", label: "Thao tác", alignRight: false },

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
    return filter(array, (_user) => _user._id.indexOf(query) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function RatingManager() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const { ratinglist, updateRatingSuccess } = useSelector(
    (state) => state.RatingReducer
  );

  console.log("updateRatingSuccess", updateRatingSuccess);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    // authorList,
    successCreateAuthor,
    successUpdateAuthor,
    successDeleteAuthor,
  } = useSelector((state) => state.AuthorReducer);
  const { orderList } = useSelector((state) => state.OrderReducer);
  console.log("orderList", orderList);
  // const { successUpdateUserCurrent } = useSelector(
  //   (state) => state.AuthReducer
  // );
  useEffect(() => {
    if (!ratinglist) dispatch(getAllRating());
  }, [ratinglist]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const classes = useStyles();
  useEffect(() => {
    if (updateRatingSuccess) {
      dispatch(getAllRating());
    }
  }, [updateRatingSuccess]);

  useEffect(() => {
    if (successCreateAuthor) {
      enqueueSnackbar("Thêm tác giả thành công!", { variant: "success" });
      return;
    }
  }, [successCreateAuthor]);

  useEffect(() => {
    if (successUpdateAuthor) {
      enqueueSnackbar("Duyệt đánh giá thành công!", { variant: "success" });
      return;
    }
  }, [successUpdateAuthor]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleAccept = () => {};
  const handleClick = (event, name) => {
    setOpenConfirm(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickHideRating = (_id) => {
    console.log("id", _id);
    dispatch(
      updateRating(_id, {
        hidden: true,
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };
  const handleCloseConfirm = (id) => {
    console.log("id", id);
    dispatch(
      updateRating(id, {
        active: true,
      })
    );
    setOpenConfirm(false);

    // onClickDelete(id);
  };
  const handleCancel = () => {
    setOpenConfirm(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ratinglist?.result) : 0;

  const filteredUsers = applySortFilter(
    ratinglist?.data,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = ratinglist?.result === 0;

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
      Đánh giá
    </Link>,
    <Typography key="3" color="inherit">
      Danh sách
    </Typography>,
  ];
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
          <Typography variant="h4" gutterBottom>
            Đánh giá
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        {/* <CreateAuthor /> */}
      </Stack>
      <Card>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          searchName={"Tìm tác giả"}
        />

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={ratinglist?.result}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              // onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    order,
                    active,
                    status,
                    content,
                    book,
                    createdAt,
                    rating,
                    imageRating,
                    hidden,
                  } = row;
                  console.log("hidden", "dat_" + hidden);
                  console.log("row", row);
                  // const isItemSelected =
                  //   selected.indexOf(address.fullName) !== -1;

                  return (
                    <TableRow
                      disabled={true}
                      hover
                      key={_id}
                      tabIndex={-1}
                      _id="checkbox"
                      className={
                        hidden
                          ? classes.backgroundCellShow
                          : classes.backgroundCellHidden
                      }
                      // className={hidden ? classes.backgroundCellShow : ""}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell align="left">{book?.name}</TableCell>
                      <TableCell align="left">{order?.user.fullName}</TableCell>
                      <TableCell align="left">{content}</TableCell>
                      <TableCell align="left">
                        <Rating readOnly value={rating} />
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        {moment(createdAt).format("DD/MM/YYYY, h:mm a")}
                      </TableCell>
                      <TableCell align="left">
                        {active ? (
                          <Label variant="ghost" color={"success"}>
                            Đã duyệt
                          </Label>
                        ) : (
                          <Label variant="ghost" color={"error"}>
                            Chưa duyệt
                          </Label>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        <Box className="flex">
                          <Tooltip
                            // TransitionComponent={Zoom}
                            title="Ẩn / Hiện"
                            arrow
                          >
                            <IconButton
                              // onClick={onClickDetail}
                              sx={{
                                "&:hover": {
                                  backgroundColor: "rgba(255, 72, 66, 0.08)",
                                  padding: "8px",
                                  borderRadius: "50%",
                                },
                              }}
                            >
                              {!hidden ? (
                                <VisibilityIcon
                                  onClick={() => {
                                    handleClickHideRating(_id);
                                  }}
                                  className="text-blue-500"
                                  sx={{
                                    fontSize: 32,
                                  }}
                                />
                              ) : (
                                <VisibilityOff
                                  className="text-blue-500"
                                  sx={{
                                    fontSize: 32,
                                  }}
                                />
                              )}
                            </IconButton>
                          </Tooltip>
                          {active ? (
                            ""
                          ) : (
                            <Tooltip
                              // TransitionComponent={Zoom}
                              title="Duyệt"
                              arrow
                            >
                              <IconButton
                                // onClick={onClickDetail}
                                sx={{
                                  "&:hover": {
                                    backgroundColor: "rgba(255, 72, 66, 0.08)",
                                    padding: "8px",
                                    borderRadius: "50%",
                                  },
                                }}
                              >
                                <DoneIcon
                                  onClick={() => {
                                    handleClick(_id);
                                  }}
                                  className="text-blue-500"
                                  sx={{
                                    fontSize: 32,
                                    color: "green",
                                  }}
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="left"></TableCell>
                      <CustomDialog
                        open={openConfirm}
                        handleClose={handleCancel}
                        dialogSize="xs"
                        overlayStyle={{ backgroundColor: "transparent" }}
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Duyệt đánh giá"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Bạn chắc chắn duyệt đánh giá này.
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCancel}>Hủy</Button>
                          <Button
                            onClick={() => {
                              handleCloseConfirm(_id);
                            }}
                            autoFocus
                            sx={{
                              textTransform: "none !important",
                            }}
                          >
                            Đồng ý
                          </Button>
                        </DialogActions>
                      </CustomDialog>
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
          count={ratinglist?.result}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
