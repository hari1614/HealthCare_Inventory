// hooks/useSaveProduct.js
import { useState } from "react";
import { useProductContext } from "../hooks/useProductContext";
import { useAuthContext } from "./useAuthContext";

export const useSaveProduct = (_id, handleRemoveProduct, setIsEditing) => {
  const { dispatch } = useProductContext();
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuthContext();

  const handleSave = async (editedData) => {
    setIsSaving(true);
    if (user) {
      try {
        // Attempt to update the first endpoint
        const capsuleResponse = await fetch(`/api/capsules/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(editedData),
        });

        if (capsuleResponse.ok) {
          const updatedProduct = await capsuleResponse.json();
          dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
          console.log("Product successfully updated in capsules");
          setIsEditing(false);
          setIsSaving(false);
          return;
        }

        // If the first update request fails, proceed with the second endpoint
        const tabletResponse = await fetch(`/api/tablets/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(editedData),
        });

        if (tabletResponse.ok) {
          const updatedProduct = await tabletResponse.json();
          dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
          console.log("Product successfully updated in tablets");
          setIsEditing(false);
          setIsSaving(false);
          return;
        }

        // If the second update request also fails, proceed with the third endpoint
        const powderResponse = await fetch(`/api/powders/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(editedData),
        });

        if (powderResponse.ok) {
          const updatedProduct = await powderResponse.json();
          dispatch({ type: "UPDATE_PRODUCT", payload: updatedProduct });
          console.log("Product successfully updated in powders");
          setIsEditing(false);
          setIsSaving(false);
          return;
        }

        // If all update requests failed
        console.log("Failed to update product in all endpoints");
      } catch (error) {
        console.error("Error updating product:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return { handleSave, isSaving };
};
