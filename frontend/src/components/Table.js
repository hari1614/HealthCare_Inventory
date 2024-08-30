import React, { useState, useEffect } from "react";
import Tooltip from "./reusable/Tooltip";
import loadingGif from "../assets/loading.gif";
import ConfirmDeleteModal from "./reusable/ConfirmDeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { useProductContext } from "./hooks/useProductContext";
import { useProductActions } from "./hooks/useProductActions";
import { getUnitAndKgOptions } from "./utils/utils";
import { useSaveProduct } from "./hooks/useSaveProduct";
import { formatDateToInputValue } from "./utils/dateUtils";
import { useAuthContext } from "./hooks/useAuthContext";
import { taxDropdownOptions } from "./utils/utils";

import "../css/Table.css";

const Table = ({
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
}) => {
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
    // setIsLoading(true);
    // setFeedback("");
    // try {
    //   const feedbackMessage = await handleDelete();
    //   setFeedback(feedbackMessage);
    // } catch (error) {
    //   setFeedback("Failed to delete product");
    // } finally {
    //   setIsLoading(false);
    // }
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
      <tr className="bg-sea hover:bg-hover1 text-white-500 border-b border-blue-400">
        <td className="px-4 py-2 sm:px-8 md:py-6 lg:py-4 font-medium text-sm">
          {(currentPage - 1) * itemsPerPage + index + 1}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-transform: capitalize font-medium text-sm text-black-40 whitespace-wrap dark:text-blue-100 sm:px-8 md:py-6 lg:py-4">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedData.name}
              onChange={handleChangeTwo}
              className="block w-20 text-black border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="text-white">{editedData.name}</span>
          )}
        </td>
        <td className="px-4 py-2 sm:px-8 md:py-6 lg:py-4 font-medium text-sm">
          {isEditing ? (
            <input
              type="number"
              name="productNum"
              value={editedData.productNum}
              onChange={handleChangeTwo}
              className="block w-20 text-black border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="text-white">{editedData.productNum}</span>
          )}
        </td>
        <td className="sm:px-8 md:py-6 lg:py-4 font-medium text-sm text-white">
          {unitAndKg}
        </td>
        <td className="px-4 py-2 sm:px-8 md:py-6 lg:py-4">
          {isEditing ? (
            <input
              type="text"
              name="stock"
              value={editedData.stock}
              onChange={handleChangeTwo}
              className="block w-20 text-black bg-white border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="font-medium text-sm text-white">
              {editedData.stock}
            </span>
          )}
        </td>

        <td className="px-4 py-2 sm:px-8 md:py-6 lg:py-4">
          {isEditing ? (
            <input
              type="number"
              name="mrp"
              value={editedData.mrp}
              onChange={handleChangeTwo}
              className="block w-20 text-black bg-white border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="font-medium text-sm text-white">
              {editedData.mrp}
            </span>
          )}
        </td>
        <td className="px-4 py-2 sm:px-8 md:py-6 lg:py-4">
          {isEditing ? (
            <input
              type="number"
              name="price"
              value={editedData.price}
              onChange={handleChangeTwo}
              className="block w-20 text-black bg-white border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="font-medium text-sm text-white">
              {editedData.price}
            </span>
          )}
        </td>
        <td className="px-4 py-2 sm:px-8 md:py-6 lg:py-4">
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
            <span className="font-medium text-sm text-white">{` ${taxRate}  %`}</span>
          )}
        </td>
        <td className="px-4 py-2 sm:px-8 md:py-6 lg:py-4">
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
            <span className="sm:px-8 md:py-6 lg:py-4 font-medium text-sm text-white">
              {taxPercentage}
            </span>
          )}
        </td>
        <td className="px-4 py-2sm:px-8 md:py-6 lg:py-4 font-medium text-sm text-white">
          {isEditing ? (
            <input
              type="date"
              name="date"
              value={editedData.date}
              onChange={handleChangeTwo}
              className="block text-black bg-white border border-gray-300 rounded-md px-3 py-2 leading-tight focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className="text-white-500">
              {formatDateToInputValue(date)}
            </span>
          )}
        </td>
        {user?.admin && (
          <td className="px-4 py-2 sm:px-8 md:py-6 lg:py-4">
            {isEditing ? (
              <div className="flex">
                <button
                  onClick={() => handleSaveClick(editedData)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex font-medium text-white">
                <Tooltip text="Delete" position="top">
                  <button
                    onClick={handleDeleteClick}
                    className="hover:text-red-700 mr-2"
                  >
                    <span className="text-sm">Delete</span>
                    <FontAwesomeIcon icon={faTrash} className="ml-1" />
                  </button>
                </Tooltip>
                <Tooltip text="Edit" position="top">
                  {" "}
                  <button onClick={handleEdit} className="hover:text-blue-700">
                    <span className="text-sm"> Edit </span>
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
};

export default Table;
