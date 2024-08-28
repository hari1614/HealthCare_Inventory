import React, { useState, useEffect } from "react";
import axios from "axios";
import FormField from "./FormField";
import SelectField from "./reusable/SelectField";
import loadingGif from "../assets/loading.gif";
import Tooltip from "./reusable/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useProductContext } from "./hooks/useProductContext";
import { getUnitAndKgOptionsTwo, taxDropdownOptionsTwo } from "./utils/utils";
import { formatDateToYYYYMMDD, parseDateToISO } from "./utils/dateUtils"; // Import utility functions
import { useAuthContext } from "./hooks/useAuthContext";

const Forms = () => {
  const { dispatch } = useProductContext();
  const [name, setName] = useState("");
  const [productNum, setProductNum] = useState("");
  const [quantity, setQuantity] = useState("");
  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState("");
  const [taxDropdown, setTaxDropdown] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("0:00");
  const [date, setDate] = useState(
    formatDateToYYYYMMDD(new Date().toISOString())
  );
  const [unitAndKg, setUnitAndKg] = useState("");
  const [stock, setStock] = useState("");
  const [bulkOrderValue, setBulkOrderValue] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedback, setFeedback] = useState("", false);
  const { user } = useAuthContext();
  // Function to get the next product number from local storage
  const getNextProductNum = () => {
    const lastNum = localStorage.getItem("lastProductNum");
    const nextNum = lastNum ? parseInt(lastNum, 10) + 1 : 1;
    localStorage.setItem("lastProductNum", nextNum);
    return nextNum;
  };

  // Update productNum when name changes
  useEffect(() => {
    if (name) {
      const num = getNextProductNum();
      setProductNum(num);
    }
  }, [name]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback("");
      }, 1000); // Feedback disappears after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount or feedback change
    }
  }, [feedback]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setUnitAndKg(""); // Reset unitAndKg when type changes
    setBulkOrderValue(""); // Reset bulkOrderValue when type changes
  };

  const handleUnitAndKgChange = (e) => {
    setUnitAndKg(e.target.value);
    if (e.target.value === "BULK ORDER") {
      setBulkOrderValue(""); // Reset bulkOrderValue if BULK ORDER is selected
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
  };

  const handleBulkOrderChange = (e) => {
    setBulkOrderValue(e.target.value);
  };

  // Call taxDropdownOptions to get the array of options
  const options = taxDropdownOptionsTwo();

  // Utility function to get the selected tax rate
  const getSelectedTaxRate = (taxDropdown) => {
    // Example: taxDropdown could be '12%' or '18%', or any valid tax rate
    if (taxDropdown.includes("%")) {
      return parseFloat(taxDropdown.replace("%", ""));
    }
    return 0;
  };

  // Function to calculate the tax percentage based on price
  const calculateTaxPercentage = (price, taxDropdown) => {
    const taxRate = getSelectedTaxRate(taxDropdown);
    return price ? ((price * taxRate) / 100).toFixed(2) : "0.00";
  };

  useEffect(() => {
    setTaxPercentage(calculateTaxPercentage(price, taxDropdown));
  }, [price, taxDropdown]);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setErrorMessage("You must be logged in");
      return;
    }
    setIsLoading(true);
    setIsSuccess(false);
    setFeedback(false);
    setErrorMessage("");
    console.log("Name:", name);
    console.log("Product No:", productNum);
    console.log("Initial Quantity:", quantity);
    console.log("Unit and kg:", unitAndKg);
    console.log("Stock availability:", stock);
    console.log("MRP:", mrp);
    console.log("Price:", price);
    console.log("Tax Percentage:", taxPercentage);
    console.log("Date:", date);

    const finalUnitAndKg =
      unitAndKg === "BULK ORDER" ? bulkOrderValue : unitAndKg;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`, // Example of an Authorization header
      // Add other headers here as needed
    };

    setTimeout(() => {
      axios
        .post(
          `http://localhost:4000/api/${selectedType.toLowerCase()}`,
          {
            name,
            productNum,
            quantity,
            unitAndKg: finalUnitAndKg,
            stock,
            mrp,
            price,
            taxPercentage,
            date: parseDateToISO(date), // Convert date to ISO format before sending
          },
          { headers }
        )
        .then((result) => {
          console.log(result);
          // alert("Product Added Successfully !!!");
          setFeedback("Product added successfully");
          setName("");
          setProductNum("");
          setQuantity("");
          setStock("");
          setMrp("");
          setPrice("");
          setTaxPercentage("");
          setDate(formatDateToYYYYMMDD(new Date().toISOString())); // Reset to today's date in 'yyyy-MM-dd'
          setUnitAndKg("");
          setBulkOrderValue("");
          dispatch({ type: "CREATE_CAPSULE", payload: result.data });
          dispatch({ type: "CREATE_PRODUCT", payload: result.data });
          setIsSuccess(true);
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage("Failed to add product. Please try again.");
          setFeedback("Failed to add product. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Add new product</h2>
      <label
        htmlFor="types"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Categories
      </label>
      <select
        id="types"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option className="text-sm font-semibold" value="">Select a type</option>
        <option className="text-sm font-semibold" value="Capsules">Capsules</option>
        <option className="text-sm font-semibold" value="Tablets">Tablets</option>
        <option className="text-sm font-semibold" value="Powders">Powders</option>
      </select>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField
            label="Name"
            type="text"
            value={name}
            placeholder="Enter product name"
            onChange={(e) => setName(e.target.value)}
          />
          <FormField
            label="ProductNum"
            type="number"
            placeholder="Product number"
            value={productNum}
            onChange={(e) => setProductNum(e.target.value)}
          />

          {selectedType &&
            (unitAndKg === "BULK ORDER" ? (
              <div>
                <label
                  htmlFor="bulkOrder"
                  className="block text-sm font-medium text-gray-900"
                >
                  Type: Bulk 
                </label>
                <input
                  id="bulkOrder"
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={bulkOrderValue}
                  onChange={handleBulkOrderChange}
                  placeholder="Enter type ex. unit or bulk"
                />
              </div>
            ) : (
              <SelectField
                label="Type: unit"
                options={getUnitAndKgOptionsTwo(selectedType)}
                value={unitAndKg}
                onChange={handleUnitAndKgChange}
              />
            ))}

          <FormField
            label="Stock"
            type="text"
            placeholder="Enter stock details"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <FormField
            label="MRP"
            type="number"
            placeholder="Enter product MRP"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
          />
          <FormField
            label="Price"
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <SelectField
            label="Tax Percentage"
            options={options}
            value={taxDropdown}
            onChange={(e) => setTaxDropdown(e.target.value)}
          />
          <FormField
            label="Tax Amount"
            type="number"
            placeholder="Gst 12%"
            value={taxPercentage}
            onChange={(e) => setTaxPercentage(e.target.value)}
          />
          <FormField
            label="Date"
            type="date"
            placeholder="Select a date"
            value={date}
            onChange={handleDateChange}
          />

          <div className="m-4 flex flex-col items-center">
            <Tooltip text="Submit" position="top">
              <button
                type="submit"
                className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded mt-3 mr- rounded focus:outline-none focus:shadow-outline "
                disabled={isLoading}
              >
                Submit
                <span>
                  <FontAwesomeIcon className="ml-2 mt-1" icon={faArrowRight} />
                </span>
              </button>
            </Tooltip>

            {isLoading && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
                  <img
                    src={loadingGif}
                    alt="Loading..."
                    className="w-6 h-6 mr-3 animate-spin"
                  />
                  <span className="text-gray-700 text-sm">Loading...</span>
                </div>
              </div>
            )}
            {/* Feedback Messages */}
            {feedback && (
              <div
                className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md text-xs text-center border ${
                  feedback.includes("Failed")
                    ? "bg-red-100 text-red-800 border-red-300"
                    : "bg-green-100 text-green-800 border-green-300"
                } bg-opacity-75 z-50`}
              >
                {feedback}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forms;
