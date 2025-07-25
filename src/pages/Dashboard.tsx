import { useState, useEffect } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CardSkeletonVariant } from "../components/CardSkeleton"
import { CreateContentModal } from "../components/CreateContentModal"
import { AuthModal } from "../components/AuthModal"
import { MasonryLayout } from "../components/MasonryLayout"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { SideBar } from "../components/SideBar"
import { useContent } from "../hooks/useContent"


function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { contents, loading } = useContent();

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setAuthModalOpen(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
        // Refresh the page to fetch content with new token
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('authorization');
        setIsAuthenticated(false);
        setAuthModalOpen(true);
    };

    return (
        <>
            <SideBar 
                twitterCount={contents.filter(item => item.type === 'twitter').length}
                youtubeCount={contents.filter(item => item.type === 'youtube').length}
                onAddContent={() => setModalOpen(true)}
            />
            <div className="ml-80 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                {/* Header Section */}
                <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
                    <div className="px-8 py-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">My Second Brain</h1>
                                <p className="text-gray-600 mt-1">
                                    {isAuthenticated 
                                        ? `${contents.length} items in your collection`
                                        : "Your personal knowledge repository"
                                    }
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                {isAuthenticated && (
                                    <>
                                        <Button 
                                            variant="secondary" 
                                            text="Logout" 
                                            onClick={handleLogout}
                                        />
                                        <Button 
                                            variant="secondary" 
                                            text="Share Brain" 
                                            startIcon={<ShareIcon />}
                                        />
                                        <Button 
                                            variant="primary" 
                                            text="Add Content" 
                                            startIcon={<PlusIcon />} 
                                            onClick={() => setModalOpen(true)}
                                        />
                                    </>
                                )}
                                
                                {!isAuthenticated && (
                                    <Button 
                                        variant="primary" 
                                        text="Login" 
                                        onClick={() => setAuthModalOpen(true)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="px-8 py-8">
                    <AuthModal 
                        open={authModalOpen} 
                        onClose={() => setAuthModalOpen(false)}
                        onLogin={handleLogin}
                    />
                    
                    <CreateContentModal 
                        open={modalOpen} 
                        onClose={() => setModalOpen(false)} 
                    />

                    {/* Loading State */}
                    {isAuthenticated && loading && (
                        <div className="space-y-6">
                            {/* Stats Cards Loading */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
                                        <div className="flex items-center">
                                            <div className="p-3 bg-gray-200 rounded-lg w-12 h-12"></div>
                                            <div className="ml-4 flex-1">
                                                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                                                <div className="h-8 bg-gray-200 rounded w-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Content Grid Loading */}
                            <div className="animate-in slide-in-from-bottom-4 duration-700">
                                <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
                                <MasonryLayout>
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <CardSkeletonVariant 
                                            key={i} 
                                            variant={i % 3 === 0 ? 'tall' : i % 2 === 0 ? 'short' : 'medium'} 
                                        />
                                    ))}
                                </MasonryLayout>
                            </div>
                        </div>
                    )}

                    {isAuthenticated && !loading && contents.length > 0 && (
                        <div className="space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Total Items</p>
                                            <p className="text-2xl font-bold text-gray-900">{contents.length}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-green-100 rounded-lg">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10M7 4v16a1 1 0 001 1h8a1 1 0 001-1V4M7 4H5a1 1 0 00-1 1v16a1 1 0 001 1h2" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">YouTube Videos</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {contents.filter(item => item.type === 'youtube').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center">
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-600">Twitter Posts</p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {contents.filter(item => item.type === 'twitter').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Grid */}
                            <div className="animate-in slide-in-from-bottom-4 duration-700">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 animate-in fade-in slide-in-from-left-4 duration-500">Your Collection</h2>
                                <MasonryLayout>
                                    {contents.map((content, index) => (
                                        <Card 
                                            key={index}
                                            type={content.type} 
                                            link={content.link} 
                                            title={content.title} 
                                        />
                                    ))}
                                </MasonryLayout>
                            </div>
                        </div>
                    )}

                    {isAuthenticated && !loading && contents.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-md">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <PlusIcon />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No content yet</h3>
                                <p className="text-gray-600 mb-6">
                                    Start building your second brain by adding your first piece of content.
                                </p>
                                <Button 
                                    variant="primary" 
                                    text="Add Your First Item" 
                                    startIcon={<PlusIcon />}
                                    onClick={() => setModalOpen(true)}
                                />
                            </div>
                        </div>
                    )}

                    {!isAuthenticated && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center max-w-lg">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Second Brain</h3>
                                <p className="text-gray-600 mb-8 text-lg">
                                    Organize your thoughts, save important content, and build your personal knowledge repository.
                                </p>
                                <Button 
                                    variant="primary" 
                                    text="Get Started" 
                                    onClick={() => setAuthModalOpen(true)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard

