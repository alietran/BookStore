import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../../redux/action/bookAction";
export default function Search() {
  const { bookSearch } = useSelector((state) => state.BookReducer);

  const dispatch = useDispatch();
  const data = useLocation().search;
  const name = new URLSearchParams(data).get("search");

  useEffect(() => {
    console.log("name", name);
  }, [name]);

  useEffect(() => {
    dispatch(search(name));
  }, []);
  console.log("bookSearch", bookSearch);

  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{ margin: "20px auto", backgroundColor: "white" }}
      >
        <Box sx={{ padding: "30px 0" }}>
          <Box
            sx={{
              backgroundColor: "#57b159",
              padding: "20px",
              display: "flex",
            }}
          >
            <ManageSearchIcon sx={{ color: "white", marginRight: "10px" }} />
            <Typography sx={{ color: "white" }}>
              KẾT QUẢ TÌM KIẾM ({bookSearch?.result ? bookSearch?.result : 0})
            </Typography>
          </Box>
          {bookSearch?.result !== 0 ? (
            <Box className=" grid grid-cols-5">
              {" "}
              {bookSearch?.data.map((product, index) => (
                <ProductItem product={product} />
              ))}
            </Box>
          ) : (
            <Box className="flex flex-col  ">
              <div className="my-6 flex  justify-center ">
                <img
                  src="../../../../img/no-products-found.png"
                  alt=""
                  height={200}
                  width={200}
                />
              </div>
              <p className="text-center text-2xl">
                Không tìm thấy sản phẩm nào
              </p>
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
}
