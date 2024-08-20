// // src/hooks/useFetchProducts.js

// import { useEffect } from "react";
// import { getUnitAndKgOptionsTwo } from "../utils/utils"
// const useFetch = (user, selectedType, selectedQuantity, dispatch) => {
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         let endpoints = [];
//         let headers = { Authorization: `Bearer ${user.token}` };

//         if (selectedType === "All Products") {
//           endpoints = ["/api/capsules", "/api/tablets", "/api/powders"];
//         } else if (selectedType) {
//           endpoints = [`/api/${selectedType.toLowerCase()}`];
//         }

//         const responses = await Promise.all(
//           endpoints.map((endpoint) => fetch(endpoint, { headers }))
//         );

//         for (const response of responses) {
//           if (!response.ok) {
//             throw new Error(
//               `Failed to fetch ${response.url}: ${response.statusText}`
//             );
//           }
//         }

//         const jsonResponses = await Promise.all(
//           responses.map((response) => response.json())
//         );

//         const allProducts = jsonResponses.flat();

//             // Filter products by quantity
//         if (selectedQuantity !== "All Products") {
//           allProducts = allProducts.filter(
//             (product) =>
//               product.unitAndKg === selectedQuantity
//           );
//         }

//         dispatch({ type: "SET_PRODUCT", payload: allProducts });
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     if (user) {
//       fetchProducts();
//     }
//   }, [selectedType, selectedQuantity, dispatch, user]);
// };

// export default useFetch;
import { useEffect } from "react";

const useFetch = (user, selectedType, selectedQuantity, dispatch) => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let endpoints = [];
        let headers = { Authorization: `Bearer ${user.token}` };

        if (selectedType === "All Products") {
          endpoints = ["/api/capsules", "/api/tablets", "/api/powders"];
        } else if (selectedType) {
          endpoints = [`/api/${selectedType.toLowerCase()}`];
        }

        const responses = await Promise.all(
          endpoints.map((endpoint) => fetch(endpoint, { headers }))
        );

        for (const response of responses) {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch ${response.url}: ${response.statusText}`
            );
          }
        }

        let allProducts = (await Promise.all(
          responses.map((response) => response.json())
        )).flat();

        // Filter products by quantity
        if (selectedQuantity !== "All Products") {
          allProducts = allProducts.filter(
            (product) => product.unitAndKg === selectedQuantity
          );
        }

        dispatch({ type: "SET_PRODUCT", payload: allProducts });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (user) {
      fetchProducts();
    }
  }, [selectedType, selectedQuantity, dispatch, user]);
};

export default useFetch;
