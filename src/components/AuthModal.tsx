import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    onLogin: () => void;
}

export const AuthModal = ({ open, onClose, onLogin }: AuthModalProps) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuth = async () => {
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const endpoint = isLogin ? '/api/v1/signin' : '/api/v1/signup';
            const response = await axios.post(`${BACKEND_URL}${endpoint}`, {
                email,
                password
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            
            alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        onClick={handleAuth}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>

                    <div className="text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            {isLogin 
                                ? "Don't have an account? Sign up" 
                                : "Already have an account? Login"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
