import React from "react";
import styles from "../css/style.module.css";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { LuText } from "react-icons/lu";
import { TbCategory, TbCategoryPlus } from "react-icons/tb";
import { MdCalendarMonth } from "react-icons/md";
import DatePicker from "../../../components/DatePicker/index";
import { formatDate } from "../../../utils/formatDate";
import Loader from "../../../components/Loader";

function Transactions({ details, setSelectedDate, loader }) {
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
        {loader ? (
          <center>
            <Loader />
          </center>
        ) : details?.length > 0 ? (
          details?.map((item, idx) => (
            <div className={styles.list} key={idx}>
              <div className={styles.details_text}>{item.description}</div>
              <div
                className={styles.details_text}
                style={{
                  color: item.type === "income" ? "green" : "red",
                }}
              >
                ₹ {item.amount}
              </div>
              <div className={styles.details_text}>{item.category}</div>
              <div className={styles.details_text}>{item.subCategory}</div>
              <div className={styles.details_text}>
                {formatDate(item.date, "dd/mm/yy")}
              </div>
            </div>
          ))
        ) : (
          <center>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/010/856/652/small/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg"
              alt="No Transactions"
              className={styles.no_transaction_img}
            />
            <p className={styles.no_transaction_text}>No Transaction Found</p>
          </center>
        )}
      </div>
    </div>
  );
}

export default Transactions;
