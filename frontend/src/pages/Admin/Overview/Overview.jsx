import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getOrderRSForWeek } from "../../../redux/action/orderAction";
import { getReceiptRSForWeek } from "../../../redux/action/receiptAction";

export default function Overview() {
  const { orderRSForWeek } = useSelector((state) => state.OrderReducer);
  const { receiptRSForWeek } = useSelector((state) => state.ReceiptReducer);
  const [arrayOrderRSDay, setArrayOrderRSDay] = useState([]);
  const [arrayReceiptRSDay, setArrayReceiptRSDay] = useState([]);
  const [state, setState] = useState();

  const dayLabel = Array.apply(null, Array(7)).map(function (_, i) {
    return moment(i, "e")
      .startOf("week")
      .isoWeekday(i + 1)
      .format("DD-MM-YYYY");
  });
  useEffect(() => {
    let arrayRSDay = [];

    for (let i = 0; i < moment(i, "e").startOf("week").isoWeekday(i); i--) {
      arrayRSDay.push({ x: moment().day(i).format("DD-MM-YYYY"), y: 0 });
    }
    arrayRSDay = arrayRSDay.reverse();
    orderRSForWeek?.forEach((itemRS) => {
      let index = arrayRSDay.findIndex((item) => item.x === itemRS.name);

      if (index !== -1) {
        let totalPrice = itemRS.orderRevenue.reduce(
          (total, item) => (total += item.totalPrice),
          0
        );
        arrayRSDay[index].y = totalPrice;
      }
      arrayRSDay = [...arrayRSDay];
      setArrayOrderRSDay(arrayRSDay);
    });
  }, [orderRSForWeek]);

    useEffect(() => {
      let arrayRSDay = [];

      for (let i = 0; i < moment(i, "e").startOf("week").isoWeekday(i); i--) {
        arrayRSDay.push({ x: moment().day(i).format("DD-MM-YYYY"), y: 0 });
      }
      arrayRSDay = arrayRSDay.reverse();
      receiptRSForWeek?.forEach((itemRS) => {
        let index = arrayRSDay.findIndex((item) => item.x === itemRS.name);

        if (index !== -1) {
          let totalPrice = itemRS.receiptRevenue.reduce(
            (total, item) => (total += item.totalPriceReceipt),
            0
          );
          arrayRSDay[index].y = totalPrice;
        }
        arrayRSDay = [...arrayRSDay];
        setArrayReceiptRSDay(arrayRSDay);
      });
    }, [receiptRSForWeek]);

  const dispatch = useDispatch();
  console.log("arrayOrderRSDay", arrayOrderRSDay);
  console.log("arrayReceiptRSDay", arrayReceiptRSDay);
  console.log("receiptRSForWeek", receiptRSForWeek);

  useEffect(() => {
    if (!orderRSForWeek?.length) {
      dispatch(getOrderRSForWeek());
    }
    if (!receiptRSForWeek?.length) {
      dispatch(getReceiptRSForWeek());
    }
  }, []);

  useEffect(() => {
    if (arrayOrderRSDay) {
      setState({
        series: [
          {
            name: "Nhập vào",
            data: arrayReceiptRSDay,
          },
          {
            name: "Bán ra",
            data: arrayOrderRSDay,
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
                return val?.toLocaleString() + " VND";
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
    }
  }, [arrayOrderRSDay]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {state && (
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
