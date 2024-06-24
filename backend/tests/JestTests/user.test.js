const axios = require("axios")

const baseUrl = 'http://85.215.71.124';

test('Getting user data Sipster', async () => {
    const username = 'Sipster';
    const response = await axios.get(`${baseUrl}/user/${username}`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('_id');
    expect(response.data).toHaveProperty('username', 'Sipster');
    expect(response.data).toHaveProperty('email', 'sipster@gmail.com');
    expect(response.data).toHaveProperty('firstName', 'Team');
    expect(response.data).toHaveProperty('lastName', 'Sipster');

});

test('Getting user data testUser', async () => {
    const username = 'testUser';
    const response = await axios.get(`${baseUrl}/user/${username}`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('_id');
    expect(response.data).toHaveProperty('username', 'testUser');
    expect(response.data).toHaveProperty('email', 'testuser@gmail.com');
    expect(response.data).toHaveProperty('firstName', 'Test');
    expect(response.data).toHaveProperty('lastName', 'User');

});

test('Non-existent user', async () => {
    const username = 'nonexistentuser';
    try {
        await axios.get(`${baseUrl}/user/${username}`);
    } catch (error) {
        expect(error.response.status).toBe(400);
    }
});

test("Changing testUser to 'testUser2'", async () => {
    const userID = "66730726ac38b8e571f69857"
    const response = await axios.put(`${baseUrl}/user/changeUsername`,
        {
            "userID": `${userID}`,
            "newUsername": "testUser2"
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        expect(response.status).toBe(200);
        expect(response.data).toBe("Username was succesfully posted!")
})

test("Changing testUser2 back to 'testUser'", async () => {
    const userID = "66730726ac38b8e571f69857"
    const response = await axios.put(`${baseUrl}/user/changeUsername`,
        {
            "userID": `${userID}`,
            "newUsername": "testUser"
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        expect(response.status).toBe(200);
        expect(response.data).toBe("Username was succesfully posted!")
})