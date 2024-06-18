import { useState } from "react";
import games from '../../constants/games'

const useGameSearch = (games) => {

    const [searchInput, setSearchedInput] = useState('');
    const [filteredGames, setFilteredGames] = useState(games);
    
    const handleSearch = (text) =>{
        console.log(games);
        
        const filtered = games.filter(game => game.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredGames(filtered);
        setSearchedInput(text);
    };

    return{handleSearch, filteredGames, searchInput};
}

export default useGameSearch;



