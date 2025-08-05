import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Profile {
    firstName: string;
}

export const useProfile = () =>{
    const [profile, setProfile] = useState <Profile | null> ();
    const fetchProfile = useCallback(async () =>{
            try{
                const token = localStorage.getItem('token') || localStorage.getItem('authorization');
                if(!token){
                    setProfile(null);
                    return;
                }
                const response = await axios.get(`${BACKEND_URL}/api/v1/profile`,{
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                });
                setProfile(response.data.profile || []);
            } catch(error){
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 403) {
                        console.log("Authentication failed, clearing token");
                        localStorage.removeItem("token");
                        localStorage.removeItem("authorization");
                    }
                    console.error("API Error:", error.response?.data);
                }
                
                // Show empty array if API fails
                setProfile(null);
            }
    }, [])

    useEffect(()=>{
        fetchProfile();
    }, [fetchProfile])
    return{profile}
}