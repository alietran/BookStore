import { Button, TextField, Box } from "@mui/material";
import { Form, Formik, useFormik } from "formik";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { authentication } from "../../firebaseConfig";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser1 } from "../../redux/action/userAction";

export default function Login() {
  const google = () => {
    window.open("http://localhost:8080/api/v1/users/google", "_self");
  };
  const [phoneNumber, setPhoneNumber] = useState("+84");
  const [activeError, setActiveError] = useState(false);
  const [expandForm, setExpandForm] = useState(false);

  const handleChangePhone = (e) => {
    setPhoneNumber(e.target.value);
  };
  const history = useHistory();
  const dispatch = useDispatch();

  const [OTP, setOTP] = useState("");

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
  const [openFormPhone, setOpenFormPhone] = useState(false);
  const handleOpenPhone = () => {
    setOpenFormPhone(!openFormPhone);
  };

  const requestOTP = (e) => {
    e.preventDefault();
    console.log("phoneNumber", phoneNumber);
    setActiveError(true);
    if (phoneNumber.length >= 10) {
      setActiveError(false);

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
    <div>
      <div className="text-center p-20 rounded-lg max-w-4xl bg-white my-4 mx-auto">
        <div className="w-3/5 my-0 mx-auto">
          <div>
            <h5 className="text-xl">Chào mừng bạn đến với BookSotre</h5>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={google}
              sx={{
                backgroundColor: "#2D88FF",
                justifyContent: "space-between",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#57A0FF",
                },
                fontSize: "14px",
                fontWeight: "400",
                margin: "10px 0",
              }}
            >
              <img
                src="/img/media/social-facebook-logo.svg"
                alt="google"
                width="22"
                height="22"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1%) hue-rotate(184deg) brightness(103%) contrast(102%)",
                }}
              />
              <div className="normal-case">Tiếp tục với Facebook</div>
              <div className="opacity-0">T</div>
            </Button>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={google}
              sx={{
                backgroundColor: "#DC4E42",
                justifyContent: "space-between",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#E37168",
                },
                margin: "10px 0",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              <img
                src="/img/media/social-google-logo.svg"
                alt="google"
                width="22"
                height="22"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1%) hue-rotate(184deg) brightness(103%) contrast(102%)",
                }}
              />
              <div className="normal-case">Tiếp tục với Google</div>
              <div className="opacity-0">T</div>
            </Button>
            <span> Hoặc</span>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              onClick={handleOpenPhone}
              sx={{
                backgroundColor: "#fff",
                justifyContent: "space-between",
                color: "#000000",
                "&:hover": {
                  opacity: "0.9",
                },
                margin: "10px 0",
                fontSize: "14px",
                border: "1px solid rgb(20, 53, 195)",
                fontWeight: "400",
              }}
            >
              <img
                src="/img/media/social-phone-logo.svg"
                alt="google"
                width="22"
                height="22"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(44%) sepia(76%) saturate(2915%) hue-rotate(325deg) brightness(97%) contrast(94%)",
                }}
              />
              <div className="normal-case">Tiếp tục với số điện thoại</div>
              <div className="opacity-0">T</div>
            </Button>
            <Formik>
              <Form onSubmit={requestOTP}>
                {openFormPhone && !expandForm && (
                  <>
                    <div className="mb-5 text-sm">
                      Sử dụng số điện thoại để Đăng nhập hoặc Đăng ký tài khoản
                      của bạn
                    </div>
                    <TextField
                      fullWidth
                      autoComplete="code"
                      label="Số điện thoại"
                      value={phoneNumber}
                      onChange={handleChangePhone}
                    />{" "}
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        marginTop: 3,
                        backgroundColor: "blue",
                        "&:hover": { backgroundColor: "blue" },
                      }}
                      endIcon={<SendIcon />}
                    >
                      Gửi
                    </Button>
                    {phoneNumber.length <= 10 && activeError && (
                      <span className="text-red-500 block mt-3">
                        Vui lòng nhập đúng định dạng số điện thoại
                      </span>
                    )}
                  </>
                )}
                {openFormPhone && expandForm && (
                  <>
                    <div className="mb-5 text-sm">
                      Vui lòng nhập số OTP đã được gửi về số điện thoại 0
                      {phoneNumber.slice(3)} để thực hiện đăng nhập
                    </div>
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
                    <div className="text-red-600 mt-16">Đã gửi OTP</div>
                  </>
                )}
                <Box id="captcha"></Box>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
