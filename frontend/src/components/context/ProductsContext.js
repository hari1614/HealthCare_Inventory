import React, { createContext, useReducer } from "react";

// Create the context
export const ProductsContext = createContext();

// Define the initial state
const initialState = {
  capsules: [],
  products: [],
  tablets: [],
  powders: [],
  selectedQuantity: "1", // Add this line
  selectedQuantityPrice: 0, // Add this line
};

// Define the reducer
export const productReducer = (state, action) => {
  switch (action.type) {
    //capsules
    case "SET_CAPSULE":
      return {
        ...state,
        capsules: action.payload || [],
      };
    case "CREATE_CAPSULE":
      return {
        ...state,
        capsules: [action.payload, ...state.capsules],
      };

    //tablets
    case "SET_TABLET":
      return {
        ...state,
        tablets: action.payload || [],
      };
    case "CREATE_TABLET":
      return {
        ...state,
        tablets: [action.payload, ...state.tablets],
      };

    //powder
    case "SET_POWDER":
      return {
        ...state,
        powders: action.payload || [],
      };
    case "CREATE_POWDER":
      return {
        ...state,
        powders: [action.payload, ...state.powders],
      };

    //all product
    case "SET_PRODUCT":
      return {
        ...state,
        products: action.payload || [],
      };
    case "CREATE_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p._id !== action.payload._id),
        capsules: state.capsules.filter((c) => c._id !== action.payload._id),
      };
    case "UPDATE_PRODUCT":
      console.log("Reducer received update action:", action.payload);
      console.log("State before update:", state);
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
        capsules: state.capsules.map((capsule) =>
          capsule._id === action.payload._id ? action.payload : capsule
        ),
        tablets: state.tablets.map((tablet) =>
          tablet._id === action.payload._id ? action.payload : tablet
        ),
        powders: state.powders.map((powder) =>
          powder._id === action.payload._id ? action.payload : powder
        ),
      };

    // New cases for quantity and price
    case "SET_SELECTED_QUANTITY":
      return {
        ...state,
        selectedQuantity: action.payload,
      };
    case "SET_SELECTED_QUANTITY_PRICE":
      return {
        ...state,
        selectedQuantityPrice: action.payload,
      };

    default:
      return state;
  }
};

// Create the context provider component
export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
