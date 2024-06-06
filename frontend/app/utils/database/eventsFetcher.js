import { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig';
import { eventLog } from '../logger/config';

export function useEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axiosInstance.get('/events')
            .then(response => setEvents(response.data))
            .catch(error => eventLog.error("Error loading events:", error))
    }, []);

    return events;
}
