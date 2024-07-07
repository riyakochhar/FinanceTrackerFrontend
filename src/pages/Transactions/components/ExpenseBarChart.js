import React, { useEffect, useState } from "react";
import styles from "../css/chart.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseBarChart({ transactionDetails }) {
  const [expenseData, setExpenseData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

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
      <ResponsiveContainer>
        <BarChart data={expenseData} barSize={20}>
          <XAxis dataKey="name" className={styles.axis} />
          <YAxis className={styles.axis} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="Expenses" fill="#daf0f7" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseBarChart;
