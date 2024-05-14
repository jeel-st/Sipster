import { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig';

export function useEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axiosInstance.get('/events')
            .then(response => setEvents(response.data))
            .catch(error => console.log(error));
    }, []);

    return events;
}
