const customStyles = {
  control: (provided) => ({
    ...provided,
    background: "none",
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
  }),
  indicatorSeparator: () => ({ display: "none" }),
  indicatorsContainer: (provided) => ({
    ...provided,
    color: "#000", // Change the color to match your design
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%", // Set dropdown width to 100%,
    left: "4px",
    zIndex: 4,
  }),
};

const datePickerStyles = {
  control: (provided) => ({
    ...provided,
    background: "none",
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
    minHeight: "33px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingTop: "0px",
  }),

  indicatorsContainer: (provided) => ({
    ...provided,
    color: "#000", // Change the color to match your design
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "0px",
    padding: "0px",
  }),
  menu: (provided) => ({
    ...provided,
    width: "100%", // Set dropdown width to 100%,
    left: "4px",
    zIndex: 4,
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    paddingTop: 1,
    paddingBottom: 1,
  }),
  clearIndicator: (styles) => ({
    ...styles,
    paddingTop: 1,
    paddingBottom: 1,
  }),
};

export { customStyles, datePickerStyles };
