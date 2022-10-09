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
  Box,
  Tab,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { Link as RouterLink, useHistory } from "react-router-dom";
import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
// import UserListToolbar from "../../components/user";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAccount,
  getRolesList,
  resetUserList,
  resetUserListUpdate,
} from "../../../redux/action/adminAction";
// import UserListToolbar from "../../components/user/UserListToolbar";
// import UserMoreMenu from "../components/user/UserMoreMenu";
import UserListHead from "../../../components/user/UserListHead";
import UserListToolbar from "../../../components/user/UserListToolbar";
import Label from "../../../components/Label";
// import CreateUser from "./CreateUser";
import OptionUser from "./OptionUser/OptionUser";
import CreateUser from "./CreateUser/CreateUser";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Loading from "../../../components/Loading/Loading";

// import Label from "../../components/Label";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "fullName", label: "Họ tên", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phoneNumber", label: "Số điện thoại", alignRight: false },
  { id: "role", label: "Vai trò", alignRight: false },
  { id: "active", label: "Trạng thái", alignRight: false },
  { id: "", label: "Thao tác", alignRight: false },
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

function applySortFilter(array, comparator, queryName, queryRole) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (queryName) {
    return filter(array, (_user) => _user.fullName.indexOf(queryName) !== -1);
  }
  if (queryRole !== "all") {
    return filter(array, (_user) => _user.idRole.roleName === queryRole);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function UserManager() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  // const { enqueueSnackbar } = useSnackbar();
  const {
    accountList,
    successUpdateAdmin,
    successDeleteUser,
    userRoleList,
    loadingAccountList,
  } = useSelector((state) => state.AdminReducer);
  console.log("accountList", accountList);
  const { successUpdateUser } = useSelector((state) => state.UserReducer);
  const { successCreateAdmin, successUpdateUserCurrent } = useSelector(
    (state) => state.AuthReducer
  );
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    // get list user lần đầu
    if (!accountList) {
      dispatch(getAllAccount());
      dispatch(getRolesList());
    }
    return () => dispatch(resetUserList());
  }, []);

  useEffect(() => {
    if (!accountList) {
      dispatch(getAllAccount());
    }
    return () => dispatch(resetUserListUpdate());
  }, []);

  useEffect(() => {
    if (
      successCreateAdmin ||
      successUpdateAdmin ||
      successDeleteUser ||
      successUpdateUser ||
      successUpdateUserCurrent
    ) {
      dispatch(getAllAccount());
    }
  }, [
    successCreateAdmin,
    successUpdateAdmin,
    successDeleteUser,
    successUpdateUserCurrent,
    successUpdateUser,
  ]);

  useEffect(() => {
    if (successCreateAdmin) {
      enqueueSnackbar("Tạo thành công", { variant: "success" });
      return;
    }
    if (successUpdateAdmin || successUpdateUser) {
      enqueueSnackbar("Chỉnh sửa thành công", { variant: "success" });
      return;
    }
    // if (successDeleteUser) {
    //   enqueueSnackbar(errorDelete, { variant: "error" });
    // }
    // errorDelete;
  }, [successCreateAdmin, successUpdateAdmin, successUpdateUser]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = accountList?.data.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
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

  const handleFilterByRole = (event) => {
    setFilterRole(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - accountList?.result) : 0;

  const filteredUsers = applySortFilter(
    accountList?.data,
    getComparator(order, orderBy),
    filterName,
    filterRole
  );

  const isUserNotFound = accountList?.result === 0;

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
      Người dùng{" "}
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
        mt={3}
      >
        <Stack spacing={2}>
          <Typography variant="h4" gutterBottom>
            Danh sách người dùng
          </Typography>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
        <CreateUser />
      </Stack>
      <Card>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              sx={{
                backgroundColor: "#f4f6f8",
                color: "#637381",
                padding: "0 10px",
              }}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab sx={{ flexDirection: "row" }} label="Tất cả" value="1" />
              <Tab
                sx={{ flexDirection: "row" }}
                label="Acitve"
                value="2"
              />{" "}
              <Tab sx={{ flexDirection: "row" }} label="Banned" value="3" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{ "&.MuiTabPanel-root": { paddingTop: "0 !important" } }}
          >
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              cusTomSearch={true}
              onFilterName={handleFilterByName}
              searchLabelName={"Tìm người dùng"}
              filterLabelName={"Quyền"}
              filterRole={filterRole}
              onFilterRole={handleFilterByRole}
              filterList={userRoleList?.data}
            />
            {loadingAccountList ? (
              <Loading />
            ) : (
              <>
                {" "}
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={accountList?.result}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
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
                            fullName,
                            idRole: { roleName },
                            avatar,
                            email,
                            phoneNumber,
                            active,
                          } = row;
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
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, _id)}
                                />
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Avatar alt={fullName} src={avatar} />
                                  <Typography variant="subtitle2" noWrap>
                                    {fullName}
                                  </Typography>
                                </Stack>
                              </TableCell>
                              <TableCell align="left">{email}</TableCell>
                              <TableCell align="left">{phoneNumber}</TableCell>
                              <TableCell align="left capitalize">
                                {roleName}
                              </TableCell>
                              <TableCell align="left">
                                <Label
                                  variant="ghost"
                                  color={(!active && "error") || "success"}
                                >
                                  {changeActive(active)}
                                </Label>
                              </TableCell>

                              <TableCell align="right">
                                <OptionUser id={_id} User={row} />
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
                  count={accountList?.result}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </TabPanel>
          <TabPanel
            value="2"
            sx={{ "&.MuiTabPanel-root": { paddingTop: "0 !important" } }}
          >
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              cusTomSearch={true}
              onFilterName={handleFilterByName}
              searchLabelName={"Tìm người dùng"}
              filterLabelName={"Quyền"}
              filterRole={filterRole}
              onFilterRole={handleFilterByRole}
              filterList={userRoleList?.data}
            />

            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={accountList?.result}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .filter((row) => row.active)
                    .map((row) => {
                      const {
                        _id,
                        fullName,
                        idRole: { roleName },
                        avatar,
                        email,
                        phoneNumber,
                        active,
                      } = row;
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
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, _id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={fullName} src={avatar} />
                              <Typography variant="subtitle2" noWrap>
                                {fullName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{phoneNumber}</TableCell>
                          <TableCell align="left capitalize">
                            {roleName}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(!active && "error") || "success"}
                            >
                              {changeActive(active)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <OptionUser id={_id} User={row} />
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
                {/* {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                   
                  </TableCell>
                </TableRow>
              </TableBody>
            )} */}
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={accountList?.result}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TabPanel>

          <TabPanel
            value="3"
            sx={{ "&.MuiTabPanel-root": { paddingTop: "0 !important" } }}
          >
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              cusTomSearch={true}
              onFilterName={handleFilterByName}
              searchLabelName={"Tìm người dùng"}
              filterLabelName={"Quyền"}
              filterRole={filterRole}
              onFilterRole={handleFilterByRole}
              filterList={userRoleList?.data}
            />

            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={accountList?.result}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .filter((row) => !row.active)
                    .map((row) => {
                      const {
                        _id,
                        fullName,
                        idRole: { roleName },
                        avatar,
                        email,
                        phoneNumber,
                        active,
                      } = row;
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
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, _id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={fullName} src={avatar} />
                              <Typography variant="subtitle2" noWrap>
                                {fullName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{phoneNumber}</TableCell>
                          <TableCell align="left capitalize">
                            {roleName}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(!active && "error") || "success"}
                            >
                              {changeActive(active)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <OptionUser id={_id} User={row} />
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
                {/* {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                   
                  </TableCell>
                </TableRow>
              </TableBody>
            )} */}
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={accountList?.result}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TabPanel>
        </TabContext>
      </Card>
    </Container>
  );
}
