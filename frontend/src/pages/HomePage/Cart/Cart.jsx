import { Button, Container, Link, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import useStyles from "./style";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
export default function Cart() {
  const classes = useStyles();
  const { total } = useSelector((state) => state.CartReducer);
  console.log("total", total);
  const history = useHistory()
  // console.log("cart", cart);

  // let cartList = localStorage.getItem("cart")
  //   ? JSON.parse(localStorage.getItem("cart"))
  //   : null;

  let cart = JSON.parse(localStorage.getItem("cart"));
  // console.log("cartList", cartList);

  const totalPrice = cart?.reduce(
    (total, item) =>
      // console.log("item", item)
      (total = total + item.price * item.quantity),
    0
  );
  const dispatch = useDispatch();

  const hadleClickPlus = (maSP, tangGiam) => {
    console.log("hadleClickPlug", maSP);
    dispatch({
      type: "CHANGE_QUANTITY",
      payload: {
        data: cart,
        maSP,
        tangGiam,
      },
    });
  };

  const handleDelete = (maSP) => {
    console.log("maSP", maSP);
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        maSP,
      },
    });
  };

  const hadleClickMinus = (maSP, tangGiam) => {
    console.log("hadleClickMinus", maSP);
    dispatch({
      type: "CHANGE_QUANTITY",
      payload: {
        data: cart,
        maSP,
        tangGiam: false,
      },
    });
  };

  const handleSubmit = () => {
    history.push("/checkout")
  }

  return (
    <div>
      <div className={classes.container}>
        <div className="cart__wrapper ">
          <div className={classes["cart__wrapper-breadcrumbs"]}>
            <div className={classes.breadcrumbsIcon}>
              <Link className={classes.breadcrumbsIconLink} to={"/"}>
                <HomeIcon />
              </Link>
              <span className="css-rhmj3t pl-2"> &gt; </span>
            </div>
            <div className={classes.breadcrumbsName}>
              <NavLink className={classes.breadcrumbsLink} to={"/"}>
                Giỏ hàng
              </NavLink>
            </div>
          </div>
          <div className="flex">
            <div className={classes["cart__wrapper-content"]}>
              <div className={classes["cart__wrapper-content--main"]}>
                <div className={classes["cart__wrapper-content--left"]}>
                  <div className={classes["cart__wrapper-content--box"]}>
                    <div className={classes.box__content}>
                      <div className={classes["box__content-name"]}>
                        <NavLink className={`${classes.center}`} to={"/"}>
                          <img
                            style={{ width: "120px", height: "50px" }}
                            src="../../../../img/logo_white.png"
                            alt=""
                          />
                        </NavLink>
                        <p
                          className={`${classes["box__content-name-product"]} ${classes.bookName} `}
                        >
                          PHONG VO TRADING SERVICE JOINT STOCK COMPANY
                        </p>
                      </div>
                      <div
                        className={`${classes["box__content-unitPrice"]} ${classes.center}`}
                      >
                        <p> Giá</p>
                      </div>
                      <div
                        className={`${classes["box__content-quantity"]} ${classes.center} ${classes.amount}`}
                      >
                        <p>Số lượng</p>
                      </div>
                      <div
                        className={`${classes["box__content-quantity"]} ${classes.center}`}
                      >
                        <p>Tổng tiền</p>
                      </div>
                    </div>
                  </div>
                  {cart?.map((item, index) => (
                    <div className={`${classes["cart__wrapper-content--box"]}`}>
                      <div className={`${classes.box__content} `}>
                        <div className={classes["box__content-name"]}>
                          <NavLink className={` ${classes.center}`} to={"/"}>
                            <img
                              style={{ width: "100px", height: "80px" }}
                              src={item.image}
                              alt=""
                            />
                          </NavLink>
                          <p className={classes["box__content-name-product"]}>
                            {item.name}
                          </p>
                        </div>
                        <div
                          className={`${classes["box__content-unitPrice"]} ${classes.center}`}
                        >
                          <p style={{ fontWeight: "600" }}>
                            {" "}
                            {item.price.toLocaleString()}{" "}
                          </p>
                        </div>
                        <div
                          className={`${classes["box__content-quantity"]} ${classes.center} ${classes.quantity}`}
                        >
                          <div
                            className={classes["box__content-quantity-detail"]}
                          >
                            <button
                              className="plusItem"
                              onClick={() => hadleClickMinus(item.id, false)}
                              disabled={item.quantity === 1 ? true : false}
                              // onClick={dispatch({
                              //   type: "TANG_GIAM_SL",
                              //   payload: {
                              //     tangGiam: true,
                              //   },
                              // })}
                            >
                              <span>
                                <svg
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  size="16"
                                  color="textPrimary"
                                  height="16"
                                  width="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12Z"
                                    fill="#82869E"
                                  ></path>
                                </svg>
                              </span>
                            </button>
                            <input
                           
                              className={classes.quantityValue}
                              value={item.quantity}
                            />

                            <button
                              className="dashItem"
                              onClick={
                                (e) => hadleClickPlus(item.id, true)

                                //   dispatch({
                                //   type: "TANG_GIAM_SL",
                                //   payload: {
                                //     tangGiam: false,
                                //   },
                                // })}
                              }
                            >
                              <span>
                                <svg
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  size="16"
                                  color="textPrimary"
                                  height="16"
                                  width="16"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M12.75 4C12.75 3.58579 12.4142 3.25 12 3.25C11.5858 3.25 11.25 3.58579 11.25 4V11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H11.25V20C11.25 20.4142 11.5858 20.75 12 20.75C12.4142 20.75 12.75 20.4142 12.75 20V12.75H20C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25H12.75V4Z"
                                    fill="#82869E"
                                  ></path>
                                </svg>
                              </span>
                            </button>
                          </div>

                          <div
                            className={`${classes.delete} text-blue-600 `}
                            onClick={() => handleDelete(item.id)}
                          >
                            Xóa
                          </div>
                        </div>

                        <div
                          className={`${classes["box__content-quantity"]} ${classes.center}`}
                        >
                          <p style={{ fontWeight: "600", color: "#1435c3" }}>
                            {" "}
                            {(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={classes["cart__wrapper-content--right"]}>
              <div className={classes["cart__wrapper-content--info"]}>
                <h4>Chọn mã giảm giá</h4>
                <div className={classes.info__voucher}>
                  <div className={classes["info-text"]}>
                    <input type="text " placeholder="Enter your code" />
                  </div>

                  <Button variant="contained" className={classes.apply}>
                    Áp dụng
                  </Button>
                </div>
              </div>
              <div className={classes["cart__wrapper-content--payment"]}>
                <div className={classes["cart__wrapper-content--info"]}>
                  <h4 className="text-xl">Thanh toán</h4>
                  <div className={classes["info-payment"]}>
                    <table className={classes["payment-tab"]}>
                      <tbody>
                        <tr>
                          <td>Tạm tính </td>
                          <td>
                            <span>{(1 * totalPrice)?.toLocaleString()}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Phí vận chuyển </td>
                          <td>
                            <span>Miễn phí</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Tổng tiền </td>
                          <td>
                            <span
                              style={{
                                color: "red",
                                fontSize: "18px",
                                fontWeight: "500",
                              }}
                            >
                              {totalPrice?.toLocaleString()} ₫
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="items-end">(Đã bao gồm thuế)</div>
                  </div>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                      marginTop: "15px",
                      color: "#fff",
                      width: "100%",
                      border: "none",
                      padding: "10px",
                      fontWeight: 500,
                      borderRadius: "5px",
                      // backgroundColor: "#1435c3",
                    }}
                  >
                    TIẾP TỤC
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
