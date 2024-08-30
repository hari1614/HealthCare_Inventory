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

// utils.js
export const stateDropdownOptions = () => {
  return [
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir", code: "01" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh", code: "02" },
    { value: "Punjab", label: "Punjab", code: "03" },
    { value: "Chandigarh", label: "Chandigarh", code: "04" },
    { value: "Uttarakhand", label: "Uttarakhand", code: "05" },
    { value: "Haryana", label: "Haryana", code: "06" },
    { value: "Delhi", label: "Delhi", code: "07" },
    { value: "Rajasthan", label: "Rajasthan", code: "08" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh", code: "09" },
    { value: "Bihar", label: "Bihar", code: "10" },
    { value: "Sikkim", label: "Sikkim", code: "11" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh", code: "12" },
    { value: "Nagaland", label: "Nagaland", code: "13" },
    { value: "Manipur", label: "Manipur", code: "14" },
    { value: "Mizoram", label: "Mizoram", code: "15" },
    { value: "Tripura", label: "Tripura", code: "16" },
    { value: "Meghalaya", label: "Meghalaya", code: "17" },
    { value: "Assam", label: "Assam", code: "18" },
    { value: "West Bengal", label: "West Bengal", code: "19" },
    { value: "Jharkhand", label: "Jharkhand", code: "20" },
    { value: "Odisha", label: "Odisha", code: "21" },
    { value: "Chhattisgarh", label: "Chhattisgarh", code: "22" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh", code: "23" },
    { value: "Gujarat", label: "Gujarat", code: "24" },
    { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu", code: "26" },
    { value: "Maharashtra", label: "Maharashtra", code: "27" },
    { value: "Andhra Pradesh (Before Division)", label: "Andhra Pradesh (Before Division)", code: "28" },
    { value: "Karnataka", label: "Karnataka", code: "29" },
    { value: "Goa", label: "Goa", code: "30" },
    { value: "Lakshadweep", label: "Lakshadweep", code: "31" },
    { value: "Kerala", label: "Kerala", code: "32" },
    { value: "Tamil Nadu", label: "Tamil Nadu", code: "33" },
    { value: "Puducherry", label: "Puducherry", code: "34" },
    { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands", code: "35" },
    { value: "Telangana", label: "Telangana", code: "36" },
    { value: "Andhra Pradesh (Newly Added)", label: "Andhra Pradesh (Newly Added)", code: "37" },
    { value: "Ladakh (Newly Added)", label: "Ladakh (Newly Added)", code: "38" },
    { value: "Other Territory", label: "Other Territory", code: "97" },
    { value: "Centre Jurisdiction", label: "Centre Jurisdiction", code: "99" }
  ];
};


export function numberToWords(num) {
  const a = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
  ];
  const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  if (num === 0) return "zero";
  if (num < 20) return a[num];
  if (num < 100) return b[Math.floor(num / 10)] + (num % 10 !== 0 ? "-" + a[num % 10] : "");

  if (num < 1000) {
    return (
      a[Math.floor(num / 100)] +
      " hundred" +
      (num % 100 !== 0 ? " and " + numberToWords(num % 100) : "")
    );
  }

  if (num < 1000000) {
    return (
      numberToWords(Math.floor(num / 1000)) +
      " thousand" +
      (num % 1000 !== 0 ? " " + numberToWords(num % 1000) : "")
    );
  }

  if (num < 1000000000) {
    return (
      numberToWords(Math.floor(num / 1000000)) +
      " million" +
      (num % 1000000 !== 0 ? " " + numberToWords(num % 1000000) : "")
    );
  }

  return num.toString(); // Handle larger numbers as needed
}

export function convertNumberToWordsWithDecimal(num) {
  const [integerPart, decimalPart] = num.toString().split(".");

  let words = numberToWords(parseInt(integerPart));

  if (decimalPart) {
    const decimalNumber = parseInt(decimalPart);
    if (decimalNumber > 0) {
      words +=
        " and " +
        numberToWords(decimalNumber) +
        " paise";
    }
  }

  return words;
}



