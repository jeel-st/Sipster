const axios = require("axios")

const baseUrl = 'http://85.215.71.124';
const userID = '663bd3b7969fc6302facf1ee';

test('Getting original imagePath', async () => {

    const original = "0"
    const response = await axios.get(`${baseUrl}/imageUpload/${userID}?original=${original}`);
    expect(response.status).toBe(200);
    expect(typeof response.data).toBe('string');
    expect(response.data).toContain('/home/sipster/sipster/backend/static/profilePictures/Picture663bd3b7969fc6302facf1ee'); // assuming it returns compressed1080 path
});

test('Getting compressed200 imagePath', async () => {

    const original = "200"
    const response = await axios.get(`${baseUrl}/imageUpload/${userID}?original=${original}`);
    expect(response.status).toBe(200);
    expect(typeof response.data).toBe('string');
    expect(response.data).toBe('/home/sipster/sipster/backend/static/profilePictures/compressed200/Picture663bd3b7969fc6302facf1ee.webp'); // assuming it returns compressed1080 path
});

test('Getting compressed1080 imagePath', async () => {

    const original = "1080"
    const response = await axios.get(`${baseUrl}/imageUpload/${userID}?original=${original}`);
    expect(response.status).toBe(200);
    expect(typeof response.data).toBe('string');
    expect(response.data).toBe('/home/sipster/sipster/backend/static/profilePictures/compressed1080/Picture663bd3b7969fc6302facf1ee.webp'); // assuming it returns compressed1080 path
});
