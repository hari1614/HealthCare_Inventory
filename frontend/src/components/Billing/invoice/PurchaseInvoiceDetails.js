import React from "react";

const PurchaseInvoiceDetails = ({
  invoiceItems,
  formData,
  taxAmount,
  totalWithTax,
  handlePrint,
  invoiceRef,
  totalWithoutTax,
  subtotal,
  totalInWords,
  shippingCharges,
  invoicePurchaseItems,
}) => (
  <div>
    {invoicePurchaseItems.length > 0 && (
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
            </span>
            <p className="text-sm font-semibold text-gray-600">
              FSSAI NO: 12418031000363
            </p>
          </div>
        </div>

        {/* Invoice Details Section */}
        <div className="mb-6">
          <div className="flex justify-between mb-4 ">
            <div className=" w-[45%] ">
              <h2 className="text-lg font-semibold text-gray-800">
                RKS HEALTH CARE
              </h2>

              <p className="capitalize text-sm font-semibold text-gray-600 text-gray-600">
                no, 14, raju nagar, kottakkuppam post vanur taluk
              </p>

              <p className="capitalize text-sm font-semibold text-gray-600 text-gray-600">
                villupuram, tamilnadu, 605104
              </p>
              <p className="text-sm font-semibold text-gray-600 text-gray-600">
                Phone: 90428 55999
              </p>
              <div className="">
                <p className="text-md font-semibold text-gray-600">
                  Email : rkssalesdiv@gmail.com
                  <span className="text-sm font-semibold text-gray-600"></span>
                </p>
                <p className="text-md font-semibold text-gray-600">
                  GSTIN: 33AUHPR9016Q1ZY
                  <span className="text-sm font-semibold text-gray-600">
                    {formData.gstCode}
                  </span>
                </p>
              </div>

              <h2 className="text-lg font-semibold text-gray-800 mt-2">
                Supplier Details
              </h2>
              <p className="text-sm font-semibold text-gray-600">
                Name: {""} {formData.supplierName}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                GST NO: {""} {formData.supplierGstNo}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                FSSAI NO: {""} {formData.supplierFssaiNo}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                Address: {""} {formData.supplierAddress}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                State: {""} {formData.state}
              </p>
              {formData.stateCode && (
                <p className="text-md font-semibold text-gray-600">
                  GSTIN / UIN : {formData.stateCode}
                </p>
              )}
            </div>
            <div className="w-[45%]">
              <div className="container mx-auto">
                <table className="table-auto border-collapse border border-gray-300">
                  {/* First Row (Full Width, Single Column) */}
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="w-full border border-gray-300" colSpan="2">
                        Original: original copy / duplicate
                      </th>
                    </tr>

                    <tr className="bg-gray-100 text-gray-700">
                      <th
                        className="w-full border border-gray-300 text-start"
                        colSpan="2"
                      >
                        State code : 33
                      </th>
                    </tr>
                  </thead>
                  <br></br>

                  {/* Second Row (Full Width but with Two Columns) */}
                  <tbody>
                    <tr className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      <td className=" border border-gray-300 bg-gray-100">
                        Invoice No: {""}
                      </td>
                      <td className=" border border-gray-300 bg-gray-100">
                        RKS/45
                      </td>
                    </tr>

                    {/* Normal Rows with Two Columns */}
                    <tr className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      <td className="border border-gray-300 ">
                        Invoice Date: {""}
                      </td>
                      <td className="border border-gray-300 ">
                        {new Date().toLocaleDateString()}
                      </td>
                    </tr>
                    <tr className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      <td className="border border-gray-300 ">
                        Date of supply
                      </td>
                      <td className="border border-gray-300 ">26-08-2024</td>
                    </tr>
                    <tr className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      <td className="border border-gray-300 ">
                        Place of supplier
                      </td>
                      <td className="border border-gray-300 ">
                        {formData.state}
                      </td>
                    </tr>
                    <br></br>
                    <tr className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      <td className="">Vechile No:</td>
                      <td className="">PY 05 45</td>
                    </tr>
                    <tr className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      <td className="">Supplier state code:</td>
                      <td className="">{formData.stateCode}</td>
                    </tr>
                    <tr className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      <td className="">Payment terms:</td>
                      <td className="">Immediate</td>
                    </tr>
                    <tr className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                      <td className="">Dispatch through:</td>
                      <td className="">By courier</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="mb-6 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr className="">
                <th className="py-2 px-4 border text-left text-sm md:text-base">
                  Serial No.
                </th>{" "}
                <th className="py-2 px-4 border text-left text-sm md:text-base">
                  Product Name
                </th>
                <th className="py-2 px-4 border text-left text-sm md:text-base">
                  Hsn code
                </th>
                <th className="py-2 px-4 border text-left text-sm md:text-base">
                  Category
                </th>
                <th className="py-2 px-4 border text-left text-sm md:text-base">
                  Quantity
                </th>
                <th className="py-2 px-4 border text-left text-sm md:text-base">
                  Price{" "}
                </th>
                <th className="py-2 px-4 border text-left text-sm md:text-base">
                  Tax (%)
                </th>{" "}
                <th className="py-2 px-4 border text-left text-sm md:text-base">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {invoicePurchaseItems.map((item, index) => (
                <tr key={index} className="text-sm md:text-base">
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {index + 1}
                  </td>{" "}
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {item.productName}
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {item.hsnCode}
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {item.category}
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {item.quantity}
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    ₹{item.pricePerItem}
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {item.itemTaxRate}%
                  </td>{" "}
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    ₹{item.totalAmount}
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
                  Shipping amount
                </td>
                <td className="text-sm font-semibold text-gray-600 py-2 px-4 border-t">
                  {shippingCharges}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="7"
                  className="text-sm font-semibold text-gray-900 py-2 px-4 border-t text-right font-bold"
                >
                  Sub Total
                </td>
                <td className="text-sm font-semibold text-gray-600 py-2 px-4 border-t">
                  ₹{subtotal}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead className="mt-6 bg-gray-100 text-gray-700">
              <th className="py-2 px-4 border text-left text-sm md:text-base">
                HSN Code
              </th>
              <th className="py-2 px-4 border text-left text-sm md:text-base">
                GST5%
              </th>
              <th className="py-2 px-4 border text-left text-sm md:text-base">
                GST12%
              </th>
              <th className="py-2 px-4 border text-left text-sm md:text-base">
                GST18%
              </th>
              <th className="py-2 px-4 border text-left text-sm md:text-base">
                GST28%
              </th>
              <th className="py-2 px-4 border text-left text-sm md:text-base">
                Tax type
              </th>
              <th className="py-2 px-4 text-left text-sm md:text-base"></th>
            </thead>
            <tbody>
              {invoicePurchaseItems.map((item, index) => (
                <tr key={index} className="text-sm md:text-base">
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {item.hsnCode}
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {item.itemTaxRate !== undefined &&
                    item.itemTaxRate !== null ? (
                      Number(item.itemTaxRate) === 5 ? (
                        <>
                          <span>{subtotal}</span>
                          <br />
                          <span>{taxAmount}</span>
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {item.itemTaxRate !== undefined &&
                    item.itemTaxRate !== null ? (
                      Number(item.itemTaxRate) === 12 ? (
                        <>
                          <span>{subtotal}</span>
                          <br />
                          <span>{taxAmount}</span>
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {item.itemTaxRate !== undefined &&
                    item.itemTaxRate !== null ? (
                      Number(item.itemTaxRate) === 18 ? (
                        <>
                          <span>{subtotal}</span>
                          <br />
                          <span>{taxAmount}</span>
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {item.itemTaxRate !== undefined &&
                    item.itemTaxRate !== null ? (
                      Number(item.itemTaxRate) === 28 ? (
                        <>
                          <span>{subtotal}</span>
                          <br />
                          <span>{taxAmount}</span>
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </td>

                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {(() => {
                      // Check if itemTaxType and itemTaxRate are available
                      if (item.itemTaxType && item.itemTaxRate) {
                        // Extract tax types and numeric values from the string
                        const matches = item.itemTaxType.match(
                          /([A-Za-z]+)\s*(\d+\.?\d*)%?/g
                        );
                        if (matches) {
                          // Process each match and format it
                          const formattedResults = matches.map((match) => {
                            // Extract tax type and value
                            const [taxType, value] = match.split(/\s+/);
                            const numericValue = parseFloat(value);

                            // Apply /2 only for CGST and SGST, leave IGST as is
                            const finalValue =
                              taxType === "CGST" || taxType === "SGST"
                                ? (numericValue / 2).toFixed(2)
                                : numericValue.toFixed(2);

                            return `${taxType} ${finalValue}%`;
                          });

                          // Check if the tax type includes IGST
                          if (
                            matches.some((match) => match.startsWith("IGST"))
                          ) {
                            // Specifically format for IGST
                            return `IGST ${item.itemTaxRate}%`;
                          }
                          // Combine formatted tax types with rates
                          return `${formattedResults.join(" + ")} (${
                            item.itemTaxRate
                          }%)`;
                        }
                        // Default if no matches, just return itemTaxType with its rate
                        return `${item.itemTaxType}% (Rate: ${item.itemTaxRate}%)`;
                      }
                      // Return default if itemTaxType or itemTaxRate is not available
                      return "Tax information not available";
                    })()}
                  </td>
                  <td className="text-sm font-semibold text-gray-600 py-2 px-4 border">
                    {taxAmount}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="6"
                  className="text-sm font-semibold text-gray-900 py-2 px-4 border-t text-right font-bold"
                >
                  Net Amount
                </td>
                <td className="text-sm font-semibold text-gray-600 py-2 px-4 border-t">
                  ₹{totalWithTax}
                </td>
              </tr>
              <tr>
                <td
                  colSpan="3"
                  className="text-sm font-semibold text-gray-900  py-2 px-4 border text-center font-bold"
                >
                  Total Amount In Words
                </td>
                <td
                  colSpan="6"
                  className="capitalize text-sm font-semibold text-gray-900  py-2 px-4 border text-center font-bold"
                >
                  {totalInWords}
                </td>
              </tr>
              <tr>
                <td
                  className="text-sm font-semibold text-gray-900  py-2 px-4 border text-start font-bold "
                  colSpan="5"
                >
                  <span> Bank Details </span>
                  <tr className="border flex">
                    <br></br>
                    <span className="text-xs font-md text-gray-600">
                      Bank Name : HDFC <br></br>
                      IFSC Number : 657 <br></br>
                      Branch : Pondicherry <br></br>
                    </span>
                  </tr>
                  <span className="mt-2">Terms and conditions</span>
                  <tr className="border flex">
                    <br></br>
                    <span className="text-xs font-md text-gray-600 ">
                      1. We are not responsible for the goods lost in the
                      transport. <br></br>
                      2. Goods once sold we can't be taken back. <br></br>
                      3. Subject to villupuram jurisdiction.
                    </span>
                  </tr>
                </td>
                <td
                  className="text-xs font-semibold text-gray-600 border text-center"
                  colSpan="4"
                >
                  For RKS HEALTHCARE <br></br>
                  Authorized Signature <br></br>
                  Rks
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

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
    {formData.transactionType === "Buying" && (
      <div className="mt-6">
        <button
          onClick={handlePrint}
          className="w-full bg-sea hover:bg-hover1 text-white font-medium text-sm shadow-xl hover:shadow-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
        >
          Print Invoice
        </button>
      </div>
    )}
  </div>
);

export default PurchaseInvoiceDetails;
