import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService';
import { LogOut, LayoutDashboard, FileText, HelpCircle, Shield } from 'lucide-react';

const Layout = () => {
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link to="/" className="flex items-center group">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mr-2.5 shadow-md" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-indigo-500 transition-all">
                                            SMCS
                                        </span>
                                        <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase">
                                            Smart Complaints
                                        </span>
                                    </div>
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {user && (
                                    <>
                                        <Link
                                            to={user.role === 'ADMIN' ? "/admin" : "/dashboard"}
                                            className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                        >
                                            <LayoutDashboard className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </Link>
                                        {user.role === 'USER' && (
                                            <Link
                                                to="/submit"
                                                className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                            >
                                                <FileText className="w-4 h-4 mr-2" />
                                                New Complaint
                                            </Link>
                                        )}
                                        <Link
                                            to="/help"
                                            className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
                                        >
                                            <HelpCircle className="w-4 h-4 mr-2" />
                                            Help Center
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <div className="flex flex-col items-end hidden sm:flex">
                                        <span className="text-sm font-medium text-slate-900">{user.fullName}</span>
                                        <span className="text-xs text-slate-500">{user.role}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="inline-flex items-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-x-4">
                                    <Link
                                        to="/login"
                                        className="text-slate-500 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 mt-auto">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Smart Complaint System - Hackathon MVP. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
