import React, { useEffect, useState } from "react";
// import { Form, Input, Button, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, Form, FormikProvider } from "formik";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import moment from "moment"
import { LoadingButton } from "@mui/lab";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { styled } from "@mui/material/styles";
import { useStyles } from "./style";

import { Box, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Stack, Switch, TextField } from "@mui/material";

export default function Info() {
    const { userLogin  }= useSelector((state) => state.AuthReducer);
    console.log("userLogin",userLogin.user)
  const { userRoleList } = useSelector(
    (state) => state.UserReducer
  );
  console.log("userRoleList", userRoleList)
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
  const [role, setRole] = useState("Admin");
  const [valueDate, setValueDate] = useState(null);
  const [valueStatus, setValueStatus] = useState(false);

  const handleChangeDate = (newValue) => {
    setValueDate(newValue);
  };
  const handleChangeStatus = (event, checked) => {
    setFieldValue("active", checked ? true : false);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangeRole = (event) => {
    setRole(event.target.value);
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
    fullName: Yup.string().required("*Vui lòng nhập thông tin này"),
    password: Yup.string().required("*Vui lòng nhập thông tin này"),
    email: Yup.string().required("*Vui lòng nhập thông tin này"),
    phoneNumber: Yup.string().required("*Vui lòng nhập thông tin này"),

    address: Yup.string().required("*Vui lòng nhập thông tin này"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: userLogin.user.fullName,
      email: userLogin.user.email,
      avatar: userLogin.user.avatar,
      phoneNumber: userLogin.user.phoneNumber,
      gender: userLogin.user.gender,
      dateOfBirth: moment(userLogin.user.dateOfBirth).format("YYYY-MM-DD"),
     
      active: userLogin.user.active,
      address: userLogin.user.address,
      idRole: userLogin.user.idRole._id,
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      // if (loadingCreateCate) {
      //   return;
      // }
      // dispatch(createUser(data));
      resetForm();
      setOpen(false);

    },
  });
  useEffect(() => {
    values.dateOfBirth = moment(valueDate)?.format("YYYY-MM-DDTHH:mm:SS");
  }, [valueDate]);


  useEffect(() => {
    //  dispatch(getRolesList())  
  }, []);



  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (values.name && values.slug) setIsReadyCreateCate(true);
    else setIsReadyCreateCate(false);
  }, [values.name, values.slug]);




  const handleCreate = () => {
    if (isReadyCreateCate) setOpen(false);
  };


  const [value, setValue] = useState(1);


  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    // password: Yup.string().required("Password is required"),
    // userName: Yup.string().required("UserName is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
  });






  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {" "}
          <TextField
            fullWidth
            autoComplete="fullName"
            InputLabelProps={{
              shrink: true,
            }}
            label="Họ tên"
            {...getFieldProps("fullName")}
            error={Boolean(touched.fullName && errors.fullName)}
            helperText={touched.fullName && errors.fullName}
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
            error={Boolean(
              touched.phoneNumber && errors.phoneNumber
            )}
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
            <FormControl fullWidth>
              <InputLabel id="role">
                Quyền
              </InputLabel>
              <Select
                labelId="role"
                id="role"
                value={role}
                label="Quyền"
                onChange={handleChangeRole}
                {...getFieldProps("idRole")}
              >
                {userRoleList?.data.map((role, index) => {
                  return <MenuItem value={`${role._id}`} key={index} className="capitalize">{role.roleName}</MenuItem>
                })}

                {/* <MenuItem value={`Staff`}>Nhân viên</MenuItem> */}
              </Select>
            </FormControl>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Date desktop"
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
          <LoadingButton
            fullWidth
            size="medium"
            type="submit"
            variant="contained"
            // loading={loadingUpdate}
          >
            Cập nhật
          </LoadingButton>
        </Stack>

      </Form>
    </FormikProvider>
  );
}
<Info />;
