const axios = require("axios")

const baseUrl = 'http://85.215.71.124';

test('successful login', async () => {
    const username = 'Sipster';
    const password = 'JoelStinkt*100';
    const response = await axios.get(`${baseUrl}/login/${username}/${password}`);
    expect(response.status).toBe(200);
    expect(response.data).toBe(true);
});

test('user not found', async () => {
    const username = 'gamsa';
    const password = 'Ansaf86!!mm';
    try {
        await axios.get(`${baseUrl}/login/${username}/${password}`);
    } catch (error) {
        expect(error.response.status).toBe(401);
        expect(error.response.data).toBe('User not found');
    }
});

