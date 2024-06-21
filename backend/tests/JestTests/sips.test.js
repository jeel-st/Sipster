const axios = require("axios")

const baseUrl = 'http://85.215.71.124';
const userID = '66730726ac38b8e571f69857';

test('getting users sips', async () => {
    const response = await axios.get(`${baseUrl}/sips/${userID}`)

    expect(response.status).toBe(200);
    expect(response.data).toBe(200);
});

test('adding 200 sips', async () => {
    const sips = 200
    const response = await axios.put(`${baseUrl}/sips/${userID}`,{
        "sips": sips
        },{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    expect(response.status).toBe(200);
});

test('subtract 200 sips', async () => {
    const sips = -200
    const response = await axios.put(`${baseUrl}/sips/${userID}`,{
        "sips": sips
        },{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    expect(response.status).toBe(200);
});

test('adding 200 sips to friends', async () => {
    const sips = 200
    const userIDArray = ["66730b1aac38b8e571f69859", "663bd3b7969fc6302facf1ee"]
    const response = await axios.put(`${baseUrl}/sips/friends`,{
        "sips": sips,
        "friends": userIDArray
        },{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    expect(response.status).toBe(200);
});

test('subtract 200 sips from friends', async () => {
    const sips = -200
    const userIDArray = ["66730b1aac38b8e571f69859", "663bd3b7969fc6302facf1ee"]
    const response = await axios.put(`${baseUrl}/sips/friends`,{
        "sips": sips,
        "friends": userIDArray
        },{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    expect(response.status).toBe(200);
});