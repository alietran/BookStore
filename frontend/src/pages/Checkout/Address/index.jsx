import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import useStyles from "./style";

export default function Address() {
  const classes = useStyles();

  return (
    <div>
      <Typography component="div" variant="subtitle1">
        Thông tin nhận hàng
      </Typography>
      <div className={classes.address}>
        <div className={classes.address__detail}>
          <div className={classes.address__option}>
            <p className={classes.address__detailName}>Thành Đạt</p>
            <div>
              <img
                className={classes.address__img}
                src="./img/icon-edit.svg"
                alt="icon-edit"
              />
            </div>
            <div>
              <i
                className="fa-solid fa-trash-can"
                style={{ color: "#3498DB", padding: " 0 10px" }}
              ></i>
            </div>
          </div>
          <p style={{ color: "#999999" }}>Đia chỉ </p>
          <p>phone</p>
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
        </div>
        <div className={classes.address__detail}>
          <div className={classes.address__detailAdd}>
            <i className="fa-solid fa-plus"></i>
            <p style={{ color: "#999999" }}>Add address</p>
          </div>
        </div>
      </div>
    </div>
  );
}
