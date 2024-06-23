// Imports
import { userLog } from '../logger/config';
import { useEffect, useState } from "react";
import { useUser } from './useUser';

/*
The logic of the AccountPage is processed here
Typ: hook from settings

@return:    object -> An object containing the user's level and information about the current level,
including image, header, and text.
*/


export function useAccount() {

    // logged in user is called
    const user = useUser();

    // useState() -> Hook function of React to trade states
    const [level, setLevel] = useState('');
    const [levelInfo, setLevelInfo] = useState({});

    // The method uses the React hook useEffect to calculate the level of a user based on their ‘sips’
    // when the user object changes and to update the corresponding information.
    useEffect(() => {
        if (user) {
            const sips = Number(user.sips);
            const calculatedLevel = calculateLevel(sips);
            setLevel(calculatedLevel);
            setLevelInfo(getLevelInfo(calculatedLevel));
            userLog.info("Level information was calculated.")
        }
    }, [user]);

    // this function calculates the level based on the sips
    const calculateLevel = (sips) => {
        switch (true) {
            case (sips < 100):
                userLog.info("The user is in level 1")
                return '1';
            case (sips < 250):
                userLog.info("The user is in level 2")
                return '2';
            case (sips < 500):
                userLog.info("The user is in level 3")
                return '3';
            case (sips < 750):
                userLog.info("The user is in level 4")
                return '4';
            case (sips < 1000):
                userLog.info("The user is in level 5")
                return '5';
            case (sips < 1250):
                userLog.info("The user is in level 6")
                return '6';
            default:
                userLog.info("The user is in level 0")
                return '0';
        }
    }

    // this function gives different badge information depending on the level
    const getLevelInfo = (level) => {
        switch (level) {
            case '1':
                return { image: require('../../assets/images/level1.png'), header: 'Keep going!', text: "You're on the right track." };
            case '2':
                return { image: require('../../assets/images/level2.png'), header: 'Great start!', text: "You're making progress." };
            case '3':
                return { image: require('../../assets/images/level3.png'), header: 'Nice progress!', text: "You're doing well." };
            case '4':
                return { image: require('../../assets/images/level4.png'), header: 'Well done!', text: "You're getting closer." };
            case '5':
                return { image: require('../../assets/images/level5.png'), header: 'Almost there!', text: "Keep going!" };
            case '6':
                return { image: require('../../assets/images/level6.png'), header: "Congratulations,", text: "you are the beer king!" };
            default:
                return { image: require('../../assets/images/level0.png'), header: "Perfect,", text: "now it can start!" };
        }
    }

    return { level, levelInfo };
}