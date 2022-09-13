import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser } from "../../../../redux/action/orderAction";
import { useHistory } from "react-router-dom";

export default function OrderHistory() {
  const { orderByUser } = useSelector((state) => state.OrderReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
   
      dispatch(getOrderByUser());
    
  
  }, []);
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
              marginTop: "10px",
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
                  <p>{detail.book.price.toLocaleString()}</p>
                </div>
              );
            })}

            <hr />
            <div className=" text-right leading-4 pt-3">
              <p>Tổng tiền: {order?.totalPrice.toLocaleString()}</p>
            </div>
            <div className=" flex justify-end">
              {" "}
              <Button
                variant="contained"
                onClick={() => handleDetail(order.id)}
              >
                Xem chi tiết
              </Button>
              <Button variant="outlined" style={{ marginLeft: "10px" }}>
                Đánh giá
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
