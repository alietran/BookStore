import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { getOrderRSForWeek } from "../../../redux/action/orderAction";
import moment from "moment";
import { getReceiptRSForWeek } from "../../../redux/action/receiptAction";
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

  // console.log("weeknumber1", weeknumber1);
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
    <div id="chart" style={{ width: "70%" }}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={430}
      />
    </div>
  );
}
