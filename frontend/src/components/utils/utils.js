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

export const getUnitAndKgOptions = (selectedType) => {
  switch (selectedType) {
    case "Capsules":
      return [
        { value: "60 CAPSULES", label: "60 CAPSULES" },
        { value: "90 CAPSULES", label: "90 CAPSULES" },
        { value: "100 CAPSULES", label: "100 CAPSULES" },
        { value: "120 CAPSULES", label: "120 CAPSULES" },
      
      ];
    case "Tablets":
      return [
        { value: "60 TABLETS", label: "60 TABLETS" },
        { value: "90 TABLETS", label: "90 TABLETS" },
        { value: "100 TABLETS", label: "100 TABLETS" },
        { value: "120 TABLETS", label: "120 TABLETS" },
        
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
        ],
      ];
    default:
      return [];
  }
};

export const taxDropdownOptions = () => {
  return [
    { value: 5, label: "5%" },
    { value: 12, label: "12%" },
    { value: 18, label: "18%" },
    { value: 28, label: "28%" },
  ];
};
export const taxDropdownOptionsTwo = () => {
  return [
    { value: "5%", label: "5%" },
    { value: "12%", label: "12%" },
    { value: "18%", label: "18%" },
    { value: "28%", label: "28%" },
  ];
};

export const LogutPopup = () => {
  // code for popup
  return;
};
