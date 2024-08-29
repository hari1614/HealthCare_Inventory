// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useAuthContext } from './hooks/useAuthContext';

// // // // // const Stocks = () => {
// // // // //   const { user } = useAuthContext();

// // // // //   const [purchases, setPurchases] = useState([]);

// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const [error, setError] = useState(null);

// // // // //   useEffect(() => {
// // // // //     const fetchPurchases = async () => {
// // // // //       if (!user || !user.token) {
// // // // //         setError('User is not authenticated');
// // // // //         setLoading(false);
// // // // //         return;
// // // // //       }

// // // // //       try {
// // // // //         // Fetch data from the API
// // // // //         const response = await fetch('/api/purchase', {
// // // // //           method: 'GET',
// // // // //           headers: {
// // // // //             Authorization: `Bearer ${user.token}`,
// // // // //           },
// // // // //         });
// // // // //         if (!response.ok) {
// // // // //           throw new Error('Network response was not ok');
// // // // //         }
// // // // //         const data = await response.json();
// // // // //         setPurchases(data); // Set the fetched data to state
// // // // //       } catch (error) {
// // // // //         setError(error.message); // Set error message to state
// // // // //       } finally {
// // // // //         setLoading(false); // Set loading to false when fetch is done
// // // // //       }
// // // // //     };

// // // // //     fetchPurchases();
// // // // //   }, [user]); // Add user as a dependency to handle changes

// // // // //   if (loading) {
// // // // //     return <div>Loading...</div>; // Show loading text while fetching data
// // // // //   }

// // // // //   if (error) {
// // // // //     return <div>Error: {error}</div>; // Show error message if there's an error
// // // // //   }

// // // // //   return (
// // // // //     <div>
// // // // //       <h1>Purchase List</h1>
// // // // //       {purchases.length > 0 ? (
// // // // //         <ul>
// // // // //           {purchases.map((purchase) => (
// // // // //              <li key={purchase.id}>
// // // // //              <div><strong>Product Name:</strong> {purchase.productName}</div>
// // // // //              <div><strong>HSN Code:</strong> {purchase.hsnCode}</div>
// // // // //              <div><strong>Category:</strong> {purchase.category}</div>
// // // // //              <div><strong>Quantity:</strong> {purchase.quantity}</div>
// // // // //            </li> // Adjust according to your data structure
// // // // //           ))}
// // // // //         </ul>
// // // // //       ) : (
// // // // //         <p>No purchases found.</p>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Stocks;
// // // // import React, { useState, useEffect } from 'react';
// // // // import { useAuthContext } from './hooks/useAuthContext';

// // // // const Stocks = () => {
// // // //   const { user } = useAuthContext();

