export function formatDate(friend){
    const date = new Date(friend.registerDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`
}

export function formatEventDate(event){
    const date = new Date(event.date);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day}. ${month}`
}