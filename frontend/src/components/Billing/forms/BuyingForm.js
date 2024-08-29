// import React from "react";
// import usePurchase from "../../hooks/usePurchase";

// const BuyingForm = ({
//   formData,
//   handleInputChange,
//   addProductToInvoice,
//   options,
//   stateOptions,
//   errors,
//   totalWithTax,
//   addBuyingProductToInvoice,
// }) => {
//   const { addPurchase, loading, error, success } = usePurchase();

  

//   const handleSubmit = () => {
//     addPurchase(formData, addBuyingProductToInvoice);
//   };

//   return (
//     <>
//       <div>
//         {/* Product Selection */}
//         <div className="grid grid-cols-1 gap-6">
//           {/* Item Details */}
//           {/* Buying Specific Fields */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Name of the Product
//             </label>
//             <input
//               type="text"
//               name="productName"
//               value={formData.productName}
//               onChange={handleInputChange}
//               className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               HSN code
//             </label>
//             <input
//               type="number"
//               name="hsnCode"
//               value={formData.hsnCode}
//               onChange={handleInputChange}
//               className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//             {errors.hsnCode && (
//               <p className="text-red-500 text-xs">{errors.hsnCode}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Select a category
//             </label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//               className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             >
//               <option className="text-gray-600 text-sm font-semibold">
//                 Select a category
//               </option>
//               <option className="text-gray-600 text-sm font-semibold">
//                 CAPSULES
//               </option>
//               <option className="text-gray-600 text-sm font-semibold">
//                 TABLETS
//               </option>
//               <option className="text-gray-600 text-sm font-semibold">
//                 POWDERS
//               </option>
//               <option className="text-gray-600 text-sm font-semibold">
//                 GRAMS
//               </option>
//               <option className="text-gray-600 text-sm font-semibold">
//                 POUCHE
//               </option>
//               <option className="text-gray-600 text-sm font-semibold">
//                 OTHERS
//               </option>{" "}
//               {/* Added another option */}
//             </select>
//             {errors.category && (
//               <p className="text-red-500 text-xs">{errors.category}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Quantity
//             </label>
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleInputChange}
//               className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//             {errors.quantity && (
//               <p className="text-red-500 text-xs">{errors.quantity}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Price
//             </label>
//             <input
//               type="number"
//               name="pricePerItem"
//               value={formData.pricePerItem}
//               onChange={handleInputChange}
//               className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             />
//             {errors.pricePerItem && (
//               <p className="text-red-500 text-xs">{errors.pricePerItem}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-lg font-medium text-gray-700">
//               Supplier Details
//             </label>
//             <div className="mt-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Supplier Name
//               </label>
//               <input
//                 type="text"
//                 name="supplierName"
//                 value={formData.supplierName}
//                 onChange={handleInputChange}
//                 className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//             </div>
//             <div className="mt-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 GST No
//               </label>
//               <input
//                 type="text"
//                 name="supplierGstNo"
//                 value={formData.supplierGstNo}
//                 onChange={handleInputChange}
//                 className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//               {errors.supplierGstNo && (
//                 <p className="text-red-500 text-xs">{errors.supplierGstNo}</p>
//               )}
//             </div>
//             <div className="mt-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 FSSAI No
//               </label>
//               <input
//                 type="text"
//                 name="supplierFssaiNo"
//                 value={formData.supplierFssaiNo}
//                 onChange={handleInputChange}
//                 className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//               {errors.supplierFssaiNo && (
//                 <p className="text-red-500 text-xs">{errors.supplierFssaiNo}</p>
//               )}
//             </div>
//             <div className="mt-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 name="supplierAddress"
//                 value={formData.supplierAddress}
//                 onChange={handleInputChange}
//                 className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               />
//               {errors.supplierAddress && (
//                 <p className="text-red-500 text-xs">{errors.supplierAddress}</p>
//               )}
//             </div>

