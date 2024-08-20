import { ProductsContext } from "../context/ProductsContext";
import { useContext } from "react";

export const useProductContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw Error(
      "useProductsContext must be used inside an producsContextProvider"
    );
  }
  return context;
};
