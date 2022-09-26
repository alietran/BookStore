import { LoadingButton } from "@mui/lab";
import {
  Box,
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
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useSnackbar } from "notistack";
import { updateCurrentHomeUser } from "../../../../redux/action/userAction";

export default function UserAccount() {
  const [gender, setGender] = useState("Nam");
  const dispatch = useDispatch();
  // const { userLogin } = useSelector((state) => state.AuthReducer);
  const { loginUserSucces } = useSelector((state) => state.UserReducer);
  // const

  const [srcImage, setSrcImage] = useState(loginUserSucces?.user.avatar);
  const [valueDate, setValueDate] = useState(null);
  const enqueueSnackbar = useSnackbar();

  useEffect(() => {
    values.dateOfBirth = moment(loginUserSucces?.user.dateOfBirth)?.format(
      "YYYY-MM-DDTHH:mm:SS"
    );
  }, [valueDate]);

  const Createchema = Yup.object().shape({
    fullName: Yup.string().required("*Vui lòng nhập thông tin này"),
    phoneNumber: Yup.string().required("*Vui lòng nhập thông tin này"),
    gender: Yup.string().required("*Vui lòng nhập thông tin này"),
    dateOfBirth: Yup.date()
      .required("*Ngày sinh không được bỏ trống!")
      .test("checkAge", "Ngày phải nhỏ hơn ngày hôm nay", (value) => {
        var today = new Date();
        return value < today;
      }),
    
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: loginUserSucces?.user.fullName,
      email: loginUserSucces?.user.email,
      avatar: loginUserSucces?.user.avatar,
      phoneNumber: loginUserSucces?.user.phoneNumber,
      gender: loginUserSucces?.user.gender,
      dateOfBirth: loginUserSucces?.user.dateOfBirth
        ? loginUserSucces.user.dateOfBirth
        : "",
    },
    validationSchema: Createchema,
    onSubmit: (data) => {
      console.log("data23423", data);
      // if (loadingCreateCate) {
      //   return;
      // }
      //chưa có chức năng update cho người dùng
      dispatch(updateCurrentHomeUser(data));
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

  const handleChangeFile = (e) => {
    //doc file base 64
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      // sau khi thực hiên xong lênh trên thì set giá trị có được
      setSrcImage(e.target.result);
      // Đem dữ liệu file lưu vào formik
      formik.setFieldValue("avatar", e.target.result);
    };
  };
  const handleChangeGender = (event) => {
    setGender(event.target.value);
    console.log("gender", gender);
  };

  const handleChangeDate = (newValue) => {
    setValueDate(newValue);
    console.log("valueDate", valueDate);
  };

  return (
    <div style={{ backgroundColor: "white", padding: "25px" }}>
      <FormikProvider value={formik} sx={{ backgroundColor: "white" }}>
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
                  Cho phép *.jpeg, *.jpg, *.png, *.gif
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
                  label="Họ tên"
                  {...getFieldProps("fullName")}
                  error={Boolean(touched.fullName && errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                />
                <TextField
                  fullWidth
                  autoComplete="code"
                  label="Email"
                  disabled={loginUserSucces?.user.googleId}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="mt-0"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Box className="flex">
                  <TextField
                    fullWidth
                    autoComplete="code"
                    disabled={loginUserSucces?.user.phoneUID}
                    label="Số điện thoại"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className="mt-0"
                    {...getFieldProps("phoneNumber")}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  <FormControl fullWidth sx={{ marginLeft: "20px" }}>
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
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Ngày sinh"
                      inputFormat="MM/dd/yyyy"
                      value={valueDate}
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
                  type="date"
                  fullWidth
                  autoComplete="code"
                  label="Ngày Sinh"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="mt-0"
                  {...getFieldProps("dateOfBirth")}
                  error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                  helperText={touched.dateOfBirth && errors.dateOfBirth}
                />
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
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
}
