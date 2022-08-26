import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import useStyles from "../Address/style";

export default function PaymentMethod() {
      const classes = useStyles();
  return (
    <div style={{ padding: "10px 0" }}>
      <Typography
        component="div"
        variant="subtitle1"
        sx={{ marginBottom: "10px", padding: "0 20px 0 20px" }}
      >
        Phương thức thanh toán
      </Typography>
      <div className={classes.address} style={{ padding: " 0 24px 10px 24px" }}>
        <div className={classes.address__detail}>
          <div className="">
            <h1 className={`${classes.address__detailName} block`}>
              Thanh toán qua PayPal
            </h1>
            <span className="block">
              Thanh toán qua Internet Banking, Visa, Master, JCB, VNPAY-QR
            </span>
            {/* Có xử lý truyền id thì sd arrow func kh thì chỉ cần gọi handle */}
          </div>
          <p style={{ color: "#999999", margin: 0 }}></p>

          <div>
            <div className={classes.border__checked}></div>
            <span className={classes.checked}>
              <img
                className={classes.address__img}
                src="./img/icon-check.svg"
                alt="icon-check"
              />
            </span>
          </div>

          {/* {item.isDefault && ( */}
          <div>
            <div className={classes.border__checked}></div>
            <span className={classes.checked}>
              <img
                className={classes.address__img}
                src="./img/icon-check.svg"
                alt="icon-check"
              />
            </span>
          </div>
          {/* )} */}
        </div>
        <div className={classes.address__detail}>
          <div className="">
            <h1 className={`${classes.address__detailName} block`}>
              Thanh toán khi nhận hàng
            </h1>
           
            {/* Có xử lý truyền id thì sd arrow func kh thì chỉ cần gọi handle */}
          </div>
          <p style={{ color: "#999999", margin: 0 }}></p>

          <div>
            <div className={classes.border__checked}></div>
            <span className={classes.checked}>
              <img
                className={classes.address__img}
                src="./img/icon-check.svg"
                alt="icon-check"
              />
            </span>
          </div>

          {/* {item.isDefault && ( */}
          <div>
            <div className={classes.border__checked}></div>
            <span className={classes.checked}>
              <img
                className={classes.address__img}
                src="./img/icon-check.svg"
                alt="icon-check"
              />
            </span>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
