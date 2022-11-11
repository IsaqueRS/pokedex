import React, { useEffect, useState, useTransition } from 'react';
import './App.css'; 
import { PokemonsFetch } from './api/services/pokemon';
import { PokemonsImageFetch } from './api/services/pokemonImage'
import logo from './logo.svg'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'; 
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import '@fontsource/roboto/500.css';

import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
} from "@mui/material";

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
      <AppBar position="static">
      <CssBaseline />
      <Toolbar sx={{ backgroundColor: 'black' }}>
        <Typography variant="h4">
          <img src={logo} className='img-poke'/>
          Pokedex
        </Typography>
      </Toolbar>
    </AppBar>

      <div className='pokedex'>
      <div className='pokemon-card-container'>
      {pokemon.map((pokemonLoop) => (
        <Card sx={{ maxWidth: 350, backgroundColor: "endregion" }}>
          <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonLoop.entry_number}.png`} 
          />
          <CardContent>
           <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'medium', fontFamily: 'Roboto' }}>
            {pokemonLoop.pokemon_species.name}
           </Typography>
          </CardContent>
        </Card>
      ))}
      </div>
      </div>
    </div>
  )
}
//pokemonLoop.pokemon_species.url
export default App;