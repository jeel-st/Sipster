import { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig';
import { eventLog } from '../logger/config';
import { useUser } from '../hooks/useUser';
import { userLog } from '../logger/config';

export function useEvents() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axiosInstance.get('/events')
            .then(response => setEvents(response.data))
            .catch(error => eventLog.error("Error loading events:", error))
    }, []);

    return events;
}

export function useSavedEvents() {

    const user = useUser();

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axiosInstance.get(`/user/events/${user._id}`)
            .then(response => {
                userLog.info('The savedEvents fetched successfully')
                setEvents(response.data)})
            .catch(error => eventLog.error("Error loading events:", error))
    }, []);

    return events;
}

