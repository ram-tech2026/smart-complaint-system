import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComplaintService from '../services/complaintService';
import AuthService from '../services/authService';
import { UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';

const SubmitComplaint = () => {
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'GARBAGE',
        location: '',
        priority: 'MEDIUM',
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!user) {
        navigate('/login');
        return null;
    }

    const categories = [
        { id: 'GARBAGE', label: 'Garbage & Solid Waste' },
        { id: 'WATER', label: 'Water Leakage / Supply' },
        { id: 'ROAD', label: 'Road Damage / Potholes' },
        { id: 'STREETLIGHT', label: 'Streetlight Failure' },
        { id: 'OTHER', label: 'Other Civic Issue' }
    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            await ComplaintService.createComplaint(
                user.id,
                formData.title,
                formData.description,
                formData.category,
                formData.location,
                formData.priority,
                image
            );
            setStatus({ type: 'success', message: 'Complaint submitted successfully!' });

            // Reset form
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (err) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to submit complaint.' });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl justify-center mx-auto bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="bg-primary-600 px-6 py-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Report an Issue</h2>
                    <p className="text-primary-100 opacity-90">Help us keep the city clean and safe by reporting civic issues.</p>
                </div>
                {/* Decorative background element */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            </div>

            <div className="p-6 sm:p-8">
                {status.message && (
                    <div className={`p-4 rounded-lg mb-6 flex items-start ${status.type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'
                        }`}>
                        {status.type === 'success' ? <CheckCircle className="w-5 h-5 mr-3 mt-0.5 text-green-500 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />}
                        <p className="text-sm font-medium">{status.message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="title">Complaint Title <span className="text-red-500">*</span></label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                placeholder="E.g., Large pothole on Main Street"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="category">Category <span className="text-red-500">*</span></label>
                            <select
                                id="category"
                                name="category"
                                required
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                value={formData.priority}
                                onChange={handleInputChange}
                            >
                                <option value="LOW">Low - Not urgent</option>
                                <option value="MEDIUM">Medium - Needs attention</option>
                                <option value="HIGH">High - Urgent / Safety Hazard</option>
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="location">Specific Location <span className="text-red-500">*</span></label>
                            <input
                                id="location"
                                name="location"
                                type="text"
                                required
                                placeholder="Exact address or recognizable landmark"
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="description">Detailed Description <span className="text-red-500">*</span></label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                required
                                placeholder="Please provide more details about the issue..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                                value={formData.description}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Evidence / Photo (Optional)</label>

                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-primary-400 hover:bg-primary-50 transition-colors group cursor-pointer relative">
                                <div className="space-y-2 text-center">
                                    {preview ? (
                                        <div className="mx-auto w-full max-w-sm rounded overflow-hidden shadow-sm">
                                            <img src={preview} alt="Preview" className="w-full h-auto object-cover max-h-48" />
                                        </div>
                                    ) : (
                                        <div className="mx-auto h-12 w-12 text-slate-400 group-hover:text-primary-500 transition-colors">
                                            <UploadCloud size={48} strokeWidth={1.5} />
                                        </div>
                                    )}
                                    <div className="flex text-sm text-slate-600 justify-center">
                                        <label htmlFor="image-upload" className="relative cursor-pointer rounded-md font-semibold text-primary-600 hover:text-primary-500 focus-within:outline-none">
                                            <span>{preview ? 'Change file' : 'Upload a file'}</span>
                                            <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                        </label>
                                        {!preview && <p className="pl-1">or drag and drop</p>}
                                    </div>
                                    {!preview && <p className="text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="bg-white py-2.5 px-6 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-3 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`inline-flex justify-center py-2.5 px-8 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white ${isSubmitting ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitComplaint;
