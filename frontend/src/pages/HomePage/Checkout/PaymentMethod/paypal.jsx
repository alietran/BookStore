import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOrder } from "../../../../redux/action/orderAction";

export default function Paypal({ order }) {
  const { discount, total, miniPrice } = useSelector(
    (state) => state.CartReducer
  );
  const { address } = useSelector((state) => state.OrderReducer);
  console.log("address123123", address);
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  if (error) {
    alert(error);
  }
  console.log("discount123", discount);
  console.log("total123", total);
  let itemBook = {
    discountPayPal: (discount * 0.00004).toFixed(2),
    // amountTicket: seatCodes.length,
    // listSeatSelected,
    bookPricePayPal: (total * 0.00004).toFixed(2),
    status: true,
  };
  const [successPayPal, setSuccessPayPal] = useState(false);
  const [dataFocus, setDataFocus] = useState({ phone: false, email: false });

  useEffect(() => {
    if (successPayPal) {
      order.paymentMethod.message = "Giao dịch thành công";
      order.paymentMethod.resultCode = 0;
      console.log("order",order)
      dispatch(createOrder(order));

      setTimeout(
        history.push("/"),
        enqueueSnackbar("Đặt hàng thành công!", {
          variant: "success",
        }),
        100
      );
    }
  }, [successPayPal]);

  localStorage.setItem("itemBook", JSON.stringify(itemBook));
  let item = JSON.parse(localStorage.getItem("itemBook"));
  let cartItem = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  let addressItem = localStorage.getItem("address")
    ? JSON.parse(localStorage.getItem("address"))
    : [];

  console.log("cartItem", cartItem);
  console.log("addressItem", addressItem);
  const listProduct = cartItem?.map((item) => {
    return {
      name: `x ${item.name}`,
      unit_amount: {
        currency_code: "USD",
        value: (item.price * 0.00004).toFixed(2),
      },
      quantity: item.quantity,
      sku: item._id,
      // category: "PHYSICAL_GOODS",
      // tax: {
      //   currency_code: "USD",
      //   value: 0,
      // },
    };
  });

  return (
    <PayPalScriptProvider>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                // reference_id: 1234,
                description: "Sam Bookstore",
                amount: {
                  currency_code: "USD",

                  value: item.bookPricePayPal - item.discountPayPal,
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: item.bookPricePayPal,
                    },
                    // shipping: { currency_code: "USD", value: 1 },
                    // tax_total: { currency_code: "USD", value: "1.4" },
                    discount: {
                      currency_code: "USD",
                      value: item.discountPayPal,
                    },
                  },
                },
                items: listProduct,
                shipping: {
                  address: {
                    address_line_1: addressItem.address,
                    address_line_2: addressItem.ward,
                    admin_area_2: addressItem.district,
                    admin_area_1: addressItem.city,
                    postal_code: "94000",
                    country_code: "GB",
                  },
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            setSuccessPayPal(true);
          });
        }}
        onCancel={() => {
          window.location.reload();
        }}
        onError={(err) => {
          setError(err);
          console.log("Paypal Checkout onError", err);
        }}
      />
    </PayPalScriptProvider>
  );
}
