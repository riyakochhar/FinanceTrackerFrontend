import React, { useContext, useEffect, useState } from "react";
import AddTransaction from "../../pages/Home/components/AddTransaction";
import styles from "./style.module.css";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import SideBar from "../SideBar";

function Header({ user }) {
  const [drawer, setDrawer] = useState(false);
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggle = () => {
    setDrawer(!drawer);
  };

  useEffect(() => {
    if (!appContext.isMobile) {
      setDrawer(false);
    }
  }, [appContext.reload, appContext.isMobile]);
  return (
    <header className={styles.header}>
      <div>
        <h2 className={styles.user}>Hello {user?.name || "User"} !!</h2>

        {!appContext?.isMobile && <p>Welcome Back</p>}
      </div>
      {appContext?.isMobile ? (
        <span onClick={toggle} className={styles.cart_icon}>
          {drawer ? <AiOutlineClose /> : <AiOutlineMenu />}
          {drawer && <SideBar drawer={drawer} />}
        </span>
      ) : (
        <div style={{ display: "flex" }}>
          <AddTransaction />
          <button className={styles.logout_btn} onClick={handleLogout}>
            <AiOutlineLogout className={styles.logout_icon} /> Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
