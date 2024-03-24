const axios = require('axios');

const runScript = async () => {
    try {
        const createStudentResponse = await axios.post('http://localhost:3000/portal/students/', {});
        console.log('Create Student Response:', createStudentResponse.data);

        // Assuming the structure of the response is { _id: 'someId' }
        const studentId = createStudentResponse.data.studentId;
        console.log();
        console.log(studentId);
        const userPayload = {
            name: 'spiderman',
            username: 'spiderman2024',
            email: 'spider@yahoo.com',
            password: 'YourPassword',
            sid: studentId,
        };

        const userRegistrationResponse = await axios.post('http://localhost:8080/api/auth/signup', userPayload);

        console.log('User Registration Response:', userRegistrationResponse.data);
    } catch (error) {
        console.error(error);
    }
};


runScript();
