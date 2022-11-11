import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import useStyles from "./style";
import { useSnackbar } from "notistack";
export default function ProductItem({ product }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar(); 
  const { errorAddCart } = useSelector((state) => state.CartReducer);
  const handleAddToCart = (product) => {
    console.log("product", product);

    const cart = {
      name: product?.name,
      price: product?.price,
      image: product?.image,
      id: product?.id,
      quantity: 1,
      warehouse: product?.quantity,
    };
    const action = (snackbarId) => (
      <>
        <Button
          variant="contained"
          className="py-1 px-1 text-xs"
          sx={{
            padding: "6px !important",
            fontSize: "12.5px !important",
            marginRight: "7px !important",
          }}
          onClick={() => {
            history.push("/cart");
          }}
        >
          Xem giỏ hàng
        </Button>
      </>
    );

    if (product.quantity === 0 || errorAddCart) {
      enqueueSnackbar("Số lượng đã vượt quá giới hạn trong kho!", {
        variant: "error",
        autoHideDuration: 1000,
      });
    } else {
      enqueueSnackbar("Thêm vào giỏ hàng thành công!", {
        variant: "success",
        autoHideDuration: 1200,
        action,
      });
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          data: cart,
        },
      });
    }
  };
  return (
    <div
      className={`group bg-white text-center px-1 py-2 mt-2 mx-2 mb-2 w-36 duration-500 lg:px-3 lg:py-4 lg:mt-6 lg:mx-4 lg:mb-5 ${classes.productItem} lg:w-48`}
      style={{
        boxShadow: "rgb(0 0 0 / 10%) 0px 0px 5px 2px",
        borderRadius: "15px",
        border: "1px solid white",
      }}
    >
      <NavLink to={`/productDetail/${product?._id}`}>
        {" "}
        <div className="  w-full relative">
          <img
            style={{
              height: "200px",
              width: "200px",
            }}
            src={product?.image}
            alt="Front of men&#039;s Basic Tee in black."
            className=" object-contain w-32 h-32 top-0 left-0    lg:w-full lg:h-full"
          />
        </div>
        <div className="mt-4 flex  justify-center truncate">
          {/* <div className=" text-gray-700 text-center"> */}
          <span aria-hidden="true" className=" truncate text-slate-800 ">
            {product?.name}
          </span>
          {/* </div> */}
        </div>
        <p className="mt-1 text-sm text-red-500 font-bold text-lg text-center">
          {product?.price.toLocaleString()} ₫
        </p>
      </NavLink>

      <Button
        sx={{ cursor: "pointer" }}
        className="w-32 ml-2 mt-3 lg:w-36"
        variant="contained"
        onClick={() => {
          handleAddToCart(product);
        }}
      >
        Thêm vào giỏ
      </Button>
      {/* <button>Thêm vào giỏ hàng</button> */}
    </div>
  );
}
