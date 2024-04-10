import { useState, useEffect } from 'react';
import axios from 'axios';

export function useEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('http://85.215.71.124/events')
            .then(response => setEvents(response.data))
            .catch(error => console.log(error));
    }, []);

    return events;
}
