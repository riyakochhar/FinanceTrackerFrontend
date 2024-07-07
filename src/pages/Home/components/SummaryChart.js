import React, { useEffect, useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3ccb96", "#ff2b6c", "#c292fd"];

function SummaryChart({ transactionDetails }) {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    calculateSummary(transactionDetails);
  }, [transactionDetails]);

  const calculateSummary = (details) => {
    let totalIncome = 0;
    let totalExpenses = 0;
    let currentBalance = 0;

    details.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount;
      } else {
        totalExpenses += item.amount;
      }
    });

    currentBalance = totalIncome - totalExpenses;

    setSummaryData([
      { name: "Income", value: totalIncome, fill: COLORS[0] },
      { name: "Expenses", value: totalExpenses, fill: COLORS[1] },
      { name: "Balance", value: currentBalance, fill: COLORS[2] },
    ]);
  };

  return (
    <div style={{ width: "100%", height: "375px" }}>
      <ResponsiveContainer>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="100%"
          barSize={35}
          data={summaryData}
        >
          <RadialBar minAngle={15} background clockWise dataKey="value" />
          <Legend />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SummaryChart;
