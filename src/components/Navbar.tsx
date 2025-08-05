import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import {
    PlusIcon,
    ShareIcon,
    BrainIcon,
    SearchIcon,
    DashboardIcon,
    SettingsIcon,
    HelpIcon,
    LogoutIcon,
    ChevronDownIcon,
    UserIcon
} from "../icons";
import { useProfile } from "../hooks/useProfile";

interface NavbarProps {
    isAuthenticated: boolean;
    contentCount?: number;
    onAddContent?: () => void;
    onLogout?: () => void;
    onLogin?: () => void;
    showSearch?: boolean;
    variant?: 'home' | 'dashboard';
}

export const Navbar = ({
    isAuthenticated,
    contentCount = 0,
    onAddContent,
    onLogout,
    onLogin,
    showSearch = true,
    variant = 'dashboard'
}: NavbarProps) => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { profile } = useProfile();
    const navigate = useNavigate();

    const handleLogoClick = () => {
        if (variant === 'home' || isAuthenticated) {
            navigate('/');
        } else {
            navigate('/dashboard');
        }
    };

    const handleDefaultLogin = () => {
        if (onLogin) {
            onLogin();
        } else {
            navigate('/');
        }
    };

    const handleDefaultLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('authorization');
            navigate('/');
        }
    };

    return (
        <nav className={`border-b sticky top-0 z-50 ${variant === 'home' ? 'backdrop-blur-md bg-opacity-80' : 'backdrop-blur-sm'
            }`}
            style={{
                borderColor: 'var(--border)',
                backgroundColor: variant === 'home' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: variant === 'home' ? 'blur(12px) saturate(180%)' : 'blur(8px) saturate(150%)',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}>
            <div className="max-w-full mx-auto px-4 lg:px-6 py-2.5">
                <div className="flex justify-between items-center gap-4">
                    {/* Logo & Brand - More compact */}
                    <div className="flex items-center space-x-3 min-w-0 flex-shrink-0">
                        <div
                            className="flex items-center space-x-2 cursor-pointer group"
                            style={{ color: 'var(--foreground)' }}
                            onClick={handleLogoClick}
                        >
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-105 shadow-md"
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    background: 'linear-gradient(135deg, var(--primary), #0ea5e9)'
                                }}>
                                <BrainIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="group-hover:scale-105 transition-transform duration-200 hidden sm:block">
                                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                                    style={{ color: 'var(--foreground)' }}>
                                    Second Brain
                                </h1>
                                {isAuthenticated && contentCount > 0 && (
                                    <p className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                                        {contentCount} {contentCount === 1 ? 'item' : 'items'} saved
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links (Home page only) */}
                    {variant === 'home' && (
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features"
                                className="text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                                style={{ color: 'var(--muted-foreground)' }}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.color = 'var(--foreground)';
                                    (e.target as HTMLElement).style.backgroundColor = 'var(--muted)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.color = 'var(--muted-foreground)';
                                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                                }}>
                                Features
                            </a>
                            <a href="#pricing"
                                className="text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                                style={{ color: 'var(--muted-foreground)' }}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.color = 'var(--foreground)';
                                    (e.target as HTMLElement).style.backgroundColor = 'var(--muted)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.color = 'var(--muted-foreground)';
                                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                                }}>
                                Pricing
                            </a>
                            <a href="#about"
                                className="text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                                style={{ color: 'var(--muted-foreground)' }}
                                onMouseEnter={(e) => {
                                    (e.target as HTMLElement).style.color = 'var(--foreground)';
                                    (e.target as HTMLElement).style.backgroundColor = 'var(--muted)';
                                }}
                                onMouseLeave={(e) => {
                                    (e.target as HTMLElement).style.color = 'var(--muted-foreground)';
                                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                                }}>
                                About
                            </a>
                        </div>
                    )}

                    {/* Mobile Search Button */}
                    {variant === 'dashboard' && isAuthenticated && showSearch && (
                        <div
                            className="md:hidden p-2 rounded-xl transition-all duration-200 hover:shadow-lg"
                            style={{
                                backgroundColor: 'var(--muted)',
                                border: '1px solid var(--border)'
                            }}
                        >
                            <Button
                                variant="ghost"
                                startIcon={<SearchIcon className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />}
                            />
                        </div>
                    )}

                    {/* Search Bar (Dashboard only, when authenticated) - More compact and responsive */}
                    {variant === 'dashboard' && isAuthenticated && showSearch && (
                        <div className="flex-1 max-w-sm lg:max-w-md mx-4 hidden md:block">
                            <div className="flex items-center rounded-xl px-4 py-2.5 border transition-all duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-opacity-50"
                                style={{
                                    backgroundColor: 'var(--input)',
                                    borderColor: 'var(--border)',
                                    '--tw-ring-color': 'var(--ring)'
                                } as React.CSSProperties}>
                                <SearchIcon className="w-4 h-4 mr-3 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
                                <input
                                    type="text"
                                    placeholder="Search your brain..."
                                    className="bg-transparent text-sm outline-none flex-1 placeholder-opacity-70 min-w-0"
                                    style={{
                                        color: 'var(--foreground)',
                                        '::placeholder': { color: 'var(--muted-foreground)' }
                                    } as React.CSSProperties}
                                />
                                <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs rounded border flex-shrink-0"
                                    style={{
                                        backgroundColor: 'var(--muted)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--muted-foreground)'
                                    }}>
                                    ⌘K
                                </kbd>
                            </div>
                        </div>
                    )}

                    {/* Actions - More compact and responsive */}
                    <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
                        {isAuthenticated ? (
                            <>
                                {variant === 'dashboard' && (
                                    <>
                                        <div className="hidden lg:block">
                                            <Button
                                                variant="secondary"
                                                text="Share"
                                                startIcon={<ShareIcon className="w-4 h-4" />}
                                            />
                                        </div>

                                        <Button
                                            variant="primary"
                                            text="Add Content"
                                            startIcon={<PlusIcon className="w-4 h-4" />}
                                            onClick={onAddContent}
                                        />
                                    </>
                                )}

                                {variant === 'home' && (
                                    <Button
                                        variant="primary"
                                        text="Go to Dashboard"
                                        onClick={() => navigate('/dashboard')}
                                    />
                                )}

                                {/* User Menu - More compact */}
                                <div className="relative">
                                    <Button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        variant="ghost"
                                        className="flex items-center space-x-2 p-2 rounded-xl transition-all duration-200 hover:shadow-lg"
                                    >
                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--primary), #0ea5e9)'
                                            }}>
                                            <UserIcon className="text-white" />
                                        </div>
                                        <div className="hidden xl:block text-left">
                                            <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                                {profile?.firstName}
                                            </p>
                                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                                Free Plan
                                            </p>
                                        </div>
                                        <ChevronDownIcon
                                            className="w-4 h-4 transition-transform duration-200 hidden sm:block"
                                            style={{
                                                color: 'var(--muted-foreground)',
                                                transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                            }}
                                        />
                                    </Button>

                                    {/* Dropdown */}
                                    {userMenuOpen && (
                                        <div className="absolute right-0 top-full mt-3 w-45 rounded-xl shadow-xl border z-50 animate-in slide-in-from-top-2 duration-200 "
                                            style={{
                                                backgroundColor: 'var(--card)',
                                                borderColor: 'var(--border)',
                                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                            }}>
                                            <div className="p-3">

                                                {variant === 'home' && (
                                                    <Button
                                                        onClick={() => navigate('/dashboard')}
                                                        variant="ghost"
                                                        className="w-full text-left px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-3"
                                                        startIcon={<DashboardIcon className="w-4 h-4" />}
                                                        text="Go to Dashboard"
                                                    />
                                                )}
                                                <div>
                                                    <Button
                                                        onClick={handleDefaultLogout}
                                                        variant="ghost"
                                                        className="w-full text-left px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-3"
                                                        startIcon={<LogoutIcon className="w-4 h-4" />}
                                                        text="Sign Out"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                        </>
                    ) : (
                        <>
                            {variant === 'home' && (
                                <Button
                                    variant="secondary"
                                    text="Sign In"
                                    onClick={handleDefaultLogin}
                                />
                            )}
                            <Button
                                variant="primary"
                                text="Get Started"
                                onClick={handleDefaultLogin}
                            />
                        </>
                    )}
                </div>
            </div>
            </div>
        </nav>
    );
};
