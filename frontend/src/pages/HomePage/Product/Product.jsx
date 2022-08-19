import { Box, Container } from "@mui/material";
import React from "react";
import ProductItem from "../../../components/ProductItem/ProductItem";

export default function Product() {
  return (
    <Container className="py-12" maxWidth="xl">
      <div>
        <h1 className="uppercase text-center title">Tất cả sách</h1>
        <Box className="mt-6 grid grid-cols-5 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </Box>
      </div>
    </Container>
  );
}
