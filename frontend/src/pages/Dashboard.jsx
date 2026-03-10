import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComplaintService from '../services/complaintService';
import AuthService from '../services/authService';
import { Clock, CheckCircle, AlertCircle, MapPin, Image as ImageIcon } from 'lucide-react';

const Dashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchComplaints = async () => {
            try {
                const data = await ComplaintService.getAllComplaints(user.id);
                setComplaints(data);
            } catch (error) {
                console.error("Failed to fetch complaints", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, [user, navigate]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'OPEN': return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'IN_PROGRESS': return <Clock className="w-5 h-5 text-yellow-500" />;
            case 'RESOLVED': return <CheckCircle className="w-5 h-5 text-green-500" />;
            default: return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'OPEN': return 'bg-red-100 text-red-800 border-red-200';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'RESOLVED': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'HIGH': return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-50 text-red-600 border border-red-100">High Priority</span>;
            case 'MEDIUM': return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-100">Medium Priority</span>;
            case 'LOW': return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">Low Priority</span>;
            default: return null;
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Complaints</h1>
                    <p className="mt-1 text-slate-500">Track the status of the civic issues you've reported.</p>
                </div>
                <button
                    onClick={() => navigate('/submit')}
                    className="inline-flex items-center px-5 py-2.5 border border-transparent font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 shadow-sm transition-colors"
                >
                    + Report New Issue
                </button>
            </div>

            {complaints.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
                    <img src="/placeholder-empty.svg" alt="No data" className="mx-auto h-32 w-32 mb-4 opacity-50 block" onError={(e) => { e.target.style.display = 'none'; }} />
                    <h3 className="mt-2 text-lg font-medium text-slate-900">No complaints found</h3>
                    <p className="mt-1 text-slate-500 max-w-sm mx-auto">You haven't reported any issues yet. Click the button above to get started.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {complaints.map((complaint) => (
                        <div key={complaint.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200 overflow-hidden flex flex-col h-full">
                            {/* Card Header with Category and Status */}
                            <div className="p-5 border-b border-slate-100 flex justify-between items-start">
                                <div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 mb-2">
                                        {complaint.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1" title={complaint.title}>{complaint.title}</h3>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)} ml-2 flex-shrink-0`}>
                                    {getStatusIcon(complaint.status)}
                                    <span className="ml-1.5">{complaint.status.replace('_', ' ')}</span>
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-grow flex flex-col justify-between">
                                <div>
                                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                                        {complaint.description}
                                    </p>

                                    <div className="flex items-start text-sm text-slate-500 mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-slate-400" />
                                        <span className="line-clamp-2">{complaint.location}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {getPriorityBadge(complaint.priority)}
                                    </div>
                                </div>

                                {/* Card Footer Data */}
                                <div className="mt-auto pt-4 border-t border-slate-100">
                                    <div className="flex justify-between items-center text-xs text-slate-500">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {new Date(complaint.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </div>
                                        {complaint.imageUrl && (
                                            <div className="flex items-center text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">
                                                <ImageIcon className="w-3.5 h-3.5 mr-1" /> View Image
                                                {/* Tooltip or basic click behavior could go here, for MVP just indicating image exists */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
