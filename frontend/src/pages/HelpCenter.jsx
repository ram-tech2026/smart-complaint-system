import React from 'react';
import { HelpCircle, Phone, Mail, MapPin } from 'lucide-react';

const HelpCenter = () => {
    return (
        <div className="max-w-4xl justify-center mx-auto space-y-8">
            <div className="bg-primary-600 rounded-xl px-8 py-12 text-white text-center shadow-md border border-primary-500 relative overflow-hidden">
                <div className="relative z-10">
                    <HelpCircle className="w-16 h-16 mx-auto mb-4 text-primary-100 opacity-90" />
                    <h1 className="text-4xl font-extrabold mb-4">How Can We Help You?</h1>
                    <p className="text-xl text-primary-100 font-medium">Find answers to common questions or reach out to our support team.</p>
                </div>
                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-sm border border-blue-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                        <div className="bg-blue-600 text-white p-2 rounded-lg mr-3 shadow-md">
                            <Phone className="w-5 h-5" />
                        </div>
                        Contact Support
                    </h2>
                    <div className="space-y-6 text-slate-600">
                        <div className="flex items-start bg-white/60 p-4 rounded-xl shadow-sm border border-white">
                            <div className="bg-blue-100 text-blue-600 p-2.5 rounded-full mr-4">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800 text-lg">Toll-Free Helpline</p>
                                <p className="text-blue-700 font-medium font-mono text-lg tracking-wide mt-1">1800-SMCS-HELP</p>
                                <p className="text-sm text-slate-500 mt-1">Available 24/7 for emergencies</p>
                            </div>
                        </div>

                        <div className="flex items-start bg-white/60 p-4 rounded-xl shadow-sm border border-white">
                            <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-full mr-4">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800 text-lg">Email Support</p>
                                <p className="text-indigo-700 font-medium mt-1">byreddyramireddy987@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start bg-white/60 p-4 rounded-xl shadow-sm border border-white">
                            <div className="bg-rose-100 text-rose-600 p-2.5 rounded-full mr-4">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800 text-lg">Municipal Office</p>
                                <p className="text-slate-600 mt-1">Sanjeeva Nagar Gate</p>
                                <p className="text-slate-600">Nandyala</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-xl shadow-sm border border-emerald-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                        <div className="bg-emerald-600 text-white p-2 rounded-lg mr-3 shadow-md">
                            <HelpCircle className="w-5 h-5" />
                        </div>
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-white/60 p-4 rounded-xl border border-white hover:bg-white hover:shadow-sm transition-all">
                            <h3 className="font-bold text-emerald-800 mb-1 flex justify-between items-center cursor-pointer">
                                How long does resolution take?
                            </h3>
                            <p className="text-slate-600 text-sm mt-2 leading-relaxed">Most high-priority civic issues are addressed within 48 hours. Standard complaints take 3-5 business days depending on the department.</p>
                        </div>
                        <div className="bg-white/60 p-4 rounded-xl border border-white hover:bg-white hover:shadow-sm transition-all">
                            <h3 className="font-bold text-emerald-800 mb-1 flex justify-between items-center cursor-pointer">
                                Can I remain anonymous?
                            </h3>
                            <p className="text-slate-600 text-sm mt-2 leading-relaxed">No, to prevent spam and allow us to follow up for clarifications, all users must register with a valid email to submit a complaint.</p>
                        </div>
                        <div className="bg-white/60 p-4 rounded-xl border border-white hover:bg-white hover:shadow-sm transition-all">
                            <h3 className="font-bold text-emerald-800 mb-1 flex justify-between items-center cursor-pointer">
                                What if my issue isn't listed?
                            </h3>
                            <p className="text-slate-600 text-sm mt-2 leading-relaxed">Select the 'Other Civic Issue' category and provide as much detail as possible in the description field. Our AI agent will route it to the correct department.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;
