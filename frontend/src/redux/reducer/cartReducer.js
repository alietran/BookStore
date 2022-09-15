// let cartList = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : null;

import { isBuffer } from "lodash";

const stateDefault = {
  cart: [],
  total: null,
  discount: null,
  miniPrice: null,
  voucherId: null,
  errorAddCart: false,
};

export const CartReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "TONG_TIEN": {
      const { discount, miniPrice, voucherId } = action.payload.data;

      console.log("totalPrice re", state.totalPrice);
      console.log("miniPrice re", miniPrice);
      console.log("voucherId re", voucherId);
      return {
        ...state,
        miniPrice,
        discount,
        voucherId,
      };
    }
    case "TOTAL": {
      const { totalPrice } = action.payload.data;

      return {
        ...state,
        total: totalPrice,
      };
    }
    case "ADD_TO_CART": {
      // localStorage.setItem("cart",[]);
      const { data } = action.payload;
      state.errorAddCart = false;
      // state.cart.push(data);
      console.log("data", data);
      const cartList = localStorage.getItem("cart");

      if (cartList) {
        state.cart = JSON.parse(cartList);
      }
      let index = state.cart?.findIndex((item) => item.id === data.id);
      console.log("index", index);
      if (index !== -1) {
        console.log("1434");
        console.log(" state.cart[index].quantity", state.cart[index].quantity);
        console.log(
          " state.cart[index].warehouse",
          state.cart[index].warehouse
        );
        if (state.cart[index].quantity < state.cart[index].warehouse) { 
           if (state.cart[index].quantity + 1 === state.cart[index].warehouse) {
             state.errorAddCart = true;
           }
          state.cart[index].quantity += 1; 
          console.log("first,", state.cart[index].quantity + 1);
         
          
        } else {
          console.log("124");
          
            state.errorAddCart = true;
          
        }
      } else {
        // cartItem.quantity = 1;
        state.cart.push(data);
        // localStorage.setItem("cart", JSON.stringify(cartItem));
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      //  localStorage.removeItem("cart");
      // console.log("state.cart", state.cart);

      return {
        ...state,
        cart: state.cart,
        errorAddCart: state.errorAddCart,
      };
    }
    case "CHANGE_QUANTITY": {
      const cartList = JSON.parse(localStorage.getItem("cart"));

      console.log("12");

      const index = cartList?.findIndex(
        (item) => item.id === action.payload.maSP
      );

      console.log("tangiam", action.payload.tangGiam);
      if (index !== -1) {
        if (action.payload.tangGiam) {
          cartList[index].quantity += 1;

          localStorage.setItem("cart", JSON.stringify(cartList));
        } else {
          if (cartList[index].quantity <= 1) {
            alert("Số lượng tối thiểu");
            cartList[index].quantity = 1;
          } else {
            cartList[index].quantity -= 1;
          }

          localStorage.setItem("cart", JSON.stringify(cartList));
        }
      }

      return { ...state };
    }
    case "REMOVE_ITEM": {
      const cartList = JSON.parse(localStorage.getItem("cart"));
      const index = cartList?.findIndex(
        (item) => item.id === action.payload.maSP
      );
      // console.log("index", index);
      // console.log("cartList ngoai", cartList);

      if (index !== -1) {
        cartList.splice(index, 1);
        // console.log("cartList trong", cartList);
        localStorage.setItem("cart", JSON.stringify(cartList));
      }
      return { ...state, cart: cartList };
    }
    case "RESET_CART": {
      return {
        ...state,
        cart: [],
      };
    }
    default:
      return { ...state };
  }
};
