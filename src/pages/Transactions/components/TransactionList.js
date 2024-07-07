import React from "react";
import styles from "../css/style.module.css";

function TransactionList({ details }) {
  return (
    <div>
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
              <div className={styles.details_text}>{item?.subCategory}</div>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TransactionList;
