import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CardSkeletonVariant } from "../components/CardSkeleton"
import { CreateContentModal } from "../components/CreateContentModal"
import { AuthModal } from "../components/AuthModal"
import { Navbar } from "../components/Navbar"
import { MasonryLayout } from "../components/MasonryLayout"
import { PlusIcon, ArchiveIcon, CheckCircleIcon, YouTubeIcon, TwitterIcon } from "../icons"
import { SideBar } from "../components/SideBar"
import { useContent } from "../hooks/useContent"


function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const navigate = useNavigate();

    const { contents, loading, refetch } = useContent();

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('authorization') || localStorage.getItem('token');
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
        navigate('/');
    };

    return (
        <>
            {/* Navbar - Full width at top */}
            <Navbar
                isAuthenticated={isAuthenticated}
                contentCount={contents.length}
                onAddContent={() => setModalOpen(true)}
                onLogout={handleLogout}
                onLogin={() => setAuthModalOpen(true)}
                variant="dashboard"
            />

            {/* Sidebar - Fixed position */}
            <SideBar
                twitterCount={contents.filter(item => item.type === 'twitter').length}
                youtubeCount={contents.filter(item => item.type === 'youtube').length}
                onAddContent={() => setModalOpen(true)}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content - With dynamic left margin for sidebar */}
            <div
                className={`min-h-screen transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-16' : 'ml-60'
                    }`}
                style={{
                    backgroundColor: 'var(--background)'
                }}>
                {/* Main Content */}
                <div className="px-8 py-4"
                    style={{ paddingTop: '4rem' }}>
                    <AuthModal
                        open={authModalOpen}
                        onClose={() => setAuthModalOpen(false)}
                        onLogin={handleLogin}
                    />

                    <CreateContentModal
                        open={modalOpen}
                        onClose={() => {
                            setModalOpen(false)
                        }}
                        onSubmit={() => {
                            setModalOpen(false)
                            refetch()
                        }}
                    />

                    {/* Loading State */}
                    {isAuthenticated && loading && (
                        <div className="space-y-6">
                            {/* Stats Cards Loading */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="rounded-xl p-6 border animate-pulse"
                                        style={{
                                            backgroundColor: 'var(--card)',
                                            borderColor: 'var(--border)'
                                        }}>
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-lg w-12 h-12"
                                                style={{ backgroundColor: 'var(--muted)' }}></div>
                                            <div className="ml-4 flex-1">
                                                <div className="h-4 rounded w-20 mb-2"
                                                    style={{ backgroundColor: 'var(--muted)' }}></div>
                                                <div className="h-8 rounded w-12"
                                                    style={{ backgroundColor: 'var(--muted)' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Content Grid Loading */}
                            <div className="animate-in slide-in-from-bottom-4 duration-700">
                                <div className="h-8 rounded w-48 mb-6 animate-pulse"
                                    style={{ backgroundColor: 'var(--muted)' }}></div>
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
                                <div className="rounded-xl p-6 border"
                                    style={{
                                        backgroundColor: 'var(--card)',
                                        borderColor: 'var(--border)'
                                    }}>
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-lg"
                                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                                            <ArchiveIcon className="w-6 h-6" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                                                Total Items
                                            </p>
                                            <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                                                {contents.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl p-6 border"
                                    style={{
                                        backgroundColor: 'var(--card)',
                                        borderColor: 'var(--border)'
                                    }}>
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-lg"
                                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                                            <YouTubeIcon />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>
                                                YouTube Videos
                                            </p>
                                            <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                                                {contents.filter(item => item.type === 'youtube').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl p-6 border"
                                    style={{
                                        backgroundColor: 'var(--card)',
                                        borderColor: 'var(--border)'
                                    }}>
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-lg"
                                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                                            <TwitterIcon />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }} >
                                                Twitter Posts
                                            </p>
                                            <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                                                {contents.filter(item => item.type === 'twitter').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Grid */}
                            <div className="animate-in slide-in-from-bottom-4 duration-700">
                                <h2 className="text-2xl font-bold mb-6 animate-in fade-in slide-in-from-left-4 duration-500"
                                    style={{ color: 'var(--foreground)' }}>
                                    Your Collection
                                </h2>
                                <MasonryLayout
                                    key={sidebarCollapsed ? 'collapsed' : 'expanded'}
                                    columnWidth={sidebarCollapsed ? 280 : 320}
                                    gap={sidebarCollapsed ? 20 : 24}
                                >
                                    {contents.map((content) => (
                                        <Card
                                            key={content._id}
                                            _id={content._id}
                                            type={content.type}
                                            link={content.link}
                                            title={content.title}
                                            onRefresh={refetch}
                                        />
                                    ))}
                                </MasonryLayout>
                            </div>
                        </div>
                    )}

                    {isAuthenticated && !loading && contents.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="rounded-2xl p-12 border text-center max-w-md"
                                style={{
                                    backgroundColor: 'var(--card)',
                                    borderColor: 'var(--border)'
                                }}>
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                                    style={{ backgroundColor: 'var(--primary)' }}>
                                    <div style={{ color: 'white' }}>
                                        <PlusIcon />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
                                    No content yet
                                </h3>
                                <p className="mb-6" style={{ color: 'var(--muted-foreground)' }}>
                                    Start building your second brain by adding your first piece of content.
                                </p>
                                <div className="flex justify-center">

                                    <Button
                                        variant="primary"
                                        text="Add Your First Item"
                                        startIcon={<PlusIcon />}
                                        onClick={() => setModalOpen(true)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {!isAuthenticated && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="rounded-2xl p-12 border text-center max-w-lg"
                                style={{
                                    backgroundColor: 'var(--card)',
                                    borderColor: 'var(--border)'
                                }}>
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                                    style={{ backgroundColor: 'var(--primary)' }}>
                                    <CheckCircleIcon className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                                    Welcome to Your Second Brain
                                </h3>
                                <p className="mb-8 text-lg" style={{ color: 'var(--muted-foreground)' }}>
                                    Organize your thoughts, save important content, and build your personal knowledge repository.
                                </p>
                                <div className="flex justify-center">

                                    <Button
                                        variant="primary"
                                        text="Get Started"
                                        onClick={() => setAuthModalOpen(true)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard

