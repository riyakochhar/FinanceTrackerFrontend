import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { VscGraph } from "react-icons/vsc";
import { CiCircleList } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";

function SideBar({ drawer }) {
  const nav_data = [
    { title: "Dashboard", path: "/home", icon: <VscGraph /> },
    { title: "Transactions", path: "/transactions", icon: <CiCircleList /> },
    { title: "Logout", path: "/login", icon: <AiOutlineLogout /> },
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
                    if (item.path === "/logout") {
                      localStorage.clear();
                      navigate("/login");
                    } else {
                      navigate(item.path);
                    }
                  }}
                >
                  <div className={styles.active_card}>
                    <p className={styles.logo}>{item?.icon} </p>
                    <p className={styles.heading}>{item?.title}</p>
                  </div>
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
