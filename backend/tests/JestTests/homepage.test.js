const axios = require("axios")

const baseUrl = 'http://85.215.71.124';

test('getting Homepage for the first Time', async () => {
    const userID = "663bd3b7969fc6302facf1ee"
    const response = await axios.put(`${baseUrl}/homepage`,{
        "userID": userID,
        "usedIDs": []
    },{
        headers: {
            'Content-Type': 'application/json'
        }
    });
    try {
        for (const element of response.data) {
            expect(response.status).toBe(200);
            expect(element).toHaveProperty('_id');
            switch (element.type){
                case "game": expect(element).toHaveProperty('playtime'); break;
                case "event": expect(element).toHaveProperty('header'); break;
                case "activtiy": expect(element).toHaveProperty('playtime'); break;
                default: expect(response.data[0]).toHaveProperty('TestFailed'); break;
            }
        }
    } catch (err) {
        console.log(err)
    }
});
