import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenSquare,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import loadingGif from "../assets/loading.gif";
import { useAuthContext } from "./hooks/useAuthContext";
import usePurchase from "./hooks/usePurchase";
import { formatDateToInputValue, formatDateToYYYYMMDD } from "./utils/dateUtils";

const Stocks = () => {
  const { user } = useAuthContext();
  const { purchases, loading, error, deletePurchase, updatePurchase } =
    usePurchase();

  const [editingPurchase, setEditingPurchase] = useState(null);
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedHsnCode, setUpdatedHsnCode] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    productName: "",
    hsnCode: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  const handleEdit = (purchase) => {
    setEditingPurchase(purchase);
    setUpdatedProductName(purchase.productName);
    setUpdatedHsnCode(purchase.hsnCode);
    setUpdatedCategory(purchase.category);
    setUpdatedQuantity(purchase.quantity);
  };

  const handleUpdate = () => {
    if (editingPurchase) {
      updatePurchase(editingPurchase._id, {
        productName: updatedProductName,
        hsnCode: updatedHsnCode,
        category: updatedCategory,
        quantity: updatedQuantity,
      });
      setEditingPurchase(null);
    }
  };

  const handleDelete = (purchase) => {
    deletePurchase(purchase._id);
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredPurchases = purchases.filter((purchase) => {
    // Filter by product name
    const productNameMatch = filters.productName
      ? purchase.productName
          .toLowerCase()
          .includes(filters.productName.toLowerCase())
      : true;

    // Filter by HSN code
    const hsnCodeMatch = filters.hsnCode
      ? purchase.hsnCode.toString().includes(filters.hsnCode)
      : true;

    // Filter by category
    const categoryMatch = filters.category
      ? purchase.category.toLowerCase().includes(filters.category.toLowerCase())
      : true;

    // Handle purchase date
    let purchaseDate;
    try {
      purchaseDate = new Date(purchase.date);
      if (isNaN(purchaseDate.getTime())) {
        throw new Error("Invalid purchase date");
      }
    } catch (error) {
      console.error(
        `Error processing purchase date for ${purchase.id}: ${error.message}`
      );
      return false; // Skip this purchase if the date is invalid
    }

    // Handle start and end dates
    let startDate, endDate;
    try {
      startDate = filters.startDate ? new Date(filters.startDate) : null;
      endDate = filters.endDate ? new Date(filters.endDate) : null;

      // Ensure start and end dates are valid
      if (startDate && isNaN(startDate.getTime())) {
        throw new Error("Invalid start date");
      }
      if (endDate && isNaN(endDate.getTime())) {
        throw new Error("Invalid end date");
      }
    } catch (error) {
      console.error(`Error processing date filters: ${error.message}`);
      return false; // Skip this purchase if the filters are invalid
    }

    // Date range match
    const startDateMatch = startDate ? purchaseDate >= startDate : true;
    const endDateMatch = endDate ? purchaseDate <= endDate : true;

    return (
      productNameMatch &&
      hsnCodeMatch &&
      categoryMatch &&
      startDateMatch &&
      endDateMatch
    );
  });

  const handleCategoryChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: e.target.value,
    }));
  };

  const totalPages = Math.ceil(filteredPurchases.length / pageSize);
  const paginatedPurchases = filteredPurchases.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <span className="text-red-600 text-sm">Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="text-gray-900 rounded-lg mb-6 mt-5 flex justify-center">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight text-center">
            Purchase / Stock Details
          </h1>
          <p className="mt-2 text-lg font-medium opacity-80">
            Manage and view your purchase and stock information with ease.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto container mx-auto px-4 py-6 bg-white shadow-md rounded-lg border border-gray-200 m-8">
        {/* Filters */}
        <form className="max-w-4xl mx-auto p-4 space-y-4 bg-white shadow-sm rounded-md dark:bg-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Product Name Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="productName"
                className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1"
              >
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={filters.productName}
                onChange={handleFilterChange}
                className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-300 h-10 rounded-md focus:ring-teal-500 focus:border-teal-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-teal-500 dark:focus:border-teal-500"
                placeholder="Enter product name"
              />
            </div>

            {/* HSN Code Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="hsnCode"
                className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1"
              >
                HSN Code
              </label>
              <input
                type="text"
                id="hsnCode"
                value={filters.hsnCode}
                onChange={handleFilterChange}
                className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-300 h-10 rounded-md focus:ring-teal-500 focus:border-teal-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-teal-500 dark:focus:border-teal-500"
                placeholder="Enter HSN code"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                value={filters.category}
                onChange={handleCategoryChange}
                className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-300 h-10 rounded-md focus:ring-teal-500 focus:border-teal-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-teal-500 dark:focus:border-teal-500"
              >
                <option
                  className="text-xs font-semibold text-gray-600"
                  value=""
                >
                  Select a category
                </option>
                <option value="Fruits">Fruits</option>
                <option value="Car">Car</option>
                <option value="Food">Food</option>
                <option value="Chocolates">Chocolates</option>
                <option value="Games">Games</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Start Date Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="startDate"
                className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-300 h-10 rounded-md focus:ring-teal-500 focus:border-teal-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-teal-500 dark:focus:border-teal-500"
              />
            </div>

            {/* End Date Filter */}
            <div className="flex flex-col">
              <label
                htmlFor="endDate"
                className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-300 h-10 rounded-md focus:ring-teal-500 focus:border-teal-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-teal-500 dark:focus:border-teal-500"
              />
            </div>
          </div>
        </form>

        {/* Table */}
        <div className="relative max-h-[calc(70vh-7rem)] overflow-x-auto">
          {paginatedPurchases.length > 0 ? (
            <table className="w-[70%] mx-auto bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="sticky top-0 bg-sea text-white border-b border-blue-400">
                <tr className="text-left text-xs font-medium">
                  <th className="px-2 py-1 sm:px-4 sm:py-2" scope="col">
                    S.No
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2" scope="col">
                    Product Name
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2" scope="col">
                    HSN Code
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2" scope="col">
                    Category
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2" scope="col">
                    Quantity
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2" scope="col">
                    Date
                  </th>
                  <th className="px-2 py-1 sm:px-4 sm:py-2" scope="col">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedPurchases.map((purchase, index) => (
                  <tr
                    key={purchase._id}
                    className="bg-white hover:bg-gray-300 border-b border-gray-300 text-xs font-medium text-gray-600"
                  >
                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                      {purchase.productName}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                      {purchase.hsnCode}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                      {purchase.category}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                      {purchase.quantity}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2">
                      {/* {formatDateToInputValue(new Date(purchase.date))} */}
                      {formatDateToYYYYMMDD(purchase.date)}
                    </td>
                    <td className="px-2 py-1 sm:px-4 sm:py-2 flex gap-1">
                      <button
                        onClick={() => handleEdit(purchase)}
                        className="bg-sea hover:bg-hover1 text-white text-xs font-semibold px-2 py-1 rounded flex items-center"
                      >
                        Edit
                        <FontAwesomeIcon icon={faPenSquare} className="ml-1" />
                      </button>
                      <button
                        onClick={() => handleDelete(purchase)}
                        className="bg-gray-500 hover:bg-hover2 text-white text-xs font-semibold px-2 py-1 rounded flex items-center"
                      >
                        Delete
                        <FontAwesomeIcon icon={faTrash} className="ml-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600 mt-4">
              No purchases found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-sea hover:bg-hover1 text-white text-xs font-semibold rounded disabled:opacity-50 flex items-center"
          >
            <FontAwesomeIcon className="mr-2" icon={faArrowLeft} />
            Previous
          </button>
          <span className="text-gray-700 text-xs md:text-sm font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-sea hover:bg-hover1 text-white text-xs font-semibold rounded disabled:opacity-50 flex items-center"
          >
            Next
            <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
          </button>
        </div>

        {/* Edit Purchase Modal */}
        {/* {editingPurchase && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Edit Purchase
              </h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="updateProductName"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="updateProductName"
                  value={updatedProductName}
                  onChange={(e) => setUpdatedProductName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="updateHsnCode"
                >
                  HSN Code
                </label>
                <input
                  type="text"
                  id="updateHsnCode"
                  value={updatedHsnCode}
                  onChange={(e) => setUpdatedHsnCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="updateCategory"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="updateCategory"
                  value={updatedCategory}
                  onChange={(e) => setUpdatedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-1"
                  htmlFor="updateQuantity"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="updateQuantity"
                  value={updatedQuantity}
                  onChange={(e) => setUpdatedQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditingPurchase(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )} */}
        {/* Edit Purchase Modal */}
{editingPurchase && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Edit Purchase
      </h2>
      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="updateProductName"
          >
            Product Name
          </label>
          <input
            type="text"
            id="updateProductName"
            value={updatedProductName}
            onChange={(e) => setUpdatedProductName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter product name"
          />
        </div>
        
        {/* HSN Code */}
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="updateHsnCode"
          >
            HSN Code
          </label>
          <input
            type="text"
            id="updateHsnCode"
            value={updatedHsnCode}
            onChange={(e) => setUpdatedHsnCode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter HSN code"
          />
        </div>
        
        {/* Category */}
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="updateCategory"
          >
            Category
          </label>
          <input
            type="text"
            id="updateCategory"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter category"
          />
        </div>
        
        {/* Quantity */}
        <div>
          <label
            className="block text-gray-700 text-sm font-medium mb-1"
            htmlFor="updateQuantity"
          >
            Quantity
          </label>
          <input
            type="number"
            id="updateQuantity"
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            placeholder="Enter quantity"
          />
        </div>
      </div>
      <div className="flex justify-end mt-6 space-x-2">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Update
        </button>
        <button
          onClick={() => setEditingPurchase(null)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default Stocks;
