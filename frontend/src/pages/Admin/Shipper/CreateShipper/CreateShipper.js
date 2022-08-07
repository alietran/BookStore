import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { styled } from "@mui/material/styles";
import { useStyles } from "./style";
import { LoadingButton } from "@mui/lab";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import moment from "moment";

import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { createShipper } from "../../../../redux/action/shipperAction";

export default function CreateShipper() {
  const { loadingCreateShipper } = useSelector((state) => state.ShipperReducer);
  // console.log("userRoleList", userRoleList);
  const [srcImage, setSrcImage] = useState(null);
  const handleChangeFile = (e) => {
    //doc file base 64
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      // sau khi thực hiên xong lênh trên thì set giá trị có được
      setSrcImage(e.target.result);
    };
    // Đem dữ liệu file lưu vào formik
    formik.setFieldValue("avatar", file);
  };
  const [isReadyCreateCate, setIsReadyCreateCate] = useState(false);
  const [gender, setGender] = useState("Nam");

  const [valueDate, setValueDate] = useState(null);


  const handleChangeDate = (newValue) => {
    setValueDate(newValue);
  };
  const handleChangeStatus = (event, checked) => {
    setFieldValue("active", checked ? true : false);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Createchema = Yup.object().shape({
    name: Yup.string().required("*Vui lòng nhập thông tin này"),
    password: Yup.string().required("*Vui lòng nhập thông tin này"),
    email: Yup.string().required("*Vui lòng nhập thông tin này"),
    phoneNumber: Yup.string().required("*Vui lòng nhập thông tin này"),
    address: Yup.string().required("*Vui lòng nhập thông tin này"),
    license_plates: Yup.string().required("*Vui lòng nhập thông tin này"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      password: "",
      passwordConfirm: "",
      email: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      active: true,
      address: "",
      license_plates: "",
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      if (loadingCreateShipper) {
        return;
      }
      dispatch(createShipper(data));
      resetForm();
      setOpen(false);
    },
  });



  useEffect(() => {
    values.dateOfBirth = moment(valueDate)?.format("YYYY-MM-DDTHH:mm:SS");
  }, [valueDate]);



  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (
      values.name &&
      values.password &&
      values.passwordConfirm &&
      values.email &&
      values.phoneNumber &&
      values.address &&
      values.license_plates
    )
      setIsReadyCreateCate(true);
    else setIsReadyCreateCate(false);
  }, [
    values.name,
    values.password,
    values.passwordConfirm,
    values.email,
    values.phoneNumber,
    values.address,
    values.license_plates,
  ]);

  const handleCreate = () => {
    if (isReadyCreateCate) setOpen(false);
  };

  return (
    <Box>
      <Button
        variant="contained"
        component={RouterLink}
        onClick={handleClick}
        to="#"
        startIcon={<Icon icon={plusFill} />}
        sx={{ "&:hover": { color: "#fff" } }}
      >
        Thêm Shipper
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        className="text-center"
        fullWidth={true}
        maxWidth="md"
      >
        <Formik value={formik}>
          <Form onSubmit={handleSubmit}>
            <ModalDialog
              sx={{ fontSize: "23px !important" }}
              onClose={handleClose}
            >
              {" "}
              Tạo shipper mới
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
                  <TextField
                    fullWidth
                    autoComplete="code"
                    label="Mật khẩu"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="mt-0"
                    {...getFieldProps("password")}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    fullWidth
                    autoComplete="code"
                    label="Xác nhận mật khẩu"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="mt-0"
                    {...getFieldProps("passwordConfirm")}
                    error={Boolean(
                      touched.passwordConfirm && errors.passwordConfirm
                    )}
                    helperText={
                      touched.passwordConfirm && errors.passwordConfirm
                    }
                  />
                  <TextField
                    fullWidth
                    autoComplete="code"
                    label="Email"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="mt-0"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    autoComplete="code"
                    label="Số điện thoại"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="mt-0"
                    {...getFieldProps("phoneNumber")}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  <Box className="flex">
                    <FormControl fullWidth>
                      <InputLabel id="gender">Giới tính</InputLabel>
                      <Select
                        labelId="gender"
                        id="gender"
                        value={gender}
                        name="gender"
                        label="Giới tính"
                        onChange={handleChangeGender}
                        {...getFieldProps("gender")}
                      >
                        <MenuItem value={`Nam`}>Nam</MenuItem>
                        <MenuItem value={`Nữ`}>Nữ</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        label="Ngày sinh"
                        inputFormat="MM/dd/yyyy"
                        value={valueDate}
                        onChange={handleChangeDate}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                  <TextField
                    fullWidth
                    autoComplete="code"
                    label="Địa chỉ"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="mt-0"
                    {...getFieldProps("address")}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth
                    autoComplete="code"
                    label="Biển số xe"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="mt-0"
                    {...getFieldProps("license_plates")}
                    error={Boolean(
                      touched.license_plates && errors.license_plates
                    )}
                    helperText={touched.license_plates && errors.license_plates}
                  />
                  <FormGroup>
                    <FormControlLabel
                      label="Trạng Thái"
                      control={
                        <Switch
                          checked={values.active}
                          value={values.active}
                          onChange={handleChangeStatus}
                          name="active"
                        />
                      }
                      {...getFieldProps("active")}
                    />
                  </FormGroup>
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
                // loading={loadingCreateCate}
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
    </Box>
  );
}
