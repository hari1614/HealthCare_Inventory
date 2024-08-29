import React from "react";
import SellingForm from "./SellingForm";
import BuyingForm from "./BuyingForm";

const MainForm = ({
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
  shippingCharges,
  setShippingCharges,
  addBuyingProductToInvoice,
}) => {
  return (
    <div>
      {formData.transactionType === "Selling" && (
        <SellingForm
          formData={formData}
          handleInputChange={handleInputChange}
          addProductToInvoice={addProductToInvoice}
          options={options}
          stateOptions={stateOptions}
          errors={errors}
          totalWithTax={totalWithTax}
          selectedProductId={selectedProductId}
          products={products}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredProducts={filteredProducts}
          handleProductChange={handleProductChange}
          shippingCharges={shippingCharges}
          setShippingCharges={setShippingCharges}
        />
      )}
      {formData.transactionType === "Buying" && (
        <BuyingForm
          formData={formData}
          handleInputChange={handleInputChange}
          addProductToInvoice={addProductToInvoice}
          stateOptions={stateOptions}
          options={options}
          errors={errors}
          addBuyingProductToInvoice={addBuyingProductToInvoice}

        />
      )}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
        >
          Generate Invoice
        </button>
      </div>
    </div>
  );
};

export default MainForm;
