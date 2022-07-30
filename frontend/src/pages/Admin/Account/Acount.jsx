import { Button, Input, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import style from "./Account.module.css";
import {
  Form,
  Formik,
  Field,
  ErrorMessage,
  FormikProvider,
  useFormik,
} from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { Box, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { changePassword } from "../../../redux/action/authAction";
import { useSnackbar } from "notistack";

export default function Account() {
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  const { userLogin, errorChangePassword, successChangePassword } = useSelector(
    (state) => state.AuthReducer
  );

  // console.log("props.userId",props.userId)
  function callback(key) {
    console.log(key);
  }
  const handlePassword = (user) => {
    console.log("124667");
  };
  const { enqueueSnackbar } = useSnackbar();

  const ChangePasswordSchema = Yup.object().shape({
    passwordCurrent: Yup.string().required("*Vui lòng nhập mật khẩu!"),
    password: Yup.string().required("*Vui lòng nhập mật khẩu mới!"),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "*Mật khẩu và mật khẩu xác nhận phải khớp!"
    ),
  });

  const formik = useFormik({
    initialValues: {
      passwordCurrent: "",
      password: "",
      passwordConfirm: "",
      remember: true,
    },
    validationSchema: ChangePasswordSchema,

    onSubmit: (user, { resetForm }) => {
      // if (loadingChangePassword || !isReadyResetPassword) {
      //   return;
      // }
      dispatch(changePassword(user));

      // reset
      resetForm();
    },
  });
  const { errors, touched, handleSubmit, getFieldProps, values } = formik;

  useEffect(() => {
    if (successChangePassword) {
      enqueueSnackbar("Thay đổi mật khẩu thành công!", {
        variant: "success",
      });
    }

    if (errorChangePassword) {
      enqueueSnackbar(errorChangePassword, { variant: "error" });
    }
  }, [successChangePassword, errorChangePassword]);
  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Thông tin chung" key="1">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <div className="text-center z-0 py-9 px-8">
              <div className="w-36 h-36 m-auto rounded-full p-2 border-2 border-dashed border-gray-200 flex">
                <img
                  src={userLogin?.user.avatar}
                  alt="avatar"
                  className="rounded-full"
                />
              </div>
              <div className="mt-4 leading-6 text-xs font-normal text-gray-700 text-center">
                Cho phép *.jpeg, *.jpg, *.png, *.gif
              </div>
            </div>
          </div>
          <div className="col-span-3 ">
            <Info />
          </div>
        </div>
      </TabPane>
      <TabPane tab="Đổi mật khẩu" key="2">
        <Formik value={formik}>
          <Form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  type="password"
                  label="Mật khẩu cũ"
                  {...getFieldProps("passwordCurrent")}
                  error={Boolean(
                    touched.passwordCurrent && errors.passwordCurrent
                  )}
                  helperText={touched.passwordCurrent && errors.passwordCurrent}
                />{" "}
                <TextField
                  fullWidth
                  type="password"
                  label="Mật khẩu mới"
                  {...getFieldProps("password")}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />{" "}
                <TextField
                  fullWidth
                  type="password"
                  label="Nhập lại mật khẩu mới"
                  {...getFieldProps("passwordConfirm")}
                  error={Boolean(
                    touched.passwordConfirm && errors.passwordConfirm
                  )}
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                />{" "}
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: "6px 9px",
                    fontWeight: "700",
                    lineHeight: "1.71429",
                    fontSize: "0.8rem",
                    textTransform: "capitalize",
                  }}
                >
                  Đổi mật khẩu
                </LoadingButton>
              </Box>
            </Stack>
          </Form>
        </Formik>
      </TabPane>
    </Tabs>
  );
}
