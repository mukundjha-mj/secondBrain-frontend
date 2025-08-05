import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function useDeleteContent() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteContent = async (contentId: string) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("authorization") || localStorage.getItem("token");
            if (!token) {
                throw new Error("Authentication token not found. Please login again.");
            }

            console.log("Deleting content with ID:", contentId);
            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                data: { contentId },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token  // Capital A like other API calls
                }
            });
            
            console.log("Delete successful");
            return true; // Return success indicator
        } catch (err: any) {
            console.error("Delete error:", err.response?.data || err.message);
            setError(err.response?.data?.message || err.message || "Delete failed!");
            throw err; // Re-throw so calling code can handle
        } finally {
            setLoading(false);
        }
    };

    return { deleteContent, loading, error };
}
