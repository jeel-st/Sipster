import { useState } from "react";

/*
    Custom hook to handle the game search

    @param games: object -> the games to search
    @return: object -> the object containing the hook methods
*/
const useGameSearch = (games) => {
    const [searchInput, setSearchedInput] = useState('');
    const [filteredGames, setFilteredGames] = useState(games);

    /*
        Method to handle the search

        @param text: string -> the text to search
        @return: void
    */
    const handleSearch = (text) =>{
        console.log(games);

        // Filter the games based on the search text
        const filtered = games.filter(game => game.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredGames(filtered);
        setSearchedInput(text);
    };

    // Return the hook methods
    return {handleSearch, filteredGames, searchInput};
}

export default useGameSearch;



