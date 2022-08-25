// let cartList = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : null;

import { isBuffer } from "lodash";

const stateDefault = {
  cart: [],
  total: null,
};

export const CartReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "TONG_TIEN": {
      console.log("total", state.total);
      return { ...state, total: action.payload.data };
    }
    case "ADD_TO_CART": {
      // localStorage.setItem("cart",[]);
      const { data } = action.payload;
      // state.cart.push(data);
      const cartList = localStorage.getItem("cart");

      if (cartList) {
        state.cart = JSON.parse(cartList);
      }
      let index = state.cart?.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        state.cart[index].quantity += 1;
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
      };
    }
    case "CHANGE_QUANTITY": {
        const index = state.cart?.findIndex(
          (item) => item.id === action.payload.maSP
        );
        if(index !== -1){
          if(action.payload.tangGiam){
             state.cart[index].quantity += 1;
          }else{
             state.cart[index].quantity -= 1;
          }
        }
        return {...state, cart: state.cart}
    }
    case "REMOVE_ITEM":{
      const index = state.cart?.findIndex(
        (item) => item.id === action.payload.maSP
      )
      // if(index !== -1){
      //   state.cart
      // }
    }

    default:
      return { ...state };
  }
};
