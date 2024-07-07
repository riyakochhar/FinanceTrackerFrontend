import React, { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function Calendar({ setDatePicker, handleShowDate, maxCheck }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const calendarRef = useRef(null);

  const handleDatesChange = (ranges) => {
    setState([ranges.selection]);

    if (ranges.selection.endDate !== ranges.selection.startDate) {
      handleShowDate(
        format(ranges.selection.startDate, "yyMMdd"),
        format(ranges.selection.endDate, "yyMMdd")
      );
      setDatePicker(2);
    }

    // Check if the end date has been selected
  };

  const handleUpdateButtonClick = () => {
    const dateSelect = state?.[0];
    handleShowDate(
      format(dateSelect?.startDate, "yyMMdd"),
      format(dateSelect?.endDate, "yyMMdd")
    );
    setDatePicker(2);
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setDatePicker(2);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="date-range-overlay">
      <div ref={calendarRef}>
        <div className="date-range-container">
          <DateRangePicker
            months={1}
            onChange={handleDatesChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            ranges={state}
            direction="horizontal"
          />
        </div>
      </div>
    </div>
  );
}

export default Calendar;
