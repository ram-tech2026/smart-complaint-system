const axios = require('axios');
const FormData = require('form-data');

async function testSubmit() {
    try {
        const formData = new FormData();
        formData.append('userId', 1);
        formData.append('title', 'Test Complaint from Node');
        formData.append('description', 'This is a test description');
        formData.append('category', 'GARBAGE');
        formData.append('location', '123 Test St');
        formData.append('priority', 'HIGH');

        console.log('Sending request...');
        const response = await axios.post('http://localhost:8080/api/complaints', formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        console.log('Success:', response.data);
    } catch (e) {
        console.error('Error:', e.response ? e.response.data : e.message);
    }
}

testSubmit();
