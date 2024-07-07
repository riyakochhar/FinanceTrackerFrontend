import React, { useEffect, useState } from "react";
import styles from "../css/chart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../../components/Loader";

function ExpenseBarChart({ transactionDetails, loader }) {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    calculateExpenseData(transactionDetails);
  }, [transactionDetails]);

  const calculateExpenseData = (details) => {
    const categoryExpenses = {};

    details?.forEach((item) => {
      if (item?.type === "expense") {
        if (!categoryExpenses[item?.category]) {
          categoryExpenses[item?.category] = 0;
        }
        categoryExpenses[item.category] += item.amount;
      }
    });

    const data = Object?.keys(categoryExpenses)?.map((category) => ({
      name: category,
      Expenses: categoryExpenses[category],
    }));

    setExpenseData(data);
  };

  return (
    <div className={styles.chart_container}>
      {loader ? (
        <center>
          <Loader />
        </center>
      ) : transactionDetails?.length > 0 ? (
        <ResponsiveContainer>
          <BarChart data={expenseData} barSize={20}>
            <XAxis dataKey="name" className={styles.axis} />
            <YAxis className={styles.axis} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="Expenses" fill="#daf0f7" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <center>
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg"
            className={styles.no_img_found}
            alt="No image found"
          />
        </center>
      )}
    </div>
  );
}

export default ExpenseBarChart;
