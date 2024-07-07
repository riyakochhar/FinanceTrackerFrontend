import React from "react";
import styles from "../css/style.module.css";

function TransactionList({ details }) {
  return (
    <div>
      <div className={styles.details}>
        {details?.length > 0 ? (
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
              <div className={styles.details_text}>{item.subCategory}</div>
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

export default TransactionList;
