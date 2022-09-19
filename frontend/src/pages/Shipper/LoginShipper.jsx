import {
  Box,
  Button,
  Icon,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useState } from "react";
import * as yup from "yup";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

export default function LoginShipper() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const LoginShipperSchema = yup.object().shape({
    email: yup.string().required("Vui lòng nhập địa chỉ email !"),
    password: yup.string().required("Vui lòng nhập mật khẩu !"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginShipperSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    getFieldProps,
  } = formik;
  return (
    <div className="pt-24 h-screen mx-auto text-center bg-white md:w-96">
      <Box
        sx={{
          maxWidth: 580,
          margin: "auto",
          display: "flex",
          minHeight: "20vh",
          flexDirection: "column",
          justifyContent: "center",
          // padding: theme.spacing(12, 0),
        }}
      >
        <Box className="flex center mt-12 mx-auto">
          <img
            src="../../../../img/User_Circle.png"
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
        </Box>
        <Typography variant="h4" gutterBottom className="text-center my-2">
          Đăng nhập
        </Typography>
        <FormikProvider value={formik}>
          <Form className="p-3">
            <Stack spacing={3} sx={{ marginBottom: "20px" }}>
              {/* error */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                label="Mật khẩu"
                name="password"
                {...getFieldProps("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Stack>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{ padding: "0 !important" }}
              className="p-0"
              // loading={isSubmitting}
            >
              Đăng nhập
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </div>
  );
}
