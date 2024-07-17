const axios = require("axios");

const baseUrl = 'http://85.215.71.124';

test('Fetching Homepage and validationg data and checking excluded ids', async () => {
    const usedIDs = [];
    for (let limit = 0; limit < 10; limit++) {
        const homepage = await getHomepageTest(usedIDs);
        for (const element of homepage) {
            usedIDs.push({
                type: element.type,
                id: element._id
            });
        }
    }
});


async function getHomepageTest(usedIDs) {
    const userID = "663bd3b7969fc6302facf1ee";
    try {
        const response = await axios.put(`${baseUrl}/homepage`, {
            "userID": userID,
            "usedIDs": usedIDs
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        for (const element of response.data) {
            expect(response.status).toBe(200);
            expect(element).toHaveProperty('_id');
            switch (element.type) {
                case "game":
                    expect(element).toHaveProperty('playtime');
                    testUsedIds(element, usedIDs);
                    break;
                case "event":
                    expect(element).toHaveProperty('header');
                    testUsedIds(element, usedIDs);
                    break;
                case "activity":
                    expect(element).toHaveProperty('reactions');
                    testUsedIds(element, usedIDs);
                    break;
                default:
                    throw new Error("Test failed!"); //if the default value is reached the Test Failed!
            }
        }
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

function testUsedIds(element, usedIDs) {
    for (const usedID of usedIDs) {
            expect(element._id).not.toBe(usedID.id);
    }
}