import React, { useState } from "react";

function TabBar(props) {
  const { tabs, styles, selected } = props;
  const [active, setActive] = useState(
    selected ? selected : tabs.length > 0 ? tabs[0].title : ""
  );
  return (
    <div className={styles.tab_container}>
      {tabs?.map(function (item, idx) {
        return (
          <button
            className={
              active === item.title
                ? `${styles.tab_class} ${styles.activeClass}`
                : styles.tab_class
            }
            onClick={function (e) {
              e.preventDefault();
              setActive(item.title);
              item?.execute?.func(item?.execute?.value);
            }}
            key={idx}
          >
            {item.title}
            {item.value && item?.value !== "" ? `(${item.value})` : ""}
          </button>
        );
      })}
    </div>
  );
}

export default TabBar;
