import React from "react";
import styles from "./style.module.css";

const Loader = () => {
  // return <div className={styles.loader}></div>;
  return (
    <div className={styles.loader_conatiner}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
