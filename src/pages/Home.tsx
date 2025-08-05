import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { AuthModal } from "../components/AuthModal";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
    CopyIcon,
    SearchIcon,
    TagIcon,
    TwitterIcon,
    ArticalIcon,
    VideoIcon
} from "../icons";

const Home = () => {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const navigate = useNavigate();

    // Check if user is already authenticated
    const isAuthenticated = !!(localStorage.getItem('authorization') || localStorage.getItem('token'));

    const handleLogin = () => {
        setAuthModalOpen(true);
    };

    const handleAuthSuccess = () => {
        setAuthModalOpen(false);
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
            {/* Navigation */}
            <Navbar
                isAuthenticated={isAuthenticated}
                variant="home"
                onLogin={handleLogin}
                showSearch={false}
            />

            {/* Hero Section */}
            <section className="pt-20 pb-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full mb-8 animate-bounce shadow-2xl"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>
                        <div className="w-[11px] h-[11px] rounded-full mr-2  animate-glow-sync"
                            style={{
                                backgroundColor: 'var(--chart-4)',
                                // boxShadow: '0 0 2px 2px rgba(23, 191, 99, 1)'
                            }}></div>
                        <span className="text-sm font-medium">✨ Your digital second brain</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                        style={{ color: 'var(--foreground)' }}>
                        Save, Search, and
                        <br />
                        <span style={{ color: 'var(--primary)' }}>Connect Ideas</span>
                    </h1>

                    <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
                        style={{ color: 'var(--muted-foreground)' }}>
                        Transform scattered thoughts from Twitter, YouTube, and articles into an organized,
                        searchable knowledge base that grows with you.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button
                            onClick={() => setAuthModalOpen(true)}
                            className="px-8 py-4 font-semibold text-lg rounded-full transition-all duration-200 hover:scale-105 "
                            style={{
                                backgroundColor: 'var(--primary)',
                                color: 'var(--primary-foreground)',
                                boxShadow: '0 4px 14px 0 rgba(30, 157, 241, 0.39)'
                            }}
                        >
                            Get Started for Free
                        </button>

                        <button className="px-8 py-4 font-medium text-lg rounded-full border-2 transition-all duration-200 hover:scale-105"
                            style={{
                                borderColor: 'var(--border)',
                                color: 'var(--foreground)',
                                backgroundColor: 'transparent'
                            }}>
                            <span className="mr-2">▶</span>
                            Watch Demo
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-20">
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>10K+</div>
                            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>1M+</div>
                            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Ideas Saved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>99%</div>
                            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Satisfaction</div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="max-w-5xl mx-auto px-6">
                    <div className="rounded-xl shadow-2xl overflow-hidden border"
                        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                        {/* Browser Header */}
                        <div className="px-6 py-4 border-b flex items-center"
                            style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
                            <div className="flex space-x-2 mr-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="flex-1 px-4 py-2 rounded-lg text-sm"
                                style={{ backgroundColor: 'var(--input)', color: 'var(--muted-foreground)' }}>
                                secondbrain.app/dashboard
                            </div>
                        </div>

                        {/* Dashboard Content */}
                        <div className="p-8">
                            {/* Mock Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: 'var(--primary)' }}>
                                        <span className="text-white font-bold">SB</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold" style={{ color: 'var(--foreground)' }}>Your Second Brain</h3>
                                        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>24 items saved today</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 rounded-full font-medium"
                                    style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                                    + Add Content
                                </button>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-3 gap-6 mb-8">
                                {[
                                    { icon: <ArticalIcon />, label: "Articles", value: "127", color: "#1e9df1" },
                                    { icon: <VideoIcon />, label: "Videos", value: "43", color: "#17bf63" },
                                    { icon: <TwitterIcon />, label: "Tweets", value: "89", color: "#e0245e" }
                                ].map((stat, index) => (
                                    <div key={index} className="p-6 rounded-xl border"
                                        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                                        <div className="text-2xl mb-2">{stat.icon}</div>
                                        <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                                            {stat.value}
                                        </div>
                                        <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Content Preview */}
                            <div className="space-y-4">
                                <h4 className="font-semibold" style={{ color: 'var(--foreground)' }}>Recent Knowledge</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { type: <TwitterIcon />, title: "AI Development Insights", source: "@elonmusk", time: "2h" },
                                        { type: <VideoIcon />, title: "React Best Practices 2024", source: "YouTube", time: "5h" },
                                        { type: <ArticalIcon />, title: "The Future of Design Systems", source: "Medium", time: "1d" },
                                        { type: <TwitterIcon />, title: "Thread: Building Better UIs", source: "@dan_abramov", time: "2d" }
                                    ].map((item, index) => (
                                        <div key={index} className="p-4 rounded-lg border hover:shadow-md transition-shadow"
                                            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                                            <div className="flex items-start space-x-3">
                                                <span className="text-lg">{item.type}</span>
                                                <div className="flex-1 min-w-0">
                                                    <h5 className="font-medium text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                                                        {item.title}
                                                    </h5>
                                                    <div className="flex items-center space-x-2 text-xs"
                                                        style={{ color: 'var(--muted-foreground)' }}>
                                                        <span>{item.source}</span>
                                                        <span>•</span>
                                                        <span>{item.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20" style={{ backgroundColor: 'var(--muted)' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                            Everything you need to build your
                            <br />
                            <span style={{ color: 'var(--primary)' }}>second brain</span>
                        </h2>
                        <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                            Powerful features designed to help you capture, organize, and rediscover your best ideas
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="text-center p-8 rounded-xl" style={{ backgroundColor: 'var(--background)' }}>
                            <div className="w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: 'var(--accent)' }}>
                                <CopyIcon className="w-8 h-8" style={{ color: 'var(--accent-foreground)' }} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                                Save Anything
                            </h3>
                            <p style={{ color: 'var(--muted-foreground)' }}>
                                Capture content from Twitter, YouTube, articles, and any website with our browser extension or mobile app.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center p-8 rounded-xl" style={{ backgroundColor: 'var(--background)' }}>
                            <div className="w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: 'var(--accent)' }}>
                                <SearchIcon className="w-8 h-8" style={{ color: 'var(--accent-foreground)' }} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                                Smart Search
                            </h3>
                            <p style={{ color: 'var(--muted-foreground)' }}>
                                Find any piece of content instantly with AI-powered semantic search that understands context and meaning.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center p-8 rounded-xl" style={{ backgroundColor: 'var(--background)' }}>
                            <div className="w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: 'var(--accent)' }}>
                                <TagIcon className="w-8 h-8" style={{ color: 'var(--accent-foreground)' }} />
                            </div>
                            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                                Auto-Organize
                            </h3>
                            <p style={{ color: 'var(--muted-foreground)' }}>
                                Let AI automatically tag and categorize your content, creating meaningful connections between your ideas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="pricing" className="py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="p-12 rounded-2xl border"
                        style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
                            Ready to build your
                            <br />
                            <span style={{ color: 'var(--primary)' }}>second brain?</span>
                        </h2>
                        <p className="text-xl mb-8" style={{ color: 'var(--muted-foreground)' }}>
                            Join thousands of users who have transformed their knowledge management
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="primary"
                                text="Get Started for Free"
                                onClick={() => setAuthModalOpen(true)}
                            />
                            <Button
                                variant="secondary"
                                text="Learn More"
                                onClick={() => { }}
                            />
                        </div>

                        <div className="mt-6 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                            No credit card required • Free forever plan available
                        </div>
                    </div>
                </div>
            </section>

            {/* Auth Modal */}
            <AuthModal
                open={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                onLogin={handleAuthSuccess}
            />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
