import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ProductDetails = ({ product, onDelete, onEdit, endpoint }) => {
  const [editing, setEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [feedback, setFeedback] = useState("");

  const handleEdit = () => {
    setEditing(true);
    setFeedback(""); // Clear feedback when starting to edit
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${endpoint}/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        setEditing(false);
        setFeedback("Product updated successfully.");
        onEdit();
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      setFeedback("Error updating product.");
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="relative p-6 mt-6 bg-gradient-to-r from-white to-gray-100 border border-gray-300 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl max-w-sm mx-auto">
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          className="flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors p-2 rounded-full bg-gray-200 hover:bg-red-100 transform hover:scale-105"
          onClick={onDelete}
        >
          <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
          <span className="ml-1 text-xs font-medium">Delete</span>
        </button>
        <button
          className="flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-full bg-gray-200 hover:bg-blue-100 transform hover:scale-105"
          onClick={handleEdit}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />
          <span className="ml-1 text-xs font-medium">Edit</span>
        </button>
      </div>
      <h4 className="text-xl font-semibold mb-4 text-gray-800">Product Details</h4>
      {feedback && (
        <div className={`mb-4 p-2 rounded-md text-sm ${feedback.includes("Error") ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"} border ${feedback.includes("Error") ? "border-red-300" : "border-green-300"} transition-opacity duration-300`}>
          {feedback}
        </div>
      )}
      {editing ? (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {[
            { label: "Product name", name: "name", type: "text" },
            { label: "Product No", name: "productNum", type: "number" },
            { label: "Unit and Kg", name: "unitAndKg", type: "number" },
            { label: "MRP", name: "mrp", type: "number" },
            { label: "Price", name: "price", type: "number" },
            { label: "Tax percentage", name: "taxPercentage", type: "number" },
            { label: "Expiry date", name: "expiryDate", type: "date" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">{label}:</label>
              <input
                type={type}
                name={name}
                value={editedProduct[name]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
          ))}
          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm transform hover:scale-105"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-300 text-sm transform hover:scale-105"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {[
            { label: "Product name", value: product.name },
            { label: "Product No", value: product.productNum },
            { label: "Unit and Kg", value: product.unitAndKg },
            { label: "MRP", value: product.mrp },
            { label: "Price", value: product.price },
            { label: "Tax percentage", value: product.taxPercentage },
            { label: "Expiry date", value: product.date },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between text-sm text-gray-800">
              <span className="font-medium">{label}:</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

// const ProductDetails = ({ product, onDelete, onEdit, endpoint }) => {
//   const [editing, setEditing] = useState(false);
//   const [editedProduct, setEditedProduct] = useState({ ...product });

//   const handleEdit = () => {
//     setEditing(true);
//     // Optionally, you can initialize editedProduct state with current product details
//     setEditedProduct({ ...product });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedProduct((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       // Make API call to update product
//       const response = await fetch(`${endpoint}/${product._id}`, {
//         method: "PATCH", // or 'PATCH' depending on your API endpoint
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editedProduct),
//       });

//       if (response.ok) {
//         // Handle success (e.g., close modal, update UI)
//         setEditing(false);
//         onEdit(); // Notify parent component to refetch data or update state
//         console.log("Product updated successfully");
//       } else {
//         throw new Error("Failed to update product");
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   return (
//     <div className="relative p-4 mt-8 bg-white border border-gray-200 rounded-lg shadow-md">
//       <div className="absolute top-0 right-0 mt-2 mr-2 flex items-center space-x-2">
//         <button
//           className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
//           onClick={onDelete}
//         >
//           <FontAwesomeIcon icon={faTrash} />

//           <span>Delete</span>
//         </button>
//         <button
//           className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
//           onClick={handleEdit}
//         >
//           <FontAwesomeIcon icon={faPenToSquare} />

//           <span>Edit</span>
//         </button>
//       </div>
//       <h4 className="text-xl font-bold mb-4">Product Details</h4>
//       {editing ? (
//         <form
//           className="space-y-4"
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSave();
//           }}
//         >
//           <label className="block">
//             Product name:
//             <input
//               type="text"
//               name="name"
//               value={editedProduct.name}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//             />
//           </label>

//           <label className="block">
//             Product No:
//             <input
//               type="number"
//               name="productNum"
//               value={editedProduct.productNum}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//             />
//           </label>
//           <label className="block">
//             Unit and Kg:
//             <input
//               type="number"
//               name="unitAndKg"
//               value={editedProduct.unitAndKg}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//             />
//           </label>
//           <label className="block">
//             MRP:
//             <input
//               type="number"
//               name="mrp"
//               value={editedProduct.mrp}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//             />
//           </label>
//           <label className="block">
//             Price:
//             <input
//               type="number"
//               name="price"
//               value={editedProduct.price}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//             />
//           </label>
//           <label className="block">
//             Tax percentage:
//             <input
//               type="number"
//               name="taxPercentage"
//               value={editedProduct.taxPercentage}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//             />
//           </label>
//           <label className="block">
//             Expiry date:
//             <input
//               type="date"
//               name="expiryDate"
//               value={editedProduct.date}
//               onChange={handleChange}
//               className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//             />
//           </label>

//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//           >
//             Save
//           </button>
//           <button
//             type="button"
//             className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
//             onClick={() => setEditing(false)}
//           >
//             Cancel
//           </button>
//         </form>
//       ) : (
//         <>
//           <p className="text-sm">
//             Product name: <strong>{product.name}</strong>
//           </p>
//           {/* Display other product details */}

//           <p className="text-sm">
//             Product / No:{" "}
//             <strong className="normal-case">{product.productNum}</strong>
//           </p>
//           <p className="text-sm">
//             Unit and Kg:{" "}
//             <strong className="normal-case">{product.unitAndKg}</strong>
//           </p>
      
//           <p className="text-sm">
//             Mrp: <strong>{product.mrp}</strong>
//           </p>
//           <p className="text-sm">
//             Price: <strong>{product.price}</strong>
//           </p>
//           <p className="text-sm">
//             Tax percentage: <strong>{product.taxPercentage}</strong>
//           </p>
//           <p className="text-sm">
//             Expiry date: <strong>{product.date}</strong>
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

// AnotherComponent.js

// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
// import useProductEditor from '../hooks/useProductEditor'; // Adjust the path as necessary
// import { faTrash } from '@fortawesome/free-solid-svg-icons';

// const ProductDetails = ({ product, onEdit, endpoint }) => {
//   const { editing, editedProduct, handleEdit, handleChange, handleSave, setEditing } = useProductEditor(product, onEdit, endpoint);
//   const handleCancel = () => {
//     setEditing(false); // Ensure setEditing is used to exit editing mode
//   };
//   return (
//     <div>
//       {editing ? (
//         <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>

//           {/* Add other input fields as needed */}
//           <button type="submit">Save</button>
//           <button type="button" onClick={handleCancel}>Cancel</button>
//         </form>
//       ) : (
//         <div>
//           {/* <p>{product.name}</p> */}
//   <tr className="bg-sea border-b border-blue-400">
//       {/* <td className="px-6 py-4 font-medium text-black-40 whitespace-wrap dark:text-blue-100 sm:px-8 md:py-6 lg:py-4">
//         {itemName} <br/>
//             <button onClick={handleInputChange} className='bg-gray-400 px-3'>Add Stocks</button>
//       </td> */}
//       <td className="px-6 text-transform: capitalize py-4 font-medium text-black-40 whitespace-wrap dark:text-blue-100 sm:px-8 md:py-6 lg:py-4">
//                {product.name}
//                                                   <br/>
//                <button className='bg-gray-400 px-3'>Add Stocks</button>
//        </td>
//        <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         <input
//           type="number"
//           name="batchLabel"
//           value={product.batchLabel}
//           className="w-12 text-black"
//           // onChange={handleInputChange}
//         />
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         <input
//           type="number"
//           name="initialValue"
//           value={product.initialValue}
//           className="w-12 text-black"
//           // onChange={handleInputChange}
//         />
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         {product.dispensedValue} {/* Display dispensed value */}
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         {product.returned} {/* Display returned value */}
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         <input
//           type="number"
//           name="returnedtoDistributor"
//           value={product.returnedtoDistributor}
//           className="w-12 text-black"
//           // onChange={handleInputChange}
//         />
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         {product.name} {/* Display damaged/missing value */}
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         {product.remaining} {/* Display remaining value */}
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//          <select className="text-black">
//          <option value="">Unit</option>
//          {/* Generating options from 1 to 100 */}
//          {[...Array(100).keys()].map((index) => (
//          <option key={index + 1} value={index + 1}>
//          {index + 1}
//          </option>
//     ))}
//   </select>
// </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         <input
//           type="number"
//           name="mrp"
//           value={product.mrp}
//           className="w-12 text-black"
//           // onChange={handleInputChange}
//         />
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         <input
//           type="number"
//           name="price"
//           value={product.price}
//           className="w-12 text-black"
//           // onChange={handleInputChange}
//         />
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         <input
//           type="number"
//           name="taxPercentage"
//           value={product.taxPercentage}
//           className="w-12 text-black"
//           // onChange={handleInputChange}
//         />
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         <input
//           type="text"
//           name="purchaseDate"
//           value={product.purchaseDate}
//           className="text-black"
//           // onChange={handleInputChange}
//         />
//       </td>
//       <td className="px-6 py-4 sm:px-8 md:py-6 lg:py-4">
//         <input
//           type="TEXT"
//           name="expiryDate"
//           value={product.expiryDate}
//           className="text-black"
//           // onChange={handleInputChange}
//         />
//       </td>
//       <td className="px-6 py-2 sm:px-4 md:py-6 lg:py-4">
//       <button className='bg-gray-400 px-2 rounded hover:text-red-500' >
//       <FontAwesomeIcon className='w-2.5 h-2  mb-0.5 mr-1' icon={faTrash} />
//           <span className='text-xs'>Delete</span>
//       </button>
//       <button className='bg-gray-400 px-4 mt-2 rounded hover:text-blue-500'>
//       <FontAwesomeIcon className='w-2 h-2 mb-0.5 mr-1' icon={faPenToSquare} />
//           <span className='text-xs'>Edit</span>
//       </button>
//       </td>
//    </tr>

//           {/* Display other product details */}
//           <button onClick={handleEdit}>
//             <FontAwesomeIcon icon={faPenToSquare} />
//             <span>Edit</span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;
