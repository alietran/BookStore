import React, { useState } from "react";
import { Table, Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  useFormik,
  Form,
  FormikProvider,
  validateYupSchema,
  Formik,
} from "formik";

import { Fragment } from "react";
import { Button, Card, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateTimePicker, LoadingButton, LocalizationProvider } from "@mui/lab";

import { useSnackbar } from "notistack";


export default function CreateUser() {
     const [gen, setGen] = useState('Nam');
       const handleChangesetGen = (event) => {
    setGen(event.target.value);
  };
//   const { addMovie } = useSelector((state) => state.MovieReducer);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const MovieSchema = Yup.object().shape({
    name: Yup.string().required("Tên phim không được bỏ trống"),
    genre: Yup.string().required("Thể loại được bỏ trống"),
    trailer: Yup.string().required("Trailer không được bỏ trống"),
    premiere: Yup.date()
      .required("*Thời gian chiếu không được bỏ trống!")
      .test("checkDate", "Ngày khởi chiếu phải lớn hơn ngày hiện tại", (value) => {
        var today = new Date();
        return value > today;
      }),
    durations: Yup.string().required("Thời gian chiếu không được bỏ trống"),
    description: Yup.string().required("Mô tả không được bỏ trống"),
  });
//   console.log(addMovie);
//   useEffect(() => {
//     if (addMovie) {
//       setTimeout(() => {
//         enqueueSnackbar("Tạo thành công!", { variant: "success" });
//       }, 150);
//     }
//   }, [addMovie]);



  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      avatar: "",
      phone: "",
      gender: "",
      dob: "",
      status:"",
      address:""
    },
    validationSchema: MovieSchema,
    onSubmit: (movie) => {
    //   dispatch(createMovie(movie));
      // console.log(movie)
    },
  });
  const [value, setValue] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleChangeFile = (e) => {
    //doc file base 64
    let file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      // sau khi thực hiên xong lênh trên thì set giá trị có được
    //   setSrcImage(e.target.result);
    };
    // Đem dữ liệu file lưu vào formik
    formik.setFieldValue("images", file);
  };

  return (
    <>
      <Typography variant="h3" sx={{ px: 5, mb: 2 }}>
        Tạo tài khoản mới
      </Typography>
      <Formik value={formik}>
        <Form noValidate onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 ">
              <Card
                sx={{
                  borderRadius: " 16px",
                  zIndex: 0,
                  padding: " 20px 24px",
                }}
              >
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Họ tên"
                    {...getFieldProps("name")}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    fullWidth
                    label="Mật khẩu"
                    {...getFieldProps("password")}
                    error={Boolean(touched.genre && errors.genre)}
                    helperText={touched.genre && errors.genre}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    {...getFieldProps("email")}
                    error={Boolean(touched.trailer && errors.trailer)}
                    helperText={touched.trailer && errors.trailer}
                  />
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    {...getFieldProps("phone")}
                    error={Boolean(touched.trailer && errors.trailer)}
                    helperText={touched.trailer && errors.trailer}
                  />
                  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={gen}
    label="Giới tính"
    onChange={handleChange}
  >
     <MenuItem value={`Nam`}>Nam</MenuItem>
                  <MenuItem value={`Nữ`}>Nữ</MenuItem>
  </Select>
</FormControl>
                   
                  {/* <TextField
                    fullWidth
                    label="Giới tính"
                    {...getFieldProps("gender")}
                    error={Boolean(touched.trailer && errors.trailer)}
                    helperText={touched.trailer && errors.trailer}
                  /> */}
                  <TextField
                    id="date"
                    label="Ngày sinh"
                    type="date"
                    sx={{ width: "100%" }}
                    {...getFieldProps("premiere")}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(touched.premiere && errors.premiere)}
                    helperText={touched.premiere && errors.premiere}
                  />

                  
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    // loading={loadingRegis}
                  >
                    Tạo người dùng
                  </LoadingButton>
                </Stack>
              </Card>
            </div>
          
          </div>
        </Form>
      </Formik>
    </>
  );
}
