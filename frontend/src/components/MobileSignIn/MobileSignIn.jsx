import { Box, Button, FormControl, TextField } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { authentication } from "../../firebaseConfig";
import { useDispatch } from "react-redux";
import { createUser1 } from "../../redux/action/userAction";
import { useHistory } from "react-router-dom";

export default function MobileSignIn() {
  const [phone, setPhone] = useState("");

  const formik = useFormik({
    initialValues: {
      otp: "",
      remember: true,
    },
    // validationSchema: ChangePasswordSchema,

    onSubmit: (user, { resetForm }) => {
      // if (loadingChangePassword || !isReadyResetPassword) {
      //   return;
      // }
      // dispatch(changePassword(user));

      // reset
      resetForm();
    },
  });
  const { errors, touched, handleSubmit, getFieldProps, values } = formik;
  const [phoneNumber, setPhoneNumber] = useState("+84");
  const [OTP, setOTP] = useState("");
  const [expandForm, setExpandForm] = useState(false);
const history = useHistory()
  const generateCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "captcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const requestOTP = (e) => {
    e.preventDefault();

    if (phoneNumber.length >= 10) {
      setExpandForm(true);
      generateCaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };
  const dispatch = useDispatch();
  const verifyOTP = async (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          console.log("result", result);
          const user = result.user;
          const userObj = { user };
          // const userObj = {
          //   active: true,
          //   avatar: "",
          //   dateOfBirth: "",
          //   email: "",
          //   fullName: "",
          //   gender: "",
          //   phoneUID: user.uid,
          //   phoneNumber: user.phoneNumber,
          //   role: "Khách Hàng",
          // };
          // const newUser = {
          //   status: "success",
          //   token: user.accessToken,
          //   user: userObj,
          // };
          // localStorage.setItem("user", JSON.stringify(newUser));
          // localStorage.setItem("token", user.accessToken);
          dispatch(createUser1(userObj));

          setTimeout(() => {
            const getUser = async () => {
              await fetch(
                "http://127.0.0.1:8080/api/v1/users/getUserLoginOtp",
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                  },
                  body: JSON.stringify({
                    phoneNumber: user.phoneNumber,
                  }),
                }
              )
                .then((response) => {
                  if (response.status === 200) return response.json();
                  throw new Error("authentication has been failed!");
                })
                .then((resObject) => {
                  console.log("resObject", resObject);
                  localStorage.setItem("user", JSON.stringify(resObject));
                  localStorage.setItem("token", resObject.token);
                  if (resObject) {
                    history.push("/");
                  }
                })
                .catch((err) => {
                  console.log("err", err);
                });
            };
            getUser();
          }, 1000);
        })
        .catch((err) => {
          console.log("err", err);
        });
      console.log("OTP", otp);
    }
  };
  return (
    <Box>
      <Formik value={formik}>
        <Form onSubmit={requestOTP}>
          <PhoneInput
            className="px-3 py-3"
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="+84xxxxx"
            defaultCountry="VN"
          />
          <Button type="submit">Send</Button>
          {expandForm && (
            <TextField
              autoFocus
              margin="dense"
              values={OTP}
              onChange={verifyOTP}
              label="Mã OTP"
              type="text"
              fullWidth
              variant="standard"
            />
          )}
          <Box id="captcha"></Box>
        </Form>
      </Formik>
    </Box>
  );
}
