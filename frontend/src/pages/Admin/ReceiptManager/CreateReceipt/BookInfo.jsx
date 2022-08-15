import React, { useEffect, useState } from 'react'
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
import UserListHead from '../../../../components/user/UserListHead';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from "lodash";
 const TABLE_HEAD = [
  { id: "image", label: "Hình ảnh", alignRight: false },
  { id: "name", label: "Tên sản phẩm", alignRight: false },
  { id: "price", label: "Giá", alignRight: false },
  { id: "quantity", label: "Số lượng", alignRight: false },
  // { id: "", label: " ", alignRight: false },
];


export default function BookInfo() {
    const dispatch = useDispatch()
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  
  const { supplierSelected ,selectedBook} = useSelector((state) => state.RecieptReducer);
  const [selected, setSelected] = useState([]);
  const [filterName, setFilterName] = useState("");

  const [supplier, setSupplier] = React.useState("");
  console.log("supplierSelected",supplierSelected);
  const handleChange = (event) => {
    setSupplier(event.target.value);
   
  };
  console.log("selectedBook",selectedBook)

 const handleClick = (event, name, row) => {
  console.log("row124",row);
  dispatch({
      type: "SELECT_BOOK",
      payload: {
          bookSelected: row,
      }
    });
 }
 const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

useEffect ( () =>{

  // const bookId = selectedBook.map((item,index)=>{
  //   return item.id
  // })
// const handelSubmitReciept = () => {
    console.log("selectedBook124",selectedBook.id)
    const recieptForm = {
    totalPriceReceipt:quantity * price,
    supplierId:supplierSelected,
    amount:quantity,
    price,
    totalPriceReceiptDetail:quantity * price,
    bookId:selectedBook[0].id,
    }
     console.log("recieptForm",recieptForm)
  // }
 dispatch({
   type:"SUBMIT_RECEIPT",
   payload:{
      receipt : recieptForm
   }
 })
},[quantity,price])
  

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
    selectedBook,
    getComparator(order, orderBy),
    filterName
  );
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
const hanldeQuantity = (e) => {
    console.log("price", e.target.value);
    setQuantity(e.target.value)
}

const hanldePrice = (e) => {
    console.log("price", e.target.value);
    setPrice(e.target.value)
}


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
              rowCount={selectedBook?.result}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
            //   onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredUsers
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const {
                    _id,
                    name,
                    image,
                    authorId
                  } = row;
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
                      <TableCell >
                        <img src={image} alt="" style={{width: "80px",height:"100px"}}/>
                       
                        </TableCell>
                      <TableCell align="left">{name}</TableCell>
                       <TableCell align="left"><TextField
          required
          id="outlined-required"
          // label="0"
          defaultValue=""
          onChange={hanldeQuantity}
          value={quantity}
        /></TableCell>
                      <TableCell align="left"><TextField
          required
          id="outlined-required"
          // label="0"
          defaultValue=""
          onChange={hanldePrice}
          value={price}
          
        /></TableCell>
                     
                   

                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
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

        <Box className='p-3 float-right flex'>
          <p className='font-bold'>Tổng tiền: </p>
          <span>&nbsp;
             { (quantity * price) === "NaN" ? "0" : (quantity * price)} 
              </span>
        </Box>
      </Card>
    </div>
  )
}
