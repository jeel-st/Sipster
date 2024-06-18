const axios = require("axios")

const baseUrl = 'http://85.215.71.124';

test('Getting user data', async () => {
    const username = 'Sipster';
    const response = await axios.get(`${baseUrl}/user/${username}`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('_id');
    expect(response.data).toHaveProperty('username', 'Sipster');
    expect(response.data).toHaveProperty('email', 'sipster@gmail.com');
    expect(response.data).toHaveProperty('firstName', 'Team');
    expect(response.data).toHaveProperty('lastName', 'Sipster');

});


test('Non-existent user', async () => {
    const username = 'nonexistentuser';
    try {
        await axios.get(`${baseUrl}/user/${username}`);
    } catch (error) {
        expect(error.response.status).toBe(400);
    }
});