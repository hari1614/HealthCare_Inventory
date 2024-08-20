// export const useProductActions = (_id, dispatch, handleRemoveProduct) => {
//   const handleDelete = async () => {

//     try {
//       // Attempt to delete from the first endpoint
//       const capsuleResponse = await fetch(`/api/capsules/${_id}`, {
//         method: "DELETE",
//       });
//       const json = await capsuleResponse.json();
//       if (capsuleResponse.ok) {
//         dispatch({ type: "DELETE_PRODUCT", payload: json });
//         handleRemoveProduct(_id);
//         // If the first delete request is successful, no need to proceed with the others
//         // handleRemoveProduct(_id); // Assuming handleRemoveProduct removes from UI
//         console.log("Product successfully deleted from capsules");
//         return; // Exit the function early as the deletion is successful
//       }

//       // If the first delete request fails, proceed with the second endpoint
//       const tabletResponse = await fetch(`/api/tablets/${_id}`, {
//         method: "DELETE",
//       });
//       const jsonTab = await tabletResponse.json();
//       if (tabletResponse.ok) {
//         dispatch({ type: "DELETE_PRODUCT", payload: jsonTab });
//         handleRemoveProduct(_id);
//         // If the second delete request is successful, no need to proceed with the third
//         // handleRemoveProduct(_id); // Assuming handleRemoveProduct removes from UI
//         console.log("Product successfully deleted from tablets");
//         return; // Exit the function early as the deletion is successful
//       }

//       // If the second delete request also fails, proceed with the third endpoint
//       const powderResponse = await fetch(`/api/powders/${_id}`, {
//         method: "DELETE",
//       });
//       const jsonPow = await powderResponse.json();
//       if (powderResponse.ok) {
//         dispatch({ type: "DELETE_PRODUCT", payload: jsonPow });
//         handleRemoveProduct(_id);
//         // If the third delete request is successful
//         // handleRemoveProduct(_id); // Assuming handleRemoveProduct removes from UI
//         console.log("Product successfully deleted from powders");
//       } else {
//         // Handle the case where all delete requests failed
//         console.log("Failed to delete product from all endpoints");
//       }
//     } catch (error) {
//       // Handle any errors that occurred during the fetch operations
//       console.error("Error deleting product:", error);
//     }

//   };

//   return {
//     handleDelete,
//   };
// };

import { useAuthContext } from "./useAuthContext";
export const useProductActions = (_id, dispatch, handleRemoveProduct) => {
  const { user } = useAuthContext();
  const handleDelete = async () => {
    if (user) {
      try {
        // Attempt to delete from the first endpoint
        const capsuleResponse = await fetch(`/api/capsules/${_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await capsuleResponse.json();
        if (capsuleResponse.ok) {
          dispatch({ type: "DELETE_PRODUCT", payload: json });
          handleRemoveProduct(_id);
          console.log("Product successfully deleted from capsules");
          return "Product deleted successfully";
        }

        // If the first delete request fails, proceed with the second endpoint
        const tabletResponse = await fetch(`/api/tablets/${_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const jsonTab = await tabletResponse.json();
        if (tabletResponse.ok) {
          dispatch({ type: "DELETE_PRODUCT", payload: jsonTab });
          handleRemoveProduct(_id);
          console.log("Product successfully deleted from tablets");
          return "Product deleted successfully";
        }

        // If the second delete request also fails, proceed with the third endpoint
        const powderResponse = await fetch(`/api/powders/${_id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const jsonPow = await powderResponse.json();
        if (powderResponse.ok) {
          dispatch({ type: "DELETE_PRODUCT", payload: jsonPow });
          handleRemoveProduct(_id);
          console.log("Product successfully deleted from powders");
          return "Product deleted successfully";
        }

        // Handle the case where all delete requests failed
        console.log("Failed to delete product from all endpoints");
        return "Failed to delete product";
      } catch (error) {
        // Handle any errors that occurred during the fetch operations
        console.error("Error deleting product:", error);
        return "Failed to delete product";
      }
    }
  };

  return {
    handleDelete,
  };
};
