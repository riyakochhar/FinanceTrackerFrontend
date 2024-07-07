import React, { useContext, useEffect, useState } from "react";
import styles from "./css/style.module.css";
import axios from "axios";
import Loader from "../../components/Loader";
import { AppContext } from "../../App";
import Header from "../../components/Header";
import ExpenseBarChart from "./components/ExpenseBarChart";
import { useNavigate } from "react-router-dom";
import Transactions from "./components/Transactions";
import { formatDate } from "../../components/utility";
import Overallsummary from "./components/Overallsummary";

function Home() {
  let [details, setDetails] = useState([]);
  let [loader, setLoader] = useState(false);
  const appContext = useContext(AppContext);
  let [selectedDate, setSelectedDate] = useState({
    from_slot: formatDate(
      new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    ),
    to_slot: formatDate(new Date()),
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { _id: userId } = JSON.parse(storedUser);
      const getAllTransactions = async () => {
        let url = `http://localhost:8000/api/transactions/${userId}?from_slot=${selectedDate.from_slot}&to_slot=${selectedDate.to_slot}`;

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
  }, [navigate, appContext.reload, selectedDate]);

  return loader ? (
    <center>
      <Loader />
    </center>
  ) : (
    <div className="main-row">
      <div className={styles.main}>
        <div className={styles.sticky}>
          <Header user={appContext?.user} />
        </div>
        <div className={styles.sub_main}>
          {!appContext?.isMobile && (
            <div className="col-1">
              <div className={styles.container}>
                <div className={styles.details_container}>
                  <div className={styles.transaction_header}>
                    <h3 className={styles.heading}>Category Wise Expenses</h3>
                  </div>
                  <div className={styles.subdiv}>
                    <ExpenseBarChart transactionDetails={details} />
                  </div>
                </div>
                <div className={styles.details_container}>
                  <Transactions
                    details={details}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
              </div>
            </div>
          )}
          <Overallsummary />
        </div>
      </div>
    </div>
  );
}

export default Home;
