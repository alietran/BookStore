import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserListHead from "../../../../components/user/UserListHead";
import UserListToolbar from "../../../../components/user/UserListToolbar";
import OptionBook from "../../Book/OptionBook/OptionBook";
import { filter } from "lodash";
import { getBookList } from "../../../../redux/action/bookAction";

const TABLE_HEAD = [
  { id: "image", label: "Hình ảnh", alignRight: false },
  { id: "name", label: "Tên sản phẩm", alignRight: false },
  { id: "author", label: "Tác giả", alignRight: false },
  { id: "", label: " ", alignRight: false },
];

export default function BookList() {
  const { bookList } = useSelector((state) => state.BookReducer);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { supplierList } = useSelector((state) => state.SupplierReducer);
  const [chooseSupplier, setChooseSupplier] = useState(false);
  const [isReadyChooseSupplier, setIsReadyChooseSupplier] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedBookList, setSelectedBookList] = useState([]);
  console.log("bookList", bookList);
  const [supplier, setSupplier] = React.useState("");
  console.log("supplier", supplier);

  const handleChange = (event) => {
    setSupplier(event.target.value);
    setChooseSupplier(false);
  };
  useEffect(() => {
    dispatch(getBookList());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookList?.data.map((n) => n.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleClick = (event, _id, row) => {
    const allowed = ["name", "image", "_id"];
    const filteredRow = Object.keys(row)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: row[key],
          price: "",
          amount: "",
          totalPriceReceiptDetail: "",
          supplierId: "",
          bookId: "",
        };
      }, {});

    console.log("row", row);
    console.log("event.target.value", event.target.value);

    const selectedIndex = selected.indexOf(_id);

    console.log("selected", selected);
    console.log("selectedIndex", selectedIndex);
    let newSelected = [];
    let newSelectedRow = [];
    if (selectedIndex === -1) {
      // newSelected = newSelected.concat(selected, _id);
      newSelected = newSelected.concat(selected, _id);
      newSelectedRow = newSelectedRow.concat(selectedBookList, filteredRow);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedRow = newSelectedRow.concat(selectedBookList.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedRow = newSelectedRow.concat(selectedBookList.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedRow = newSelectedRow.concat(
        selectedBookList.slice(0, selectedIndex),
        selectedBookList.slice(selectedIndex + 1)
      );
    }
    setSelectedBookList(newSelectedRow);
    setSelected(newSelected);
  };
  useEffect(() => {
    dispatch({
      type: "SELECT_BOOK",
      payload: {
        bookSelected: selectedBookList,
      },
    });
  }, [selectedBookList]);

  const handleSubmit = () => {
    setChooseSupplier(true);
    setIsReadyChooseSupplier(false);

    dispatch({
      type: "SELECT_SUPPLIER",
      payload: {
        supplierSelected: supplier,
      },
    });
  };

  useEffect(() => {
    if (supplier) setIsReadyChooseSupplier(true);
    else setIsReadyChooseSupplier(false);
  }, [supplier]);

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const filteredUsers = applySortFilter(
    bookList?.data,
    getComparator(order, orderBy)
  );

  function applySortFilter(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis?.map((el) => el[0]);
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ margin: "10px" }}
      >
        <Grid item xs={3}>
          {" "}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Chọn NCC</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={supplier}
              label="Chọn NCC"
              onChange={handleChange}
            >
              {supplierList?.data.map((item, index) => (
                <MenuItem value={item._id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
              {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9} className="flex items-center">
          {" "}
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!isReadyChooseSupplier}
          >
            Gửi
          </Button>
        </Grid>
      </Grid>
      {chooseSupplier ? (
        <Card>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={bookList?.result}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  ?.filter((item) => item.issuer.id === supplier)
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                  .map((row) => {
                    const { _id, name, image, authorId } = row;
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
                        <TableCell>
                          <img
                            src={image}
                            alt=""
                            style={{ width: "80px", height: "100px" }}
                          />
                        </TableCell>
                        <TableCell align="left">{name}</TableCell>

                        <TableCell align="left">{authorId.name}</TableCell>

                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, _id, row)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={
              bookList?.data?.filter((item) => item.issuer.id === supplier)
                .length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      ) : (
        ""
      )}
    </Box>
  );
}
