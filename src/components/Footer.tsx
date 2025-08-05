import { BrainIcon, TwitterSocialIcon, PinterestIcon, GitHubIcon } from "../icons";

export const Footer = () => {
    return (
        <footer className="border-t" 
                style={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)' 
                }}>
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                 style={{ backgroundColor: 'var(--primary)' }}>
                                <BrainIcon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
                                Second Brain
                            </span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                            Your personal knowledge repository. Organize thoughts, save content, and never lose a great idea again.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                            Product
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#features" className="text-sm transition-colors duration-200"
                                   style={{ color: 'var(--muted-foreground)' }}
                                   onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                                   onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="text-sm transition-colors duration-200"
                                   style={{ color: 'var(--muted-foreground)' }}
                                   onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                                   onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="/dashboard" className="text-sm transition-colors duration-200"
                                   style={{ color: 'var(--muted-foreground)' }}
                                   onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                                   onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm transition-colors duration-200"
                                   style={{ color: 'var(--muted-foreground)' }}
                                   onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                                   onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                    API
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-sm transition-colors duration-200"
                                   style={{ color: 'var(--muted-foreground)' }}
                                   onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                                   onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm transition-colors duration-200"
                                   style={{ color: 'var(--muted-foreground)' }}
                                   onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                                   onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm transition-colors duration-200"
                                   style={{ color: 'var(--muted-foreground)' }}
                                   onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                                   onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm transition-colors duration-200"
                                   style={{ color: 'var(--muted-foreground)' }}
                                   onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                                   onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                    Status
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                            Connect
                        </h3>
                        <div className="flex space-x-4">
                            <a href="#" className="transition-colors duration-200"
                               style={{ color: 'var(--muted-foreground)' }}
                               onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--primary)'}
                               onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                <TwitterSocialIcon className="w-5 h-5" />
                            </a>
                            <a href="#" className="transition-colors duration-200"
                               style={{ color: 'var(--muted-foreground)' }}
                               onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--primary)'}
                               onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                <PinterestIcon className="w-5 h-5" />
                            </a>
                            <a href="#" className="transition-colors duration-200"
                               style={{ color: 'var(--muted-foreground)' }}
                               onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--primary)'}
                               onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                                <GitHubIcon className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                Follow us for updates and tips
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
                     style={{ borderColor: 'var(--border)' }}>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                        © 2025 Second Brain. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-sm transition-colors duration-200"
                           style={{ color: 'var(--muted-foreground)' }}
                           onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                           onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm transition-colors duration-200"
                           style={{ color: 'var(--muted-foreground)' }}
                           onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                           onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm transition-colors duration-200"
                           style={{ color: 'var(--muted-foreground)' }}
                           onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--foreground)'}
                           onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--muted-foreground)'}>
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