// // // //   const [purchases, setPurchases] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchPurchases = async () => {
// // // //       if (!user || !user.token) {
// // // //         setError('User is not authenticated');
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       try {
// // // //         const response = await fetch('/api/purchase', {
// // // //           method: 'GET',
// // // //           headers: {
// // // //             Authorization: `Bearer ${user.token}`,
// // // //           },
// // // //         });
// // // //         if (!response.ok) {
// // // //           throw new Error('Network response was not ok');
// // // //         }
// // // //         const data = await response.json();
// // // //         setPurchases(data);
// // // //       } catch (error) {
// // // //         setError(error.message);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchPurchases();
// // // //   }, [user]);

// // // //   if (loading) {
// // // //     return <div className="flex justify-center items-center h-screen bg-gray-100"><div className="text-xl text-gray-600">Loading...</div></div>;
// // // //   }

// // // //   if (error) {
// // // //     return <div className="flex justify-center items-center h-screen bg-gray-100"><div className="text-xl text-red-600">Error: {error}</div></div>;
// // // //   }

// // // //   return (
// // // //     <div className="container mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
// // // //       <h1 className="text-2xl font-bold mb-4 text-gray-800">Purchase List</h1>
// // // //       {purchases.length > 0 ? (
// // // //         <div className="overflow-x-auto">
// // // //           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
// // // //             <thead>
// // // //               <tr className="bg-gray-100 border-b">
// // // //                 <th className="py-3 px-4 text-left text-gray-600 font-semibold">Product Name</th>
// // // //                 <th className="py-3 px-4 text-left text-gray-600 font-semibold">HSN Code</th>
// // // //                 <th className="py-3 px-4 text-left text-gray-600 font-semibold">Category</th>
// // // //                 <th className="py-3 px-4 text-left text-gray-600 font-semibold">Quantity</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {purchases.map((purchase) => (
// // // //                 <tr key={purchase.id} className="border-b hover:bg-gray-50">
// // // //                   <td className="py-3 px-4 text-gray-800">{purchase.productName}</td>
// // // //                   <td className="py-3 px-4 text-gray-800">{purchase.hsnCode}</td>
// // // //                   <td className="py-3 px-4 text-gray-800">{purchase.category}</td>
// // // //                   <td className="py-3 px-4 text-gray-800">{purchase.quantity}</td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       ) : (
// // // //         <p className="text-center text-gray-600 mt-4">No purchases found.</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Stocks;
// // // import React, { useState, useEffect } from "react";
// // // import { useAuthContext } from "./hooks/useAuthContext";
// // // import "../css/Table.css"; // Import your CSS for the table styles
// // // import loadingGif from "../assets/loading.gif"

// // // const Stocks = () => {
// // //   const { user } = useAuthContext();
// // //   const [purchases, setPurchases] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchPurchases = async () => {
// // //       if (!user || !user.token) {
// // //         setError('User is not authenticated');
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       try {
// // //         const response = await fetch('/api/purchase', {
// // //           method: 'GET',
// // //           headers: {
// // //             Authorization: `Bearer ${user.token}`,
// // //           },
// // //         });
// // //         if (!response.ok) {
// // //           throw new Error('Network response was not ok');
// // //         }
// // //         const data = await response.json();
// // //         setPurchases(data);
// // //       } catch (error) {
// // //         setError(error.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchPurchases();
// // //   }, [user]);

// // //   if (loading) {
// // //     return (
// // //       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
// // //         <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
// // //           <img
// // //             src={loadingGif}
// // //             alt="Loading..."
// // //             className="w-6 h-6 mr-3 animate-spin"
// // //           />
// // //           <span className="text-gray-700 text-sm">Loading...</span>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
// // //         <div className="bg-white p-4 rounded-lg shadow-lg">
// // //           <span className="text-red-600 text-sm">Error: {error}</span>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="container mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
// // //       <h1 className="text-2xl font-bold mb-4 text-gray-800">Purchase List</h1>
// // //       {purchases.length > 0 ? (
// // //         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
// // //           <thead>
// // //             <tr className="bg-sea text-white border-b border-blue-400">
// // //               <th className="px-4 py-2 text-sm font-medium text-black-40">Product Name</th>
// // //               <th className="px-4 py-2 text-sm font-medium text-black-40">HSN Code</th>
// // //               <th className="px-4 py-2 text-sm font-medium text-black-40">Category</th>
// // //               <th className="px-4 py-2 text-sm font-medium text-black-40">Quantity</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {purchases.map((purchase) => (
// // //               <tr key={purchase.id} className="bg-sea text-white border-b border-blue-400">
// // //                 <td className="px-4 py-2 text-sm font-medium text-black-40">{purchase.productName}</td>
// // //                 <td className="px-4 py-2 text-sm font-medium text-black-40">{purchase.hsnCode}</td>
// // //                 <td className="px-4 py-2 text-sm font-medium text-black-40">{purchase.category}</td>
// // //                 <td className="px-4 py-2 text-sm font-medium text-black-40">{purchase.quantity}</td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       ) : (
// // //         <p className="text-center text-gray-600 mt-4">No purchases found.</p>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Stocks;
// // import React, { useState, useEffect } from "react";
// // import loadingGif from "../assets/loading.gif";
// // import { useAuthContext } from "./hooks/useAuthContext";
// // import  usePurchase  from "./hooks/usePurchase";

// // const Stocks = () => {
// //   const { user } = useAuthContext();
// //   const { purchases, loading, error } = usePurchase();
// //   if (loading) {
// //     return (
// //       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
// //         <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
// //           <img
// //             src={loadingGif}
// //             alt="Loading..."
// //             className="w-6 h-6 mr-3 animate-spin"
// //           />
// //           <span className="text-gray-700 text-sm">Loading...</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
// //         <div className="bg-white p-4 rounded-lg shadow-lg">
// //           <span className="text-red-600 text-sm">Error: {error}</span>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="overflow-x-auto container mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
// //       <h1 className="text-2xl font-bold mb-4 text-gray-700">Purchase Details</h1>
// //       <div className="relative max-h-[calc(70vh-7rem)] overflow-y-auto">
// //       {purchases.length > 0 ? (
// //         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md ">
// //           <thead className="sticky top-0">
// //             <tr className="bg-sea text-white border-b border-blue-400">
// //               <th className="px-4 py-2 text-left text-sm font-medium text-white">S.No</th>
// //               <th className="px-4 py-2 text-left text-sm font-medium text-white">Product Name</th>
// //               <th className="px-4 py-2 text-left text-sm font-medium text-white">HSN Code</th>
// //               <th className="px-4 py-2 text-left text-sm font-medium text-white">Category</th>
// //               <th className="px-4 py-2 text-left text-sm font-medium text-white">Quantity</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {purchases.map((purchase, index) => (
// //               <tr key={purchase.id} className="bg-white border-b border-gray-300 text-xs font-medium text-gray-600">
// //                 <td className="px-4 py-2">{index + 1}</td>
// //                 <td className="px-4 py-2">{purchase.productName}</td>
// //                 <td className="px-4 py-2">{purchase.hsnCode}</td>
// //                 <td className="px-4 py-2">{purchase.category}</td>
// //                 <td className="px-4 py-2">{purchase.quantity}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       ) : (
// //         <p className="text-center text-gray-600 mt-4">No purchases found.</p>
// //       )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Stocks;
// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPenSquare } from "@fortawesome/free-solid-svg-icons";
// import loadingGif from "../assets/loading.gif";
// import { useAuthContext } from "./hooks/useAuthContext";
// import usePurchase from "./hooks/usePurchase";

// const Stocks = () => {
//   const { user } = useAuthContext();
//   const { purchases, loading, error, deletePurchase, updatePurchase } = usePurchase();

//   const [editingPurchase, setEditingPurchase] = useState(null);
//   const [updatedProductName, setUpdatedProductName] = useState('');
//   const [updatedHsnCode, setUpdatedHsnCode] = useState('');
//   const [updatedCategory, setUpdatedCategory] = useState('');
//   const [updatedQuantity, setUpdatedQuantity] = useState('');

//   const handleEdit = (purchase) => {
//     setEditingPurchase(purchase);
//     setUpdatedProductName(purchase.productName);
//     setUpdatedHsnCode(purchase.hsnCode);
//     setUpdatedCategory(purchase.category);
//     setUpdatedQuantity(purchase.quantity);
//   };

//   const handleUpdate = () => {
//     if (editingPurchase) {
//       updatePurchase(editingPurchase._id, {
//         productName: updatedProductName,
//         hsnCode: updatedHsnCode,
//         category: updatedCategory,
//         quantity: updatedQuantity,
//       });
//       setEditingPurchase(null);
//     }
//   };

//   const handleDelete = (purchase) => {
//     console.log('Deleting purchase:', purchase); // Debug log
//     deletePurchase(purchase._id); // Use _id if that’s the MongoDB field
//   };

//   if (loading) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//         <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
//           <img
//             src={loadingGif}
//             alt="Loading..."
//             className="w-6 h-6 mr-3 animate-spin"
//           />
//           <span className="text-gray-700 text-sm">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//         <div className="bg-white p-4 rounded-lg shadow-lg">
//           <span className="text-red-600 text-sm">Error: {error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto container mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-lg font-semibold mb-4 text-gray-700">Purchase / Stock Details</h1>
//       <div className="relative max-h-[calc(70vh-7rem)] overflow-y-auto">
//         {purchases.length > 0 ? (
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//             <thead className="sticky top-0">
//               <tr className="bg-sea text-white border-b border-blue-400">
//                 <th className="px-4 py-2 text-left text-sm font-medium text-white" scope="col">S.No</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-white" scope="col">Product Name</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-white" scope="col">HSN Code</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-white" scope="col">Category</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-white" scope="col">Quantity</th>
//                 <th className="px-4 py-2 text-left text-sm font-medium text-white" scope="col">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {purchases.map((purchase, index) => (
//                 <tr key={purchase.id} className="bg-white border-b border-gray-300 text-xs font-medium text-gray-600">
//                   <td className="px-4 py-2">{index + 1}</td>
//                   <td className="px-4 py-2">{purchase.productName}</td>
//                   <td className="px-4 py-2">{purchase.hsnCode}</td>
//                   <td className="px-4 py-2">{purchase.category}</td>
//                   <td className="px-4 py-2">{purchase.quantity}</td>
//                   <td className="px-4 py-2">
//                     <button
//                       onClick={() => handleEdit(purchase)}
//                       className="hidden bg-sea hover:bg-hover1 text-white px-2 py-1 rounded mr-2"
//                     >
//                       Edit
//                       <span className="">
//                       <FontAwesomeIcon icon={faPenSquare} className="ml-1" />
//                       </span>
//                     </button>
//                     <button
//                       onClick={() => deletePurchase(purchase._id)}
//                       className="bg-gray-500 hover:bg-hover2 text-white px-2 py-1 rounded"
//                     >
//                       Delete
//                       <span className="">
//                       <FontAwesomeIcon icon={faTrash} className="ml-1" />
//                       </span>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center text-gray-600 mt-4">No purchases found.</p>
//         )}
//       </div>

//       {editingPurchase && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-4 text-gray-700">Edit Purchase</h2>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1" htmlFor="productName">Product Name</label>
//               <input
//                 type="text"
//                 id="productName"
//                 value={updatedProductName}
//                 onChange={(e) => setUpdatedProductName(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1" htmlFor="hsnCode">HSN Code</label>
//               <input
//                 type="text"
//                 id="hsnCode"
//                 value={updatedHsnCode}
//                 onChange={(e) => setUpdatedHsnCode(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1" htmlFor="category">Category</label>
//               <input
//                 type="text"
//                 id="category"
//                 value={updatedCategory}
//                 onChange={(e) => setUpdatedCategory(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-1" htmlFor="quantity">Quantity</label>
//               <input
//                 type="number"
//                 id="quantity"
//                 value={updatedQuantity}
//                 onChange={(e) => setUpdatedQuantity(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded"
//               />
//             </div>
//             <button
//               onClick={handleUpdate}
//               className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//             >
//               Update
//             </button>
//             <button
//               onClick={() => setEditingPurchase(null)}
//               className="bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Stocks;
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenSquare } from "@fortawesome/free-solid-svg-icons";
import loadingGif from "../assets/loading.gif";
import { useAuthContext } from "./hooks/useAuthContext";
import usePurchase from "./hooks/usePurchase";

const Stocks = () => {
  const { user } = useAuthContext();
  const { purchases, loading, error, deletePurchase, updatePurchase } =
    usePurchase();

  const [editingPurchase, setEditingPurchase] = useState(null);
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedHsnCode, setUpdatedHsnCode] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({
    productName: "",
    hsnCode: "",
    category: "",
  });

  const handleEdit = (purchase) => {
    setEditingPurchase(purchase);
    setUpdatedProductName(purchase.productName);
    setUpdatedHsnCode(purchase.hsnCode);
    setUpdatedCategory(purchase.category);
    setUpdatedQuantity(purchase.quantity);
  };

  const handleUpdate = () => {
    if (editingPurchase) {
      updatePurchase(editingPurchase._id, {
        productName: updatedProductName,
        hsnCode: updatedHsnCode,
        category: updatedCategory,
        quantity: updatedQuantity,
      });
      setEditingPurchase(null);
    }
  };

  const handleDelete = (purchase) => {
    deletePurchase(purchase._id);
  };

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredPurchases = purchases.filter((purchase) => {
    const productNameMatch = filters.productName
      ? purchase.productName
          .toLowerCase()
          .includes(filters.productName.toLowerCase())
      : true;
    const hsnCodeMatch = filters.hsnCode
      ? purchase.hsnCode.toString().includes(filters.hsnCode)
      : true;
    const categoryMatch = filters.category
      ? purchase.category.toLowerCase().includes(filters.category.toLowerCase())
      : true;

    return productNameMatch && hsnCodeMatch && categoryMatch;
  });

  const handleCategoryChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: e.target.value,
    }));
  };

  const totalPages = Math.ceil(filteredPurchases.length / pageSize);
  const paginatedPurchases = filteredPurchases.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
          <img
            src={loadingGif}
            alt="Loading..."
            className="w-6 h-6 mr-3 animate-spin"
          />
          <span className="text-gray-700 text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <span className="text-red-600 text-sm">Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto container mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
      <div className="text-gray-600 rounded-lg mb-6 mt-5 flex items-center">

        <div>
          <h1 className="text-lg font-bold leading-tight">
            Purchase / Stock Details
          </h1>
          <p className="mt-2 text-lg font-medium opacity-80">
            Manage and view your purchase and stock information with ease.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-4">
        <div className="flex items-center gap-2 ">
          <label
            className="block text-sm font-semibold text-gray-700 mb-1"
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={filters.productName}
            onChange={handleFilterChange}
            className="text-sm font-semibold w-[60%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 ">
          <label
            className="block text-sm font-semibold text-gray-700 mb-1"
            htmlFor="hsnCode"
          >
            HSN Code
          </label>
          <input
            type="text"
            id="hsnCode"
            value={filters.hsnCode}
            onChange={handleFilterChange}
            className="text-sm font-semibold w-[60%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 ">
          <label
            className="block text-sm font-semibold  text-gray-700 mb-1"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            value={filters.category}
            onChange={handleCategoryChange}
            className="text-sm font-semibold w-[46%] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="text-sm font-semibold " value="">
              Select a category
            </option>
            <option className="text-sm font-semibold " value="CAPSULES">
              CAPSULES
            </option>
            <option className="text-sm font-semibold " value="TABLETS">
              TABLETS
            </option>
            <option className="text-sm font-semibold" value="POWDERS">
              POWDERS
            </option>
            <option className="text-sm font-semibold " value="GRAMS">
              GRAMS
            </option>
            <option className="text-sm font-semibold " value="POUCHE">
              POUCHE
            </option>
            <option className="text-sm font-semibold " value="OTHERS">
              OTHERS
            </option>
          </select>
        </div>
      </div>

      {/* <div className="mb-4">
        <label className="block text-gray-700 mb-1" htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div> */}

      {/* Table */}
      <div className="relative max-h-[calc(70vh-7rem)] overflow-y-auto">
        {paginatedPurchases.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="sticky top-0">
              <tr className="bg-sea text-white border-b border-blue-400">
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-white"
                  scope="col"
                >
                  S.No
                </th>
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-white"
                  scope="col"
                >
                  Product Name
                </th>
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-white"
                  scope="col"
                >
                  HSN Code
                </th>
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-white"
                  scope="col"
                >
                  Category
                </th>
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-white"
                  scope="col"
                >
                  Quantity
                </th>
                <th
                  className="px-4 py-2 text-left text-sm font-medium text-white"
                  scope="col"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPurchases.map((purchase, index) => (
                <tr
                  key={purchase.id}
                  className="bg-white hover:bg-gray-300 border-b border-gray-300 text-xs font-medium text-gray-600"
                >
                  <td className="px-4 py-2">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-4 py-2">{purchase.productName}</td>
                  <td className="px-4 py-2">{purchase.hsnCode}</td>
                  <td className="px-4 py-2">{purchase.category}</td>
                  <td className="px-4 py-2">{purchase.quantity}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(purchase)}
                      className="hidden bg-sea hover:bg-hover1 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                      <FontAwesomeIcon icon={faPenSquare} className="ml-1" />
                    </button>
                    <button
                      onClick={() => handleDelete(purchase)}
                      className="bg-gray-500 hover:bg-hover2 text-white px-2 py-1 rounded"
                    >
                      Delete
                      <FontAwesomeIcon icon={faTrash} className="ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600 mt-4">No purchases found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-sea hover:bg-hover1 text-white text-xs font-semibold rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 text-sm font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-sea hover:bg-hover1 text-white text-xs font-semibold rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Purchase Modal */}
      {editingPurchase && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Edit Purchase
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-1"
                htmlFor="updateProductName"
              >
                Product Name
              </label>
              <input
                type="text"
                id="updateProductName"
                value={updatedProductName}
                onChange={(e) => setUpdatedProductName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-1"
                htmlFor="updateHsnCode"
              >
                HSN Code
              </label>
              <input
                type="text"
                id="updateHsnCode"
                value={updatedHsnCode}
                onChange={(e) => setUpdatedHsnCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-1"
                htmlFor="updateCategory"
              >
                Category
              </label>
              <input
                type="text"
                id="updateCategory"
                value={updatedCategory}
                onChange={(e) => setUpdatedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-1"
                htmlFor="updateQuantity"
              >
                Quantity
              </label>
              <input
                type="number"
                id="updateQuantity"
                value={updatedQuantity}
                onChange={(e) => setUpdatedQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => setEditingPurchase(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stocks;
