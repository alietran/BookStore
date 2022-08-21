import { Button, Container, Link, TextField } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import useStyles from "./style";
import HomeIcon from "@mui/icons-material/Home";
export default function Cart() {
  const classes = useStyles();
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
                Cart
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
                        <NavLink
                          className={`${classes["box__content-name-img"]} ${classes.center}`}
                          to={"/"}
                        >
                          <img src="../../../../img/phone.webp" alt="" />
                        </NavLink>
                        <p className={classes["box__content-name-product"]}>
                          PHONG VO TRADING SERVICE JOINT STOCK COMPANY
                        </p>
                      </div>
                      <div
                        className={`${classes["box__content-unitPrice"]} ${classes.center}`}
                      >
                        <p> Price</p>
                      </div>
                      <div
                        className={`${classes["box__content-quantity"]} ${classes.center} ${classes.amount}`}
                      >
                        <p>Quantity</p>
                      </div>
                      <div
                        className={`${classes["box__content-quantity"]} ${classes.center}`}
                      >
                        <p>Total</p>
                      </div>
                    </div>
                  </div>
                  <div  className={`${classes["cart__wrapper-content--box"]}`}>
                    <div
                      className={`${classes.box__content} `}
                    >
                      <div className={classes["box__content-name"]}>
                        <NavLink
                          className={`${classes["box__content-name-img"]} ${classes.center}`}
                          to={"/"}
                        >
                          <img src="../../../../img/phone.webp" alt="" />
                        </NavLink>
                        <p className={classes["box__content-name-product"]}>
                          PHONG VO TRADING SERVICE JOINT STOCK COMPANY
                        </p>
                      </div>
                      <div
                        className={`${classes["box__content-unitPrice"]} ${classes.center}`}
                      >
                        <p style={{ fontWeight: "600" }}>price</p>
                      </div>
                      <div
                      className={`${classes["box__content-quantity"]} ${classes.center} ${classes.quantity}`}
                    >
                      <div className={classes["box__content-quantity-detail"]}>
                        <button className="plusItem">
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
                        <input className={classes.quantityValue} value="20" />
                        
                        <button className="dashItem">
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

                      <div className={classes.delete}>Delete</div>
                    </div>

                      <div
                        className={`${classes["box__content-quantity"]} ${classes.center}`}
                      >
                        <p style={{ fontWeight: "600", color: "#1435c3" }}>
                          {" "}
                          price
                        </p>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes["cart__wrapper-content--right"]}>
              <div className={classes["cart__wrapper-content--info"]}>
                <h4>Select discount code/coupon</h4>
                <div className={classes.info__voucher}>
                  <div className={classes["info-text"]}>
                    <input type="text " placeholder="Enter your code" />
                  </div>

                  <Button variant="contained" className={classes.apply}>
                    Apply
                  </Button>
                </div>
              </div>
              <div className={classes["cart__wrapper-content--payment"]}>
                <div className={classes["cart__wrapper-content--info"]}>
                  <h4 className="text-xl">Payment</h4>
                  <div className={classes["info-payment"]}>
                    <table className={classes["payment-tab"]}>
                      <tbody>
                        <tr>
                          <td>Provisional </td>
                          <td>
                            <span>getTotalPrice</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Transport fee </td>
                          <td>
                            <span>FREE</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Total </td>
                          <td>
                            <span
                              style={{
                                color: "red",
                                fontSize: "18px",
                                fontWeight: "500",
                              }}
                            >
                              getTotalPrice
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="items-end">(VAT included)</div>
                  </div>
                  <Button
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
                    CONTINUE
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
