// // // utils/validations.js

// // // Function to validate HSN code
// // export const validateHSNCode = (hsnCode) => {
// //   const hsnCodePattern = /^\d{4}$/; // Exactly 6 digits
// //   return hsnCodePattern.test(hsnCode);
// // };

// // // Function to validate quantity (positive number)
// // export const validateQuantity = (quantity) => {
// //   return quantity > 0;
// // };

// // // Function to validate MRP and Price (positive numbers)
// // export const validatePositiveNumber = (value) => {
// //   return value >= 0;
// // };

// // // Function to validate GST Number
// // export const validateGSTNumber = (gstNumber) => {
// //   const gstNumberPattern = /^\d{15}$/; // Exactly 15 digits
// //   return gstNumberPattern.test(gstNumber);
// // };

// // // Function to validate tax rate (percentage)
// // export const validateTaxRate = (taxRate) => {
// //   return taxRate >= 0 && taxRate <= 100;
// // };

// // // Function to validate form data
// // export const validateFormData = (formData, existingHSNCodes) => {
// //   const errors = {};

// //   if (!validateHSNCode(formData.hsnCode)) {
// //     errors.hsnCode = "Invalid HSN code. It must be exactly 4 digits.";
// //   } else if (existingHSNCodes.includes(formData.hsnCode)) {
// //     errors.hsnCode = "HSN code must be unique.";
// //   }

// //   if (!validateQuantity(formData.quantity)) {
// //     errors.quantity = "Quantity must be a positive number.";
// //   }

// //   if (!validatePositiveNumber(formData.mrp)) {
// //     errors.mrp = "MRP must be a positive number.";
// //   }

// //   if (!validatePositiveNumber(formData.pricePerItem)) {
// //     errors.pricePerItem = "Price per item must be a positive number.";
// //   }

// //   // if (formData.itemTaxRate && !validateTaxRate(parseFloat(formData.itemTaxRate))) {
// //   //   errors.itemTaxRate = 'Tax rate must be between 0 and 100.';
// //   // }

// //   return errors;
// // };
// // utils/validations.js

// // Function to validate HSN code
// export const validateHSNCode = (hsnCode) => {
//   const hsnCodePattern = /^\d{4}$/;  // Exactly 4 digits
//   return hsnCodePattern.test(hsnCode);
// };

// // Function to validate quantity (positive number)
// export const validateQuantity = (quantity) => {
//   return quantity > 0;
// };

// // Function to validate MRP and Price (positive numbers)
// export const validatePositiveNumber = (value) => {
//   return value >= 0;
// };

// // Function to validate tax rate (percentage)
// export const validateTaxRate = (taxRate) => {
//   return taxRate >= 0 && taxRate <= 100;
// };

// // Function to validate GST Number
// export const validateGSTNumber = (gstNumber) => {
//   const gstNumberPattern = /^\d{15}$/;  // Exactly 15 digits
//   return gstNumberPattern.test(gstNumber);
// };

// // Function to validate form data
// export const validateFormData = (formData, existingHSNCodes) => {
//   const errors = {};

//   if (!validateHSNCode(formData.hsnCode)) {
//       errors.hsnCode = 'Invalid HSN code. It must be exactly 4 digits.';
//   } else if (existingHSNCodes.includes(formData.hsnCode)) {
//       errors.hsnCode = 'HSN code must be unique.';
//   }

//   if (!validateQuantity(formData.quantity)) {
//       errors.quantity = 'Quantity must be a positive number.';
//   }

//   if (!validatePositiveNumber(formData.mrp)) {
//       errors.mrp = 'MRP must be a positive number.';
//   }

//   if (!validatePositiveNumber(formData.pricePerItem)) {
//       errors.pricePerItem = 'Price per item must be a positive number.';
//   }

//   // Uncomment and use this if tax rate is required
//   // if (formData.itemTaxRate && !validateTaxRate(parseFloat(formData.itemTaxRate))) {
//   //     errors.itemTaxRate = 'Tax rate must be between 0 and 100.';
//   // }

//   if (!validateGSTNumber(formData.gstCode)) {
//       errors.gstCode = 'Invalid GST number. It must be exactly 15 digits.';
//   }

//   return errors;
// };
// utils/validations.js

// Function to validate GST Number
export const validateGSTNumber = (gstNumber) => {
  const gstNumberPattern = /^[A-Z0-9]{15}$/;  // Exactly 15 alphanumeric characters
  return gstNumberPattern.test(gstNumber);
};

//Function to validate HSN code
export const validateHSNCode = (hsnCode) => {
  const hsnCodePattern = /^\d{4}$/;  // Exactly 4 digits
  return hsnCodePattern.test(hsnCode);
};

// Function to validate quantity (positive number)
export const validateQuantity = (quantity) => {
  return quantity > 0;
};

// Function to validate MRP and Price (positive numbers)
export const validatePositiveNumber = (value) => {
  return value >= 0;
};

// Function to validate tax rate (percentage)
export const validateTaxRate = (taxRate) => {
  return taxRate >= 0 && taxRate <= 100;
};

// Function to validate form data
export const validateFormData = (formData, existingHSNCodes) => {
  const errors = {};

  if (!validateHSNCode(formData.hsnCode)) {
      errors.hsnCode = 'Invalid HSN code. It must be exactly 4 digits.';
  } else if (existingHSNCodes.includes(formData.hsnCode)) {
      errors.hsnCode = 'HSN code must be unique.';
  }

  if (!validateQuantity(formData.quantity)) {
      errors.quantity = 'Quantity must be a positive number.';
  }

  if (!validatePositiveNumber(formData.mrp)) {
      errors.mrp = 'MRP must be a positive number.';
  }

  if (!validatePositiveNumber(formData.pricePerItem)) {
      errors.pricePerItem = 'Price per item must be a positive number.';
  }

  // Uncomment and use this if tax rate is required
  // if (formData.itemTaxRate && !validateTaxRate(parseFloat(formData.itemTaxRate))) {
  //     errors.itemTaxRate = 'Tax rate must be between 0 and 100.';
  // }

  // if (!validateGSTNumber(formData.gstCode)) {
  //     errors.gstCode = 'Invalid GST number. It must be exactly 15 alphanumeric characters.';
  // }

  return errors;
};
