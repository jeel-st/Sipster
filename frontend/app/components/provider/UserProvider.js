import React, { createContext } from 'react';
import useUser from '../../utils/database/userFetcher';

// Create a context for the user
export const UserContext = createContext();

// UserProvider component
export function UserProvider({ children }) {
    const user = useUser();

    if (user) {
        return (
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        );
    }
}
