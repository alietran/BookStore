import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getOrderRSForWeek } from "../../../redux/action/orderAction";
import moment from "moment";
import { getReceiptRSForWeek } from "../../../redux/action/receiptAction";
import { Box, Grid, Typography } from "@mui/material";
export default function Overview() {
  const dispatch = useDispatch();
  const { orderRSForWeek } = useSelector((state) => state.OrderReducer);
  const { receiptRSForWeek } = useSelector((state) => state.ReceiptReducer);
  const [listReceiptItem, setListReceiptItem] = useState([]);
  const [listChartItem, setListChartItem] = useState([]);
  var weeknumber = moment().weekday(-6).format("DD-MM-YYYY");

  const dayLabel = [];
  const dayItem = [];
  const dayReceipt = [];
  console.log("receiptRSForWeek", receiptRSForWeek);

  for (let i = 0; i < moment(i, "e").startOf("week").isoWeekday(i); i--) {
    dayLabel.push(moment().day(i).format("DD-MM-YYYY"));
  }
  console.log("dayLabel", dayLabel);

  console.log("orderRSForWeek", orderRSForWeek);

  useEffect(() => {
    if (!orderRSForWeek) {
      dispatch(getOrderRSForWeek());
    }
    getItemSold();
  }, [orderRSForWeek]);

  useEffect(() => {
    if (!receiptRSForWeek) {
      dispatch(getReceiptRSForWeek());
    }
    getItemReceipt();
  }, [receiptRSForWeek]);

  const getTotalPrice = (list) => {
    const TotalPrice = list?.orderRevenue?.reduce((total, item) => {
      return (total += item.totalPrice);
    }, 0);

    return TotalPrice;
  };
  const getTotalPriceReceipt = (list) => {
    const TotalPrice = list?.receiptRevenue?.reduce((total, item) => {
      return (total += item.totalPriceReceipt);
    }, 0);

    return TotalPrice;
  };

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
      console.log("ItemOrder", ItemOrder);
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
      console.log("ItemOrder", ItemOrder);
      if (ItemOrder !== -1) {
        orderDayListReceipt[ItemOrder].y = getTotalPriceReceipt(item);
      }
      console.log("first,", orderDayListReceipt);
      orderDayListReceipt = [...orderDayListReceipt];
      setListReceiptItem(orderDayListReceipt);
      console.log("orderDayListReceipt12345", orderDayListReceipt);
    });
  };

  let state = {
    series: [
      {
        name: "Nhập vào",
        data: listReceiptItem,
      },
      {
        name: "Bán ra",
        data: listChartItem,
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
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
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
        categories: dayLabel,
      },
    },
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              {" "}
              <Box
                sx={{
                  background: "white",
                  height: "auto",
                  width: "280px",
                  borderRadius: "10px",
                  padding: "20px",
                  marginTop: "90px",
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
                        556
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
                  marginTop: "90px",
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
                        556
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
                  marginTop: "90px",
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
                        556
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
                  marginTop: "90px",
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
                        556
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
      <div id="chart" style={{ width: "70%" }}>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={430}
        />
      </div>
    </div>
  );
}
