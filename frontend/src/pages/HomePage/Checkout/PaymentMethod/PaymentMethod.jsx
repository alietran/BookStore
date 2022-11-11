import { LoadingButton } from "@mui/lab";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../../../components/Label";
import {
  getPaymentList,
  updatePayment,
} from "../../../../redux/action/paymentAction";
import useStyles from "../Address/style";

export default function PaymentMethod() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { paymentList } = useSelector((state) => state.PaymentReducer);
  const [paymentIsDefault, setPaymentIsDefault] = useState();

  useEffect(() => {
    if (!paymentList) {
      dispatch(getPaymentList());
    }
  }, [paymentList]);

  useEffect(() => {
    let payment = paymentList?.data.filter((item) => item.isDefault);

    if (payment) {
      dispatch({
        type: "ORDER_PAYMENT",
        payload: {
          data: payment[0]?.name,
        },
      });
    }
  }, [paymentList]);

  const handlePayment = (item, index) => {
    console.log("item123", item);

    const paymentDefault = paymentList?.data.filter((item) => item.isDefault);

    paymentDefault[0].isDefault = false;
    dispatch(updatePayment(paymentDefault[0]._id, paymentDefault[0]));

    setTimeout(() => {
      item.isDefault = true;
      dispatch(updatePayment(item._id, item));
    }, 100);

    setTimeout(() => {
      dispatch({
        type: "ORDER_PAYMENT",
        payload: {
          data: item.name,
        },
      });
    }, 200);
  };

  return (
    <div style={{ padding: "10px 0" }}>
      <Typography
        component="div"
        variant="subtitle1"
        sx={{ marginBottom: "10px", padding: "0 20px 0 20px" }}
      >
        Phương thức thanh toán
      </Typography>
      <div className={classes.address} style={{ padding: " 0 20px 10px 20px" }}>
        {paymentList?.data.map((item, index) => {
          return (
            <div
              className={
                item.isDefault
                  ? `${classes.address__detail} ${classes.address__detail__hover}`
                  : `${classes.address__detail}`
              }
              onClick={(e) => handlePayment(item, index)}
            >
              <div className="flex mt-5">
                <img src={item.image} alt="" width={40} height={42} className="mr-1"/>
                <h1 className={`${classes.address__detailName} block`}>
                  {item.name}{" "}
                  {item.name === "Thanh toán bằng ví MoMo" ? (
                    <Label variant="ghost" color="primary" className="ml-3">
                      Khuyên dùng
                    </Label>
                  ) : (
                    ""
                  )}
                </h1>

                {/* <span className="block">
                  {item.name === "Thanh toán qua VNPAY" ? (
                    <p>
                      Thanh toán qua Internet Banking, Visa, Master, JCB,
                      VNPAY-QR
                    </p>
                  ) : (
                    ""
                  )}
                </span> */}
                {/* Có xử lý truyền id thì sd arrow func kh thì chỉ cần gọi handle */}
              </div>
              <p style={{ color: "#999999", margin: 0 }}></p>
              {item.isDefault && (
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
              )}{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}
