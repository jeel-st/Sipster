import { useEffect, useState } from "react";
import { getUser } from "../userFetcher";
import { events } from "../../constants";
import { usePathname } from "expo-router";

const useImage = () => {
    const [user, setUser] = useState(null)

    const path = usePathname()

    useEffect(() => {
        async function fetchUser() {
            const userData = await getUser()
            setUser(userData);
        }
        if(path === "/"){
            fetchUser();
        }
    }, [path]);

    return {user}
}

export default useImage;