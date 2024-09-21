import React, { useState, useEffect, useRef } from "react";
import { useProductContext } from "../hooks/useProductContext";
import { useReactToPrint } from "react-to-print";
import { taxDropdownOptions, stateDropdownOptions } from "../utils/utils";
import { validateFormData } from "../utils/validation";
import InvoiceDetails from "./invoice/InvoiceDetails";
import { convertNumberToWordsWithDecimal } from "../utils/utils";
import { formatDateToYYYYMMDD } from "../utils/dateUtils";
import MainForm from "./forms/MainForm";
import PurchaseInvoiceDetails from "./invoice/PurchaseInvoiceDetails";

const Billing = () => {
  const { products } = useProductContext();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({
    transactionType: "Selling",
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
    itemTaxRate: "",
    itemTaxType: "",
    state: "Tamil nadu",
    stateCode: "",
    productName: "",
    supplierName: "",
    supplierGstNo: "",
    supplierFssaiNo: "",
    supplierAddress: "",
    supplierState: "",
    date: formatDateToYYYYMMDD(new Date().toISOString()),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [invoicePurchaseItems, setInvoicePurchaseItems] = useState([]);
  const [taxPercentage, setTaxPercentage] = useState("");
  const [taxAmount, setTaxAmount] = useState("");
  const [totalWithTax, setTotalWithTax] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [isManualDiscount, setIsManualDiscount] = useState(false); // New state to track manual discount change
  const [errors, setErrors] = useState({}); // State to hold validation errors
  const [existingHSNCodes, setExistingHSNCodes] = useState([]); // List of existing HSN codes
  const [selectedState, setSelectedState] = useState("");
  const [selectedCode, setSelectedCode] = useState("");
  const invoiceRef = useRef();

  //WITH STATE AND STATE CODE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    // Auto-calculate discount if 'mrp' or 'pricePerItem' is changed and not manually adjusted
    if ((name === "mrp" || name === "pricePerItem") && !isManualDiscount) {
      const discount = updatedFormData.mrp - updatedFormData.pricePerItem;
      updatedFormData.discount = discount > 0 ? discount : 0;
    }

    // Determine tax type and state code based on the selected state
    if (name === "itemTaxRate" || name === "state") {
      const stateOption = stateDropdownOptions().find(
        (option) => option.value === updatedFormData.state
      );
      const taxRate = formData.itemTaxRate || 0;

      if (stateOption) {
        updatedFormData.stateCode = stateOption.code; // Changed from gstCode to stateCode
        if (updatedFormData.state === "Tamil Nadu") {
          updatedFormData.itemTaxType = `CGST ${taxRate}%, SGST ${taxRate}%`;
        } else {
          updatedFormData.itemTaxType = `IGST ${taxRate}`;
        }
      } else {
        updatedFormData.stateCode = ""; // Reset stateCode if state is not found
      }
    }

    // Set manual discount flag if discount field is updated
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
    console.log("Form Data before adding to invoice:", formData); // Log form data
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
      unitAndKg: selectedProduct?.unitAndKg || "",
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
    });
  };

  const addBuyingProductToInvoice = () => {
    // Perform validation specific to buying form

    // Calculate total amount for buying form
    let totalAmount = formData.quantity * formData.pricePerItem;

    // Calculate tax and total with tax
    const taxAmount = calculateTax(totalAmount, formData.itemTaxRate);
    const totalAmountWithTax = totalAmount + parseFloat(taxAmount);

    // Create new item for the invoice
    const newItem = {
      ...formData,
      totalAmount,
      taxAmount,
      totalAmountWithTax,
      // Add any other relevant fields for buying form
    };

    // Update invoice items with the new buying item
    setInvoicePurchaseItems([...invoicePurchaseItems, newItem]);
    updateTaxAndTotal([...invoicePurchaseItems, newItem]);

    // Clear form fields after adding to invoice
    setFormData({
      ...formData,
      productName: "",
      quantity: "",
      pricePerItem: "",
      // Reset other relevant fields for buying form
    });
  };

  // console.log(subtotal + "hello")
  const updateTaxAndTotal = (items, shippingCharges) => {
    // Calculate the subtotal of items
    const subtotal = items.reduce((acc, item) => acc + item.totalAmount, 0);
    console.log("Subtotal before shipping:", subtotal);

    // Convert shipping charges to a number
    const shippingChargesAmount = parseFloat(shippingCharges) || 0;
    console.log("Shipping charges:", shippingChargesAmount);

    // Add shipping charges to subtotal
    const subtotalWithShipping = subtotal + shippingChargesAmount;
    console.log("Subtotal after adding shipping:", subtotalWithShipping);

    // Calculate tax as a percentage of the subtotal including shipping
    const taxRate = 0.05; // 5% GST
    const totalTax = subtotalWithShipping * taxRate;
    console.log("Calculated GST amount:", totalTax);

    // Add tax to the subtotal with shipping charges
    const finalTotalWithTax = subtotalWithShipping + totalTax;
    console.log("Final total with tax:", finalTotalWithTax);

    // Set state values
    setSubtotal(subtotalWithShipping);
    setTaxAmount(totalTax.toFixed(2));
    setTotalWithTax(finalTotalWithTax.toFixed(2));
  };

  // Effect to recalculate totals whenever items or shippingCharges change

  useEffect(() => {
    updateTaxAndTotal(invoiceItems, shippingCharges);
  }, [invoiceItems, shippingCharges, formData.transactionType]);

  // Log the current subtotal for debugging
  console.log("Current subtotal (outside function):", subtotal);

  const calculateTotalWithoutTax = (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.totalAmount, 0);
    return subtotal.toFixed(2); // Return the subtotal formatted to two decimal places
  };

  const totalWithoutTax = calculateTotalWithoutTax(invoiceItems);

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

  const options = taxDropdownOptions();
  const stateOptions = stateDropdownOptions();

  function calculateTax(price, taxRate) {
    return ((price * taxRate) / 100).toFixed(2);
  }

  const handleTaxRateChange = (event) => {
    const newTaxRate = parseFloat(event.target.value);
    setTaxPercentage(newTaxRate);

    updateTaxAndTotal(invoiceItems);
  };

  const totalInWords = convertNumberToWordsWithDecimal(totalWithTax);

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
                value="Selling"
                checked={formData.transactionType === "Selling"}
                onChange={handleTransactionTypeChange}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-gray-600">Selling</span>
            </label>
            <label className="inline-flex text-xs text-gray-400 font-semibold items-center">
              <input
                type="radio"
                name="transactionType"
                value="Buying"
                checked={formData.transactionType === "Buying"}
                onChange={handleTransactionTypeChange}
                className="form-radio h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-gray-600">Buying</span>
            </label>
          </fieldset>
        </div>

        {/* Input Fields */}
        <div className="">
          <MainForm
            formData={formData}
            handleInputChange={handleInputChange}
            addProductToInvoice={addProductToInvoice}
            options={options}
            stateOptions={stateOptions}
            errors={errors}
            totalWithTax={totalWithTax}
            selectedProductId={selectedProductId}
            products={products}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredProducts={filteredProducts}
            handleProductChange={handleProductChange}
            shippingCharges={shippingCharges}
            setShippingCharges={setShippingCharges}
            addBuyingProductToInvoice={addBuyingProductToInvoice}
          />
        </div>

        {/* Invoice Details */}
      </form>
      <InvoiceDetails
        invoiceItems={invoiceItems}
        totalWithoutTax={totalWithoutTax}
        formData={formData}
        taxAmount={taxAmount}
        totalWithTax={totalWithTax}
        invoiceRef={invoiceRef}
        handlePrint={handlePrint}
        subtotal={subtotal}
        totalInWords={totalInWords}
        shippingCharges={shippingCharges}
      />
      <PurchaseInvoiceDetails
        invoiceItems={invoiceItems}
        totalWithoutTax={totalWithoutTax}
        formData={formData}
        taxAmount={taxAmount}
        totalWithTax={totalWithTax}
        invoiceRef={invoiceRef}
        handlePrint={handlePrint}
        subtotal={subtotal}
        totalInWords={totalInWords}
        shippingCharges={shippingCharges}
        invoicePurchaseItems={invoicePurchaseItems}
      />
    </div>
  );
};

export default Billing;
