import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthUser } from "../../redux/action/authAction";
import Carousel from "./Carousel/Carousel";
import NewProduct from "./NewProduct/NewProduct";
import Product from "./Product/Product";
import Subcribe from "./Subscribe/Subcribe";
import axios from "axios";

export default function HomePage() {
  // const { currentUser } = useSelector((state) => state.AuthReducer);
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const getUser = () => {
  //     fetch("http://127.0.0.1:8080/api/v1/admins/login/success", {
  //       method: "GET",
  //       credentials: "include",
  //     })
  //       .then((response) => {
  //         console.log("response", response);
  //         if (response.status === 200) return response.json();
  //         throw new Error("authentication has been failed!");
  //       })
  //       .then((resObject) => {
  //         console.log("resObject", resObject);
  //         setUser(resObject.user);
  //       })
  //       .catch((err) => {
  //         console.log("err", err);
  //       });
  //   };
  //   getUser();
  // }, []);

  // console.log("user", user);
  return (
    <div>
      <Carousel />
      <NewProduct />
      <Subcribe />
      <Product />
    </div>
  );
}
