// // // src/hooks/useAddProduct.js
// // import { useAuthContext } from "./useAuthContext";
// // import { useState } from "react";
// // import axios from "axios";

// // const usePurchase = () => {
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(null);
// //   const [productData, setProductData] = useState(null); // Define productData state here
// //   const [allProducts, setAllProducts] = useState([])
// //   const { user } = useAuthContext();

// //   const addProduct = async (formData, onSuccessCallback) => {
// //     setLoading(true);
// //     setError(null);
// //     setSuccess(null);

// //     try {
// //       // Replace 'your-backend-endpoint' with your actual backend endpoint
// //       const response = await axios.post(
// //         "http://localhost:4000/api/purchase",
// //         formData,
// //         {
// //           method: "POST",
// //           headers: {
// //             Authorization: `Bearer ${user.token}`,
// //           },
// //         }
// //       );
// //       setSuccess("Product added successfully");
// //       onSuccessCallback(); // Call the callback function on success
// //     } catch (err) {
// //       setError("Error adding product. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Function to fetch all products
// //   const getProduct = async () => {
// //     setLoading(true);
// //     setError(null);
// //     setSuccess(null);

// //     try {
// //       const response = await axios.get("http://localhost:4000/api/purchase", {
// //         headers: {
// //           Authorization: `Bearer ${user.token}`,
// //         },
// //       });
// //       setAllProducts(response.data); // Store the fetched products
// //       setSuccess("Products fetched successfully");
// //     } catch (err) {
// //       // Provide more detailed error messages
// //       setError(
// //         err.response?.data?.message ||
// //           "Error fetching products. Please try again."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return { addProduct, allProducts, getProduct, productData, loading, error, success };
// // };

// // export default usePurchase;
// // src/hooks/usePurchase.js
// // import { useState, useEffect } from "react";
// // import { useAuthContext } from "./useAuthContext";

// // const usePurchase = () => {
// //   const { user } = useAuthContext();
// //   const [purchases, setPurchases] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchPurchases = async () => {
// //       if (!user || !user.token) {
// //         setError('User is not authenticated');
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const response = await fetch('/api/purchase', {
// //           method: 'GET',
// //           headers: {
// //             Authorization: `Bearer ${user.token}`,
// //           },
// //         });
// //         if (!response.ok) {
// //           throw new Error('Network response was not ok');
// //         }
// //         const data = await response.json();
// //         setPurchases(data);
// //       } catch (error) {
// //         setError(error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPurchases();
// //   }, [user]);

// //   return { purchases, loading, error };
// // };

// // export default usePurchase;
// import { useState, useEffect } from "react";
// import { useAuthContext } from "./useAuthContext";

// const usePurchase = () => {
//   const { user } = useAuthContext();
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPurchases = async () => {
//       if (!user || !user.token) {
//         setError("User is not authenticated");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch("/api/purchase", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setPurchases(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPurchases();
//   }, [user]);
//   const deletePurchase = async (id) => {
//     console.log('Attempting to delete purchase with ID:', id); // Debug log
//     try {
//       const response = await fetch(`/api/purchase/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           'Content-Type': 'application/json',
//         },
//       });
  
//       console.log('Delete response:', response); // Debug log
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to delete purchase: ${response.status} ${response.statusText} - ${errorText}`);
//       }
  
//       // Update state after successful deletion
//       setPurchases(purchases.filter(purchase => purchase._id !== id));
//     } catch (error) {
//       console.error('Error in deletePurchase:', error.message);
//       setError(error.message);
//     }
//   };
  

//   const updatePurchase = async (id, updatedData) => {
//     console.log('Updating purchase with ID:', id); // Debug log
//     console.log('Updated data:', updatedData); // Debug log
//     try {
//       const response = await fetch(`/api/purchase/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: JSON.stringify(updatedData),
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Failed to update purchase: ${response.status} ${response.statusText} - ${errorText}`);
//       }
  
//       const updatedPurchase = await response.json();
//       setPurchases(
//         purchases.map((purchase) =>
//           purchase._id === id ? updatedPurchase : purchase
//         )
//       );
//     } catch (error) {
//       console.error('Error in updatePurchase:', error.message);
//       setError(error.message);
//     }
//   };
  

//   return { purchases, loading, error, deletePurchase, updatePurchase };
// };

// export default usePurchase;
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const usePurchase = () => {
  const { user } = useAuthContext();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user || !user.token) {
        setError("User is not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/purchase", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPurchases(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  const addPurchase = async (formData, onSuccessCallback) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add purchase: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const newPurchase = await response.json();
      setPurchases((prevPurchases) => [...prevPurchases, newPurchase]);
      onSuccessCallback(); // Call the callback function on success
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePurchase = async (id) => {
    console.log("Attempting to delete purchase with ID:", id); // Debug log
    try {
      const response = await fetch(`/api/purchase/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Delete response:", response); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete purchase: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      setPurchases((prevPurchases) =>
        prevPurchases.filter((purchase) => purchase._id !== id)
      );
    } catch (error) {
      console.error("Error in deletePurchase:", error.message);
      setError(error.message);
    }
  };

  const updatePurchase = async (id, updatedData) => {
    console.log("Updating purchase with ID:", id); // Debug log
    console.log("Updated data:", updatedData); // Debug log
    try {
      const response = await fetch(`/api/purchase/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to update purchase: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const updatedPurchase = await response.json();
      setPurchases((prevPurchases) =>
        prevPurchases.map((purchase) =>
          purchase._id === id ? updatedPurchase : purchase
        )
      );
    } catch (error) {
      console.error("Error in updatePurchase:", error.message);
      setError(error.message);
    }
  };

  return { purchases, loading, error, addPurchase, deletePurchase, updatePurchase };
};

export default usePurchase;
