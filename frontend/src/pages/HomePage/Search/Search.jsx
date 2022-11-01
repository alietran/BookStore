import { Box, Container, FormControl, InputLabel } from "@mui/material";
import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ProductItem from "../../../components/ProductItem/ProductItem";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBookByPrice, search } from "../../../redux/action/bookAction";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
function valuetext(value) {
  console.log("value", value);
  return `${value}`;
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 3,
});
// const a = parseFloat(formatter.replace(/₫/g, ""));
// console.log("af",a)
export default function Search() {
  const { bookSearch } = useSelector((state) => state.BookReducer);
  // console.log("bookSearch", bookSearch);

  const minDistance = 10;

  const dispatch = useDispatch();
  const data = useLocation().search;
  const name = new URLSearchParams(data).get("search");
  const [valueMin, setValueMin] = React.useState();
  const [valueMax, setValueMax] = React.useState();
  const [value1, setValue1] = React.useState([50, 300]);
  const [valueCate, setValueCate] = React.useState("all");
  console.log("valueCate", valueCate);
  const handleChange = (event) => {
    setValueCate(event.target.value);
  };
  const bookPrice = bookSearch?.data.filter(
    (item) =>
      Number(value1[0] * 1000) <= item.price &&
      item.price <= Number(value1[1] * 1000)
  );
  console.log("bookPrice", bookPrice);

  useEffect(() => {
    if (value1) {
      // dispatch(getBookByPrice({ minPrice: value1[0], maxPrice: value1[1] }));
    }
    console.log("!34", formatter.format(value1[1]));
  }, [value1[0], value1[1]]);
  // const valueLeft = value1.split(",");
  console.log("value1", value1);
  // console.log("value1", typeof value1);
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };
  const hanleChangeMin = (e) => {
    setValueMin(e.target.value);
    // console.log("35235", Number((e.target.value).substring(1)));
    setValue1([Number(e.target.value.substring(1)), value1[1]]);
  };
  const hanleChangeMax = (e) => {
    setValueMax(e.target.value);
    setValue1([value1[0], Number(e.target.value.substring(1))]);
  };

  // useEffect(() => {
  //   console.log("valueMin", valueMin);
  //   console.log("valueMax", valueMax);
  //   setValue1([valueMin, valueMax]);
  // }, [valueMax, valueMin]);
  console.log("value1355", value1);

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
        sx={{ margin: "20px auto", backgroundColor: "white", display: "flex" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              border: "1px solid white",
              height: "200px",
              boxShadow: " rgb(0 0 0 / 10%) 0px 0px 5px 2px",
              marginRight: "20px",
              borderRadius: "15px",
              marginBottom: "24px",
              backgroundColor: "white",
            }}
          >
            <Typography sx={{ padding: "15px", fontWeight: "bold" }}>
              Khoảng giá
            </Typography>
            <Box sx={{ width: 220, padding: "10px 12px" }}>
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                max={300}
                min={50}
                marks
                step={10}
              />
              <Box>
                <Box
                  component="form"
                  noValidate
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { sm: "1fr 1fr" },
                    gap: 2,
                  }}
                >
                  <FormControl variant="standard">
                    <InputLabel
                      shrink
                      htmlFor="bootstrap-input"
                      sx={{ fontWeight: "bold" }}
                    >
                      Từ
                    </InputLabel>
                    <BootstrapInput
                      onChange={hanleChangeMin}
                      defaultValue="0"
                      value={
                        valueMin ? valueMin : `${formatter.format(value1[0])}`
                      }
                      id="bootstrap-input"
                    />
                  </FormControl>
                  <FormControl variant="standard">
                    <InputLabel
                      shrink
                      htmlFor="bootstrap-input"
                      sx={{ fontWeight: "bold" }}
                    >
                      Đến
                    </InputLabel>
                    {/* {value1.split(",")} */}
                    <BootstrapInput
                      defaultValue="500.000"
                      onChange={hanleChangeMax}
                      value={
                        valueMax ? valueMax : `${formatter.format(value1[1])}`
                      }
                      id="bootstrap-input"
                    />
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Danh mục
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={valueCate}
              onChange={handleChange}
            >
                <FormControlLabel
                value="all"
                control={<Radio />}
                label="Tất cả"
              />
              <FormControlLabel
                value="62e89bbe25908f5aacdd955e"
                control={<Radio />}
                label="Sách kinh tế"
              />
              <FormControlLabel
                value="62f3b925c036b0590494bf75"
                control={<Radio />}
                label="Sách tiểu thuyết"
              />{" "}
              <FormControlLabel
                value="62f5cb71ffedca4704adb157"
                control={<Radio />}
                label="Sách kỹ năng sống"
              />
              <FormControlLabel
                value="62f5cb83ffedca4704adb15a"
                control={<Radio />}
                label="Sách kiến thức tổng hợp"
              />
              <FormControlLabel
                value="62f3b32fc036b0590494bf72"
                control={<Radio />}
                label="Truyện cười"
              />
              <FormControlLabel
                value="62f5cbc2ffedca4704adb15d"
                control={<Radio />}
                label="Truyện ngôn tình"
              />
              <FormControlLabel
                value="62f5cbcfffedca4704adb160"
                control={<Radio />}
                label="Truyện tranh thiếu nhi"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box
          sx={{
            border: "1px solid white",
            padding: "10px",
            boxShadow: " rgb(0 0 0 / 10%) 0px 0px 5px 2px",
            width: "100%",
            borderRadius: "15px",
            marginBottom: "24px",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#57b159",
              padding: "20px",
              display: "flex",
            }}
          >
            <ManageSearchIcon sx={{ color: "white", marginRight: "10px" }} />
            <Typography sx={{ color: "white" }}>
              KẾT QUẢ TÌM KIẾM ({bookPrice?.length ? bookPrice?.length : 0})
            </Typography>
          </Box>
          {/* {bookPrice !== null ? ( */}
          {/* <Box className=" grid grid-cols-4">
              {bookPrice?.data.map((product, index) => (
                <ProductItem product={product} />
              ))}
            </Box>
          ) : */}
          {bookPrice?.length !== 0 ? (
            <Box className=" grid grid-cols-4">
              {" "}
              {bookPrice?.map((product, index) => (
                <ProductItem product={product} />
              ))}
            </Box>
          ) : (
            <Box className="flex flex-col w-full">
              <div className="my-6 flex  justify-center ">
                <img
                  src="../../../../img/no-products-found.png"
                  alt=""
                  height={200}
                  width={200}
                />
              </div>
              <p className="text-center text-2xl ">
                Không tìm thấy sản phẩm nào
              </p>
            </Box>
          )}
          {/* {bookSearch?.result !== 0 ? (
            <Box className=" grid grid-cols-4">
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
          )} */}
        </Box>
      </Container>
    </div>
  );
}
