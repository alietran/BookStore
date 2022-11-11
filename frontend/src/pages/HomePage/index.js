import React, { useEffect } from "react";
import Carousel from "./Carousel/Carousel";
import NewProduct from "./NewProduct/NewProduct";
import Product from "./Product/Product";
import Subcribe from "./Subscribe/Subcribe";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBookList } from "../../redux/action/bookAction";
import BestSellerBook from "./BestSellerBook/BestSellerBook";

export default function HomePage() {
  const { bookList } = useSelector((state) => state.BookReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookList());
  }, []);
  // useEffect(() => {
  //   if(user !== ""){
  //       window.location.reload();
  //   }
  // // 
  // }, [user]);
  console.log("booklist", bookList);
  return (
    <div>
      <Carousel />
      <NewProduct />
      <BestSellerBook />

      <Product />
      <Subcribe />
    </div>
  );
}
