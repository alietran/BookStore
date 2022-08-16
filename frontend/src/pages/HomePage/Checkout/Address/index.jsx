import { Button, Card, Dialog, DialogActions, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./style";
import AddIcon from '@mui/icons-material/Add';
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";

import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getListProvinces } from "../../../../redux/action/addressAction";

export default function Address() {
  const { addressProvincesList } = useSelector((state)=>state.AddressReducer)
  const classes = useStyles();
  const dispatch = useDispatch();
 const [listCity, setlistCity] = useState("");
 const [open, setOpen] = useState(false);
   const [city, setCity] = useState("");
   const [district, setDistrict] = useState("");
   const [ward, setWard] = useState("");
   const [address, setAddress] = useState("");



   const handleClose = () => {
    setOpen(false);
  };
  // const handleChangeCity = (event) => {
  //   console.log("124",event.target.value)
  //   setCity(event.target.value);
  // };
  // const handleChangeDistrict = (event) => {
  //   setCity(event.target.value);
  // };

  const handleChangeWard = (event) => {
    setWard(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  //   const [isReadyCreateCate, setIsReadyCreateCate] = useState(false);
  //   useEffect(() => {
  //   if (
  //     values.name 
     
  //   )
  //     setIsReadyCreateCate(true);
  //   else setIsReadyCreateCate(false);
  // }, [
  //   values.name,
   
  // ]);

  useEffect(()=>{
   
     const getListProvinces = () => {
      fetch("https://sheltered-anchorage-60344.herokuapp.com/province", {
        method: "GET",  
      })
        .then((response) => {
          // console.log("response",response.json())
          if (response.status === 200) return response.json();
          // throw new Error("get list provinces  has been failed!");
        })
          .then((resObject) => {
             setlistCity(resObject)
                  console.log("resObject", resObject);
          })
        .catch((err) => {
          console.log(err);
        });
    };
    getListProvinces();
  },[])
console.log("listCity", listCity)
   const handleCreate = () => {
    // if (isReadyCreateCate) 
    setOpen(false);
  };

  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
  
  });
  const handleClickOpen = () => {
    setOpen(true);
  };


 const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      name: "",
      city:""
      
    },
    // validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      // if (loadingCreateAuthor) {
      //   return;
      // }
      // dispatch(createAuthor(data));
      resetForm();
      setOpen(false);
    },
  });
    const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;
  return (
    <div>
      <Typography component="div" variant="subtitle1">
        Thông tin nhận hàng
      </Typography>
      <div className={classes.address}>
        <div className={classes.address__detail}>
          <div className={classes.address__option}>
            <p className={classes.address__detailName}>Thành Đạt</p>
            <div>
              <img
                className={classes.address__img}
                src="./img/icon-edit.svg"
                alt="icon-edit"
              />
            </div>
            <div>
              <i
                className="fa-solid fa-trash-can"
                style={{ color: "#3498DB", padding: " 0 10px" }}
              ></i>
            </div>
          </div>
          <p style={{ color: "#999999" }}>Đia chỉ </p>
          <p>phone</p>
          <div>
            <div className={classes.border__checked}></div>
            <span className={classes.checked}>
              <img
                className={classes.address__img}
                src="./img/icon-check.svg"
                alt="icon-check"
              />
            </span>
          </div>
        </div>
        <div className={classes.address__detail}  onClick={handleClickOpen}>
          <div className={classes.address__detailAdd}>
            <AddIcon />
            <p style={{ color: "#999999" }}>Add address</p>
          </div>
        </div>
         <Dialog
        open={open}
        onClose={handleClose}
        className="text-center"
        fullWidth={true}
        maxWidth="sm"
      >
        <Formik value={formik}>
          <Form onSubmit={handleSubmit}>
            <ModalDialog
              sx={{ fontSize: "23px !important" }}
              onClose={handleClose}
            >
              {" "}
              Thông tin người nhận
            </ModalDialog>

            <DialogContent dividers>
              {/* <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3 "> */}
              <Card
                sx={{
                  borderRadius: " 16px",
                  zIndex: 0,
                  padding: " 20px 24px",
                }}
              >
                <Stack spacing={3}>
                  {" "}
                  <TextField
                    fullWidth
                    autoComplete="name"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Họ tên"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>
                <Stack direction="row" spacing={3} mt={2} mb={3}>
                  {" "}
                  <TextField
                    fullWidth
                    autoComplete="phoneNumber"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Số điện thoại"
                    {...getFieldProps("phoneNumber")}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
              <TextField
                    fullWidth
                    autoComplete="email"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Email"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
                <hr/>
                  <Typography m={2} sx={{fontSize:"20px", fontWeight:"bold"}}>Địa chỉ nhận hàng</Typography>
                    <Stack spacing={3} direction="row" >
                  {" "}
                
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                  <InputLabel id="city">Tỉnh / Thành phố</InputLabel>
                      <Select
                    labelId="city"
                    id="city"
                    value={city}
                    name="city"
                    label="Tỉnh / Thành phố"
                    // onChange={handleChangeCity}
                    {...getFieldProps("city")}
                  >
                  {listCity && listCity?.map((item, index)=>{
                    return  <MenuItem value={`${item.idProvince}`}  key={index}>{item.name}</MenuItem>
                  })}
                 
                  </Select>
                </FormControl>
                
                <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                  <InputLabel id="district">Quận</InputLabel>
                      <Select
                    labelId="district"
                    id="district"
                    value={district}
                    name="district"
                    label="Quận"
                    // onChange={handleChangeDistrict}
                    {...getFieldProps("district")}
                  >
                    <MenuItem value={`Nam`}>Nam</MenuItem>
                    <MenuItem value={`Nữ`}>Nữ</MenuItem>
                  </Select>
                </FormControl>
                </Stack>
                    <Stack spacing={3} direction="row" >
                  {" "}
                
                  
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                  <InputLabel id="ward">Huyện / Xã</InputLabel>
                      <Select
                    labelId="ward"
                    id="ward"
                    value={ward}
                    name="ward"
                    label="Huyện"
                    onChange={handleChangeWard}
                    {...getFieldProps("ward")}
                  >
                    <MenuItem value={`Nam`}>Nam</MenuItem>
                    <MenuItem value={`Nữ`}>Nữ</MenuItem>
                  </Select>
                </FormControl>
                    <FormControl fullWidth sx={{ marginBottom: "10px" }}>
                  <InputLabel id="address">Số nhà</InputLabel>
                      <Select
                    labelId="address"
                    id="address"
                    value={address}
                    name="address"
                    label="Tỉnh / Thành phố"
                    onChange={handleChangeAddress}
                    {...getFieldProps("address")}
                  >
                    <MenuItem value={`Nam`}>Nam</MenuItem>
                    <MenuItem value={`Nữ`}>Nữ</MenuItem>
                  </Select>
                </FormControl>
               
                </Stack>
             
              </Card>
             
              
                    
         
            </DialogContent>
            <DialogActions sx={{ margin: "0 16px !important" }}>
              <Button
                sx={{
                  color: "gray",
                  borderColor: "gray ",
                  "&:hover": { color: "primary.main" },
                  width: "100%",
                  height: "33px !important",
                }}
                variant="outlined"
                onClick={handleClose}
                className={classes.buttonCreate}
              >
                Huỷ
              </Button>
              <LoadingButton
                sx={{ width: "100%", height: "33px !important" }}
                size="large"
                type="submit"
                variant="contained"
                // loading={loadingCreateAuthor}
                onClick={handleCreate}
                // disabled={!isReadyCreateCate}
                className={classes.buttonCreate}
              >
                Tạo
              </LoadingButton>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
      </div>
    </div>
  );
}
