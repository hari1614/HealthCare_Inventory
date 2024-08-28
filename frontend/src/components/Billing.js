import React, { useState, useRef } from "react";
import { useProductContext } from "./hooks/useProductContext";
import { useReactToPrint } from "react-to-print";
import { taxDropdownOptions, stateDropdownOptions } from "./utils/utils";
import { validateFormData } from "./utils/validation";
import "../css/Billing.css";

const Billing = () => {
  const { products } = useProductContext();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({
    transactionType: "buying",
    itemName: "",
    hsnCode: "",
    quantity: "",
    category: "NOS",
    mrp: 0,
    discount: 0,
    pricePerItem: 0,
    totalAmount: "",
    shippingAddress: "",
    deliveryAddress: "",
    buyerName: "",
    sellerName: "",
    itemTaxRate: "", // New field for item-specific tax rate
    itemTaxType: "",
    gstCode:"",
    state:"",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [taxPercentage, setTaxPercentage] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [totalWithTax, setTotalWithTax] = useState("");
  const [isManualDiscount, setIsManualDiscount] = useState(false); // New state to track manual discount change
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [existingHSNCodes, setExistingHSNCodes] = useState([]); // List of existing HSN codes
  const invoiceRef = useRef();
//OLD WITHOUT CGST, SGST, IGST 
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const updatedFormData = { ...formData, [name]: value };

  //   if ((name === "mrp" || name === "pricePerItem") && !isManualDiscount) {
  //     // Auto-calculate discount only if the user hasn't manually changed it
  //     const discount = updatedFormData.mrp - updatedFormData.pricePerItem;
  //     updatedFormData.discount = discount > 0 ? discount : 0;
  //   }

  //   if (name === "discount") {
  //     setIsManualDiscount(true); // Mark that the discount is manually changed
  //   }

  //   setFormData(updatedFormData);
  // };

  //WORKING JUST DROPDOWN
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const updatedFormData = { ...formData, [name]: value };

  //   if ((name === "mrp" || name === "pricePerItem") && !isManualDiscount) {
  //     // Auto-calculate discount only if the user hasn't manually changed it
  //     const discount = updatedFormData.mrp - updatedFormData.pricePerItem;
  //     updatedFormData.discount = discount > 0 ? discount : 0;
  //   }

  //   if (name === "discount") {
  //     setIsManualDiscount(true); // Mark that the discount is manually changed
  //   }

  //   if (name === "gstCode") {
  //     // Update itemTaxType based on gstCode
  //     if (value === "33") {
  //       updatedFormData.itemTaxType = `CGST ${formData.itemTaxRate}, SGST ${formData.itemTaxRate}`;
  //     } else {
  //       updatedFormData.itemTaxType = `IGST ${formData.itemTaxRate}`;
  //     }
  //   }

  //   setFormData(updatedFormData);
  // };

  // //New input
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   const updatedFormData = { ...formData, [name]: value };

  //   if ((name === "mrp" || name === "pricePerItem") && !isManualDiscount) {
  //     // Auto-calculate discount only if the user hasn't manually changed it
  //     const discount = updatedFormData.mrp - updatedFormData.pricePerItem;
  //     updatedFormData.discount = discount > 0 ? discount : 0;
  //   }

  //   if (name === "discount") {
  //     setIsManualDiscount(true); // Mark that the discount is manually changed
  //   }

  //   if (name === "gstCode") {
  //     // Extract the first two characters to determine the tax type
  //     const firstTwoChars = value.slice(0, 2);

  //     if (firstTwoChars === "34") {
  //       updatedFormData.itemTaxType = `CGST ${formData.itemTaxRate}, SGST ${formData.itemTaxRate}`;
  //     } else {
  //       updatedFormData.itemTaxType = `IGST ${formData.itemTaxRate}`;
  //     }
  //   }

  //   setFormData(updatedFormData);
  // };

  //WITH STATE 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
  
    if ((name === "mrp" || name === "pricePerItem") && !isManualDiscount) {
      // Auto-calculate discount only if the user hasn't manually changed it
      const discount = updatedFormData.mrp - updatedFormData.pricePerItem;
      updatedFormData.discount = discount > 0 ? discount : 0;
    }
  
    if (name === "state") {
      // Determine the tax type based on the selected state
      if (value === "Tamil Nadu" || value === "Puducherry") {
        updatedFormData.itemTaxType = `CGST ${formData.itemTaxRate}%, SGST ${formData.itemTaxRate}%`;
      } else {
        updatedFormData.itemTaxType = `IGST ${formData.itemTaxRate}`;
      }
    }
  
    if (name === "discount") {
      setIsManualDiscount(true); // Mark that the discount is manually changed
    }
  
    setFormData(updatedFormData);
  };
  

  const handleTransactionTypeChange = (e) => {
    setFormData({
      ...formData,
      transactionType: e.target.value,
    });
  };

  const handleProductChange = (productId) => {
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    setSelectedProductId(productId);
    setFormData({
      ...formData,
      itemName: selectedProduct?.name || "",
      pricePerItem: selectedProduct?.price || "",
    });
    setIsOpen(false);
  };

  const addProductToInvoice = () => {
    // Validate form data before adding product to invoice
    const validationErrors = validateFormData(formData, existingHSNCodes);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newErrors = validateFormData(formData, existingHSNCodes);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!formData.itemName || !formData.pricePerItem || !formData.itemTaxRate)
      return;

    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );

    let totalAmount = 0;
    if (formData.category === "KG") {
      totalAmount = parseFloat(formData.pricePerItem); // If category is KG, handle total amount differently
    } else {
      if (!formData.quantity) return;
      totalAmount = formData.quantity * formData.pricePerItem;
    }

    const taxAmount = calculateTax(totalAmount, formData.itemTaxRate);
    const totalAmountWithTax = totalAmount + parseFloat(taxAmount);

    const newItem = {
      ...formData,
      totalAmount,
      taxAmount,
      totalAmountWithTax,
      unitAndKg: selectedProduct?.unitAndKg || "", // Add unitAndKg to invoice item
    };

    const updatedItems = [...invoiceItems, newItem];
    setExistingHSNCodes([...existingHSNCodes, formData.hsnCode]);
    setInvoiceItems(updatedItems);
    updateTaxAndTotal(updatedItems);

    setFormData({
      ...formData,
      itemName: "",
      quantity: "",
      pricePerItem: "",
      // itemTaxRate: "", // Reset item tax rate

      // itemTaxType: "" // Reset item tax type
    });
  };

  const updateTaxAndTotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.totalAmount, 0);
    const totalTax = items.reduce(
      (acc, item) => acc + parseFloat(item.taxAmount),
      0
    );
    const totalWithTaxAmt = subtotal + totalTax;

    setTaxAmount(totalTax.toFixed(2));
    setTotalWithTax(totalWithTaxAmt.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTaxAndTotal(invoiceItems);
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    onAfterPrint: () => console.log("Print complete"),
  });

  // const handlePrint = useReactToPrint({
  //   content: () => invoiceRef.current,
  // });

  const options = taxDropdownOptions();
  const stateOptions = stateDropdownOptions()

  function calculateTax(price, taxRate) {
    return ((price * taxRate) / 100).toFixed(2);
  }

  const handleTaxRateChange = (event) => {
    const newTaxRate = parseFloat(event.target.value);
    setTaxPercentage(newTaxRate);

    updateTaxAndTotal(invoiceItems);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Billing Information
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Transaction Type */}
        <div className="mb-6">
          <fieldset className="flex space-x-4">
            <legend className="text-sm font-medium text-gray-700 mb-4">
              Select a type
            </legend>
            <label className="inline-flex text-xs text-gray-400 font-semibold items-center">
              <input
                type="radio"
                name="transactionType"
                value="buying"
                checked={formData.transactionType === "buying"}
                onChange={handleTransactionTypeChange}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-gray-600">Buying</span>
            </label>
            <label className="inline-flex text-xs text-gray-400 font-semibold items-center">
              <input
                type="radio"
                name="transactionType"
                value="selling"
                checked={formData.transactionType === "selling"}
                onChange={handleTransactionTypeChange}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-gray-600">Selling</span>
            </label>
          </fieldset>
        </div>

        {/* Product Selection */}
        <div className="grid grid-cols-1 gap-6">
          <label
            htmlFor="products"
            className="block mb-2 text-sm font-medium text-gray-900 w-full mt-2"
          >
            Select a stock item
          </label>
          <div className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 text-sm font-semibold bg-gray-50 border border-gray-300 text-sm rounded-lg cursor-pointer focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-10 flex items-center justify-between"
            >
              {selectedProductId
                ? products.find((product) => product._id === selectedProductId)
                    ?.name || "Select a product"
                : "Select a product"}
            </div>
            {isOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-lg shadow-lg w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full p-2 border-b border-gray-300 rounded-t-lg"
                />
                <ul className="max-h-60 overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <li
                        key={product._id}
                        onClick={() => handleProductChange(product._id)}
                        className="text-gray-600 text-sm font-semibold cursor-pointer p-2 hover:bg-gray-300"
                      >
                        {product.name} {product.unitAndKg}
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-600">No products found</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Item Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              HSN code
            </label>
            <input
              type="number"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.hsnCode && (
              <p className="text-red-500 text-xs">{errors.hsnCode}</p>
            )}
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs">{errors.quantity}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select a category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option className="text-gray-600 text-sm font-semibold">
                Select a category
              </option>
              <option className="text-gray-600 text-sm font-semibold">
                NOS
              </option>
              <option className="text-gray-600 text-sm font-semibold">
                GRAMS
              </option>
              <option className="text-gray-600 text-sm font-semibold">
                KG
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              MRP
            </label>
            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.mrp && <p className="text-red-500 text-xs">{errors.mrp}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="pricePerItem"
              value={formData.pricePerItem}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {errors.pricePerItem && (
              <p className="text-red-500 text-xs">{errors.pricePerItem}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Add Product Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={addProductToInvoice}
              className="w-full bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center  items-center"
            >
              Add Product
            </button>
          </div>

          {/* <div className="mb-4">
            <lable className="block text-sm font-medium text-gray-700">
              GST Code
            </lable>
            <select
              name="gstCode"
              value={formData.gstCode}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focusing:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option
                className="text-gray-600 text-sm font-semibold"
                value="Select a tax type"
              >
                  GST Code
              </option>
              <option
                className="text-gray-600 text-sm font-semibold"
                value="33"
              >
          
                33
              </option>
              <option
                className="text-gray-600 text-sm font-semibold"
                value="32"
              >
                32     
              </option>
            </select>
          </div> */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Item Tax Rate
            </label>
            <select
              name="itemTaxRate"
              value={formData.itemTaxRate}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focusing:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option className="text-gray-600 text-sm font-semibold" value="">
                Select Tax Rate
              </option>
              {options.map((option) => (
                <option
                  className="text-gray-600 text-sm font-semibold"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focusing:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option className="text-gray-600 text-sm font-semibold" value="">
                Select a state
              </option>
              {stateOptions.map((option) => (
                <option
                  className="text-gray-600 text-sm font-semibold"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              GST Number <span className="text-sm font-md text-sea">Click here to validate GSTN Number</span>
            </label>
            <input
              type="text"
              name="gstCode"
              value={formData.gstCode}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focusing:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              
            />
              {errors.gstCode && (
              <p className="text-red-500 text-xs">{errors.gstCode}</p>
            )}
          </div> */}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tax type
            </label>
            <select
              name="itemTaxType"
              value={formData.itemTaxType}
              onChange={handleInputChange}
              disabled
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focusing:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option
                className="text-gray-600 text-sm font-semibold"
                value="Select a tax type"
              >
                Select a tax type
              </option>
              <option
                className="text-gray-600 text-sm font-semibold"
                value={`CGST ${formData.itemTaxRate}%, SGST ${formData.itemTaxRate}%`}
              >
                {/* {`CGST ${formData.itemTaxRate}, SGST ${formData.itemTaxRate}`} */}
                CGST & SGST
              </option>

              <option
                className="text-gray-600 text-sm font-semibold"
                vlaue={`IGST ${formData.itemTaxRate}`}
              >
                {`IGST ${formData.itemTaxRate}`}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total with Tax
            </label>
            <input
              type="number"
              name="totalWithTax"
              value={totalWithTax}
              readOnly
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
            />
          </div>
        </div>

        {/* Shipping and delivery */}

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Shipping Address
          </label>
          <input
            type="text"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleInputChange}
            className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Delivery Address
          </label>
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleInputChange}
            className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Buyer and Seller Names */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Buyer Name
          </label>
          <input
            type="text"
            name="buyerName"
            value={formData.buyerName}
            onChange={handleInputChange}
            className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Seller Name
          </label>
          <input
            type="text"
            name="sellerName"
            value={formData.sellerName}
            onChange={handleInputChange}
            className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center  items-center"
          >
            Generate Invoice
          </button>
        </div>
      </form>

      {invoiceItems.length > 0 && (
        <div
          ref={invoiceRef}
          className="mx-auto mt-8 p-6 border border-gray-300 rounded-lg bg-white"
        >
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              {/* Company Logo */}

              <div className="flex items-start justify-start">
                <div className="text-start mb-8">
                  <h1 className="text-2xl font-bold text-gray-800 ">
                    Tax Invoice
                  </h1>
                  {/* <h1 className="text-lg font-bold text-gray-800">Invoice</h1> */}
                  <p className="text-sm font-semibold text-gray-600">
                    Invoice Number: #12345
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <span className="text-2xl font-bold font-body text-title2">
                RKS
                <span className="ml-2 font-bold font-body text-title">
                  HealthCare
                </span>
                {/* <span className="text-xs font-sm block text-title">Inventory Management Software</span> */}
              </span>
              <p className="text-sm font-semibold text-gray-600">
                FSS Number: #23465
              </p>
            </div>
          </div>

          {/* Invoice Details Section */}
          <div className="mb-6">
            <div className="flex justify-between mb-4 ">
              <div className=" w-[45%] ">
                <p className="text-black">
                  <strong>Billing Address:</strong>
                </p>
                <p className="text-sm font-semibold text-gray-600 mb-6">
                  {formData.deliveryAddress}
                </p>

                <p className="text-black">
                  <strong>Shipping Address:</strong>
                </p>
                <p className="text-sm font-semibold text-gray-600 mb-6">
                  {formData.shippingAddress}
                </p>

                <p className="text-sm font-semibold text-gray-600">
                  <strong className="text-gray-900">Date: </strong>
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="w-[45%] text-end">
                <h2 className="text-lg font-bold text-black">Sold By</h2>
                <p className="text-sm font-semibold text-gray-600 text-gray-600">
                  Your Company Name
                </p>
                <p className="text-sm font-semibold text-gray-600 text-gray-600">
                  Address Line 1
                </p>
                <p className="text-sm font-semibold text-gray-600 text-gray-600">
                  Address Line 2
                </p>
                <p className="text-sm font-semibold text-gray-600 text-gray-600">
                  City, State, ZIP
                </p>
                <p className="text-sm font-semibold text-gray-600 text-gray-600">
                  Phone: (123) 456-7890
                </p>
                <div className="mt-6">
                  {/* <p className="text-md font-semibold text-gray-900">
                    PAN No:{" "}
                    <span className="text-sm font-semibold text-gray-600">
                      AALCA017E
                    </span>
                  </p> */}
                  {/* <p className="text-md font-semibold text-gray-900">
                    GST Registration No:{" "}
                    <span className="text-sm font-semibold text-gray-600">
                      {formData.gstCode}
                    </span>
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="mb-6 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-2 px-4 border text-left text-sm md:text-base">
                    Serial No.
                  </th>{" "}
                  <th className="py-2 px-4 border text-left text-sm md:text-base">
                    Item
                  </th>
                  <th className="py-2 px-4 border text-left text-sm md:text-base">
                    Type
                  </th>{" "}
                  <th className="py-2 px-4 border text-left text-sm md:text-base">
                    Quantity
                  </th>
                  <th className="py-2 px-4 border text-left text-sm md:text-base">
                    MRP
                  </th>
                  <th className="py-2 px-4 border text-left text-sm md:text-base">
                    Discount
                  </th>
                  <th className="py-2 px-4 border text-left text-sm md:text-base">
                    Price{" "}
                  </th>
                  {/* <th className="py-2 px-4 border text-left text-sm md:text-base">
                    Tax Type
                  </th>{" "} */}
                  <th className="py-2 px-4 border text-left text-sm md:text-base">
                    Tax (%)
                  </th>{" "}
                  <th className="py-2 px-4 border text-left text-sm md:text-base">
                    Tax Amount
                  </th>{" "}
                  <th className="py-2 px-4 border text-left text-sm md:text-base">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceItems.map((item, index) => (
                  <tr key={index} className="text-sm md:text-base">
                    <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      {index + 1}
                    </td>{" "}
                    <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      {item.itemName}
                    </td>
                    <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      {item.unitAndKg}
                    </td>{" "}
                    <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      {item.quantity} {item.category}
                    </td>
                    <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      ₹{item.mrp}
                    </td>
                    <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      - ₹{item.discount}
                    </td>
                    <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      ₹{item.pricePerItem}
                    </td>
                    {/* <td className="text-sm font-semibold text-gray-600 py-2 px-4 border"> 
                      {/* {(() => {
                        // Extract all tax types and numeric values from the string
                        const matches =
                          item.itemTaxType.match(/([A-Za-z]+)\s*(\d+)/g); // Match all occurrences of "TaxType Value"

                        if (matches) {
                          // Process each match
                          const formattedResults = matches.map((match) => {
                            const [taxType, value] = match.split(/\s+/); // Split into tax type and value
                            const numericValue = parseFloat(value); // Convert the value to a number

                            // Apply /2 only for CGST and SGST
                            const finalValue =
                              taxType === "CGST" || taxType === "SGST"
                                ? (numericValue / 2).toFixed(2)
                                : numericValue.toFixed(2);

                            return `${taxType} ${finalValue}%`; // Format and return
                          });

                          return formattedResults.join(" + "); // Join all formatted results with ' + '
                        }

                        return `${item.itemTaxType}%`; // Return original value if no matches are found
                      })()}
                    </td>  */}
                    {/* <td className="text-sm font-semibold text-gray-600 py-2 px-4 border-b">
                      {(() => {
                        // Extract numeric value from the tax type string
                        const match = item.itemTaxType.match(/\d+/); // This finds the first sequence of digits in the string
                        if (match) {
                          const numericValue = parseFloat(match[0]); // Convert the extracted string to a number
                          return (numericValue / 2).toFixed(2); // Divide by 2 and format to 2 decimal places
                        }
                        return item.itemTaxType ; // Return 'N/A' or another default value if no number is found
                      })()}
                    </td> */}
                    {/* {(item.itemTaxRate / 2).toFixed(1)} */}
                    <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      {item.itemTaxRate}%
                    </td>{" "}
                    {/* <td className="py-2 px-4 border-b">
                       {item.itemTaxType}
                    </td>{" "} */}
                    <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      ₹{item.taxAmount}
                    </td>{" "}
                    <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      ₹{item.totalAmountWithTax}
                    </td>{" "}
                  </tr>
                ))}
              </tbody>
              <tfoot>
              <tr>
                  <td
                    colSpan="7"
                    className="text-sm font-semibold text-gray-900 py-2 px-4 border-t text-right font-bold"
                  >
                    Tax type
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border-t">
                  {(() => {
                        // Extract all tax types and numeric values from the string
                        const matches =
                          formData.itemTaxType.match(/([A-Za-z]+)\s*(\d+)/g); // Match all occurrences of "TaxType Value"

                        if (matches) {
                          // Process each match
                          const formattedResults = matches.map((match) => {
                            const [taxType, value] = match.split(/\s+/); // Split into tax type and value
                            const numericValue = parseFloat(value); // Convert the value to a number

                            // Apply /2 only for CGST and SGST
                            const finalValue =
                              taxType === "CGST" || taxType === "SGST"
                                ? (numericValue / 2).toFixed(2)
                                : numericValue.toFixed(2);

                            return `${taxType} ${finalValue}%`; // Format and return
                          });

                          return formattedResults.join(" + "); // Join all formatted results with ' + '
                        }

                        return `${formData.itemTaxType}%`; // Return original value if no matches are found
                      })()}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="8"
                    className="text-sm font-semibold text-gray-900 py-2 px-4 border-t text-right font-bold"
                  >
                    {/* Tax ({taxPercentage}%) */}
                    Total tax amount
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border-t">
                    ₹{taxAmount}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan="9"
                    className="text-sm font-semibold text-gray-900 py-2 px-4 border-t text-right font-bold"
                  >
                    Total with Tax
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border-t">
                    ₹{totalWithTax}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Footer Section */}
          <div className="mt-6 text-center">
            <p className="text-sm font-semibold text-gray-600 text-gray-600 mb-4">
              Thank you for your business!
            </p>
            <p className="text-sm font-semibold text-gray-600 text-gray-600">
              Payment Method: Bank Transfer
            </p>
          </div>
        </div>
      )}

      {/* Print Button */}
      <div className="mt-6">
        <button
          onClick={handlePrint}
          className="w-full bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
        >
          Print Invoice
        </button>
      </div>
      {/* <div className="relative">
  <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>  */}
  {/* <div className="fixed inset-0 flex justify-center items-center z-50">
    <iframe
      src="https://netflix.com"
      title="W3Schools Free Online Web Tutorials"
      className="w-full h-96 border-none shadow-lg

      w-full: 
      h-96:
      border-none
      shadow-lg"
    ></iframe>
  </div> 
</div>*/}

    </div>
  );
};

export default Billing;
