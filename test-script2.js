const axios = require('axios');
const { ObjectId } = require('mongodb');

const signInAndRedirect = async () => {
    try {
        // Sign in request
        const signInPayload = {
            usernameOrEmail: 'ComputerMan',
            password: 'Computer0110',
        };

        const signInResponse = await axios.post('http://localhost:8080/api/auth/signin', signInPayload);

        console.log('Sign In Response:', signInResponse.data);

        // Assuming the structure of the response includes 'sid'
        const sid = signInResponse.data;

        // Convert sid to ObjectId
        const sidObjectId = new  ObjectId(sid);
        console.log('Converted SID to ObjectId:', sidObjectId);

        // Redirect to http://localhost:3000/portal/students/sid
        const redirectUrl = `http://localhost:3000/portal/students/${sidObjectId}`;
        const redirectToStudentResponse = await axios.get(redirectUrl);

        console.log('Redirect to Student Response:', redirectToStudentResponse.data);
    } catch (error) {
        console.error(error);
    }
};

signInAndRedirect();
