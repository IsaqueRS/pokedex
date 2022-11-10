import React, { useEffect, useState, useTransition } from 'react';
import './App.css'; 
import { PokemonsFetch } from './api/services/pokemon';
import { PokemonsImageFetch } from './api/services/pokemonImage'

function App() {  
  const [pokemon, setPokemon] = useState([]);
  const [pokemonImage, setPokemonImage] = useState([]);

  useEffect(() => {
   async function getPokemons() {
      try {
        const resultPokemons = await PokemonsFetch();
        console.log((resultPokemons.pokemons).flat());
        const flatResultPokemon = (resultPokemons.pokemons).flat();
        setPokemon(flatResultPokemon);
      } catch(error) {
        console.log(error)
      }
    }
    getPokemons();
  },[]);

  useEffect(() => {
    async function getPokemonsImage() {
       try {
         const resultPokemonsImage = await PokemonsImageFetch();
         //console.log((resultPokemons.pokemons).flat());
         //const flatResultPokemon = (resultPokemons.pokemons).flat();
         setPokemonImage(resultPokemonsImage.pokemonImage);
       } catch(error) {
         console.log(error)
       }
     }
     getPokemonsImage();
   },[]);

  return(
    <div>
      <div className='pokedex'>
      <div className='pokemon-card-container'>
      {pokemon.map((pokemonLoop) => (
        <div className='grid-item-pokemon'>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonLoop.entry_number}.png`}></img>  
        <p>
          {pokemonLoop.pokemon_species.name}
        </p>
        </div>
      ))}
      </div>
      </div>
    </div>
  )
}
//pokemonLoop.pokemon_species.url
export default App;