import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Content {
    _id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube";
    tags: string[];
}

export const useContent = () =>{
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);

    
        const fetchContent = useCallback(async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token") || localStorage.getItem("authorization");
                
                if (!token) {
                    console.log("No auth token found");
                    setContents([]);
                    setLoading(false);
                    return;
                }

                console.log("Fetching content from backend...");
                const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                });
                
                setContents(response.data.content || []);
                
            } catch (error) {
                console.error("Failed to load content:", error);
                
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 403) {
                        console.log("Authentication failed, clearing token");
                        localStorage.removeItem("token");
                        localStorage.removeItem("authorization");
                    }
                    console.error("API Error:", error.response?.data);
                }
                
                // Show empty array if API fails
                setContents([]);
            } finally {
                setLoading(false);
            }
        
        }, [])
    useEffect(()=>{
        fetchContent();
    }, [fetchContent])

    return { contents, loading, refetch: fetchContent };
}