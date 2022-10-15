import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "./style";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getPromotionList } from "../../../../redux/action/promotionAction";
import moment from "moment";
import { identity, stubTrue } from "lodash";
import { useSnackbar } from "notistack";
import CustomDialog from "../../../../components/CustomDialog/CustomDialog";
import ModalDialog from "../../../../components/ModalDialog/DialogTitle";
export default function Voucher({ totalPrice }) {
  const [open, setOpen] = React.useState(false);
  const [stroke, setStroke] = useState(false);
  const [useCode, setUseCode] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  // let [total, setTotal] = useState(totalPrice);

  let [buttonIsChoose, setButtonIsChoose] = useState("");
  let { promotionList } = useSelector((state) => state.PromotionReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!promotionList) {
      dispatch(getPromotionList());
    }
  }, [promotionList]);

  console.log("promotionList", promotionList);
  // console.log("voucher12415", voucher);
  // console.log("totalPrice", typeof totalPrice);
  // let [totalPrice, setTotalPrice] = useState(totalPriceStore);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const hanldeNotApply = (index) => {
    buttonIsChoose = "";
    setButtonIsChoose(buttonIsChoose);
    const discount = 0;
    totalPrice = totalPrice + discount;
    setStroke(!stroke);
    dispatch({
      type: "TONG_TIEN",
      payload: {
        data: {
          discount: 0,
        },
      },
    });
  };
  const hanldeSubmitCode = () => {
    const item = promotionList?.data.map((itemChoose, index) => {
      if (itemChoose.code === useCode) {
        // buttonIsChoose = index;
        setButtonIsChoose(index);
        setUseCode(index);
        setTimeout(() => {
          enqueueSnackbar(
            `Mã giảm  giá ${itemChoose.code} đã áp dụng thành công!`,
            {
              variant: "success",
            }
          );
        }, 100);
        return itemChoose;
      }
      setOpen(false);
    });

    dispatch({
      type: "TONG_TIEN",
      payload: {
        data: {
          miniPrice: Number(item[0].miniPrice),
          discount: Number(item[0].price),
          voucherId: item[0]._id,
        },
      },
    });
  };
  const codeApply = (e) => {
    setUseCode(e.target.value);
  };

  console.log("useCode", useCode);


  const hanldeApply = (index, itemPro) => {
    buttonIsChoose = index;
    setButtonIsChoose(buttonIsChoose);

    setStroke(!stroke);
    setTimeout(() => {
      enqueueSnackbar("Mã giảm  giá đã áp dụng thành công!", {
        variant: "success",
      });
    }, 100);
    // const item = promotionList?.data.filter((item) => item.id === itemPro._id);
    //     console.log("item", item);
    const item = promotionList?.data.filter((item) => item.id === itemPro._id);
    console.log("item", item);
    // totalPrice = totalPrice - Number(item[0].price);
    console.log("totalPrice trong", totalPrice);
    //  settotalPrice(totalPrice);
    dispatch({
      type: "TONG_TIEN",
      payload: {
        data: {
          miniPrice: Number(item[0].miniPrice),
          discount: Number(item[0].price),
          voucherId: item[0]._id,
        },
      },
    });
  };

  console.log("promotionList", promotionList);
  console.log("useCode", useCode);

  const classes = useStyles();
  return (
    <div
      style={{
        boxShadow: "rgb(0 0 0 / 10%) 0px 0px 5px 2px",
        borderRadius: "15px",
        border: "1px solid white",
      }}
    >
      <div className={classes["cart__wrapper-content--info"]}>
        <h4>Khuyến mãi</h4>
        <div className={classes.info__voucher}>
          <img src="../../../../img/svgexport-9.svg" />
          <p
            style={{ color: "#2381e7", paddingLeft: "10px" }}
            onClick={handleClick}
          >
            Chọn hoặc nhập mã khuyến mãi khác
          </p>
        </div>
      </div>
      <CustomDialog open={open} handleClose={handleClose} dialogSize="xs">
        <ModalDialog onClose={handleClose}>Khuyến mãi</ModalDialog>
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#f8f8f8",
            borderRadius: "10px",
            padding: "5px",
            display: "flex",
            flex: "1 1 0",
            justifyContent: " space-between",
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <input
            style={{ width: "75%" }}
            className={classes.code}
            type="text"
            onChange={codeApply}
            placeholder="Nhập mã khuyến mãi"
          />

          <Button
            disabled={useCode === "" ? true : false}
            variant="contained"
            onClick={hanldeSubmitCode}
          >
            Áp dụng
          </Button>
        </Box>

        <Box>
          <div className="flex justify-between p-3 relative z-10">
            <h3>Mã giảm giá</h3>
            <p>Áp dụng tối đa: 1</p>
          </div>

          <div className={`${classes.coupon__list} pb-3`}>
            {promotionList?.data
              .filter((voucher) => voucher.activeCode === "Đang diễn ra")
              .map((item, index) => {
                console.log("buttonisCHode", buttonIsChoose);

                return (
                  <div>
                    {" "}
                    {totalPrice < Number(item.miniPrice) ? (
                      <div className={classes.coupon__item}>
                        <img
                          style={{
                            height: "127px",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          }}
                          src="../../../../img/svgexport-29.svg"
                          alt=""
                          className="shadow-inner"
                        />
                        {/* )} */}

                        <div className={classes.coupon__content}>
                          {/* {totalPrice} {Number(item.miniPrice)} */}

                          <img
                            src="../../../../img/dk.svg"
                            alt=""
                            style={{
                              position: "absolute",
                              width: "82px",
                              height: "64px",
                              bottom: "4px",
                              right: "4px",
                            }}
                          />
                          <div className={classes.coupon__image}>
                            <div
                              style={{
                                backgroundColor: "red",
                                borderRadius: "50%",
                                width: "50px",
                                height: "50px",
                                position: "absolute",
                                border: "2px solid gold",
                              }}
                            >
                              <img
                                src="../../../../img/svgexport-1.svg"
                                alt=""
                                style={{
                                  top: "25%",
                                  left: "25%",
                                  position: "absolute",
                                }}
                              />
                            </div>
                            <p
                              style={{
                                marginBottom: "-70px",
                              }}
                            >
                              {item.title}
                            </p>
                          </div>
                          <div className={classes["coupon__content-right"]}>
                            <div
                              className="pr-12"
                              style={{ paddingTop: "10px" }}
                            >
                              {" "}
                              <h4>Giảm {item.price}</h4>
                              <p>Cho đơn hàng từ {item.miniPrice}</p>
                            </div>
                            <div
                              style={{
                                marginTop: "auto",
                                display: "flex",
                                alignItems: "flex-end",
                              }}
                            >
                              <p className="m-0">
                                {" "}
                                HSD:{" "}
                                {moment(item.expiryDate).format("DD/MM/YYYY")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={classes.coupon__item}>
                        <img
                          style={{
                            height: "132px",
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          }}
                          src="../../../../img/svgexport-29.svg"
                          alt=""
                          className="shadow-inner"
                        />
                        <div className={classes.coupon__content}>
                          <div className={classes.coupon__image}>
                            <div
                              style={{
                                backgroundColor: "red",
                                borderRadius: "50%",
                                width: "50px",
                                height: "50px",
                                position: "absolute",
                                border: "2px solid gold",
                              }}
                            >
                              <img
                                src="../../../../img/svgexport-1.svg"
                                alt=""
                                style={{
                                  top: "25%",
                                  left: "25%",
                                  position: "absolute",
                                }}
                              />
                            </div>
                            <p
                              style={{
                                marginBottom: "-70px",
                              }}
                            >
                              {item.title}
                            </p>
                          </div>
                          <div className={classes["coupon__content-right"]}>
                            <div
                              className="pr-12"
                              style={{ paddingTop: "10px" }}
                            >
                              {" "}
                              <h4>Giảm {item.price}</h4>
                              <p>Cho đơn hàng từ {item.miniPrice}</p>
                            </div>
                            <div
                              style={{
                                marginTop: "auto",
                                display: "flex",
                                alignItems: "flex-end",
                              }}
                            >
                              <p className="m-0">
                                {" "}
                                HSD:{" "}
                                {moment(item.expiryDate).format("DD/MM/YYYY")}
                              </p>
                              {useCode === " " || buttonIsChoose !== index ? (
                                <button
                                  onClick={() => {
                                    hanldeApply(index, item);
                                  }}
                                  className={classes.btn__apply}
                                  data-view-id="coupon_apply_button"
                                  data-view-label="WYR6X2JSYJ2M75V7C4DB"
                                  type="primary"
                                >
                                  Áp Dụng
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    hanldeNotApply(index);
                                  }}
                                  className={classes.btn__apply}
                                  data-view-id="coupon_apply_button"
                                  data-view-label="WYR6X2JSYJ2M75V7C4DB"
                                  type="primary"
                                >
                                  Bỏ chọn
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </Box>
      </CustomDialog>
    </div>
  );
}
