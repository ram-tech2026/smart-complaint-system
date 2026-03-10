import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Map, CheckCircle, ArrowRight, Shield, Zap, Bell, Star } from 'lucide-react';
import AuthService from '../services/authService';

const Home = () => {
    const user = AuthService.getCurrentUser();

    return (
        <div className="flex flex-col min-h-full -mt-8 -mx-4 sm:-mx-6 lg:-mx-8">

            {/* ==================== HERO ==================== */}
            <div className="relative overflow-hidden min-h-[600px] flex items-center" style={{background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'}}>

                {/* Animated floating shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] animate-pulse" style={{background: 'radial-gradient(circle, #667eea, transparent)', top: '-10%', left: '-5%'}}></div>
                    <div className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[80px]" style={{background: 'radial-gradient(circle, #f093fb, transparent)', top: '20%', right: '-5%', animation: 'pulse 4s ease-in-out infinite alternate'}}></div>
                    <div className="absolute w-[300px] h-[300px] rounded-full opacity-25 blur-[60px] animate-pulse" style={{background: 'radial-gradient(circle, #4facfe, transparent)', bottom: '5%', left: '30%'}}></div>
                    <div className="absolute w-[200px] h-[200px] rounded-full opacity-15 blur-[50px]" style={{background: 'radial-gradient(circle, #ffd700, transparent)', top: '60%', right: '20%', animation: 'pulse 3s ease-in-out infinite alternate'}}></div>
                    
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
                    
                    {/* Floating icons */}
                    <div className="absolute text-white/10 top-[15%] left-[10%] animate-bounce" style={{animationDuration: '3s'}}><Shield size={40} /></div>
                    <div className="absolute text-white/10 top-[25%] right-[15%] animate-bounce" style={{animationDuration: '4s'}}><Bell size={35} /></div>
                    <div className="absolute text-white/10 bottom-[20%] left-[20%] animate-bounce" style={{animationDuration: '5s'}}><Zap size={30} /></div>
                    <div className="absolute text-white/10 bottom-[30%] right-[10%] animate-bounce" style={{animationDuration: '3.5s'}}><Star size={28} /></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center py-20">
                    <div className="inline-flex items-center bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-white/20 shadow-lg">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        Live — Trusted by 10,000+ Citizens
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6 text-white leading-tight">
                        Empowering Citizens.<br />
                        <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                            Improving Our City.
                        </span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg sm:text-xl text-slate-300 mb-12 font-medium leading-relaxed">
                        Your direct line to local officials. Report potholes, water leaks, garbage overflows — and track every step until it's resolved.
                    </p>
                    <div className="flex justify-center flex-wrap gap-4">
                        {user ? (
                            <Link to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-10 py-4 rounded-full font-bold text-lg shadow-2xl shadow-yellow-500/25 flex items-center transform hover:-translate-y-1 hover:shadow-yellow-500/40 transition-all">
                                Go to Dashboard <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <>
                                <Link to="/register" className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-10 py-4 rounded-full font-bold text-lg shadow-2xl shadow-yellow-500/25 flex items-center transform hover:-translate-y-1 hover:shadow-yellow-500/40 transition-all">
                                    Report an Issue <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/help" className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 hover:border-white/40 transition-all shadow-lg">
                                    Need Help?
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Curved Wave Bottom */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                        <path d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,50 1440,40 L1440,100 L0,100 Z" fill="white" />
                    </svg>
                </div>
            </div>

            {/* ==================== STATS ==================== */}
            <div className="bg-white py-8 relative z-10">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6">
                    <div className="text-center p-4 rounded-2xl hover:bg-purple-50 transition-colors">
                        <p className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">500+</p>
                        <p className="text-sm text-slate-500 font-semibold mt-1 uppercase tracking-wide">Issues Resolved</p>
                    </div>
                    <div className="text-center p-4 rounded-2xl hover:bg-purple-50 transition-colors">
                        <p className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">24/7</p>
                        <p className="text-sm text-slate-500 font-semibold mt-1 uppercase tracking-wide">Support Active</p>
                    </div>
                    <div className="text-center p-4 rounded-2xl hover:bg-purple-50 transition-colors">
                        <p className="text-4xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">&lt;48h</p>
                        <p className="text-sm text-slate-500 font-semibold mt-1 uppercase tracking-wide">Avg Resolution</p>
                    </div>
                </div>
            </div>

            {/* ==================== HOW IT WORKS ==================== */}
            <div className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-3">Simple Process</p>
                        <h2 className="text-4xl font-black text-slate-900">How It Works</h2>
                        <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">Three simple steps to get your civic issues resolved by the right department.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-red-500/5 border border-slate-100 text-center hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-2 transition-all group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-orange-50 rounded-bl-[80px] opacity-50"></div>
                            <div className="relative">
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-red-100 rounded-full scale-125 group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-full flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300">
                                        <AlertTriangle className="w-9 h-9" />
                                    </div>
                                </div>
                                <span className="inline-block text-xs font-black text-red-400 bg-red-50 px-3 py-1 rounded-full mb-3">STEP 1</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Spot an Issue</h3>
                                <p className="text-slate-500 leading-relaxed">See a pothole, broken streetlight, or illegal dumping? Snap a photo and note the location.</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-blue-500/5 border border-slate-100 text-center hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all group overflow-hidden md:mt-8">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-bl-[80px] opacity-50"></div>
                            <div className="relative">
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-blue-100 rounded-full scale-125 group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300">
                                        <Map className="w-9 h-9" />
                                    </div>
                                </div>
                                <span className="inline-block text-xs font-black text-blue-400 bg-blue-50 px-3 py-1 rounded-full mb-3">STEP 2</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Submit Report</h3>
                                <p className="text-slate-500 leading-relaxed">Log in, fill out a quick form, attach your photo, and pinpoint the exact location.</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="relative bg-white rounded-3xl p-8 shadow-xl shadow-emerald-500/5 border border-slate-100 text-center hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-bl-[80px] opacity-50"></div>
                            <div className="relative">
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-emerald-100 rounded-full scale-125 group-hover:scale-150 transition-transform duration-500"></div>
                                    <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform duration-300">
                                        <CheckCircle className="w-9 h-9" />
                                    </div>
                                </div>
                                <span className="inline-block text-xs font-black text-emerald-400 bg-emerald-50 px-3 py-1 rounded-full mb-3">STEP 3</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Track Resolution</h3>
                                <p className="text-slate-500 leading-relaxed">Watch your complaint go from Open → In-Progress → Resolved with email notifications.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ==================== CTA ==================== */}
            <div className="relative py-20 overflow-hidden" style={{background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'}}>
                <div className="absolute inset-0">
                    <div className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[80px] animate-pulse" style={{background: 'radial-gradient(circle, #f093fb, transparent)', top: '-20%', right: '10%'}}></div>
                    <div className="absolute w-[300px] h-[300px] rounded-full opacity-15 blur-[60px]" style={{background: 'radial-gradient(circle, #667eea, transparent)', bottom: '-10%', left: '10%'}}></div>
                </div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm font-bold text-purple-300 uppercase tracking-widest mb-4">Join the Movement</p>
                    <h2 className="text-4xl font-black text-white mb-6">Ready to make a difference?</h2>
                    <p className="text-lg text-slate-400 mb-10 max-w-lg mx-auto">Join thousands of citizens actively improving their neighborhoods every single day.</p>
                    {!user && (
                        <Link to="/register" className="group inline-flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-12 py-4 rounded-full font-bold text-lg shadow-2xl shadow-yellow-500/25 transform hover:-translate-y-1 hover:shadow-yellow-500/40 transition-all">
                            Create Free Account <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