//             {/* Add Product Button */}
//             {/* <div className="mt-4">
//           <button
//             type="button"
//             onClick={addProductToInvoice}
//             className="w-full bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center  items-center"
//           >
//             Add Product
//           </button>
//         </div> */}
//             {/* <button
//               type="button"
//               onClick={() => {
//                 console.log("Add Product button clicked");
//                 addBuyingProductToInvoice();
//               }}
//               className="w-full bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center  items-center"
//             >
//               Add Product
//             </button> */}
//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="w-full bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
//               disabled={loading}
//             >
//               {loading ? "Adding..." : "Add Product"}
//             </button>

//             <div className="mt-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 State
//               </label>
//               <select
//                 name="state"
//                 value={formData.State}
//                 onChange={handleInputChange}
//                 className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               >
//                 <option
//                   className="text-gray-600 text-sm font-semibold"
//                   value=""
//                 >
//                   Select a state
//                 </option>
//                 {stateOptions.map((option) => (
//                   <option
//                     className="text-gray-600 text-sm font-semibold"
//                     key={option.value}
//                     value={option.value}
//                   >
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <div className="">
//             <label className="block text-sm font-medium text-gray-700 hidden">
//               Tax type
//             </label>
//             <select
//               name="itemTaxType"
//               value={formData.itemTaxType}
//               onChange={handleInputChange}
//               disabled
//               className="hidden"
//               required
//             >
//               {/*before hidden--  text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focusing:ring-indigo-500 focus:border-indigo-500 sm:text-sm*/}
//               <option
//                 className="text-gray-600 text-sm font-semibold"
//                 value="Select a tax type"
//               >
//                 Select a tax type
//               </option>
//               <option
//                 className="text-gray-600 text-sm font-semibold"
//                 value={`CGST ${formData.itemTaxRate}%, SGST ${formData.itemTaxRate}%`}
//               >
//                 {/* {`CGST ${formData.itemTaxRate}, SGST ${formData.itemTaxRate}`} */}
//                 CGST & SGST
//               </option>

//               <option
//                 className="text-gray-600 text-sm font-semibold"
//                 value={`IGST ${formData.itemTaxRate}%`}
//               >
//                 IGST
//               </option>
//             </select>
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Item Tax Rate
//             </label>
//             <select
//               name="itemTaxRate"
//               value={formData.itemTaxRate}
//               onChange={handleInputChange}
//               className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focusing:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//               required
//             >
//               <option className="text-gray-600 text-sm font-semibold" value="">
//                 Select Tax Rate
//               </option>
//               {options.map((option) => (
//                 <option
//                   className="text-gray-600 text-sm font-semibold"
//                   key={option.value}
//                   value={option.value}
//                 >
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="">
//             <label className="block text-sm font-medium text-gray-700 hidden">
//               Tax type
//             </label>
//             <select
//               name="itemTaxType"
//               value={formData.itemTaxType}
//               onChange={handleInputChange}
//               disabled
//               className="hidden"
//               required
//             >
//               {/*before hidden--  text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focusing:ring-indigo-500 focus:border-indigo-500 sm:text-sm*/}
//               <option
//                 className="text-gray-600 text-sm font-semibold"
//                 value="Select a tax type"
//               >
//                 Select a tax type
//               </option>
//               <option
//                 className="text-gray-600 text-sm font-semibold"
//                 value={`CGST ${formData.itemTaxRate}%, SGST ${formData.itemTaxRate}%`}
//               >
//                 {/* {`CGST ${formData.itemTaxRate}, SGST ${formData.itemTaxRate}`} */}
//                 CGST & SGST
//               </option>

//               <option
//                 className="text-gray-600 text-sm font-semibold"
//                 value={`IGST ${formData.itemTaxRate}%`}
//               >
//                 IGST
//               </option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Total with Tax
//             </label>
//             <input
//               type="number"
//               name="totalWithTax"
//               value={totalWithTax}
//               readOnly
//               className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
//             />
//           </div>
//         </div>

//         {/* Buyer and Seller Names */}

