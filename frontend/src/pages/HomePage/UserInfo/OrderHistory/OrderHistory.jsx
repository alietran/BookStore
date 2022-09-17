import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser } from "../../../../redux/action/orderAction";
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import useStyles from "./style";

import RatingItem from "../Rating/RatingItem";

export default function OrderHistory() {
  const { orderByUser } = useSelector((state) => state.OrderReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [item, setItem] = useState("");
  useEffect(() => {
    dispatch(getOrderByUser());
  }, []);
  const [open, setOpen] = React.useState(false);

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
              <Button
                variant="contained"
                onClick={() => handleDetail(order.id)}
              >
                Xem chi tiết
              </Button>
              <Button
                variant="outlined"
                style={{ marginLeft: "10px" }}
                onClick={() => handleClickOpen(order.id)}
              >
                Đánh giá
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="sm"
                fullWidth={true}
              >
                <DialogTitle id="alert-dialog-title">
                  {"Đánh giá sản phẩm"}
                </DialogTitle>
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

                            <p>{item[0]?.totalPrice.toLocaleString()}</p>
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
                    onClick={handleClose}
                    sx={{ textTransform: "none !important" }}
                    autoFocus
                  >
                    Đồng ý
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        );
      })}
    </div>
  );
}
