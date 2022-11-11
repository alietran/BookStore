import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import useStyles from "./style";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import Voucher from "./Voucher/Voucher";
import { useSnackbar } from "notistack";
import CustomDialog from "../../../components/CustomDialog/CustomDialog";
export default function Cart() {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);
  const { discount, miniPrice } = useSelector((state) => state.CartReducer);
  const [totalCart, setTotalCart] = useState(0);

  const [itemCart, setItemCart] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  let idCard = "";
  console.log("miniPrice", typeof miniPrice);
  console.log("discount", discount);

  const history = useHistory();
  // console.log("cart", cart);

  // useEffect(() => {
  //   // total = total;
  // }, [total]);

  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  console.log("cart", cart);
  // cart.map((item,index)=>{

  // })
  const [quantity, setQuantity] = useState(1);
  const totalPrice = cart?.reduce(
    (total, item) =>
      // console.log("item", item)
      (total = total + item.price * item.quantity),
    0
  );

  useEffect(() => {
    dispatch({
      type: "TOTAL",
      payload: {
        data: {
          totalPrice,
        },
      },
    });
  }, [totalCart]);
  console.log("total totalPrice", totalPrice);

  useEffect(() => {
    console.log("miniPrice", miniPrice);
    console.log("totalCart125364", totalPrice);
    if (totalPrice < miniPrice) {
      setTotalCart(totalPrice);
      dispatch({
        type: "TONG_TIEN",
        payload: {
          data: {
            discount: 0,
          },
        },
      });
    } else {
      setTotalCart(totalPrice);
    }
  }, [totalPrice]);

  const dispatch = useDispatch();
  const handleChangeQuantity = (sp, e) => {
    const quanty = Number(e.target.value);
    setQuantity(quanty);
    console.log(
      "quanty24 sp.warehouse sp.quantity",
      quanty,
      sp.warehouse
      // sp.quantity
    );
    // console.log("sp.warehouse14", sp.warehouse);
    // console.log("sp.quantity124", sp.quantity);

    if (sp.warehouse >= quanty) {
      if (quanty === 0) {
        enqueueSnackbar(`Số lượng mua tối thiểu của sản phẩm này là 1 !`, {
          variant: "error",
        });
      } else {
        dispatch({
          type: "CHANGE_QUANTITY_NUMBER",
          payload: {
            data: cart,
            maSP: sp.id,
            quanty: Number(quanty),
          },
        });
      }
    } else {
      enqueueSnackbar(`Số lượng còn lại của sản phẩm này là ${sp.warehouse}!`, {
        variant: "error",
      });
    }
  };
  const hadleClickPlus = (maSP, tangGiam, item) => {
    console.log("hadleClickPlug", maSP);
    console.log("item", item);
    if (item.warehouse !== item.quantity) {
      dispatch({
        type: "CHANGE_QUANTITY",
        payload: {
          data: cart,
          maSP,
          tangGiam,
        },
      });
    } else {
      enqueueSnackbar("Số lượng đã vượt quá giới hạn trong kho!", {
        variant: "error",
      });
    }
  };
  const handleClickConfirm = (id) => {
    console.log("handleClickConfirm", id);
    setItemCart(id);
    setOpenConfirm(true);
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
    if (!user) {
      enqueueSnackbar("Vui lòng đăng nhập để đến bước tiếp theo!", {
        variant: "error",
      });
    } else {
      history.push("/checkout");
    }
  };
  const handleCancel = () => {
    setOpenConfirm(false);
  };
  //  const handleDelete = (maSP) => {
  //    console.log("maSP", maSP);
  //    dispatch({
  //      type: "REMOVE_ITEM",
  //      payload: {
  //        maSP,
  //      },
  //    });
  //  };
  const handleCloseConfirm = () => {
    console.log("item Confirm", idCard);
    // console.log("id235", item);
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        maSP: itemCart,
      },
    });
    setOpenConfirm(false);
  };

  return (
    <div style={{ backgroundColor: "#f8f8f8", padding: "80px 0" }}>
      <div className={classes.container}>
        <div className="cart__wrapper ">
          <div className={classes["cart__wrapper-breadcrumbs"]}>
            <div className={classes.breadcrumbsIcon}>
              <Link className={classes.breadcrumbsIconLink} href={"/"}>
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
                  <table style={{ width: "100%" }}>
                    <tr
                      style={{
                        display: "grid ",
                        gridTemplateColumns: "12% 40% 10% 30% 10%",
                        padding: "15px 15px 10px 15px",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <th>
                        {" "}
                        <img
                          style={{ width: "100px", height: "60px" }}
                          src="../../../../img/logo_white.png"
                          alt=""
                        />
                      </th>
                      <th>SAM BOOKSTORE</th>
                      <th>Giá </th>
                      <th className="text-center">Số lượng</th>
                      <th>Tổng tiền</th>
                    </tr>
                    {cart.length === 0 ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <img src="./img/cart1.png" height={200} widtd={200} />
                      </div>
                    ) : (
                      <>
                        {" "}
                        {cart?.map((item, index) => (
                          <tr
                            style={{
                              display: "grid ",
                              gridTemplateColumns: "12% 40% 10% 30% 10%",
                              padding: "15px 15px 10px 15px",
                              textAlign: "center",
                            }}
                          >
                            {" "}
                            <td>
                              {" "}
                              <img
                                style={{ widtd: "100px", height: "80px" }}
                                src={item.image}
                                Giảm
                                giá
                                alt=""
                              />
                            </td>
                            <td>
                              {" "}
                              <NavLink
                                className={`${classes["box__content-name-product"]} `}
                                to={`/productDetail/${item.id}`}
                              >
                                {item.name}
                              </NavLink>
                              <p>Kho: {item?.warehouse}</p>
                            </td>
                            <td>
                              <p style={{ fontWeight: "600" }}>
                                {" "}
                                {item.price.toLocaleString()}{" "}
                              </p>{" "}
                            </td>
                            <td
                              style={{ width: "38%", marginLeft: "70px" }}
                              className={`${classes["box__content-quantity"]} ${classes.center} ${classes.quantity} text-center`}
                            >
                              <div
                                className={
                                  classes["box__content-quantity-detail"]
                                }
                              >
                                <button
                                  className="plusItem "
                                  onClick={() =>
                                    hadleClickMinus(item.id, false)
                                  }
                                  disabled={item.quantity === 1 ? true : false}
                                >
                                  <span>-</span>
                                </button>

                                <input
                                  onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                      event.preventDefault();
                                    }
                                  }}
                                  style={{ width: "30px" }}
                                  type="text"
                                  name="quantity"
                                  className={classes.quantityValue}
                                  value={
                                    item.quantity ? item.quantity : quantity
                                  }
                                  onChange={
                                    (e) => handleChangeQuantity(item, e)
                                    // setQuantity(2)
                                  }

                                  // // type="number"
                                />

                                <button
                                  className="dashItem"
                                  onClick={(e) =>
                                    hadleClickPlus(item.id, true, item)
                                  }
                                >
                                  <span>+</span>
                                </button>
                              </div>

                              <div
                                className={`${classes.delete} text-blue-600 `}
                                onClick={() => handleClickConfirm(item.id)}
                              >
                                Xóa
                              </div>
                              <CustomDialog
                                open={openConfirm}
                                handleClose={handleCancel}
                                dialogSize="xs"
                                overlayStyle={{
                                  backgroundColor: "transparent",
                                }}
                              >
                                <DialogTitle id="alert-dialog-title">
                                  {"Xóa sản phẩm"}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-description">
                                    Bạn chắc chắn muốn xóa sản phẩm này.
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleCancel}>Hủy</Button>
                                  <Button
                                    onClick={() => handleCloseConfirm(item.id)}
                                    autoFocus
                                  >
                                    Đồng ý
                                  </Button>
                                </DialogActions>
                              </CustomDialog>
                            </td>
                            <td>
                              <p
                                style={{
                                  fontWeight: "600",
                                  color: "#1435c3",
                                }}
                              >
                                {" "}
                                {(item.price * item.quantity).toLocaleString()}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </table>

                  {/* <div className={classes["cart__wrapper-content--box"]}>
                    <div className={classes.box__content}>
                      <div className={classes["box__content-name"]}>
                        <NavLink className={`${classes.center}`} to={"/"}>
                          <img
                            style={{ widtd: "120px", height: "50px" }}
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
                  {cart.lengtd === 0 ? (
                    <div>
                      <img src="./img/cart1.png" height={200} widtd={200} />
                    </div>
                  ) : (
                    <>
                      {" "}
                      {cart?.map((item, index) => (
                        <div>
                          {" "}
                          <div
                            className={`${classes["cart__wrapper-content--box"]} `}
                          >
                            <div className={`${classes.box__content} `}>
                              <div className={classes["box__content-name"]}>
                                <NavLink
                                  className={` ${classes.center}`}
                                  to={`/productDetail/${item.id}`}
                                >
                                  <img
                                    style={{ widtd: "100px", height: "80px" }}
                                    src={item.image}
                                    Giảm
                                    giá
                                    alt=""
                                  />
                                </NavLink>
                                <NavLink
                                  className={
                                    classes["box__content-name-product"]
                                  }
                                  to={`/productDetail/${item.id}`}
                                >
                                  {item.name}
                                </NavLink>
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
                                  className={
                                    classes["box__content-quantity-detail"]
                                  }
                                >
                                  <button
                                    className="plusItem "
                                    onClick={() =>
                                      hadleClickMinus(item.id, false)
                                    }
                                    disabled={
                                      item.quantity === 1 ? true : false
                                    }
                                  >
                                    <span>
                                      <svg
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        size="16"
                                        color="textPrimary"
                                        height="16"
                                        widtd="16"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <patd
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M3.25 12C3.25 11.5858 3.58579 11.25 4 11.25H20C20.4142 11.25 20.75 11.5858 20.75 12C20.75 12.4142 20.4142 12.75 20 12.75H4C3.58579 12.75 3.25 12.4142 3.25 12Z"
                                          fill="#82869E"
                                        ></patd>
                                      </svg>
                                    </span>
                                  </button>
                                  <input
                                    style={{ widtd: "30px" }}
                                    type="number"
                                    name="quantity"
                                    className={classes.quantityValue}
                                    value={
                                      item.quantity ? item.quantity : quantity
                                    }
                                    onChange={
                                      (e) => handleChangeQuantity(item, e)
                                      // setQuantity(2)
                                    }

                                    // // type="number"
                                  />

                                  <button
                                    className="dashItem"
                                    onClick={(e) =>
                                      hadleClickPlus(item.id, true, item)
                                    }
                                  >
                                    <span>
                                      <svg
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        size="16"
                                        color="textPrimary"
                                        height="16"
                                        widtd="16"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <patd
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M12.75 4C12.75 3.58579 12.4142 3.25 12 3.25C11.5858 3.25 11.25 3.58579 11.25 4V11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H11.25V20C11.25 20.4142 11.5858 20.75 12 20.75C12.4142 20.75 12.75 20.4142 12.75 20V12.75H20C20.4142 12.75 20.75 12.4142 20.75 12C20.75 11.5858 20.4142 11.25 20 11.25H12.75V4Z"
                                          fill="#82869E"
                                        ></patd>
                                      </svg>
                                    </span>
                                  </button>
                                </div>

                                <div
                                  className={`${classes.delete} text-blue-600 `}
                                  onClick={() => handleClickConfirm(item.id)}
                                >
                                  Xóa
                                </div>
                                <CustomDialog
                                  open={openConfirm}
                                  handleClose={handleCancel}
                                  dialogSize="xs"
                                  overlayStyle={{
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  <DialogTitle id="alert-dialog-title">
                                    {"Xóa sản phẩm"}
                                  </DialogTitle>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      Bạn chắc chắn muốn xóa sản phẩm này.
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleCancel}>Hủy</Button>
                                    <Button
                                      onClick={() =>
                                        handleCloseConfirm(item.id)
                                      }
                                      autoFocus
                                    >
                                      Đồng ý
                                    </Button>
                                  </DialogActions>
                                </CustomDialog>
                              </div>

                              <div
                                className={`${classes["box__content-quantity"]} ${classes.center}`}
                              >
                                <p
                                  style={{
                                    fontWeight: "600",
                                    color: "#1435c3",
                                  }}
                                >
                                  {" "}
                                  {(
                                    item.price * item.quantity
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )} */}
                </div>
              </div>
            </div>
            <div className={classes["cart__wrapper-content--right"]}>
              <Voucher totalPrice={totalCart} />
              <div className={classes["cart__wrapper-content--payment"]}>
                <div className={classes["cart__wrapper-content--info"]}>
                  <h4 className="text-xl">Thanh toán</h4>
                  <div className={classes["info-payment"]}>
                    <table className={classes["payment-tab"]}>
                      <tbody>
                        <tr>
                          <td>Tạm tính </td>
                          <td>
                            <span>{totalCart.toLocaleString()}</span>
                            {/* {(1 * total)?.toLocaleString()} */}
                          </td>
                        </tr>
                        <tr>
                          <td>Khuyến mãi </td>
                          <td>
                            <span>
                              {discount ? discount.toLocaleString() : 0}{" "}
                            </span>
                            {/* {(1 * total)?.toLocaleString()} */}
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
                              {totalCart < miniPrice
                                ? (totalCart - 0).toLocaleString()
                                : (totalCart - discount).toLocaleString()}{" "}
                              ₫
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
                    disabled={cart && cart.length === 0 ? true : false}
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
