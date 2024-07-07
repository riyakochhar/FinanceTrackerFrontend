import React, { useEffect, useState } from "react";
import styles from "../css/summary.module.css";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { MdAccountBalance } from "react-icons/md";

function SummaryDetails({ transactionDetails }) {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    calculateSummary(transactionDetails);
  }, [transactionDetails]);

  const calculateSummary = (details) => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let currentBalance = 0;
    let prevTotalIncome = 0;
    let prevTotalExpenses = 0;
    let prevCurrentBalance = 0;

    // Calculate current values
    details.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount;
      } else {
        totalExpenses += item.amount;
      }
    });
    currentBalance = totalIncome - totalExpenses;

    // Calculate previous values (for percentage change)
    details.forEach((item) => {
      if (item.type === "income") {
        prevTotalIncome += item.amount;
      } else {
        prevTotalExpenses += item.amount;
      }
    });
    prevCurrentBalance = prevTotalIncome - prevTotalExpenses;

    const totalSavings = currentBalance - prevCurrentBalance;
    const incomePercentChange =
      ((totalIncome - prevTotalIncome) / prevTotalIncome) * 100;
    const expensesPercentChange =
      ((totalExpenses - prevTotalExpenses) / prevTotalExpenses) * 100;
    const savingsPercentChange =
      ((totalSavings - (prevTotalIncome - prevTotalExpenses)) /
        (prevTotalIncome - prevTotalExpenses)) *
      100;

    setSummaryData([
      {
        title: "Total Income",
        value: totalIncome,
        symbol: "₹",
        trend: `+ ${incomePercentChange.toFixed(2)}%`,
        logo: <FaArrowTrendUp />,
        class: "green",
      },
      {
        title: "Total Expenses",
        value: totalExpenses,
        symbol: "₹",
        trend: `- ${expensesPercentChange.toFixed(2)}%`,
        class: "pink",
        logo: <FaArrowTrendDown />,
      },
      //   {
      //     title: "Total Savings",
      //     value: totalSavings,
      //     symbol: "₹",
      //     trend: `+ ${savingsPercentChange.toFixed(2)}%`,
      //     class: "pink",
      //   },
      {
        title: "Current Balance",
        value: currentBalance,
        symbol: "₹",
        trend: `+ ${
          ((currentBalance - prevCurrentBalance) / prevCurrentBalance) * 100
        }%`,
        class: "purple",
        logo: <MdAccountBalance />,
      },
    ]);
  };

  return (
    <div className={styles.summary_wrapper}>
      {summaryData?.map((item, index) => (
        <div key={index} className={`${styles.details} ${styles[item.class]}`}>
          <div className={styles.subdiv}>
            <div className={styles.col}>
              <p className={styles.heading}>{item.title}</p>
              <p className={styles.value}>
                {item.symbol} {item.value}
              </p>
            </div>
            <p className={styles.logo}>{item.logo}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryDetails;
