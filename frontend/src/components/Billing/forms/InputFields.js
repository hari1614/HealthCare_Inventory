import React from "react";

const InputFields = ({
  formData,
  handleInputChange,
  addProductToInvoice,
  options,
  stateOptions,
  errors,
  totalWithTax,
  selectedProductId,
  products,
  setIsOpen,
  isOpen,
  searchTerm,
  setSearchTerm,
  filteredProducts,
  handleProductChange,
  handlePrint,
  shippingCharges,
  setShippingCharges,
 
}) => (
  <>
  <div>
    {/* Product Selection */}
    
  
    <div className="grid grid-cols-1 gap-6">
      <>
      {formData.transactionType === "Selling" && (
        <>
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
      <div>
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
      </div>

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
          <option className="text-gray-600 text-sm font-semibold">NOS</option>
          <option className="text-gray-600 text-sm font-semibold">GRAMS</option>
          <option className="text-gray-600 text-sm font-semibold">KG</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">MRP</label>
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
        <label className="block text-sm font-medium text-gray-700">Price</label>
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
      </>

      )}
     

      </>

      {formData.transactionType === "Buying" && (
        <>
          {/* Buying Specific Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name of the Product
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
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
            <label className="block text-lg font-medium text-gray-700">
              Supplier Details
            </label>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Supplier Name
              </label>
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleInputChange}
                className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                GST No
              </label>
              <input
                type="text"
                name="supplierGstNo"
                value={formData.supplierGstNo}
                onChange={handleInputChange}
                className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                FSSAI No
              </label>
              <input
                type="text"
                name="supplierFssaiNo"
                value={formData.supplierFssaiNo}
                onChange={handleInputChange}
                className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="supplierAddress"
                value={formData.supplierAddress}
                onChange={handleInputChange}
                className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <select
                name="supplierState"
                value={formData.supplierState}
                onChange={handleInputChange}
                className="text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option
                  className="text-gray-600 text-sm font-semibold"
                  value=""
                >
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
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
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
              <option className="text-gray-600 text-sm font-semibold">
                LTR
              </option>{" "}
              {/* Added another option */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              HSN Code
            </label>
            <input
              type="number"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleInputChange}
              className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </>
      )}

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
      <div className="mt-4">
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
      <div className="">
        <label className="block text-sm font-medium text-gray-700">State</label>
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

      <div className="">
        <label className="block text-sm font-medium text-gray-700 hidden">
          Tax type
        </label>
        <select
          name="itemTaxType"
          value={formData.itemTaxType}
          onChange={handleInputChange}
          disabled
          className="hidden"
          required
        >
          {/*before hidden--  text-gray-600 text-sm font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focusing:ring-indigo-500 focus:border-indigo-500 sm:text-sm*/}
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
            value={`IGST ${formData.itemTaxRate}%`}
          >
            IGST
          </option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shipping Charges
        </label>
        <input
          type="number"
          name="shippingCharges"
          value={shippingCharges}
          onChange={(e) => setShippingCharges(parseFloat(e.target.value) || 0)}
          className="text-gray-600 text-sm font-semibold mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
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
  </div>
  </>
);

export default InputFields;
