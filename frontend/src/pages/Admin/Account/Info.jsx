import React, { useEffect, useState } from "react";
// import { Form, Input, Button, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, Form, FormikProvider } from "formik";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { updateCurrentUser } from "../../../redux/action/authAction";

import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { styled } from "@mui/material/styles";
import { useStyles } from "./style";
import { useSnackbar } from "notistack";

import {
  Box,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { resetUserListUpdate } from "../../../redux/action/adminAction";


export default function Info() {
  const { userLogin, successUpdateUserCurrent, errorUpdateUserCurrent } =
    useSelector((state) => state.AuthReducer);

  console.log("userLogin", userLogin.user);
  const { enqueueSnackbar } = useSnackbar();

  const { userRoleList } = useSelector((state) => state.AdminReducer);
  console.log("userRoleList", userRoleList);
  const [srcImage, setSrcImage] = useState(userLogin?.user.avatar);
  const handleChangeFile = (e) => {
    //doc file base 64
    let file = e.target.files[0];
    console.log("e.target.files[0]", e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      // sau khi th???c hi??n xong l??nh tr??n th?? set gi?? tr??? c?? ???????c
      setSrcImage(e.target.result);
      console.log("e.target.result", e.target.result);
      formik.setFieldValue("avatar", e.target.result);
    };
    // ??em d??? li???u file l??u v??o formik
  };

  const [gender, setGender] = useState("Nam");
  const [role, setRole] = useState("Admin");
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
  const handleChangeRole = (event) => {
    console.log("event.target.value", event.target.value);
    setRole(event.target.value);
  };
  const dispatch = useDispatch();

  const Createchema = Yup.object().shape({
    fullName: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
    phoneNumber: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
    gender: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
    dateOfBirth: Yup.date()
      .required("*Ng??y sinh kh??ng ???????c b??? tr???ng!")
      .test("checkAge", "Ng??y ph???i nh??? h??n ng??y h??m nay", (value) => {
        var today = new Date();
        return value < today;
      }),
    address: Yup.string().required("*Vui l??ng nh???p th??ng tin n??y"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: userLogin.user.fullName,
      email: userLogin.user.email,
      avatar: userLogin.user.avatar,
      phoneNumber: userLogin.user.phoneNumber,
      gender: userLogin.user.gender,
      dateOfBirth:
        moment(valueDate).format("YYYY-MM-DD") !== "Invalid date"
          ? moment(valueDate).format("YYYY-MM-DD")
          : moment(userLogin.user.dateOfBirth).format("YYYY-MM-DD"),

      active: userLogin.user.active,
      address: userLogin.user.address,
      idRole: userLogin.user.idRole._id,
    },
    validationSchema: Createchema,
    onSubmit: (data) => {
      console.log("data", data);
      // if (loadingCreateCate) {
      //   return;
      // }
      dispatch(updateCurrentUser(data));
    },
  });

  useEffect(() => {
    values.dateOfBirth = moment(userLogin.user.dateOfBirth)?.format(
      "YYYY-MM-DDTHH:mm:SS"
    );
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
    if (successUpdateUserCurrent) {
      setTimeout(() => {
        enqueueSnackbar("C???p nh???t th??nh c??ng!", { variant: "success" });
      }, 100);
      return;
    }
    if (errorUpdateUserCurrent) {
      enqueueSnackbar(errorUpdateUserCurrent, { variant: "error" });
    }
  }, [successUpdateUserCurrent, errorUpdateUserCurrent]);

  useEffect(() => {
    return () => {
      dispatch(resetUserListUpdate());
    };
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
      >
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <div className="text-center z-0 py-9 px-8 mt-20">
              <div className="w-36 h-36 m-auto rounded-full p-2 border-2 border-dashed border-gray-200 flex">
                <label className="w-full h-full outline-none overflow-hidden rounded-full items-center justify-center relative flex cursor-pointer">
                  <input
                    accept="image/*"
                    multiple
                    id="fileUpload"
                    type="file"
                    autoComplete="off"
                    className="w-full h-full hidden"
                    onChange={handleChangeFile}
                  />
                  <span className="overflow-hidden z-10 w-full h-full block">
                    <span className=" w-full h-full bg-cover inline-block">
                      <img
                        src={srcImage}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    </span>
                  </span>
                </label>
              </div>

              <div className="mt-4 leading-6 text-xs font-normal text-gray-700 text-center">
                Cho ph??p *.jpeg, *.jpg, *.png, *.gif
              </div>
            </div>
          </div>
          <div className="col-span-3 ">
            <Stack spacing={3}>
              {" "}
              <TextField
                fullWidth
                autoComplete="fullName"
                InputLabelProps={{
                  shrink: true,
                }}
                label="H??? t??n"
                {...getFieldProps("fullName")}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName}
              />
              <TextField
                fullWidth
                autoComplete="code"
                label="Email"
                disabled
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
                label="S??? ??i???n tho???i"
                InputLabelProps={{
                  shrink: true,
                }}
                className="mt-0"
                {...getFieldProps("phoneNumber")}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <Box className="flex">
                <FormControl fullWidth sx={{ marginRight: "25px" }}>
                  <InputLabel id="gender">Gi???i t??nh</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender"
                    value={gender}
                    name="gender"
                    label="Gi???i t??nh"
                    onChange={handleChangeGender}
                    {...getFieldProps("gender")}
                  >
                    <MenuItem value={`Nam`}>Nam</MenuItem>
                    <MenuItem value={`N???`}>N???</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="role">Quy???n</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    label="Quy???n"
                    {...getFieldProps("idRole")}
                  >
                    {userRoleList?.data.map((role, index) => {
                      return (
                        <MenuItem
                          value={`${role._id}`}
                          key={index}
                          className="capitalize"
                        >
                          {role.roleName}
                        </MenuItem>
                      );
                    })}

                    {/* <MenuItem value={`Staff`}>Nh??n vi??n</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                type="date"
                fullWidth
                
                autoComplete="code"
                label="Ng??y Sinh"
                InputLabelProps={{
                  shrink: true,
                }}
                value={
                  valueDate
                    ? valueDate
                    : moment(userLogin.user.dateOfBirth).format("YYYY-MM-DD")
                }
                className="mt-0"
                onChange={handleChangeDate}
                {...getFieldProps("dateOfBirth")}
                error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                helperText={touched.dateOfBirth && errors.dateOfBirth}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DesktopDatePicker
                    label="Ng??y sinh"
                    inputFormat="MM/dd/yyyy"
                    value={
                      valueDate
                        ? valueDate
                        : moment(userLogin.user.dateOfBirth).format(
                            "YYYY-MM-DD"
                          )
                    }
                    onChange={handleChangeDate}
                    renderInput={(touched) => (
                      <TextField
                        {...touched}
                        error={Boolean(
                          touched.dateOfBirth && errors.dateOfBirth
                        )}
                        helperText={touched.dateOfBirth && errors.dateOfBirth}
                      />
                    )}
                  />
                </Stack>
              </LocalizationProvider> */}
              <TextField
                fullWidth
                autoComplete="code"
                label="?????a ch???"
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
                  label="Tr???ng Th??i"
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
                C???p nh???t
              </LoadingButton>
            </Stack>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}
<Info />;
