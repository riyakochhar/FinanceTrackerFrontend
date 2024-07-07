import React, { useContext, useEffect, useState } from "react";
import styles from "./css/style.module.css";
import axios from "axios";
import Loader from "../../components/Loader";
import { AppContext } from "../../App";
import Header from "../../components/Header";
import ExpenseBarChart from "./components/ExpenseBarChart";
import { useNavigate } from "react-router-dom";
import TransactionList from "./components/TransactionList";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { LuText } from "react-icons/lu";
import { TbCategory, TbCategoryPlus } from "react-icons/tb";
import { MdCalendarMonth } from "react-icons/md";
import DatePicker from "../../components/DatePicker";
import { formatDate } from "../../components/utility";

function Transactions() {
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

  function handleDate(from_slot, to_slot) {
    setSelectedDate({ from_slot: from_slot, to_slot: to_slot });
  }
  return loader ? (
    <center>
      <Loader />
    </center>
  ) : (
    <div className="main-row">
      <div className={styles.main}>
        <div className={styles.sticky}>
          <Header user={appContext?.user} />{" "}
          <div className={styles.details_container}>
            <div className={styles.transaction_header}>
              <h3 className={styles.heading}>Category Wise Expenses</h3>
            </div>
            <div className={styles.subdiv}>
              <ExpenseBarChart transactionDetails={details} />
            </div>
          </div>
          <div className={styles.details_container}>
            <div className={styles.transaction_header}>
              <h3 className={styles.heading}>All Transactions</h3>
              <div className={styles.subdiv}>
                <div className={styles.date_range_container}>
                  <div className={styles.date_input_wrapper}>
                    <DatePicker callBackfn={handleDate} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.details_wrapper}>
              <div className={styles.details_heading}>
                <LuText className={styles.icon} /> Description
              </div>
              <div className={styles.details_heading}>
                <RiMoneyRupeeCircleLine className={styles.icon} /> Amount
              </div>
              <div className={styles.details_heading}>
                <TbCategoryPlus className={styles.icon} /> Category
              </div>
            </div>
          </div>
        </div>
        <div className={styles.details_container} style={{ paddingTop: "0" }}>
          <TransactionList details={details} />
        </div>
      </div>
    </div>
  );
}

export default Transactions;
