import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../../components/ProductItem/ProductItem";
import useStyles from "../NewProduct/style";
import Pagination from "@mui/material/Pagination";
import {
  getCateList,
  resetCateList,
} from "../../../redux/action/categoryAction";
import PropTypes from "prop-types";
import { getBookList } from "../../../redux/action/bookAction";
export default function Product() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cateList1 = [];
  const { bookList } = useSelector((state) => state.BookReducer);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { cateList } = useSelector((state) => state.CateReducer);

  useEffect(() => {
    if (!cateList) {
      dispatch(getCateList());
    }

    return () => dispatch(resetCateList());
  }, []);
  useEffect(() => {
    if (!bookList) {
      dispatch(getBookList());
    }
  }, [bookList]);
  console.log("bookList", bookList);
  cateList?.data
    .filter((item) => item.parentCateId === "62e806e426eedb6fb416b127")
    .map((item1, index) => {
      console.log("item1", item1);
      cateList1.push({
        id: item1._id,
        name: item1.name,
      });
    });
  console.log("cateList1", cateList1);
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <Container className={` ${classes.bestSell} m-3`} maxWidth="lg">
        {/* <Box className="bg-white  rounded-md"> */}
        <Typography
          variant="h5"
          component="h2"
          sx={{ color: "#57b159", marginTop: "15px" }}
        >
          Sách
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {cateList1.map((item, index) => {
                return <Tab label={item.name} {...a11yProps({ index })} />;
              })}
              {/* <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box className=" grid grid-cols-5 gap-y-10  sm:grid-cols-2 lg:grid-cols-5">
              {bookList?.data
                .filter((item) => item?.idCate.name === "Sách kinh tế")
                .map((sachKT, index) => {
                  // console.log("sachKT", sachKT);
                  return <ProductItem product={sachKT} />;
                })}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box className=" grid grid-cols-5 gap-y-10  sm:grid-cols-2 lg:grid-cols-5">
              {bookList?.data
                .filter((item) => item?.idCate.name === "Sách tiểu thuyết")
                .map((sachKT, index) => {
                  // console.log("sachKT", sachKT);
                  return <ProductItem product={sachKT} />;
                })}
            </Box>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <Box className=" grid grid-cols-5 gap-y-10  sm:grid-cols-2 lg:grid-cols-5">
              {bookList?.data
                .filter((item) => item?.idCate.name === "Sách kỹ năng sống")
                .map((sachKT, index) => {
                  // console.log("sachKT", sachKT);
                  return <ProductItem product={sachKT} />;
                })}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box className=" grid grid-cols-5 gap-y-10  sm:grid-cols-2 lg:grid-cols-5">
              {bookList?.data
                .filter(
                  (item) => item?.idCate.name === "Sách Kiến Thức Tổng Hợp"
                )
                .map((sachKTTT, index) => {
                  // if (!sachKTTT) {
                  //   return "Không có sách nào";
                  // } // return <ProductItem product={sachKT} />;
                  // else
                  return <ProductItem product={sachKTTT} />;
                })}
            </Box>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Box className=" grid grid-cols-5 gap-y-10  sm:grid-cols-2 lg:grid-cols-5">
              {bookList?.data
                .filter((item) => item?.idCate.name === "Sách văn học")
                .map((sachKT, index) => {
                  // console.log("sachKT", sachKT);
                  return <ProductItem product={sachKT} />;
                })}
            </Box>
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}
