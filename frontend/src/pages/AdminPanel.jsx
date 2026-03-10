import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComplaintService from '../services/complaintService';
import AuthService from '../services/authService';
import { RefreshCw, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AdminPanel = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'ADMIN') {
            navigate('/login');
            return;
        }
        fetchComplaints();
    }, [user, navigate]);

    const fetchComplaints = async () => {
        setLoading(true);
        try {
            const data = await ComplaintService.getAllComplaints();
            setComplaints(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (error) {
            console.error("Failed to fetch all complaints", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await ComplaintService.updateStatus(id, newStatus);
            fetchComplaints(); // Refresh data
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Status update failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this complaint?")) {
            try {
                await ComplaintService.deleteComplaint(id);
                fetchComplaints();
            } catch (error) {
                console.error("Failed to delete", error);
                alert("Delete failed");
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'OPEN': return 'bg-red-100 text-red-800';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
            case 'RESOLVED': return 'bg-green-100 text-green-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    if (loading && complaints.length === 0) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Admin Command Center</h2>
                    <p className="text-sm text-slate-500 mt-1">Manage all citizen complaints across the city</p>
                </div>
                <button
                    onClick={fetchComplaints}
                    className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">ID & Date</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Issue</th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {complaints.map((complaint) => (
                            <tr key={complaint.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-slate-900">#CMP-{complaint.id}</div>
                                    <div className="text-xs text-slate-500">{new Date(complaint.createdAt).toLocaleDateString()}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <div className="text-sm font-medium text-slate-900">{complaint.user?.fullName || 'Unknown'}</div>
                                        <div className="text-xs text-slate-500">{complaint.user?.email || 'N/A'}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="ml-1">
                                            <div className="text-sm font-medium text-slate-900 max-w-[200px] truncate" title={complaint.title}>{complaint.title}</div>
                                            <div className="text-xs font-medium text-primary-600 mt-0.5">{complaint.category.replace('_', ' ')}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border border-transparent ${getStatusColor(complaint.status)}`}>
                                        {complaint.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <select
                                            value={complaint.status}
                                            onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                                            className="text-sm border-slate-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 py-1.5 pl-3 pr-8 bg-slate-50 text-slate-700 font-medium"
                                        >
                                            <option value="OPEN">Open</option>
                                            <option value="IN_PROGRESS">In Progress</option>
                                            <option value="RESOLVED">Resolved</option>
                                        </select>

                                        {complaint.imageUrl && (
                                            <button
                                                onClick={() => window.open(`http://localhost:8080${complaint.imageUrl}`, '_blank')}
                                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                            >
                                                Image
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleDelete(complaint.id)}
                                            className="text-red-600 hover:text-red-900 px-3 py-1 font-semibold border border-transparent rounded hover:bg-red-50 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {complaints.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                    No complaints found in the system.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
