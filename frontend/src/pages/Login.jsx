import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/authService';
import { User, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginType, setLoginType] = useState('USER'); // 'USER' or 'ADMIN'
    const navigate = useNavigate();

    // Clear fields when switching between Citizen and Admin
    useEffect(() => {
        setEmail('');
        setPassword('');
        setError('');
    }, [loginType]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await AuthService.login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center pt-8 sm:pt-16">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to access your portal
                    </p>
                </div>

                {/* Role Toggle */}
                <div className="flex rounded-lg bg-slate-100 p-1 mb-8">
                    <button
                        type="button"
                        onClick={() => setLoginType('USER')}
                        className={`flex-1 flex justify-center items-center py-2 text-sm font-medium rounded-md transition-all ${loginType === 'USER'
                            ? 'bg-white text-primary-700 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <User className="w-4 h-4 mr-2" />
                        Citizen
                    </button>
                    <button
                        type="button"
                        onClick={() => setLoginType('ADMIN')}
                        className={`flex-1 flex justify-center items-center py-2 text-sm font-medium rounded-md transition-all ${loginType === 'ADMIN'
                            ? 'bg-white text-primary-700 shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Official Admin
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 transition-all shadow-md"
                    >
                        Sign In as {loginType === 'ADMIN' ? 'Admin' : 'Citizen'}
                    </button>

                    {loginType === 'USER' && (
                        <div className="text-center mt-4">
                            <p className="text-sm text-slate-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
