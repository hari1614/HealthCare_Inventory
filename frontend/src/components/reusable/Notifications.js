import React from "react";
import { useProductContext } from "../hooks/useProductContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { products, dispatch } = useProductContext();
  const { user } = useAuthContext();

  // useFetch(user, "All Products",  dispatch);

  // Filter products where stock is less than or equal to 10
  const generalLowStockProducts =
    products?.filter((product) => product.stock <= 10) || [];

  // Filter products where stock is low and the unit includes "kg"
  const kgLowStockProducts =
    products?.filter(
      (product) =>
        typeof product.stock === "string" &&
        product.stock.toLowerCase().includes("kg") &&
        parseFloat(product.stock) <= 5
    ) || [];

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Stock Alerts
      </h2>

      {/* Render General Low Stock Alerts */}
      {generalLowStockProducts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Capsules & Tablets - Low Stock Items
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {generalLowStockProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[rgba(0,255,0,0.05)] border-l-4 border-sea p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <h4 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h4>
                <p className="text-sm font-medium text-gray-600">
                  Quantity: {product.unitAndKg}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  Stock: {product.stock}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  ID: {product.productNum}
                </p>
                <Link
                  to={`/${product._id}`}
                  className="text-sea font-semibold hover:underline mt-2 inline-block"
                >
                  View More
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render Kg Low Stock Alerts */}
      {kgLowStockProducts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Powders - Low Stock Items
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {kgLowStockProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[rgba(0,255,0,0.05)]  border-l-4 border-sea p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <h4 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h4>
                <p className="text-sm font-medium text-gray-600">
                  Stock: {product.stock}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  ID: {product.productNum}
                </p>
                <Link
                  to={`/${product._id}`}
                  className="text-sea font-semibold hover:underline mt-2 inline-block"
                >
                  View More
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message when no low stock products */}
      {generalLowStockProducts.length === 0 &&
        kgLowStockProducts.length === 0 && (
          <p className="text-center text-gray-600 text-lg">
            All products have sufficient stock.
          </p>
        )}
    </div>
  );
};

export default Notifications;
