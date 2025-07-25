import { useRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";


// controlled component
export const CreateContentModal = ({ open, onClose }: {
    open: boolean,
    onClose: () => void
}) => {
    const linkRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);
    async function contentCreation() {
        const link = linkRef.current?.value;
        const type = typeRef.current?.value;
        const title = titleRef.current?.value;
        const tagsInput = tagsRef.current?.value;
        
        // Validation
        if (!title || !link || !type) {
            alert("Please fill in all required fields (title, link, type)");
            return;
        }
        
        // Convert comma-separated string to array
        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [];

        // Get auth token from localStorage (you'll need to implement login first)
        const token = localStorage.getItem('authorization');
        if (!token) {
            alert("Please login first to add content");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                type,
                title,
                tags
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token  // Add the auth token
                }
            });
            
            alert("Content added successfully!");
            
            // Clear form
            if (linkRef.current) linkRef.current.value = '';
            if (typeRef.current) typeRef.current.value = '';
            if (titleRef.current) titleRef.current.value = '';
            if (tagsRef.current) tagsRef.current.value = '';
            
            onClose();
        } catch (error) {
            console.error('Error:', error);
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 403) {
                    alert("Authentication failed. Please login again.");
                    localStorage.removeItem('token'); // Clear invalid token
                } else if (error.response?.status === 411) {
                    alert("Invalid content data. Please check your inputs.");
                } else {
                    alert(`Error: ${error.response?.data?.message || error.message}`);
                }
            } else {
                alert('An unexpected error occurred');
            }
        }
    }
    return (
        <>
            {open && <div className="w-screen h-screen bg-slate-200/60 fixed top-0 left-0  flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded">
                        <div className="flex justify-end cursor-pointer">
                            <div onClick={onClose}>
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input reference={linkRef} placeholder={"Link"} />
                            <Input reference={typeRef} placeholder={"type"} />
                            <Input reference={titleRef} placeholder={"Title"} />
                            <Input reference={tagsRef} placeholder={"Tags (comma-separated)"} />
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={contentCreation} variant="primary" text="Submit" />
                        </div>
                    </span>
                </div>
            </div>}
        </>
    )
}

