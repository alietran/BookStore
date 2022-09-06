import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getOrderRSForWeek } from "../../../redux/action/orderAction";

export default function Overview() {
  const { orderRSForWeek } = useSelector((state) => state.OrderReducer);
  let arrayRSDay = [];
  const dayLabel = Array.apply(null, Array(7)).map(function (_, i) {
    return moment(i, "e")
      .startOf("week")
      .isoWeekday(i + 1)
      .format("DD-MM-YYYY");
  });
  for (let i = 0; i < moment(i, "e").startOf("week").isoWeekday(i); i--) {
    arrayRSDay.push({ x: moment().day(i).format("DD-MM-YYYY"), y: 0 });
  }
  arrayRSDay = arrayRSDay.reverse();
  console.log("123", arrayRSDay);

  let dataOrder = [];
  console.log("orderRSForWeek", orderRSForWeek);
  orderRSForWeek?.forEach((itemRS) => {
    let index = arrayRSDay.findIndex((item) => item.x === itemRS.name);
    console.log("index", index);

    if (index !== -1) {
      let totalPrice = itemRS.orderRevenue.reduce(
        (total, item) => (total += item.totalPrice),
        0
      );
      arrayRSDay[index].y = totalPrice;
    }
    arrayRSDay = [...arrayRSDay];
    // arrayRSDay.forEach((day) => {
    //   if (itemRS.name === day.x) {
    //     let totalPrice = itemRS.orderRevenue.reduce(
    //       (total, item) => (total += item.totalPrice),
    //       0
    //     );
    //     console.log("totalPrice", totalPrice);
    //     dataOrder.push({ x: itemRS.name, y: totalPrice });
    //     console.log("True", itemRS.name);
    //   }
    //  else {
    //   dataOrder.push({ x: day, y: 0 });
    // }
    // });
  });

  const uniqueIds = [];

  // dataOrder = dataOrder?.filter(
  //   (value, index, self) =>
  //     index === self.findIndex((t) => t.x === value.x && t.y === value.y)
  // );

  const dispatch = useDispatch();
  console.log("dataOrder", dataOrder);

  useEffect(() => {
    if (!orderRSForWeek?.length) {
      dispatch(getOrderRSForWeek());
    }
  }, []);

  const [state, setState] = useState({
    series: [
      {
        name: "Nhập vào",
        data: [
          { x: "29-08-2022", y: 0 },
          { x: "30-08-2022", y: 0 },
          { x: "31-08-2022", y: 0 },
          { x: "01-09-2022", y: 200000 },
          { x: "02-09-2022", y: 70000 },
          { x: "03-09-2022", y: 50000 },
          { x: "04-09-2022", y: 0 },
        ],
      },
      {
        name: "Bán ra",
        data: arrayRSDay,
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
          columnWidth: "75%",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: false,
        // offsetX: -6,
        // style: {
        //   fontSize: "12px",
        //   colors: ["#fff"],
        // },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (val) {
            return val.toLocaleString() + " VND";
          },
        },
      },
      xaxis: {
        categories: dayLabel,
      },
      yaxis: {
        title: {
          text: "Doanh thu (VND)",
        },
      },
    },
  });
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {orderRSForWeek && (
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="bar"
              width="800"
            />
          )}
        </div>
      </div>
    </div>
  );
}
