import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderByBookForMonth,
  getOrderByBookForYear,
  getOrderList,
  getOrderRSForMonth,
  getOrderRSForWeek,
  getOrderRSForYear,
} from "../../../redux/action/orderAction";
import moment, { months } from "moment";
import {
  getAllReceipt,
  getReceiptRSForMonth,
  getReceiptRSForWeek,
  getReceiptRSForYear,
} from "../../../redux/action/receiptAction";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { getBookList } from "../../../redux/action/bookAction";
import { getPromotionList } from "../../../redux/action/promotionAction";
import { getAllAccount } from "../../../redux/action/adminAction";
import Loading from "../../../components/Loading/Loading";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";

import merge from "lodash/merge";

// @mui
import { Card, CardHeader, TextField } from "@mui/material";
// components
import { BaseOptionChart } from "../../../components/chart";

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Overview() {
  const theme = useTheme();
  const [year, setYear] = useState("2022");
  const [book, setBook] = React.useState("634460f1b4fcf94bb0e307f4");
  const handleChangeYear = (e) => {
    console.log("year523525", e.target.value);
    // setYear(e.target.value);
    
  };
  const [personName, setPersonName] = React.useState([]);

  const [seriesData, setSeriesData] = useState(2022);

  const handleChangeSeriesData = (event) => {
    console.log("event.target.value",event.target.value);
    // setSeriesData(Number(event.target.value));
    setSeriesData(Number(event.target.value));
  };


  console.log("book", book);
  
  const handleChangeBook = (event) => {
    setBook(event.target.value);
  };
  
  useEffect(() => {
    if (seriesData === 2022) dispatch(getOrderByBookForYear(book));
    else dispatch(getOrderByBookForMonth(book));
  }, [book, seriesData]);

  const dispatch = useDispatch();
  const {
    orderRSForWeek,
    orderRSForYear,
    orderRSForMonth,
    loadingOrderRSForYear,
    loadingOrderRSForMonth,
    loadingOrderRSForWeek,
    
  } = useSelector((state) => state.OrderReducer);
  const { promotionList } = useSelector((state) => state.PromotionReducer);

  console.log("promotionList", promotionList);
  // const { orderRSForYear } = useSelector((state) => state.OrderReducer);
  const {
    receiptRSForWeek,
    receiptRSForYear,
    receiptRSForMonth,
    loadingReceiptRSForWeek,
    loadingReceiptRSForMonth,
    loadingReceiptRSForYear,
  } = useSelector((state) => state.ReceiptReducer);
  const _ = require("lodash");
  const { accountList } = useSelector((state) => state.AdminReducer);
  const [listReceiptItem, setListReceiptItem] = useState([]);
  const [listChartItem, setListChartItem] = useState([]);
  const [revenueYear, setRevenueYear] = useState();
  const [revenueMonth, setRevenueMonth] = useState();
  const [revenueWeek, setRevenueWeek] = useState();
  const [costYear, setCostYear] = useState();
  const [costMonth, setCostMonth] = useState();
  const [costWeek, setCostWeek] = useState();
  const [listReceiptItemYear, setListReceiptItemYear] = useState([]);
  const [listChartItemYear, setListChartItemYear] = useState([]);
  const [listChartItemMonth, setListChartItemMonth] = useState([]);
  const [listReceiptItemMonth, setListReceiptItemMonth] = useState([]);
  const { bookList } = useSelector((state) => state.BookReducer);
  
  const names = [];

  bookList?.data.map((item, index) => {
    return names.push(item.name);
  });
  console.log("names", names);
  var weeknumber = moment().weekday(-6).format("DD-MM-YYYY");
  const [option, setOption] = React.useState(30);

  const { receiptList } = useSelector((state) => state.ReceiptReducer);
  console.log("receiptList", receiptList);
  useEffect(() => {
    if (!receiptList?.data) {
      dispatch(getAllReceipt());
    }
    //  return () => dispatch(resetReceiptList());
  }, [receiptList]);
  useEffect(() => {
    if (!accountList?.data) {
      dispatch(getAllAccount());
    }
    //  return () => dispatch(resetReceiptList());
  }, [accountList]);

  useEffect(() => {
    let revenueYear = listChartItemYear?.reduce(
      (total, item) => (total += item.y),
      0
    );
    // console.log("revenueYear", revenueYear);
    setRevenueYear(revenueYear);

    let costYear = listReceiptItemYear?.reduce(
      (total, item) => (total += item.y),
      0
    );
    // console.log("revenueYear", revenueYear);
    setCostYear(costYear);
  }, [listReceiptItemYear]);

  useEffect(() => {
    let revenueWeek = listChartItem?.reduce(
      (total, item) => (total += item.y),
      0
    );

    setRevenueWeek(revenueWeek);
    console.log("revenueWeek", revenueWeek);
    let costWeek = listReceiptItem?.reduce(
      (total, item) => (total += item.y),
      0
    );
    // console.log("revenueYear", revenueYear);
    setCostWeek(costWeek);
  }, [listReceiptItem, revenueWeek]);

  useEffect(() => {
    let revenueMonth = listChartItemMonth?.reduce(
      (total, item) => (total += item.y),
      0
    );
    // console.log("revenueYear", revenueYear);
    setRevenueMonth(revenueMonth);

    let costMonth = listReceiptItemMonth?.reduce(
      (total, item) => (total += item.y),
      0
    );
    console.log("revenueMonth", revenueMonth);
    setCostMonth(costMonth);
  }, [listReceiptItemMonth, listChartItemMonth]);
  // console.log("revenueMonth", revenueMonth);

  const { orderList, orderByBookYear, orderByBookMonth } = useSelector(
    (state) => state.OrderReducer
  );


  useEffect(() => {
    // get list user lần đầu
    if (!orderList) {
      dispatch(getOrderList());
    }
    //  return () => dispatch(resetOrder());
  }, []);

  // Thong ke san pham
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories:
        seriesData === 2022
          ? orderByBookYear?.arrayMonth
          : orderByBookMonth?.arrayMonth,
    },
    colors: ["#2065D1", "#FF6C40"],
  });
   console.log("orderByBookYear", orderByBookYear);
   console.log("orderByBookMonth", orderByBookMonth);
   console.log("seriesData", seriesData);
   console.log("seriesData typeof", typeof seriesData);

  const CHART_DATA = [
    // data year
    {
      // year: 2022,
      data: [
        {
          name: "Doanh thu bán ra",
          data:
            seriesData === 2022
              ? orderByBookYear?.totalPrice
              : orderByBookMonth?.totalPrice,
        },
        {
          name: "Số lượng bán ra",
          data:
            seriesData === 2022
              ? orderByBookYear?.totalQuatily
              : orderByBookMonth?.totalQuatily,
        },
      ],
    },
    // data month
    // {
    //   year: 11,
    //   data: [
    //     {
    //       name: "Doanh thu bán ra",
    //       data: seriesData === 11 && orderByBookMonth?.totalPrice,
    //     },
    //     {
    //       name: "Số lượng bán ra",
    //       data: seriesData === 11 && orderByBookMonth?.totalQuatily,
    //     },
    //   ],
    // },
  ];

  // console.log("orderList", orderList);
  const handleChange = (event) => {
    setOption(event.target.value);
  };

  // console.log("option", option);
  const dayLabel = [];
  const dayItem = [];
  // let monthLabel = [];
  let monthLabelReceipt = [];
  let monthItem = [];
  let yearItem = [];
  let monthReceiptItem = [];
  let monthOrderItem = [];
  // let monthReceiptLabel = [];

  const dayReceipt = [];
  let yearReceiptItem = [];
  let yearLabel = [
    "01-2022",
    "02-2022",
    "03-2022",
    "04-2022",
    "05-2022",
    "06-2022",
    "07-2022",
    "08-2022",
    "09-2022",
    "10-2022",
    "11-2022",
    "12-2022",
  ];
  let labelMonth = [];
  let labelName = [];
  let monthStatic = [];
  let monthStaticOrder = [];
  let monthStaticReceipt = [];

  const totalOrder = orderList?.data?.reduce((total, item) => {
    return (total += item.totalPrice);
  }, 0);

  // const totalReceipt =
  console.log("totalOrder", totalOrder);
  const totalReceipt = receiptList?.data.reduce((total, item) => {
    return (total += item.totalPriceReceipt);
  }, 0);

  const profit = totalOrder - totalReceipt;
  console.log("profit", profit);
  console.log("totalReceipt", totalReceipt);
  for (let i = 0; i < moment(i, "e").startOf("week").isoWeekday(i); i--) {
    dayLabel.push(moment().day(i).format("DD-MM-YYYY"));
  }

  // console.log("totalReceipt", totalReceipt);
  dayLabel.sort((a, b) =>
    moment(a, "DD-MM-YYYY").diff(moment(b, "DD-MM-YYYY"))
  );

  // console.log("monthLabel", monthStatic);
  // console.log("monthLabel",monthLabel);
  useEffect(() => {
    if (!receiptRSForWeek) {
      dispatch(getReceiptRSForWeek());
    }
    getItemReceipt();
  }, [receiptRSForWeek]);
  useEffect(() => {
    // get list user lần đầu
    if (!bookList) {
      dispatch(getBookList());
    }
    // return () => dispatch(resetBookList());
  }, [bookList]);
  useEffect(() => {
    // get list user lần đầu
    if (!promotionList) {
      dispatch(getPromotionList());
    }
    // return () => dispatch(resetBookList());
  }, [bookList]);
  useEffect(() => {
    if (!orderRSForWeek) {
      dispatch(getOrderRSForWeek());
    }
    getItemSold();
  }, [orderRSForWeek]);
  useEffect(() => {
    if (orderRSForMonth === null) {
      dispatch(getOrderRSForMonth());
    }
    getItemSoldMonth();
  }, [orderRSForMonth]);

  useEffect(() => {
    if (receiptRSForMonth === null) {
      dispatch(getReceiptRSForMonth());
    }
    getItemReceiptMonth();
  }, [receiptRSForMonth]);

  receiptRSForMonth !== null &&
    receiptRSForMonth[0]?.receiptRevenue?.map(
      (item, index) => {
        console.log("item3534", item);
        monthStatic.push(item);
        monthStaticReceipt.push(item);
      }
      // labelMonth = monthLabel.name
    );
  orderRSForMonth !== null &&
    orderRSForMonth[0]?.orderRevenue?.map((item, index) => {
      monthStatic.push(item);
      monthStaticOrder.push(item);
    });

  console.log("monthStaticReceipt", monthStaticReceipt);
  console.log("monthStaticOrder", monthStaticOrder);

  labelMonth = _.uniqBy(monthStatic, "name");
  console.log("labelMonth", labelMonth);
  labelMonth.map((item, index) => {
    labelName.push(item.name);
  });
  console.log("labelName", labelName);
  labelName.sort((a, b) =>
    moment(a, "DD-MM-YYYY").diff(moment(b, "DD-MM-YYYY"))
  );

  console.log("monthStatic", monthStatic);

  const getItemReceiptMonth = () => {
    for (let i = 0; i < labelMonth.length; i++) {
      monthReceiptItem.push({ x: labelMonth[i].name, y: 0 });
    }
    console.log("monthReceiptItem35254", monthReceiptItem);
    receiptRSForMonth !== null &&
      receiptRSForMonth[0]?.receiptRevenue?.map((item, index) => {
        // console.log("monthItemrử", monthItem);
        const ItemOrder = monthReceiptItem?.findIndex(
          (item1) => item1.x === item.name
        );
        console.log("ItemOrder352", ItemOrder);
        if (ItemOrder !== -1) {
          console.log("1241");
          monthReceiptItem[ItemOrder].y = getTotalPriceReceiptMonth(item);
        }
        monthReceiptItem = [...monthReceiptItem];
        monthReceiptItem.sort((a, b) =>
          moment(a.x, "DD-MM-YYYY").diff(moment(b.x, "DD-MM-YYYY"))
        );
        console.log("monthReceiptItem35", monthReceiptItem);
        return setListReceiptItemMonth(monthReceiptItem.sort());
      });
  };

  const getTotalPrice = (list) => {
    const TotalPrice = list?.orderRevenue?.reduce((total, item) => {
      return (total += item.totalPrice);
    }, 0);

    return TotalPrice;
  };

  const getTotalPriceMonth = (item) => {
    console.log("item2424", item);
    const TotalPrice = item?.orderRevenueDay.reduce((total, item) => {
      return (total += item.totalPrice);
    }, 0);

    return TotalPrice;
  };

  const getTotalPriceReceiptMonth = (item) => {
    const TotalPrice = item?.receiptRevenue?.reduce((total, item) => {
      return (total += item.totalPriceReceipt);
    }, 0);

    return TotalPrice;
  };

  const getTotalPriceReceipt = (list) => {
    const TotalPrice = list?.receiptRevenue?.reduce((total, item) => {
      return (total += item.totalPriceReceipt);
    }, 0);

    return TotalPrice;
  };
  const d = new Date();
  console.log("!33", moment(d.setMonth(0)));

  const getItemSold = () => {
    for (let i = 0; i < moment(i, "e").startOf("week").isoWeekday(i); i--) {
      dayItem.push({ x: moment().day(i).format("DD-MM-YYYY"), y: 0 });
    }

    let orderDayList = dayItem.reverse();
    console.log("orderDayList", orderDayList);
    return orderRSForWeek?.map((item, index) => {
      const ItemOrder = orderDayList?.findIndex(
        (item1) => item1.x === item.name
      );
      // console.log("ItemOrder", ItemOrder);
      if (ItemOrder !== -1) {
        orderDayList[ItemOrder].y = getTotalPrice(item);
      }
      orderDayList = [...orderDayList];
      setListChartItem(orderDayList);
      console.log("orderDayList123", orderDayList);
    });
  };
  const getItemReceipt = () => {
    for (let i = 0; i < moment(i, "e").startOf("week").isoWeekday(i); i--) {
      dayReceipt.push({ x: moment().day(i).format("DD-MM-YYYY"), y: 0 });
    }
    let orderDayListReceipt = dayReceipt.reverse();

    console.log("receiptRSForWeek", receiptRSForWeek);
    return receiptRSForWeek?.map((item, index) => {
      const ItemOrder = orderDayListReceipt?.findIndex(
        (item1) => item1.x === item.name
      );
      // console.log("ItemOrder", ItemOrder);
      if (ItemOrder !== -1) {
        orderDayListReceipt[ItemOrder].y = getTotalPriceReceipt(item);
      }
      console.log("first,", orderDayListReceipt);
      orderDayListReceipt = [...orderDayListReceipt];
      setListReceiptItem(orderDayListReceipt);
      console.log("orderDayListReceipt12345", orderDayListReceipt);
    });
  };
  //  console.log("yearLabel", yearLabel);
  const getItemSoldYear = () => {
    console.log("1222");

    for (let i = 0; i < yearLabel.length; i++) {
      console.log("yearLabel[i]", yearLabel[i]);
      //  console.log("yearLabel.length", yearLabel.length);
      yearItem.push({ x: yearLabel[i], y: 0 });
    }
    console.log("yearItem", yearItem);
    console.log("orderRSForYear", orderRSForYear);
    orderRSForYear?.map((item, index) => {
      const ItemOrder = yearItem?.findIndex((item1) => item1.x === item.name);

      if (ItemOrder !== -1) {
        yearItem[ItemOrder].y = getTotalPrice(item);
      }
      yearItem = [...yearItem];
      console.log("yearItem123", yearItem);
      return setListChartItemYear(yearItem);
    });
  };

  const getItemSoldMonth = () => {
    for (let i = 0; i < labelMonth.length; i++) {
      monthItem.push({ x: labelMonth[i].name, y: 0 });
    }
    // console.log("monthLabel", monthLabel);
    console.log("monthStatic43", monthItem);
    orderRSForMonth !== null &&
      orderRSForMonth[0]?.orderRevenue?.map((item, index) => {
        const ItemOrder = monthItem?.findIndex(
          (item1) => item1.x === item.name
        );
        if (ItemOrder !== -1) {
          monthItem[ItemOrder].y = getTotalPriceMonth(item);
        }
        monthItem = [...monthItem];
        monthItem.sort((a, b) =>
          moment(a.x, "DD-MM-YYYY").diff(moment(b.x, "DD-MM-YYYY"))
        );

        console.log("monthItem3423", monthItem);
        return setListChartItemMonth(monthItem);
      });
  };

  useEffect(() => {
    if (!orderRSForYear) {
      dispatch(getOrderRSForYear());
    }
    getItemSoldYear();
  }, [orderRSForYear]);
  var today = new Date();
  var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

  console.log("firstDay", moment(firstDay).format("MM-YYYY"));
  // console.log("lastDayOfMonth", lastDayOfMonth);
  const getItemReceiptYear = () => {
    for (let i = 0; i < yearLabel.length; i++) {
      yearReceiptItem.push({
        x: yearLabel[i],
        y: 0,
      });
    }

    console.log("yearReceiptItem", yearReceiptItem);
    return receiptRSForYear?.map((item, index) => {
      const ItemOrder = yearReceiptItem?.findIndex(
        (item1) => item1.x === item.name
      );
      // console.log("ItemOrder", ItemOrder);
      if (ItemOrder !== -1) {
        yearReceiptItem[ItemOrder].y = getTotalPriceReceipt(item);
      }
      console.log("first,", yearReceiptItem);
      yearReceiptItem = [...yearReceiptItem];
      setListReceiptItemYear(yearReceiptItem);

      console.log("yearLabel12345", yearReceiptItem);
    });
  };

  useEffect(() => {
    if (!receiptRSForYear) {
      dispatch(getReceiptRSForYear());
    }
    getItemReceiptYear();
  }, [receiptRSForYear]);

  let state = {
    series: [
      {
        name: "Nhập vào",
        data:
          option === 30
            ? listReceiptItemYear
            : option === 20
            ? listReceiptItemMonth
            : listReceiptItem,
      },
      {
        // listChartItemMonth
        // option === 30 ? yearLabel : option === 20 ? monthLabel : dayLabel
        name: "Bán ra",
        data:
          option === 30
            ? listChartItemYear
            : option === 20
            ? listChartItemMonth
            : listChartItem,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 430,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          // dataLabels: {
          //   position: "top",
          // },
        },
      },
      dataLabels: {
        enabled: false,
        offsetX: 0,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        // option === 30 ? yearLabel : dayLabel
        categories:
          option === 30 ? yearLabel : option === 20 ? labelName : dayLabel,
      },
    },
  };
  console.log("listChartItemMonth", listChartItemMonth);
  return (
    <div>
      <div>
        <div style={{ width: "100%", marginBottom: "20px" }}>
          <Box>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                {" "}
                <Box
                  sx={{
                    background: "white",
                    height: "auto",
                    width: "100%",
                    borderRadius: "10px",
                    padding: "20px",

                    marginBottom: "10px",
                    boxShadow: "rgb(100 100 111 / 13%) 0px 1px 5px 2px;",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <div className="text-left leading-5">
                        {" "}
                        <Typography className="m-0">Sản phẩm</Typography>
                        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                          {bookList?.result}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        src="../../../../img/static.jpg"
                        alt=""
                        height={400}
                        width={400}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={3}>
                {" "}
                <Box
                  sx={{
                    background: "white",
                    height: "auto",
                    width: "280px",
                    borderRadius: "10px",
                    padding: "20px",

                    marginBottom: "10px",
                    boxShadow: "rgb(100 100 111 / 13%) 0px 1px 5px 2px;",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <div className="text-left leading-5">
                        {" "}
                        <Typography className="m-0">Người Dùng</Typography>
                        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                          {accountList?.result}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        src="../../../../img/images.png"
                        alt=""
                        height={400}
                        width={400}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={3}>
                {" "}
                <Box
                  sx={{
                    background: "white",
                    height: "auto",
                    width: "280px",
                    borderRadius: "10px",
                    padding: "20px",

                    marginBottom: "10px",
                    boxShadow: "rgb(100 100 111 / 13%) 0px 1px 5px 2px;",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <div className="text-left leading-5">
                        {" "}
                        <Typography className="m-0">Đơn hàng</Typography>
                        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                          {orderList?.result}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        src="../../../../img/cart.png"
                        alt=""
                        height={800}
                        width={800}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={3}>
                {" "}
                <Box
                  sx={{
                    background: "white",
                    height: "auto",
                    width: "280px",
                    borderRadius: "10px",
                    padding: "20px",

                    marginBottom: "10px",
                    boxShadow: "rgb(100 100 111 / 13%) 0px 1px 5px 2px;",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={8}>
                      <div className="text-left leading-5">
                        {" "}
                        <Typography className="m-0">Khuyến mãi</Typography>
                        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                          {promotionList?.result}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={4}>
                      <img
                        src="../../../../img/static.jpg"
                        alt=""
                        height={400}
                        width={400}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
        {loadingOrderRSForYear ||
        loadingOrderRSForMonth ||
        loadingReceiptRSForWeek ||
        loadingReceiptRSForMonth ||
        loadingReceiptRSForYear ||
        loadingOrderRSForWeek ? (
          <Loading />
        ) : (
          <Box
            sx={{
              minWidth: 120,
              boxShadow: "rgb(100 100 111 / 13%) 0px 1px 5px 2px",
              padding: "20px",
              display: "flex",
              borderRadius: "15px",
              marginBottom: "35px",
            }}
          >
            <div className="w-3/4">
              <h2 className="text-center text-2xl">Thống kê doanh thu</h2>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Thống kê</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={option}
                  label="Thống kê"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Tuần trước</MenuItem>
                  <MenuItem value={20}>Tháng</MenuItem>
                  <MenuItem value={30}>Năm</MenuItem>
                </Select>
              </FormControl>
              <div id="chart" style={{ width: "100%" }}>
                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  height={430}
                />
              </div>
            </div>
            <div className="w-1/4 flex flex-col justify-center items-center text-center">
              <Box
                sx={{
                  background: "white",
                  height: "auto",
                  width: "220px",
                  borderRadius: "10px",
                  padding: "5px",
                  boxShadow: "rgb(100 100 111 / 13%) 0px 1px 5px 2px;",
                }}
              >
                <Grid item xs={8}>
                  <div className="leading-5 text-center ">
                    {" "}
                    <Typography
                      variant="h4"
                      className="m-0"
                      sx={{ fontWeight: "normal" }}
                    >
                      Lợi nhuận
                    </Typography>
                    <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                      {option === 30
                        ? revenueYear?.toLocaleString("vi-VI")
                        : option === 20
                        ? revenueMonth?.toLocaleString("vi-VI")
                        : revenueWeek.toLocaleString("vi-VI")}
                      đ
                    </Typography>
                  </div>
                </Grid>
              </Box>
              <Box
                sx={{
                  background: "white",
                  height: "auto",
                  width: "220px",
                  borderRadius: "10px",
                  padding: "5px",
                  marginTop: "30px",
                  // marginBottom: "10px",
                  boxShadow: "rgb(100 100 111 / 13%) 0px 1px 5px 2px;",
                }}
              >
                <Grid item xs={8}>
                  <div className=" leading-5 text-center">
                    {" "}
                    {/* <div>
                  <img
                    src="./img/cost.png"
                    alt=""
                  />
                </div> */}
                    <Typography
                      variant="h4"
                      className="m-0"
                      sx={{ fontWeight: "normal" }}
                    >
                      Chi phí
                    </Typography>
                    <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
                      {option === 30
                        ? costYear?.toLocaleString("vi-VI")
                        : option === 20
                        ? costMonth?.toLocaleString("vi-VI")
                        : costWeek.toLocaleString("vi-VI")}
                      đ
                    </Typography>
                  </div>
                </Grid>
              </Box>
            </div>
          </Box>
        )}
      </div>
      <Card>
        <CardHeader
          title="Thống kê sản phẩm"
          // subheader="(+43%) than last year"
          action={
            <div className="flex ">
              {/* <FormControl sx={{ m: 1, width: 300, marginTop: "10px" }}>
                <InputLabel
                  id="demo-multiple-name-label"
                  sx={{ marginTop: "10px" }}
                >
                  Sản phẩm
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  onChange={() => {
                    handleChangeBook();
                  }}
                  sx={{ marginTop: "10px" }}
                  value={personName}
                  input={<OutlinedInput label="Sản phẩm" />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      className="p-1 m-3"
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Sản phẩm
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={book}
                    label="Sản phẩm"
                    onChange={handleChangeBook}
                  >
                    {bookList?.data.map((item, index) => {
                      return <MenuItem value={item.id}>{item.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                select
                fullWidth
                value={seriesData}
                SelectProps={{ native: true }}
                onChange={handleChangeSeriesData}
                sx={{
                  "& fieldset": { border: "0 !important" },
                  "& select": {
                    typography: "subtitle2",
                    padding: "18px",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0.75,
                    width: "50%",
                    marginLeft: "10px",
                    bgcolor: "background.neutral",
                  },
                  "& .MuiNativeSelect-icon": {
                    top: 4,
                    right: 0,
                    width: 20,
                    height: 20,
                  },
                  "& .MuiFormControl-fullWidth ": {
                    marginTop: "10px !important",
                  },
                  "& .MuiFormControl-root": {
                    alignItems: "end !important",
                  },
                  "& .MuiTextField-root": {
                    alignItems: "end !important",
                    marginTop: "10px !important",
                  },

                  "MuiTextField-root css-37zg1r-MuiFormControl-root-MuiTextField-root":
                    {
                      marginTop: "10px !important",
                    },
                }}
              >
                {/* {CHART_DATA.map((option) => ( */}
                <option
                  className="mt-60 p-2"
                  // key={option.year}
                  // onChange={handleChangeYear}
                  value="2022"
                >
                  Năm
                </option>
                <option
                  className="mt-60 p-2"
                  // key={option.year}
                  // onChange={handleChangeYear}
                  value="11"
                >
                 Tháng
                </option>
                {/* ))} */}
              </TextField>
            </div>
          }
        />

        {CHART_DATA.map((item) => (
          //  key={item.year}
          <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
            {/* {item.year === seriesData && ( */}
            <ReactApexChart
              type="line"
              series={item.data}
              options={chartOptions}
              height={364}
            />
            {/* )} */}
          </Box>
        ))}
      </Card>
    </div>
  );
}
