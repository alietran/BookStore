import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderByUser,
  updateOrder,
} from "../../../../redux/action/orderAction";
import { NavLink, useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import useStyles from "./style";
import moment from "moment";
import RatingItem from "../Rating/RatingItem";
import CustomDialog from "../../../../components/CustomDialog/CustomDialog";
import paymentAPI from "../../../../api/paymentAPI";
import {
  createRating,
  resetRating,
} from "../../../../redux/action/ratingAction";
import Swal from "sweetalert2";
import { Box } from "@mui/material";
export default function OrderHistory() {
  const { orderByUser, successUpdateOrder, orderList } = useSelector(
    (state) => state.OrderReducer
  );
  const [openConfirm, setOpenConfirm] = useState(false);
  const [doneConfirm, setDoneConfirm] = useState("");
  const { rating, createRatingDetail,flag } = useSelector(
    (state) => state.RatingReducer
  );
  console.log("flag", flag);
  const [hadRating, setHadRating] = useState(true);
  const handleCancel = () => {
    setOpenConfirm(false);
  };
  console.log("hadRating", hadRating);
  console.log("rating12", rating);
  console.log("orderByUser", orderByUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const [idItem, setIdItem] = useState("");
  const [item, setItem] = useState("");
  useEffect(() => {
    if (orderByUser === null) dispatch(getOrderByUser());
  }, []);

  useEffect(() => {
    if (orderList === null) dispatch(getOrderByUser());
  }, [orderList]);

  useEffect(() => {
    if (successUpdateOrder !== null) dispatch(getOrderByUser());
  }, [successUpdateOrder]);

  useEffect(() => {
    if (createRatingDetail) {
      dispatch(getOrderByUser());
      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   title: "Cám ơn bạn đã đánh giá",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
    }
  }, [createRatingDetail]);

  // createRatingDetail;
  const [open, setOpen] = React.useState(false);
const [openDelete, setOpenDelete] = React.useState(false);
  const handleDoneOrder = (id) => {
    console.log("54645",id)
    setOpenConfirm(true);
    setDoneConfirm(id)
    // dispatch(
    //   updateOrder(order.id, {
    //     status: "Đã nhận",
    //   })
    // );
  };
    const handleCloseDelete = () => {
      setOpenDelete(false);
    };
   const handleClickOpenDelete = (order) => {
    console.log("#53",order)
     setOpenDelete(true);
     setIdItem(order)
   };
  const handleConfirm = (order) => {

    dispatch(
      updateOrder(doneConfirm, {
        status: "Đã nhận",
        receiveDay: moment().format(),
      })
    );
    setOpenConfirm(false);
  };
  console.log("successUpdateOrder", successUpdateOrder);
  const handlePushRating = () => {
    // console.log("rating", rating);
    dispatch(createRating(rating));
    setOpen(false);
    setHadRating(false);
    // dispatch(
    //   updateOrder(rating.id, {
    //     status: "Đã đánh giá",
    //   })
    // );
     Swal.fire({
       icon: "success",
       title: "Thành công",
       text: "Đánh giá của bạn đang chờ duyệt, vui lòng đợi!",
     });

  };

  console.log("orderByUser", orderByUser);
  const handleClickCancel = async () => {
    console.log("order", idItem);
    console.log("order.id", idItem.id);
    if (idItem?.paymentMethod?.name === "Thanh toán bằng ví MoMo") {
      // console.log("orderDetailList[0]", orderDetailList[0]);

      const { data } = await paymentAPI.refundMoMoPayment({
        // _id: idShowtime,
        amount: idItem.totalPrice,
        transId: Number(idItem.paymentMethod.transId),
      });
      console.log("123data", data);
      if (data?.resultCode == 0) {
        dispatch(
          updateOrder(idItem.id, {
            status: "Đã huỷ",
          })
        );
        setOpen(false);
      } else {
        console.log("Error:", data?.messages);
      }
    } else {
      console.log("idItem", idItem);
      dispatch(
        updateOrder(idItem, {
          status: "Đã hủy",
        })
      );
      setOpenDelete(false);
    }
    console.log("idItem", idItem);
    dispatch(
      updateOrder(idItem.id, {
        status: "Đã hủy",
      })
    );
   setOpenDelete(false);
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
              marginBottom:"10px",
              padding: "20px",
              boxShadow: "rgb(0 0 0 / 10%) 0px 0px 5px 2px",
              borderRadius: "15px",
              border: "1px solid white",
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
                <div >
                  {" "}
                  <NavLink
                    to={`/productDetail/${detail.book.id}`}
                    className="truncate"
                  >
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
                          <p className="text-black">{detail.book.name}</p>
                          <p className="text-black">
                            Số lượng: {detail.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-red-500">
                        {" "}
                        {detail.book.price.toLocaleString()}
                      </p>
                    </div>
                  </NavLink>
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
                    onClick={()=>handleDoneOrder(order.id)}
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
                <>
                  {" "}
                  <Button
                    color="error"
                    variant="outlined"
                    style={{ marginLeft: "10px" }}
                    onClick={
                      () => handleClickOpenDelete(order)
                      // handleClickCancel(order)
                    }
                  >
                    Hủy
                  </Button>
                  <CustomDialog
                    open={openDelete}
                    handleClose={handleCloseDelete}
                    dialogSize="sm"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Hủy đơn hàng"}
                    </DialogTitle>
                    <DialogContent>
                      Bạn chắc chắn muốn hủy đơn hàng này?
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleCloseDelete}
                        sx={{ textTransform: "none !important" }}
                        // className="normal-case "
                      >
                        Hủy bỏ
                      </Button>
                      <Button
                        variant="contained"
                        onClick={
                          handleClickCancel
                        }
                        sx={{ textTransform: "none !important" }}
                        autoFocus
                      >
                        Đồng ý
                      </Button>
                    </DialogActions>
                  </CustomDialog>
                </>
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
            disabled={ flag ? false : true}
            onClick={handlePushRating}
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
