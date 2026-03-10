import api from './api';

const ComplaintService = {
    getAllComplaints: async (userId = null) => {
        let url = '/complaints';
        if (userId) {
            url += `?userId=${userId}`;
        }
        const response = await api.get(url);
        return response.data;
    },

    getComplaintById: async (id) => {
        const response = await api.get(`/complaints/${id}`);
        return response.data;
    },

    createComplaint: async (userId, title, description, category, location, priority, imageFile) => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('location', location);
        if (priority) formData.append('priority', priority);
        if (imageFile) formData.append('image', imageFile);

        const response = await api.post('/complaints', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    updateStatus: async (id, status) => {
        const response = await api.put(`/complaints/${id}/status?status=${status}`);
        return response.data;
    },

    deleteComplaint: async (id) => {
        const response = await api.delete(`/complaints/${id}`);
        return response.data;
    }
};

export default ComplaintService;
