import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./style.module.css";

function SideBar({ drawer }) {
  const nav_data = [
    { title: "Dashboard", path: "/home" },
    { title: "Transactions", path: "/transactions" },
    { title: "Logout", path: "/login" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <div className={styles.sidenav} style={{ width: drawer ? "100%" : "0" }}>
      <div className={styles.sidenav_body} style={{ width: "100%" }}>
        <div className={styles.links}>
          {nav_data?.map(function (item, idx) {
            return (
              <div className={styles.row} key={idx}>
                <a
                  className={
                    currentRoute !== item.path
                      ? `${styles.link}`
                      : `${styles.link} ${styles.active_link}`
                  }
                  href={item?.path}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                >
                  <span>{item?.title}</span>
                </a>
              </div>
            );
          })}
        </div>
        <div className={styles.sidebar_footer}>
          <div className={styles.sidebar_footer_wrapper}>
            <div className={styles.text}>Finance Tracker</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
