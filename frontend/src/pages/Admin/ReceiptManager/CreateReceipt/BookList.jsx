import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BookList() {
const dispatch = useDispatch()
  const { supplierList } = useSelector((state) => state.SupplierReducer);

  console.log("supplierList", supplierList);
  const [supplier, setSupplier] = React.useState("");
 console.log(supplier);
  const handleChange = (event) => {
    setSupplier(event.target.value);
   
  };



    console.log("supplier",supplier);
  const handleSubmit = () => {
    dispatch({
      type: "SELECT_SUPPLIER",
      payload: {
          supplierSelected: supplier,
      }
    });
  };
  return (
    <Box>
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
                <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
              ))}
              {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9} className="flex items-center">
          {" "}
          <Button variant="contained" onClick={handleSubmit}>Gửi</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
