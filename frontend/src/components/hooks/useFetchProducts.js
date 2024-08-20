// import { useEffect } from "react";
// import { useAuthContext } from "./useAuthContext";
// const useFetchProducts = (dispatch) => {
//   const {user} = useAuthContext()
//   const fetchProducts = async () => {
    
//     try {
//       const [capsulesResponse, tabletsResponse, powdersResponse] =
//         await Promise.all([
//           fetch("/api/capsules"),
//           fetch("/api/tablets"),
//           fetch("/api/powders"), {
//             headers: {
//               'Authorization': `Bearer ${user.token}`
//             }
//           }
//         ]);

//       if (capsulesResponse.ok) {
//         const capsulesJson = await capsulesResponse.json();
//         dispatch({ type: "SET_CAPSULE", payload: capsulesJson });
//       } else {
//         throw new Error("Failed to fetch capsules");
//       }

//       if (tabletsResponse.ok) {
//         const tabletsJson = await tabletsResponse.json();
//         dispatch({ type: "SET_TABLET", payload: tabletsJson });
//       } else {
//         throw new Error("Failed to fetch tablets");
//       }

//       if (powdersResponse.ok) {
//         const powdersJson = await powdersResponse.json();
//         dispatch({ type: "SET_POWDER", payload: powdersJson });
//       } else {
//         throw new Error("Failed to fetch powders");
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     if(user) {
//       fetchProducts();
//     }
  
//   }, [dispatch, user]);

//   const handleDelete = async (productId, productType) => {
//     if(!user) {
//       return
//     }
//     try {
//       const response = await fetch(`/api/${productType}/${productId}`, {
//         method: "DELETE",
//         headers: {
//           'Authorization' : `Bearer ${user.token}`
//         }
//       });

//       if (response.ok) {
//         console.log(`Deleted ${productType} successfully`);
//         // Optionally refetch products to update state after deletion
//         await fetchProducts();
//       } else {
//         throw new Error(`Failed to delete ${productType}`);
//       }
//     } catch (error) {
//       console.error(`Error deleting ${productType}:`, error);
//     }
//   };

//   return {
//     handleDelete,
//     fetchProducts,
//   };
// };

// export default useFetchProducts;
import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const useFetchProducts = (dispatch) => {
  const { user } = useAuthContext();

  const fetchProducts = async () => {
    if (!user) return;

    try {
      const [capsulesResponse, tabletsResponse, powdersResponse] = await Promise.all([
        fetch("/api/capsules", {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        }),
        fetch("/api/tablets", {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        }),
        fetch("/api/powders", {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        }),
      ]);

      if (capsulesResponse.ok) {
        const capsulesJson = await capsulesResponse.json();
        dispatch({ type: "SET_CAPSULE", payload: capsulesJson });
      } else {
        throw new Error("Failed to fetch capsules");
      }

      if (tabletsResponse.ok) {
        const tabletsJson = await tabletsResponse.json();
        dispatch({ type: "SET_TABLET", payload: tabletsJson });
      } else {
        throw new Error("Failed to fetch tablets");
      }

      if (powdersResponse.ok) {
        const powdersJson = await powdersResponse.json();
        dispatch({ type: "SET_POWDER", payload: powdersJson });
      } else {
        throw new Error("Failed to fetch powders");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [dispatch, user]);

  const handleDelete = async (productId, productType) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/${productType}/${productId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        console.log(`Deleted ${productType} successfully`);
        // Optionally refetch products to update state after deletion
        await fetchProducts();
      } else {
        throw new Error(`Failed to delete ${productType}`);
      }
    } catch (error) {
      console.error(`Error deleting ${productType}:`, error);
    }
  };

  return {
    handleDelete,
    fetchProducts,
  };
};

export default useFetchProducts;
