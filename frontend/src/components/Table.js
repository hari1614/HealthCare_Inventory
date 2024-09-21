import React, { useState, useEffect, forwardRef } from "react";
import Tooltip from "./reusable/Tooltip";
import loadingGif from "../assets/loading.gif";
import ConfirmDeleteModal from "./reusable/ConfirmDeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { useProductContext } from "./hooks/useProductContext";
import { useProductActions } from "./hooks/useProductActions";
import { getUnitAndKgOptions } from "./utils/utils";
import { useSaveProduct } from "./hooks/useSaveProduct";
import { formatDateToInputValue, formatDateToYYYYMMDD } from "./utils/dateUtils";
import { useAuthContext } from "./hooks/useAuthContext";
import { taxDropdownOptions } from "./utils/utils";

import "../css/Table.css";

const Table = forwardRef(({
  _id,
  index,
  name,
  productNum,
  quantity,
  unitAndKg,
  stock,
  mrp,
  price,
  taxPercentage,
  date,
  handleRemoveProduct,
  selectedType,
  currentPage,
  itemsPerPage
}, ref) => {
  const { dispatch } = useProductContext();
  const [selectedQuantity, setSelectedQuantity] = useState("1");
  const [selectedQuantityPrice, setSelectedQuantityPrice] = useState(price);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const [productToDelete, setProductToDelete] = useState(null); // Track product to delete
  const [taxRate, setTaxRate] = useState(12); // Default tax rate
  const [editedData, setEditedData] = useState({
    name,
    productNum,
    quantity,
    stock,
    mrp,
    price,
    taxPercentage,
    taxRate,
    date: formatDateToInputValue(date),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  // Pagination state

  const { user } = useAuthContext();
  const { handleDelete } = useProductActions(
    _id,
    dispatch,
    handleRemoveProduct
  );
  const { handleSave, isSaving } = useSaveProduct(
    _id,
    handleRemoveProduct,
    setIsEditing
  );

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Call taxDropdownOptions to get the array of options
  const options = taxDropdownOptions();

  function calculateTax(price, taxRate) {
    return ((price * taxRate) / 100).toFixed(2);
  }

  const handleTaxRateChange = (event) => {
    // const newTaxRate = parseFloat(event.target.value);
    setTaxRate(event.target.value);
    // setTaxRate(newTaxRate);
  };

  const handleChangeTwo = (event) => {
    const { name, value } = event.target;
    const updatedValue = name === "price" ? parseFloat(value) : value;

    setEditedData((prevData) => {
      const newTaxPercentage =
        name === "price"
          ? calculateTax(updatedValue, taxRate)
          : prevData.taxPercentage;

      return {
        ...prevData,
        [name]: updatedValue,
        taxPercentage: newTaxPercentage,
      };
    });

    if (name === "price") {
      setSelectedQuantityPrice(updatedValue);
    }
  };

  const calculatePrice = (selectedValue) => {
    const parsedValue = parseInt(selectedValue, 10);
    const newPrice = price * parsedValue;
    setSelectedQuantityPrice(newPrice);
    setEditedData((prevData) => ({
      ...prevData,
      price: newPrice,
      taxPercentage: calculateTax(newPrice, taxRate),
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    setProductToDelete(_id); // Set the product ID to delete
    setIsModalOpen(true); // Open the confirmation modal
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    setFeedback("");
    try {
      const feedbackMessage = await handleDelete();
      setFeedback(feedbackMessage);
    } catch (error) {
      setFeedback("Failed to delete product");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false); // Close the modal after deletion
    }
  };
  const cancelDelete = () => {
    setIsModalOpen(false); // Just close the modal
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    setFeedback("");
    try {
      await handleSave(editedData);
      setFeedback("Product saved successfully");
    } catch (error) {
      setFeedback("Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current taxRate:", taxRate); // Debugging statement
  }, [taxRate]);

  const unitAndKgOptions = getUnitAndKgOptions(selectedType);

  return (
    <>
      <tr ref={ref} className="bg-white hover:bg-gray-300 text-gray-500 border border-gray-300">
        <td className="px-2 py-1 sm:px-4 sm:py-2 font-medium text-sm border">
          {(currentPage - 1) * itemsPerPage + index + 1}
        </td>
        <td className="border px-2 py-2 whitespace-nowrap text-transform: capitalize font-medium text-sm text-gray-600 whitespace-wrap dark:text-blue-100 sm:px-8 md:py-6 lg:py-4">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleChangeTwo}
              className="block w-20 border text-black border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="text-gray-600">{editedData.name}</span>
          )}
        </td>
        <td className="border px-2 py-1 sm:px-4 sm:py-2 font-medium text-sm text-gray-600">
          {isEditing ? (
            <input
              type="number"
              name="productNum"
              value={editedData.productNum}
              onChange={handleChangeTwo}
              className="block w-20 text-black border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="">{editedData.productNum}</span>
          )}
        </td>
        <td className="border px-2 py-1 sm:px-4 sm:py-2 font-medium text-sm text-gray-600">
          {unitAndKg}
        </td>
        <td className="px-2 py-1 sm:px-4 sm:py-2 font-medium text-sm text-gray-600">
          {isEditing ? (
            <input
              type="text"
              name="stock"
              value={editedData.stock}
              onChange={handleChangeTwo}
              className="block w-20 text-black bg-white border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="">
              {editedData.stock}
            </span>
          )}
        </td>

        <td className="border px-2 py-1 sm:px-4 sm:py-2 lg:py-4 font-medium text-sm text-gray-600">
          {isEditing ? (
            <input
              type="number"
              name="mrp"
              value={editedData.mrp}
              onChange={handleChangeTwo}
              className="block w-20 text-black bg-white border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="">
              {editedData.mrp}
            </span>
          )}
        </td>
        <td className="border px-2 py-1 sm:px-4 sm:py-2 lg:py-4 font-medium text-sm text-gray-600">
          {isEditing ? (
            <input
              type="number"
              name="price"
              value={editedData.price}
              onChange={handleChangeTwo}
              className="block w-20 text-black bg-white border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="">
              {editedData.price}
            </span>
          )}
        </td>
        <td className="border px-2 py-1 sm:px-4 sm:py-2 font-medium text-sm text-gray-600">
          {isEditing ? (
            <select
              id="types"
              className="block w-16 text-black bg-white border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
              onChange={handleTaxRateChange}
              value={taxRate}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <span className="">{` ${taxRate}  %`}</span>
          )}
        </td>
        <td className="border px-2 py-1 sm:px-4 sm:py-2 font-medium text-sm text-gray-600">
          {isEditing ? (
            <input
              type="number"
              name="taxPercentage"
              value={editedData.taxPercentage}
              onChange={handleChangeTwo}
              className="block w-20 text-black bg-white border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
              readOnly
            />
          ) : (
            <span className="">
              {taxPercentage}
            </span>
          )}
        </td>
        <td className="border px-2 py-1 sm:px-4 sm:py-2 font-medium text-sm text-gray-600">
          {isEditing ? (
            <input
              type="date"
              name="date"
              value={editedData.date}
              onChange={handleChangeTwo}
              className="block text-black bg-white border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="">
              {formatDateToYYYYMMDD(date)}
            </span>
          )}
        </td>
        {user?.admin && (
          <td className="border px-2 py-1 sm:px-4 sm:py-2 font-medium text-sm text-gray-600">
            {isEditing ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <button
                  onClick={() => handleSaveClick(editedData)}
                  className="text-center text-blue-500 hover:text-blue-700 mr-2"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-center text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-center font-medium">
                <Tooltip text="Delete" position="top">
                  <button
                    onClick={handleDeleteClick}
                    className="bg-gray-400 text-white rounded p-2 hover:text-red-700 mr-2"
                  >
                    <span className="text-xs">Delete</span>
                    <FontAwesomeIcon icon={faTrash} className="ml-1" />
                  </button>
                </Tooltip>
                <Tooltip text="Edit" position="top">
                  {" "}
                  <button onClick={handleEdit} className="bg-sea text-white rounded p-2 hover:text-blue-700">
                    <span className="text-xs"> Edit </span>
                    <FontAwesomeIcon icon={faPenSquare} className="ml-1" />
                  </button>
                </Tooltip>
              </div>
            )}
          </td>
        )}
      </tr>

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
      {isModalOpen && (
        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
});

export default Table;
