// import { useState } from 'react';
// import { useAuthContext } from './useAuthContext';

// export const useChangePassword = () => {
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const { user } = useAuthContext(); // Get the current user and token from context

//   const changePassword = async (currentPassword, newPassword) => {
//     setIsLoading(true);
//     setError(null);
//     setSuccess(false);

//     try {
//       const response = await fetch('/api/user/change-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`, // Include the JWT token in headers
//         },
//         body: JSON.stringify({ currentPassword, newPassword }),
//       });

//       const json = await response.json();

//       if (!response.ok) {
//         throw new Error(json.error || 'Something went wrong');
//       }

//       setSuccess(true);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { changePassword, isLoading, error, success };
// };
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useAuthContext(); // Ensure user is available




  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem("token"); // Ensure this is the correct token key
    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Include token in the request
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Something went wrong");
      }

      setSuccess("Password changed successfully.");
      
    } catch (err) {
      setError(err.message);
   
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, error, success };
};
