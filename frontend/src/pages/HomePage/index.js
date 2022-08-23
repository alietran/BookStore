import React, { useEffect } from "react";
import Carousel from "./Carousel/Carousel";
import NewProduct from "./NewProduct/NewProduct";
import Product from "./Product/Product";
import Subcribe from "./Subscribe/Subcribe";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBookList } from "../../redux/action/bookAction";

export default function HomePage() {
  const { bookList } = useSelector((state) => state.BookReducer);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getBookList());
  },[])
  console.log("booklist", bookList);
  return (
    <div>
      <Carousel />
      <NewProduct />
      <Subcribe />
      <Product />
    </div>
  );
}
