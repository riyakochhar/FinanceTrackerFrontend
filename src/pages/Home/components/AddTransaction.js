import React, { useContext, useEffect, useState } from "react";
import PopUp from "../../../components/Popup";
import { AppContext } from "../../../App";
import styles from "../css/popup.module.css";
import Select from "react-select";
import { selectCustomStyles } from "../../../utils/customStyles";
import axios from "axios";
import { category_data } from "./seed";
import { LuText } from "react-icons/lu";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { TbCategory, TbCategoryPlus } from "react-icons/tb";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

function AddTransaction() {
  let [close, setClose] = useState(false);
  let [formData, setFormData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const appContext = useContext(AppContext);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  let [display, setDisplay] = useState(false);

  useEffect(() => {
    setFormData({});
    setDisplay(false);
  }, [appContext.reload]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("formData", formData);

    try {
      let subCategory = formData?.subCategory;
      if (
        formData?.category === "General" ||
        formData?.category === "Other" ||
        formData?.category === "Salary"
      ) {
        subCategory = "Other";
      }

      const response = await axios.post(
        "http://localhost:8000/api/transactions",
        {
          userId: user._id,
          ...formData,
          subCategory,
        }
      );

      console.log("response", response);

      if (response?.data?.success) {
        console.log("Transaction added successfully");
        appContext.setReload(!appContext.reload);
        setDisplay(false);
      } else {
        console.error("Error adding transaction:", response?.data);
        throw new Error("Error adding transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw error;
    }
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleCategorySelect(option) {
    setSelectedCategory(option);
    setFormData({ ...formData, category: option.value });
  }

  function handleSubCategorySelect(option) {
    setSelectedSubCategory(option);
    setFormData({ ...formData, subCategory: option.value });
  }

  return (
    <PopUp
      btnName={"+ Add Transaction"}
      btnStyling={styles.add_btn}
      display={display}
      setDisplay={setDisplay}
    >
      <h2 className={styles.heading}>Add Transaction</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.input_details}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <div className={styles.info}>
            <LuText className={styles.icon} />
            <input
              type="text"
              className={styles.input}
              placeholder="Enter your description"
              name="description"
              value={formData?.description || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.input_details}>
          <label className={styles.label} htmlFor="amount">
            Amount
          </label>
          <div className={styles.info}>
            <MdOutlineCurrencyRupee className={styles.icon} />
            <input
              type="number"
              className={styles.input}
              placeholder="Enter the amount"
              name="amount"
              value={formData?.amount || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.input_details}>
          <label className={styles.label}>Type</label>
          <div className={styles.radio_group}>
            <div className={styles.radio_option}>
              <input
                type="radio"
                id="income"
                name="type"
                value="income"
                checked={formData.type === "income"}
                onChange={handleChange}
                required
              />
              <label htmlFor="income" className={styles.sub_label}>
                Income <FaArrowTrendUp className={styles.icon} />
              </label>
            </div>
            <div className={styles.radio_option}>
              <input
                type="radio"
                id="expense"
                name="type"
                value="expense"
                checked={formData.type === "expense"}
                onChange={handleChange}
                required
              />
              <label htmlFor="expense" className={styles.sub_label}>
                Expense <FaArrowTrendDown className={styles.icon} />
              </label>
            </div>
          </div>
        </div>

        <div className={styles.input_details}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <div className={styles.info}>
            <TbCategory className={styles.icon} />
            <div className={styles.select}>
              <Select
                placeholder="Select Category"
                options={category_data}
                styles={selectCustomStyles}
                onChange={handleCategorySelect}
                required
              />
            </div>
          </div>
        </div>

        {selectedCategory &&
          selectedCategory.value !== "General" &&
          selectedCategory.value !== "Other" &&
          selectedCategory?.value !== "Salary" && (
            <div className={styles.input_details}>
              <label htmlFor="subCategory" className={styles.label}>
                Sub Category
              </label>
              <div className={styles.info}>
                <TbCategoryPlus className={styles.icon} />
                <div className={styles.select}>
                  <Select
                    placeholder="Select Sub Category"
                    options={selectedCategory.subCategory}
                    styles={selectCustomStyles}
                    onChange={handleSubCategorySelect}
                    required
                  />
                </div>
              </div>
            </div>
          )}

        <div className={styles.input_details}>
          <label htmlFor="date" className={styles.label}>
            Date
          </label>
          <input
            type="date"
            className={styles.input}
            placeholder="Select Date"
            name="date"
            value={formData?.date || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div
          className={`${styles.input_container} ${styles.submit_container}`}
          style={{ zIndex: 0 }}
        >
          <input className={styles.submit_btn} type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default AddTransaction;
