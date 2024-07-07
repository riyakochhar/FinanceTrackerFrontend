const selectCustomStyles = {
  option: (provided, state) => ({
    ...provided,
  }),
  control: (provided) => ({
    ...provided,
    border: "none",
    borderRadius: "0px",
    boxShadow: "none",
    padding: "0 1px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    width: "0",
  }),
};

export { selectCustomStyles };
