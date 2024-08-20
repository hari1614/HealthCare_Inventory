// import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import { useProductContext } from "../hooks/useProductContext";
import useFetchProducts from "../hooks/useFetchProducts";
const FetchData = () => {
  const { capsules, tablets, powders, dispatch } = useProductContext();
  const { handleDelete } = useFetchProducts(dispatch);

  const handleEdit = () => {
    // Implement edit functionality as needed
    console.log("Edit clicked");
    // You can trigger modal or form for edit mode
  };

  return (
    <div className="home">
      <div className="capsules">
        <h2 className="text-center mt-8 text-2xl">Capsules</h2>
        {capsules &&
          capsules.map((product) => (
            <ProductDetails
              key={product._id}
              product={product}
              onDelete={() => handleDelete(product._id, "capsules")}
              onEdit={handleEdit}
              endpoint={"/api/capsules"}
            />
          ))}
      </div>

      <div className="tablets">
        <h2 className="text-center mt-8 text-2xl">Tablets</h2>
        {tablets &&
          tablets.map((product) => (
            <ProductDetails
              key={product._id}
              product={product}
              onDelete={() => handleDelete(product._id, "tablets")}
              onEdit={handleEdit}
              endpoint={"/api/tablets"}
            />
          ))}
      </div>

      <div className="powders">
        <h2 className="text-center mt-8 text-2xl">Powders</h2>
        {powders &&
          powders.map((product) => (
            <ProductDetails
              key={product._id}
              product={product}
              onDelete={() => handleDelete(product._id, "powders")}
              onEdit={handleEdit}
              endpoint={"/api/powders"}
            />
          ))}
      </div>
    </div>
  );
};

export default FetchData;
