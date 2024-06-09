// Imports
import { userLog } from '../logger/config';
import useUser from '../database/userFetcher';
import { useEffect, useState } from "react";

/*
The logic of the settingsPage is processed here and forwarded to the backend
Typ: utils from settings

@ handleChangeUsername
@ handleChangeFirstname
@ handleChangeLastname
@ handleChangePassword
@ handleChangeEmail
*/

export function useAccount() {
    const user = useUser();
    const [level, setLevel] = useState('');
    const [levelInfo, setLevelInfo] = useState({});

    useEffect(() => {
        if (user) {
            const sips = Number(user.sips);
            const calculatedLevel = calculateLevel(sips);
            setLevel(calculatedLevel);
            setLevelInfo(getLevelInfo(calculatedLevel));
        }
    }, [user]);

    const calculateLevel = (sips) => {
        switch (true) {
            case (sips < 100):
                return '1';
            case (sips < 250):
                return '2';
            case (sips < 500):
                return '3';
            case (sips < 750):
                return '4';
            case (sips < 1000):
                return '5';
            default:
                return '6';
        }
    }

    const getLevelInfo = (level) => {
        switch (level) {
            case '1':
                return { image: require('../../assets/images/level1.png'), header:'Keep going!' ,text: "You're on the right track." };
            case '2':
                return { image: require('../../assets/images/level2.png'), header: 'Great start!', text: "You're making progress." };
            case '3':
                return { image: require('../../assets/images/level3.png'), header: 'Nice progress!', text: "You're doing well." };
            case '4':
                return { image: require('../../assets/images/level4.png'), header: 'Well done!', text: "You're getting closer." };
            case '5':
                return { image: require('../../assets/images/level5.png'), header: 'Almost there!', text: "Keep going!" };
            default:
                return { image: require('../../assets/images/level6.png'), header: "Congratulations,", text: "you are the beer king!" };
        }
    }

    return { level, levelInfo };
}