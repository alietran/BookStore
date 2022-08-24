import React, { useEffect, useState } from "react";
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
  TextField,
} from "@mui/material";
import UserListHead from "../../../../components/user/UserListHead";
import { useDispatch, useSelector } from "react-redux";
import { filter } from "lodash";
const TABLE_HEAD = [
  { id: "image", label: "Hình ảnh", alignRight: false },
  { id: "name", label: "Tên sản phẩm", alignRight: false },
  { id: "price", label: "Giá", alignRight: false },
  { id: "quantity", label: "Số lượng", alignRight: false },
  // { id: "", label: " ", alignRight: false },
];

export default function BookInfo() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [quantity, setQuantity] = useState();
  const [priceFlag, setPriceFlag] = useState(false);
  const [amountFlag, setAmountFlag] = useState(false);

  const { supplierSelected, selectedBook } = useSelector(
    (state) => state.ReceiptReducer
  );
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState("");
  console.log("selected", selected);
  const [supplier, setSupplier] = React.useState("");
  const [newBookList, setNewBookList] = React.useState(selectedBook);

  console.log("supplierSelected", supplierSelected);
  const handleChange = (event) => {
    setSupplier(event.target.value);
  };
  console.log("selectedBook", selectedBook);

  const handleClick = (event, name, row) => {
    console.log("row124", row);
    dispatch({
      type: "SELECT_BOOK",
      payload: {
        bookSelected: row,
      },
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    let receiptForm = newBookList.map((item, index) => {
      const allowed = [
        "amount",
        "price",
        "bookId",
        "supplierId",
        "totalPriceReceiptDetail",
      ];
      const filteredRow = Object.keys(item)
        .filter((key) => allowed.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: item[key],
          };
        }, {});
      console.log("filteredRow", filteredRow);

      return {
        ...filteredRow,
        supplierId: supplierSelected,
        bookId: item._id,
        totalPriceReceiptDetail: filteredRow.price * filteredRow.amount,
      };
    });
    console.log("receiptForm", receiptForm);

    dispatch({
      type: "SUBMIT_RECEIPT",
      payload: {
        receipt: receiptForm,
      },
    });
  }, [priceFlag, amountFlag]);

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
    newBookList,
    getComparator(order, orderBy),
    filterName
  );
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const hanldeQuantity = (e, index) => {
    const { value, name } = e.target;
    console.log("name", name);
    console.log("value", value);
    const newQuantityReceipt = [...newBookList];

    newQuantityReceipt[index] = {
      ...newQuantityReceipt[index],
      [name]: Number(value),
    };
    setNewBookList(newQuantityReceipt);
    setAmountFlag(!amountFlag);
  };

  console.log("quantity", quantity);
  console.log("newBookList", newBookList);

  const hanldePrice = (e, index) => {
    const { value, name } = e.target;
    console.log("name", name);

    const newPriceReceipt = [...newBookList];

    newPriceReceipt[index] = {
      ...newPriceReceipt[index],
      [name]: Number(value),
    };

    setNewBookList(newPriceReceipt);
    setPriceFlag(!priceFlag);
    //  console.log("newPriceReceipt[index].value", newPriceReceipt[index].value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  return (
    <div>
      <Card className="mt-3.5">
        {/* <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={newBookList?.result}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}

              //   onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const { _id, name, image, price, quantity } = row;
                  const isItemSelected = selected.indexOf(name) !== -1;

                  return (
                    <TableRow
                      hover
                      key={_id}
                      tabIndex={-1}
                      _id="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell align="left"></TableCell>
                      <TableCell>
                        <img
                          src={image}
                          alt=""
                          style={{ width: "80px", height: "100px" }}
                        />
                      </TableCell>
                      <TableCell align="left">{name}</TableCell>
                      <TableCell align="left">
                        <TextField
                          id="outlined-required"
                          label=" "
                          onChange={(event) => hanldePrice(event, index)}
                          value={price}
                          name="price"
                        />
                      </TableCell>

                      <TableCell align="left">
                        <TextField
                          id="outlined-required"
                          label=" "
                          onChange={(event) => hanldeQuantity(event, index)}
                          value={quantity}
                          name="amount"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell rowSpan={1} />
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Tổng cộng </TableCell>
                <TableCell>
                  {" "}
                  {filteredUsers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .reduce((total, row) => {
                      return (total += row.price * row.amount);
                    }, 0)
                    .toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
