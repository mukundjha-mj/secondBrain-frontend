import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Button } from './Button';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    onLogin: () => void;
}

export const AuthModal = ({ open, onClose, onLogin }: AuthModalProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        // Proper validation logic
        if (!email || !password || (!isLogin && (!firstName || !lastName))) {
            alert('Please fill in all required fields');
            return;
        }

        setLoading(true);
        try {
            const endpoint = isLogin ? '/api/v1/signin' : '/api/v1/signup';
            const payload: any = {
                email,
                password
            };
            
            if (!isLogin) {
                payload.firstName = firstName;
                payload.lastName = lastName;
            }

            const response = await axios.post(`${BACKEND_URL}${endpoint}`, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const token = response.data.token;
            // Store with consistent key name
            localStorage.setItem('authorization', token);

            onLogin();
            onClose();
        } catch (error) {
            console.error('Auth error:', error);
            if (axios.isAxiosError(error)) {
                alert(`Error: ${error.response?.data?.message || error.message}`);
            } else {
                alert('Authentication failed');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" 
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="rounded-xl shadow-lg w-full max-w-md overflow-hidden" 
                 style={{ backgroundColor: 'var(--card)' }}>
                {/* Header */}
                <div className="px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg transition-colors hover:opacity-70 focus:outline-none"
                            style={{ color: 'var(--muted-foreground)' }}
                        >
                            ✕
                        </button>
                    </div>
                    <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        {isLogin ? 'Sign in to your account' : 'Sign up to get started'}
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                                style={{
                                    backgroundColor: 'var(--input)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--foreground)',
                                    '--tw-ring-color': 'var(--ring)'
                                } as React.CSSProperties}
                                placeholder="Enter your email"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                                style={{
                                    backgroundColor: 'var(--input)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--foreground)',
                                    '--tw-ring-color': 'var(--ring)'
                                } as React.CSSProperties}
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                        </div>

                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: 'var(--input)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--foreground)',
                                            '--tw-ring-color': 'var(--ring)'
                                        } as React.CSSProperties}
                                        placeholder="Enter your first name"
                                        disabled={loading}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-3 py-2.5 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: 'var(--input)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--foreground)',
                                            '--tw-ring-color': 'var(--ring)'
                                        } as React.CSSProperties}
                                        placeholder="Enter your last name"
                                        disabled={loading}
                                    />
                                </div>
                            </>
                        )}

                        <div className="pt-2">
                            <Button
                                onClick={handleAuth}
                                variant="primary"
                                text={loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                                loading={loading}
                                fullwidth={true}
                            />
                        </div>

                        <div className="text-center pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-sm transition-colors hover:underline cursor-pointer"
                                style={{ color: 'var(--primary)' }}
                                disabled={loading}
                            >
                                {isLogin
                                    ? "Don't have an account? Create one"
                                    : "Already have an account? Sign in"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
