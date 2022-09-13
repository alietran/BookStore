import { Box, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ProductItem from "../../../components/ProductItem/ProductItem";
import useStyles from "../NewProduct/style";

export default function Product() {
  const classes = useStyles();
  const { bookList } = useSelector((state) => state.BookReducer);

  return (
    <div style={{ backgroundColor: "#E4FBDF" }}>
      <Container className="py-12 " maxWidth="lg">
        <div>
          <h1 className="uppercase text-center title text-green-600">
            Tất cả sách
          </h1>
          <Box className="mt-6  grid grid-cols-5 gap-y-10  sm:grid-cols-2 lg:grid-cols-5">
            {bookList?.data.map((product, index) => (
              <div>
                <ProductItem
                  className={classes.productItem}
                  product={product}
                />
              </div>
            ))}
          </Box>
        </div>
      </Container>
    </div>
  );
}
