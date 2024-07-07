import React from "react";
import styles from "../css/style.module.css";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { LuText } from "react-icons/lu";
import { TbCategory, TbCategoryPlus } from "react-icons/tb";
import { MdCalendarMonth } from "react-icons/md";
import DatePicker from "../../../components/DatePicker/index";
import { formatDate } from "../../../utils/formatDate";

function Transactions({ details, setSelectedDate }) {
  function handleDate(from_slot, to_slot) {
    setSelectedDate({ from_slot: from_slot, to_slot: to_slot });
  }
  return (
    <div>
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
          <TbCategory className={styles.icon} /> Category
        </div>{" "}
        <div className={styles.details_heading}>
          <TbCategoryPlus className={styles.icon} /> Sub-Category
        </div>
        <div className={styles.details_heading}>
          <MdCalendarMonth className={styles.icon} /> Date
        </div>
      </div>
      <div className={styles.details}>
        {details?.map(function (item, idx) {
          return (
            <div className={styles.list} key={idx}>
              <div className={styles.details_text}>{item?.description}</div>
              <div
                className={styles.details_text}
                style={{
                  color: item?.type === "income" ? "green" : "red",
                }}
              >
                ₹ {item?.amount}
              </div>
              <div className={styles.details_text}>{item?.category}</div>
              <div className={styles.details_text}>
                {item?.subCategory}
              </div>{" "}
              <div className={styles.details_text}>
                {formatDate(item?.date, "dd/mm/yy")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Transactions;
