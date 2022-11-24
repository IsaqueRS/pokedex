import React from "react";
import { useState } from "react";
import './searchBar.css';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { height } from "@mui/system";

export default function SearchBar({placeholder, pokemonSearch}) {

    const [itemsSearched, setItemsSearched] = useState('');

    /*function handleChange(e) {
        if () {

        }
        e.preventDefault();
        setSearchBarInput(e.target.value);
    };
        if (searchBarInput.length > 0) {
        pokemonSearch.filter((pokemon) => {
        return pokemon.pokemon_species.name.match(searchBarInput);
        
    });
    }
    */
    return(
        <div className="search">
            <div className="searchInputs">
                <input  
                    type='text' 
                    placeholder={placeholder} 
                    onChange={(event) => {itemsSearched(event.target.value)}} 
                    value={itemsSearched}
                />
                <SearchRoundedIcon sx={{ marginLeft: '0.4rem'}}/>
            </div>
        </div>
    )
};

