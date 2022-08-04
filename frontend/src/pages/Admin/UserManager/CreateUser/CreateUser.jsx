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
// import { createUser } from "../../../redux/action/authAction";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
import { createUser } from "../../../../redux/action/authAction";
import { getRolesList } from "../../../../redux/action/adminAction";

export default function CreateUser() {
  const { userRoleList } = useSelector((state) => state.AdminReducer);
    console.log("userRoleList",userRoleList)
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
      fullName: "",
      password: "",
      passwordConfirm: "",
      email: "",
      avatar: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      active: true,
      address: "",
      idRole: "",
    },
    validationSchema: Createchema,
    onSubmit: (data, { resetForm }) => {
      console.log("data", data);
      // if (loadingCreateCate) {
      //   return;
      // }
      dispatch(createUser(data));
        resetForm();
      setOpen(false);
    
    },
  });
  useEffect(() => {
    values.dateOfBirth = moment(valueDate)?.format("YYYY-MM-DDTHH:mm:SS");
  }, [valueDate]);


  useEffect(() => {
       dispatch(getRolesList())  
  },[]);



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
        Thêm Người Dùng
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
              Tạo người dùng mới
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
                            {userRoleList?.data.map((role, index)=>{
                             return <MenuItem value={`${role._id}` } key={index} className="capitalize">{role.roleName}</MenuItem>
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
                    </Stack>
                  </Card>
                {/* </div> */}
                {/* <div className="col-span-2">
                  <Card
                    sx={{
                      borderRadius: " 16px",
                      zIndex: 0,
                      padding: " 26px 24px",
                    }}
                  >
                    <div className="mb-3 text-lg font-semibold">
                      Hình đại diện
                    </div>
                    <hr />
                    <div className="text-center">
                      <div className="w-full h-full border-2 border-dashed border-gray-200 inline-flex">
                        <label className="w-full h-full outline-none overflow-hidden items-center justify-center relative cursor-pointer py-12">
                          <input
                            type="file"
                            id="poster"
                            name="poster"
                            hidden
                            multiple
                            onChange={handleChangeFile}
                          />
                          {srcImage ? (
                            <img
                              accept="image/*"
                              multiple
                              src={srcImage}
                              alt="avatar"
                              className="w-48 h-auto inline-flex object-cover"
                            />
                          ) : (
                            <img
                              accept="image/*"
                              multiple
                              src="/img/drop_and_select.png"
                              alt="avatar"
                              className="inline-flex"
                            />
                          )}
                          {srcImage ? "" : <h5>Kéo và thả ảnh vào đây</h5>}
                          {srcImage ? "" : <p className="mb-2">hoặc</p>}
                          {srcImage ? (
                            ""
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                            >
                              Tải ảnh
                            </Button>
                          )}
                        </label>
                      </div>
                    </div>
                    <span className="overflow-hidden z-50 w-full h-full block">
                      <span className=" w-36 h-36 bg-cover inline-block">
                        <img
                          src={srcImage}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      </span>
                    </span>
                  </Card>
                </div> */}
              {/* </div> */}
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
