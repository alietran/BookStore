import React from "react";
import Carousel from "./Carousel/Carousel";
import NewProduct from "./NewProduct/NewProduct";
import Product from "./Product/Product";
import Subcribe from "./Subscribe/Subcribe";

export default function HomePage() {
  return (
    <div>
      <Carousel />
      <NewProduct/>
      <Subcribe />
      <Product />
    </div>
  );
}
