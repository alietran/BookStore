import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderByUser,
  updateOrder,
} from "../../../../redux/action/orderAction";
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import useStyles from "./style";

import RatingItem from "../Rating/RatingItem";
import CustomDialog from "../../../../components/CustomDialog/CustomDialog";
import paymentAPI from "../../../../api/paymentAPI";
import { createRating } from "../../../../redux/action/ratingAction";
import Swal from "sweetalert2";
import { Box } from "@mui/material";
export default function OrderHistory() {
  const { orderByUser, successUpdateOrder } = useSelector(
    (state) => state.OrderReducer
  );
  const [openConfirm, setOpenConfirm] = useState(false);
  const { rating, createRatingDetail } = useSelector(
    (state) => state.RatingReducer
  );
  console.log("createRatingDetail", createRatingDetail);
  const [hadRating, setHadRating] = useState(true);
  const handleCancel = () => {
    setOpenConfirm(false);
  };
  console.log("hadRating", hadRating);
  console.log("rating12", rating);
  const dispatch = useDispatch();
  const history = useHistory();
  const [item, setItem] = useState("");
  useEffect(() => {
    if (orderByUser === null) dispatch(getOrderByUser());
  }, [orderByUser]);

  useEffect(() => {
    if (successUpdateOrder) dispatch(getOrderByUser());
  }, [successUpdateOrder]);

  useEffect(() => {
    if (createRatingDetail) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Cám ơn bạn đã đánh giá",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [createRatingDetail]);
  const [open, setOpen] = React.useState(false);

  const handleDoneOrder = (order) => {
    console.log("order", order);
    setOpenConfirm(true);
    // dispatch(
    //   updateOrder(order.id, {
    //     status: "Đã nhận",
    //   })
    // );
  };
  const handleConfirm = (order) => {
    dispatch(
      updateOrder(order.id, {
        status: "Đã nhận",
      })
    );
    setOpenConfirm(false);
  };
  console.log("successUpdateOrder", successUpdateOrder);
  const handlePushRating = (rating) => {
    dispatch(createRating(rating));
    setOpen(false);
    setHadRating(false);
  };

  console.log("orderByUser", orderByUser);
  const handleClickCancel = async (order) => {
    console.log("order", order);
    console.log("order.id", order.id);
    if (order?.paymentMethod?.name === "Thanh toán bằng ví MoMo") {
      // console.log("orderDetailList[0]", orderDetailList[0]);

      const { data } = await paymentAPI.refundMoMoPayment({
        // _id: idShowtime,
        amount: order.totalPrice,
        transId: Number(order.paymentMethod.transId),
      });
      console.log("123data", data);
      if (data?.resultCode == 0) {
        dispatch(
          updateOrder(order.id, {
            status: "Đang xử lý",
          })
        );
        setOpen(false);
      } else {
        console.log("Error:", data?.messages);
      }
    } else {
      dispatch(
        updateOrder(order.id, {
          status: "Đã hủy",
        })
      );
      setOpen(false);
    }

    dispatch(
      updateOrder(order.id, {
        status: "Đã hủy",
      })
    );
    setOpen(false);
  };
  const handleClickOpen = (id) => {
    setOpen(true);
    const a = orderByUser?.filter((item) => item.id === id);
    setItem(a);
  };
  console.log("item", item);

  const handleClose = () => {
    dispatch({
      type: "CHANGE_RATING",
      payload: {
        cannel: "",
      },
    });
    setOpen(false);
  };

  console.log("orderByUser", orderByUser);
  const handleDetail = (id) => {
    history.push(`/orderDetail/${id}`);
  };
  return (
    <div>
      {orderByUser?.map((order, index) => {
        return (
          <div
            style={{
              backgroundColor: "white",
              marginTop: "20px",
              padding: "20px",
            }}
          >
            <div className="flex ">
              <p className="flex">
                <img
                  src="../../img/delivery_done.png"
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                {order.status}
              </p>
            </div>
            <hr />
            {order?.orderDetail?.map((detail, index) => {
              return (
                <div>
                  {" "}
                  <div className="flex justify-between py-3">
                    <div className="flex">
                      <div>
                        {" "}
                        <img
                          src={detail.book.image}
                          style={{
                            width: "80px",
                            height: "80px",
                            marginRight: "5px",
                          }}
                        />
                      </div>
                      <div>
                        <p>{detail.book.name}</p>
                        <p>Số lượng: {detail.quantity}</p>
                      </div>
                    </div>
                    <p className="text-red-500">
                      {" "}
                      {detail.book.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}

            <hr />
            <div className=" text-right leading-4 pt-3">
              <p>
                Tổng tiền:{" "}
                <span className="text-red-500 text-lg font-bold">
                  {" "}
                  {order?.totalPrice.toLocaleString()}
                </span>
              </p>
            </div>
            <div className=" flex justify-end">
              {" "}
              {/* {order.status === "Đã nhận" ? } */}
              {order.status === "Đã nhận" && hadRating ? (
                <Button
                  variant="outlined"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleClickOpen(order.id)}
                >
                  Đánh giá
                </Button>
              ) : (
                ""
              )}
              {order.status === "Đã giao hàng" ? (
                <Box>
                  {" "}
                  <Button
                    variant="contained"
                    onClick={handleDoneOrder}
                    sx={{ marginRight: "10px" }}
                  >
                    Đã nhận
                  </Button>
                  <CustomDialog
                    open={openConfirm}
                    handleClose={handleCancel}
                    dialogSize="xs"
                    overlayStyle={{ backgroundColor: "transparent" }}
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Xác nhận đơn hàng"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn đã nhận đơn hàng này.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCancel}>Hủy</Button>
                      <Button onClick={() => handleConfirm(order)} autoFocus>
                        Đồng ý
                      </Button>
                    </DialogActions>
                  </CustomDialog>
                </Box>
              ) : (
                ""
              )}
              <Button
                color="info"
                variant="contained"
                onClick={() => handleDetail(order.id)}
              >
                Xem chi tiết
              </Button>
              {order.status === "Đang xử lý" ? (
                <Button
                  color="error"
                  variant="outlined"
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleClickCancel(order)}
                >
                  Hủy
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
      <CustomDialog open={open} handleClose={handleClose} dialogSize="sm">
        <DialogTitle id="alert-dialog-title">{"Đánh giá sản phẩm"}</DialogTitle>
        <DialogContent>
          {item &&
            item[0]?.orderDetail.map((itemDetail, index) => {
              return (
                <div>
                  <div className="flex justify-between py-3">
                    <div className="flex">
                      <div>
                        {" "}
                        <img
                          src={itemDetail?.book?.image}
                          style={{
                            width: "80px",
                            height: "80px",
                            marginRight: "5px",
                          }}
                        />
                      </div>
                      <div>
                        <p>{itemDetail?.book?.name}</p>
                        <p>Số lượng: {itemDetail?.quantity}</p>
                      </div>
                    </div>

                    <p>{(itemDetail?.price).toLocaleString()}</p>
                  </div>
                  <RatingItem productItem={itemDetail} />
                </div>
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClose}
            sx={{ textTransform: "none !important" }}
            // className="normal-case "
          >
            Hủy bỏ
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handlePushRating(rating);
            }}
            sx={{ textTransform: "none !important" }}
            autoFocus
          >
            Đồng ý
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}
