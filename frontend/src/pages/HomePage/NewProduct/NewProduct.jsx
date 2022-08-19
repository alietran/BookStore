import { Box, Container } from "@mui/material";
import React from "react";
import ProductItem from "../../../components/ProductItem/ProductItem";

export default function NewProduct() {
  return (
    <Container className="py-12" maxWidth="xl">
      <div>
        <h1 className="uppercase text-center title">Sách mới phát hành</h1>
        <Box className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </Box>
      </div>
    </Container>
  );
}
