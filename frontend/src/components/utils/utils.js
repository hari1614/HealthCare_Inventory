// utils.js

export const getUnitAndKgOptionsTwo = (selectedType) => {
  switch (selectedType) {
    case "Capsules":
      return [
        { value: "60 CAPSULES", label: "60 CAPSULES" },
        { value: "90 CAPSULES", label: "90 CAPSULES" },
        { value: "100 CAPSULES", label: "100 CAPSULES" },
        { value: "120 CAPSULES", label: "120 CAPSULES" },
        { value: "BULK ORDER", label: "BULK ORDER" },
      ];
    case "Tablets":
      return [
        { value: "60 TABLETS", label: "60 TABLETS" },
        { value: "90 TABLETS", label: "90 TABLETS" },
        { value: "100 TABLETS", label: "100 TABLETS" },
        { value: "120 TABLETS", label: "120 TABLETS" },
        { value: "BULK ORDER", label: "BULK ORDER" },
      ];
    case "Powders":
      return [
        { value: "100 GRAMS", label: "100 GRAMS" },
        { value: "BULK ORDER", label: "BULK ORDER" },
      ];
    case "All Products":
      return [
        ...[
          { value: "60 CAPSULES", label: "60 CAPSULES" },
          { value: "90 CAPSULES", label: "90 CAPSULES" },
          { value: "100 CAPSULES", label: "100 CAPSULES" },
          { value: "120 CAPSULES", label: "120 CAPSULES" },
          { value: "BULK ORDER", label: "BULK ORDER" },
        ],
        ...[
          { value: "60 TABLETS", label: "60 TABLETS" },
          { value: "90 TABLETS", label: "90 TABLETS" },
          { value: "100 TABLETS", label: "100 TABLETS" },
          { value: "120 TABLETS", label: "120 TABLETS" },
          { value: "BULK ORDER", label: "BULK ORDER" },
        ],
        ...[
          { value: "100 GRAMS", label: "100 GRAMS" },
          { value: "BULK ORDER", label: "BULK ORDER" },
        ],
      ];
    default:
      return [];
  }
};
// export const getUnitAndKgOptionsTwo = (selectedType) => {
//   switch (selectedType) {
//     case "Capsules":
//       return [
//         { value: "60 Capsules", label: "60 Capsules" },
//         { value: "90 Capsules", label: "90 Capsules" },
//         { value: "100 Capsules", label: "100 Capsules" },
//         { value: "120 Capsules", label: "120 Capsules" },
//         { value: "Bulk Order", label: "Bulk Order" },
//       ];
//     case "Tablets":
//       return [
//         { value: "60 Tablets", label: "60 Tablets" },
//         { value: "100 Tablets", label: "100 Tablets" },
//         { value: "120 Tablets", label: "120 Tablets" },
//         { value: "Bulk Order", label: "Bulk Order" },
//       ];
//     case "Powders":
//       return [
//         { value: "100 Grams", label: "100 Grams" },
//         { value: "1 Kg", label: "1 Kg" },
//         { value: "5 Kg", label: "5 Kg" },
//         { value: "10 Kg", label: "10 Kg" },
//         { value: "25 Kg", label: "25 Kg" },
//         { value: "50 Kg", label: "50 Kg" },
//         { value: "100 Kg", label: "100 Kg" },
//         { value: "500 Kg", label: "500 Kg" },
//         { value: "Bulk Order", label: "Bulk Order" },
//       ];
//     case "All Products":
//       return [
//         ...[
//           { value: "60 Capsules", label: "60 Capsules" },
//           { value: "90 Capsules", label: "90 Capsules" },
//           { value: "100 Capsules", label: "100 Capsules" },
//           { value: "120 Capsules", label: "120 Capsules" },
//         ],
//         ...[
//           { value: "60 Tablets", label: "60 Tablets" },
//           { value: "100 Tablets", label: "100 Tablets" },
//           { value: "120 Tablets", label: "120 Tablets" },
//         ],
//         ...[
//           { value: "100 Grams", label: "100 Grams" },
//           { value: "1 Kg", label: "1 Kg" },
//           { value: "5 Kg", label: "5 Kg" },
//           { value: "10 Kg", label: "10 Kg" },
//           { value: "25 Kg", label: "25 Kg" },
//           { value: "50 Kg", label: "50 Kg" },
//           { value: "100 Kg", label: "100 Kg" },
//           { value: "500 Kg", label: "500 Kg" },
//           { value: "Bulk Order", label: "Bulk Order" },
//         ],
//       ];
//     default:
//       return [];
//   }
// };

// utils.js

export const getUnitAndKgOptions = (selectedType) => {
  switch (selectedType) {
    case "Capsules":
      return [
        { value: "60 CAPSULES", label: "60 CAPSULES" },
        { value: "90 CAPSULES", label: "90 CAPSULES" },
        { value: "100 CAPSULES", label: "100 CAPSULES" },
        { value: "120 CAPSULES", label: "120 CAPSULES" },
        { value: "BULK ORDER", label: "BULK ORDER" },
      ];
    case "Tablets":
      return [
        { value: "60 TABLETS", label: "60 TABLETS" },
        { value: "100 TABLETS", label: "100 TABLETS" },
        { value: "120 TABLETS", label: "120 TABLETS" },
        { value: "BULK ORDER", label: "BULK ORDER" },
      ];
    case "Powders":
      return [
        { value: "100 GRAMS", label: "100 GRAMS" },
        { value: "1 KG", label: "1 KG" },
        { value: "5 KG", label: "5 KG" },
        { value: "10 KG", label: "10 KG" },
        { value: "25 KG", label: "25 KG" },
        { value: "50 KG", label: "50 KG" },
        { value: "100 KG", label: "100 KG" },
        { value: "500 KG", label: "500 KG" },
        { value: "BULK ORDER", label: "BULK ORDER" },
      ];
    case "All Products":
      // Combine options from all categories into a single list
      return [
        ...[
          { value: "60 CAPSULES", label: "60 CAPSULES" },
          { value: "90 CAPSULES", label: "90 CAPSULES" },
          { value: "100 CAPSULES", label: "100 CAPSULES" },
          { value: "120 CAPSULES", label: "120 CAPSULES" },
        ],
        ...[
          { value: "60 TABLETS", label: "60 TABLETS" },
          { value: "100 TABLETS", label: "100 TABLETS" },
          { value: "120 TABLETS", label: "120 TABLETS" },
        ],
        ...[
          { value: "100 GRAMS", label: "100 GRAMS" },
          { value: "1 KG", label: "1 KG" },
          { value: "5 KG", label: "5 KG" },
          { value: "10 KG", label: "10 KG" },
          { value: "25 KG", label: "25 KG" },
          { value: "50 KG", label: "50 KG" },
          { value: "100 KG", label: "100 KG" },
          { value: "500 KG", label: "500 KG" },
          { value: "BULK ORDER", label: "BULK ORDER" },
        ],
      ];
    default:
      return [];
  }
};

export const taxDropdownOptions = () => {
  return [
    { value: 6, label: "6%" },
    { value: 8, label: "8%" },
    { value: 12, label: "12%" },
    { value: 16, label: "16%" },
    { value: 22, label: "22%" },
    { value: 26, label: "26%" },
  ];
};
export const taxDropdownOptionsTwo = () => {
  return [
    { value: "6%", label: "6%" },
    { value: "8%", label: "8%" },
    { value: "12%", label: "12%" },
    { value: "16%", label: "16%" },
    { value: "22%", label: "22%" },
    { value: "26%", label: "26%" },
  ];
};

export const LogutPopup = () => {
  // code for popup
  return;
};