//         <div className="mt-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Seller Name
//           </label>
//           <input
//             type="text"
//             name="sellerName"
//             value={formData.sellerName}
//             onChange={handleInputChange}
//             className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default BuyingForm;
import React, { useState } from "react";
import usePurchase from "../../hooks/usePurchase";

const BuyingForm = ({
  formData,
  handleInputChange,
  addProductToInvoice,
  options,
  stateOptions,
  errors,
  totalWithTax,
  addBuyingProductToInvoice,
}) => {
  const { addPurchase, loading } = usePurchase();

  // Local error state
  const [localErrors, setLocalErrors] = useState({});

  // Validate HSN code
  const validateHsnCode = (hsnCode) => {
    const hsnCodeRegex = /^[0-9]{4}$/;
    return hsnCodeRegex.test(hsnCode);
  };

  // Validate GST number
  const validateGstNumber = (gstNo) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
    return gstRegex.test(gstNo);
  };

  // Validate form data
  const validateForm = () => {
    let errors = {};
    if (!validateHsnCode(formData.hsnCode)) {
      errors.hsnCode = "HSN code must be a 4-digit number.";
    }
    if (!validateGstNumber(formData.supplierGstNo)) {
      errors.supplierGstNo = "Invalid GST number.";
    }
    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      addPurchase(formData, addBuyingProductToInvoice);
    }
  };

  return (
    <>
      <div>
        {/* Product Selection */}
        <div className="grid grid-cols-1 gap-6">
          {/* Item Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name of the Product</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          
          {/* HSN Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700">HSN code</label>
            <input
              type="number"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {localErrors.hsnCode && <p className="text-red-500 text-xs">{localErrors.hsnCode}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Select a category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option className="text-gray-600 text-sm font-semibold">Select a category</option>
              <option className="text-gray-600 text-sm font-semibold">CAPSULES</option>
              <option className="text-gray-600 text-sm font-semibold">TABLETS</option>
              <option className="text-gray-600 text-sm font-semibold">POWDERS</option>
              <option className="text-gray-600 text-sm font-semibold">GRAMS</option>
              <option className="text-gray-600 text-sm font-semibold">POUCHE</option>
              <option className="text-gray-600 text-sm font-semibold">OTHERS</option>
            </select>
            {localErrors.category && <p className="text-red-500 text-xs">{localErrors.category}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {localErrors.quantity && <p className="text-red-500 text-xs">{localErrors.quantity}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="pricePerItem"
              value={formData.pricePerItem}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {localErrors.pricePerItem && <p className="text-red-500 text-xs">{localErrors.pricePerItem}</p>}
          </div>

          {/* Supplier Details */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Supplier Details</label>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleInputChange}
                className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">GST No</label>
              <input
                type="text"
                name="supplierGstNo"
                value={formData.supplierGstNo}
                onChange={handleInputChange}
                className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {localErrors.supplierGstNo && <p className="text-red-500 text-xs">{localErrors.supplierGstNo}</p>}
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">FSSAI No</label>
              <input
                type="text"
                name="supplierFssaiNo"
                value={formData.supplierFssaiNo}
                onChange={handleInputChange}
                className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {localErrors.supplierFssaiNo && <p className="text-red-500 text-xs">{localErrors.supplierFssaiNo}</p>}
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="supplierAddress"
                value={formData.supplierAddress}
                onChange={handleInputChange}
                className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {localErrors.supplierAddress && <p className="text-red-500 text-xs">{localErrors.supplierAddress}</p>}
            </div>
          </div>

          {/* Add Product Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

          {/* State */}
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

          {/* Item Tax Rate */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Item Tax Rate</label>
            <select
              name="itemTaxRate"
              value={formData.itemTaxRate}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

          {/* Total with Tax */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Total with Tax</label>
            <input
              type="number"
              name="totalWithTax"
              value={totalWithTax}
              readOnly
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
            />
          </div>

          {/* Seller Name */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Seller Name</label>
            <input
              type="text"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyingForm;
