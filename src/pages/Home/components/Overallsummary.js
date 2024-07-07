import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import styles from "../css/style.module.css";
import SummaryChart from "./SummaryChart";
import SummaryDetails from "./SummaryDetails";
import axios from "axios";
import AddTransaction from "./AddTransaction";

function Overallsummary() {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  let [details, setDetails] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { _id: userId } = JSON.parse(storedUser);
      const getAllTransactions = async () => {
        let url = `http://localhost:8000/api/transactions/${userId}`;

        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response?.data);
          setDetails(response?.data.transactions);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };
      getAllTransactions();
    } else {
      navigate("/login");
    }
  }, [navigate, appContext.reload]);

  return (
    <div className="col-2">
      <div className={styles.container}>
        <div className={styles.details_container}>
          <div className={styles.transaction_header}>
            <h3 className={styles.heading}>Summary</h3>
            {appContext?.isMobile && <AddTransaction />}
          </div>
          <div className={styles.subdiv}>
            <SummaryChart transactionDetails={details} />
          </div>
        </div>
        <div className={styles.details_container}>
          <div className={styles.subdiv}>
            <SummaryDetails transactionDetails={details} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overallsummary;
