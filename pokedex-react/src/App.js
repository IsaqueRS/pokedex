import React, { useEffect, useState, useTransition } from 'react';
import axios from './api/axios'
import './App.css'; 
import SearchBar from './components/searchBar';

import { PokemonsFetch } from './api/services/pokemon';
import { PokemonsTypeFetch } from './api/services/pokemonType';
import logo from './logo.svg'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'; 
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

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
  const [pokemonType, setPokemonType] = useState('');
  const [pokemonWeight, setPokemonWeight] = useState('');
  const [pokemonHeight, setPokemonHeight] = useState('');
  const [pokemonId, setPokemonId] = useState('');
  const [pokemonDetailsName, setPokemonDetailsName] = useState('');

  const [pokemonSearched, setPokemonSearched] = useState('');
  const filteredPokemons =  pokemon.filter((pokemon) => pokemon.pokemon_species.name.toLowerCase().startsWith(pokemonSearched.toLowerCase()));

  const [open, setOpen] = React.useState(false);

  async function handleOpen(pokemonSelected) {

    try {
      setPokemonId(pokemonSelected.entry_number);
      setPokemonDetailsName(pokemonSelected.pokemon_species.name);
      const response = await axios.get(`pokemon/${pokemonSelected.entry_number}`);

      console.log(response.data)
      setPokemonType(response.data.types[0].type.name)
      setPokemonHeight(response.data.height)
      setPokemonWeight(response.data.weight)
      setOpen(true); 

    } catch(error) {
      console.log(error);
    }
   };

  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'grid',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '3px',
    boxShadow: 24,
    p: 4,
  };
  
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

  return(
    <div>
      <AppBar position="static">
      <CssBaseline />
      <Toolbar sx={{ backgroundColor: 'black' }}>
        <Typography variant="h4">
          <img src={logo} className='img-poke'/>
          Pokedex
        </Typography>
        <input 
        className='searchInput' 
        placeholder='Procure um Pokemon...' 
        onChange={(event) => setPokemonSearched(event.target.value)} 
        value={pokemonSearched} 
        />
        <SearchRoundedIcon sx={{ marginLeft: '0.4rem'}}/>
      </Toolbar>
    </AppBar>

      <div className='pokedex'>
      <div className='pokemon-card-container'>

      {filteredPokemons.map((pokemonLoop) => (
        <Card sx={{ maxWidth: 350, backgroundColor: "endregion" }}>
          <CardMedia
          component="img"
          alt="pokemon"
          height="140"
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonLoop.entry_number}.png`} 
          />
          <CardContent sx={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
           <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center',fontWeight: 'medium', fontFamily: 'Roboto' }}>
            {pokemonLoop.pokemon_species.name}
           </Typography>    
           <Button sx={{ alignSelf: 'center' }} onClick={() => handleOpen(pokemonLoop)} ><Typography variant='body.2' color="text.secondary">ver mais</Typography></Button>
          </CardContent>
        </Card>
      ))}


           <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CardMedia
                  component="img"
                  alt="pokemon"
                  height="140"
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} 
                />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Nome: {pokemonDetailsName}
                </Typography>
                
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Tipo: {pokemonType}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Peso: {pokemonWeight/10} Kg
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Altura: {pokemonHeight/10} M
                </Typography>
              </Box>
            </Modal>
      </div>
      </div>
    </div>
  )
}
//pokemonLoop.pokemon_species.url
export default App;