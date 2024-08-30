import React, { useState, useEffect } from "react";
import { getUnitAndKgOptions } from "./utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faDownload,
  faArrowLeft,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { useProductContext } from "./hooks/useProductContext";
import { useAuthContext } from "./hooks/useAuthContext";
import Table from "./Table";
import Tooltip from "./reusable/Tooltip";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useFetch from "./hooks/useFetch";
import ConfirmationModal from "./reusable/ConfirmationModal";
import "../css/ProductList.css";

const ProductList = () => {
  const { products, dispatch } = useProductContext();
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedType, setSelectedType] = useState("All Products");
  const [selectedQuantity, setSelectedQuantity] = useState("All Products");
  const [addedProducts, setAddedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Number of items per page
  const { user } = useAuthContext();

  useFetch(user, selectedType, selectedQuantity, dispatch); // Use the custom hook

  const handleProductChange = (event) => {
    const productId = event.target.value;
    setSelectedProductIds((prevIds) => {
      if (prevIds.includes(productId)) {
        return prevIds.filter((id) => id !== productId);
      } else {
        return [...prevIds, productId];
      }
    });
  };

  // const handleTypeChange = (event) => {
  //   setSelectedType(event.target.value);
  // };

  // // New function to handle quantity filter changes
  // const handleQuantityChange = (event) => {
  //   setSelectedQuantity(event.target.value);
  // };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedQuantity("All Products"); // Reset quantity when type changes
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  const filteredUnitOptions = getUnitAndKgOptions(selectedType);

  const handleAddButtonClick = () => {
    if (products) {
      const selectedProducts = products.filter((product) =>
        selectedProductIds.includes(product._id)
      );
      setAddedProducts((prevAddedProducts) => [
        ...prevAddedProducts,
        ...selectedProducts.filter(
          (product) => !prevAddedProducts.some((p) => p._id === product._id)
        ),
      ]);
      setSelectedProductIds([]);
    }
  };

  const handleCancelButtonClick = () => {
    setSelectedProductIds([]);
  };

  const handleRemoveProduct = (productId) => {
    setAddedProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const sortProducts = (products) => {
    return products.sort((a, b) => {
      const aMatches = a.name.toLowerCase().includes(searchTerm.toLowerCase());
      const bMatches = b.name.toLowerCase().includes(searchTerm.toLowerCase());

      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    });
  };

  const sortedProducts = products ? sortProducts(products) : [];

  const handleDownloadClick = () => {
    setIsModalOpen(true); // Open the confirmation modal
  };

  const handleConfirmDownload = () => {
    setIsModalOpen(false);
    downloadPDF(); // Proceed with downloading the PDF
  };

  const handleCancelDownload = () => {
    setIsModalOpen(false); // Close the modal without downloading
  };

  const downloadPDF = () => {
    const input = document.getElementById("productTable");

    // Temporarily adjust the table container to ensure all content is visible
    const container = input.parentElement;
    const originalHeight = container.style.height;
    container.style.height = "auto"; // Ensure the container is tall enough to show all content

    html2canvas(input, { useCORS: true, scale: 2 })
      .then((canvas) => {
        // Revert the height change
        container.style.height = originalHeight;

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        // Calculate dimensions and scaling
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

        // Calculate positioning
        const x = (pdfWidth - imgWidth * scale) / 2;
        const y = (pdfHeight - imgHeight * scale) / 2;

        pdf.addImage(imgData, "PNG", x, y, imgWidth * scale, imgHeight * scale);
        pdf.save("products.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error); // Catch any errors
      });
  };

  // Calculate the products for the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Pagination controls
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleClickDown = () => {
    setButtonVisible(true);
  };

  return (
    <>
      {/* <Forms /> */}
      <div className="mt-4 flex justify-center items-center gap-2"></div>
      <form className="max-w-full mx-auto p-4">
        <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-2">
            <label
              htmlFor="types"
              className="block text-sm font-medium text-gray-600 dark:text-white"
            >
              Filter by categories
            </label>
            <Tooltip text="Filter by categories" position="top">
              <select
                id="types"
                className="text-gray-600 text-sm font-semibold w-32 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleTypeChange}
                value={selectedType}
              >
                <option
                  className="text-gray-600 text-sm font-semibold"
                  value="All Products"
                >
                  All Products
                </option>
                <option
                  className="text-gray-600 text-sm font-semibold"
                  value="Capsules"
                >
                  Capsules
                </option>
                <option
                  className="text-gray-600 text-sm font-semibold"
                  value="Tablets"
                >
                  Tablets
                </option>
                <option
                  className="text-gray-600 text-sm font-semibold"
                  value="Powders"
                >
                  Powders
                </option>
              </select>
            </Tooltip>

            <label
              htmlFor="types"
              className="block text-sm font-medium text-gray-600 dark:text-white"
            >
              Filter by types
            </label>

            <Tooltip text="Filter by type" position="top">
              <select
                id="types"
                className="text-gray-600 text-sm font-semibold w-32 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleQuantityChange} // Attach the new quantity change handler
                value={selectedQuantity}
              >
                <option
                  className="text-gray-600 text-gray-600 text-sm font-semibold"
                  value="All Products"
                >
                  All Quantities
                </option>
                {filteredUnitOptions.map((option) => (
                  <option
                    className="text-gray-600 text-sm font-semibold"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </Tooltip>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-2">
            <label
              htmlFor="search"
              className="text-sm font-medium text-gray-600 dark:text-white"
            >
              Search stock items
            </label>

            <div className="relative flex items-center">
              <Tooltip text="Search" position="top">
                <input
                  id="search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleSearchChange}
                  value={searchTerm}
                  placeholder="Search"
                />
              </Tooltip>
              <Tooltip text="Search" position="top">
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </form>

      <div className="overflow-x-auto shadow-xl mt-8 w-[98%] ml-4 rounded-md shadow-custom">
        <div className=" relative max-h-[calc(70vh-7rem)] overflow-y-auto">
          <table
            id="productTable"
            className="w-full table-auto text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100 "
          >
            <thead className="bg-[#fff5] sticky top-0 bg-blue-600  rounded-xl shadow-lg transition-transform text-white border-b border-blue-400 dark:text-white z-10">
              <tr>
                <th className="px-4 py-3 bg-sea sm:px-8 md:py-4 lg:py-3">
                  S.No
                </th>
                <th className="px-4 py-3 bg-sea sm:px-8 md:py-4 lg:py-3">
                  Name
                </th>
                <th className="px-4 py-3 bg-sea sm:px-8 md:py-4 lg:py-3">
                  Product/No
                </th>
                <th className="px-4 py-3 bg-sea sm:px-8 md:py-4 lg:py-3">
                  Unit type/Kg
                </th>
                <th className="px-4 py-3 bg-sea sm:px-8 md:py-4 lg:py-3">
                  Stock
                </th>

                <th className="px-4 py-3 bg-sea sm:px-8 md:py-4 lg:py-3">
                  MRP
                </th>
                <th className="px-4 py-3 bg-sea sm:px-8 md:py-4 lg:py-3">
                  Price
                </th>
                <th className="px-4 py-3 bg-sea sm:px-8 md:py-4 lg:py-3">
                  Tax%
                </th>
                <th className="px-6 py-3 bg-sea sm:px-8 md:py-4 lg:py-3">
                  Tax Amount
                </th>
                <th className="px-6 py-3 bg-sea sm:px-8 md:py-4 lg:py-4">
                  {" "}
                  Date
                </th>
                {user?.admin && (
                  <th className="px-6 py-3 bg-sea sm:px-8 md:py-4 lg:py-4">
                    Delete & Edit
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <Table
                    key={product._id}
                    index={index} // Pass the 1-based index
                    name={product.name}
                    productNum={product.productNum}
                    quantity={product.quantity}
                    unitAndKg={product.unitAndKg}
                    mrp={product.mrp}
                    stock={product.stock}
                    price={product.price}
                    date={product.date}
                    _id={product._id}
                    taxPercentage={product.taxPercentage}
                    handleRemoveProduct={handleRemoveProduct}
                    selectedType={selectedType}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="text-center text-black py-4 px-6">
                    No products available
                  </td>
                </tr>
              )}
              {/* {sortedProducts.length > 0 ? (
                sortedProducts.map((product) => (
                  <Table
                    key={product._id}
                    name={product.name}
                    productNum={product.productNum}
                    quantity={product.quantity}
                    unitAndKg={product.unitAndKg}
                    mrp={product.mrp}
                    stock={product.stock}
                    price={product.price}
                    date={product.date}
                    _id={product._id}
                    taxPercentage={product.taxPercentage}
                    handleRemoveProduct={handleRemoveProduct}
                    selectedType={selectedType}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="14"
                    className="text-center text-black py-4 black px-6 py-6"
                  >
                    No products available
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-60 items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 hover:bg-hover2 text-white text-xs font-semibold rounded disabled:opacity-50"
        >
          <FontAwesomeIcon className="mr-2 mt-1"  icon={faArrowLeft} />
          Previous
        </button>
        <span className="text-gray-700 text-sm font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 hover:bg-hover2 text-white text-xs font-semibold rounded disabled:opacity-50"
        >
          Next
          <FontAwesomeIcon className="ml-2 mt-1" icon={faArrowRight} />
        </button>
      </div>
      {/* Add download button */}
      <div className="flex justify-center">
        <div className="text-center my-4">
          <p
            className="text-gray-500 text-sm font-semibold"
            onClick={handleClickDown}
          >
            Click here to download the table
          </p>
          {isButtonVisible && (
            <button
              onClick={handleDownloadClick}
              className="bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded mt-3 mr- rounded focus:outline-none focus:shadow-outline"
            >
              Download
              <span>
                <FontAwesomeIcon className="ml-2" icon={faDownload} />
              </span>
            </button>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDownload}
        onConfirm={handleConfirmDownload}
      />
    </>
  );
};

export default ProductList;
