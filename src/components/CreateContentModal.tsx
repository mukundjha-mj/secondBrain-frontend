import { useRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";


// controlled component
export const CreateContentModal = ({ open, onClose, onSubmit }: {
    open: boolean,
    onClose: () => void,
    onSubmit: () => void
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
        const token = localStorage.getItem('authorization') || localStorage.getItem('token');
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

            // alert("Content added successfully!");
            

            // Clear form
            if (linkRef.current) linkRef.current.value = '';
            if (typeRef.current) typeRef.current.value = '';
            if (titleRef.current) titleRef.current.value = '';
            if (tagsRef.current) tagsRef.current.value = '';

            onSubmit();
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
        open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <div className="relative w-full max-w-lg rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
                    {/* Header */}
                    <div className="px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>Add New Content</h2>
                                <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                                    Save content to your collection
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg transition-colors hover:opacity-70 focus:outline-none cursor-pointer"
                                style={{ color: 'var(--muted-foreground)' }}
                                aria-label="Close"
                            >
                                <CrossIcon />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                                    Link <span style={{ color: 'var(--destructive)' }}>*</span>
                                </label>
                                <input
                                    ref={linkRef}
                                    type="url"
                                    placeholder="https://example.com"
                                    className="w-full px-3 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: 'var(--input)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--foreground)',
                                        '--tw-ring-color': 'var(--ring)'
                                    } as React.CSSProperties}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                                    Type <span style={{ color: 'var(--destructive)' }}>*</span>
                                </label>
                                <input
                                    ref={typeRef}
                                    type="text"
                                    placeholder="e.g., twitter, youtube, article"
                                    className="w-full px-3 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: 'var(--input)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--foreground)',
                                        '--tw-ring-color': 'var(--ring)'
                                    } as React.CSSProperties}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                                    Title <span style={{ color: 'var(--destructive)' }}>*</span>
                                </label>
                                <input
                                    ref={titleRef}
                                    type="text"
                                    placeholder="Give your content a title"
                                    className="w-full px-3 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: 'var(--input)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--foreground)',
                                        '--tw-ring-color': 'var(--ring)'
                                    } as React.CSSProperties}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                                    Tags
                                </label>
                                <input
                                    ref={tagsRef}
                                    type="text"
                                    placeholder="development, react, tutorial (comma-separated)"
                                    className="w-full px-3 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                                    style={{
                                        backgroundColor: 'var(--input)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--foreground)',
                                        '--tw-ring-color': 'var(--ring)'
                                    } as React.CSSProperties}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t flex justify-end gap-3" style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--muted)'
                    }}>
                        <Button
                            onClick={onClose}
                            variant="secondary"
                            text="Cancel"
                        />
                        <Button
                            onClick={contentCreation}
                            variant="primary"
                            text="Add Content"
                        />
                    </div>
                </div>
            </div>
        )
    )
}

