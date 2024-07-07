import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import { AiOutlineClose } from "react-icons/ai";

function PopUp(props) {
  const {
    closeState,
    handleOpen,
    btnStyling,
    disabled,
    setClose,
    Header,
    align,
    display,
    setDisplay,
  } = props;
  // let [display, setDisplay] = useState(false);
  const formRef = useRef(null);
  useEffect(
    function () {
      if (closeState && closeState != undefined) {
        close();
      }
    },
    [closeState]
  );
  function close() {
    if (setClose && setClose != undefined) {
      setClose(true);
    }
    setDisplay(false);
  }
  function open() {
    if (handleOpen && handleOpen != undefined) {
      handleOpen();
    }
    setDisplay(true);
  }
  function handleClick(e) {
    if (formRef && formRef.current && formRef.current.contains(e.target)) {
      return;
    }
    close();
  }
  return (
    <>
      <button
        className={
          btnStyling && btnStyling != undefined
            ? btnStyling
            : styles.trigger_btn
        }
        onClick={open}
        disabled={disabled}
      >
        {props.btnName}
      </button>
      {display && (
        <div className={styles.overlay} onClick={handleClick}>
          <div className={styles.modal} ref={formRef}>
            <div className={styles.container}>
              {Header && Header != undefined ? Header : <></>}
              <span
                className={styles.icon}
                onClick={close}
                style={{ cursor: "pointer" }}
              >
                <AiOutlineClose />
              </span>
              <div
                className={
                  align && align != undefined
                    ? `${styles.popup_body_top}`
                    : styles.popup_body
                }
              >
                {props.children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default PopUp;
