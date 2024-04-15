import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import CardsPokemon from '../components/CardsPokemon'
import { Box, Container, Grid } from '@mui/material'
import axios from 'axios'
import Skeletons from '../components/Skeletons'
import { useNavigate } from 'react-router-dom'

const Home = ({setPokemonData}) => {

    const [pokemons, setPokemons] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        getPokemons()
    }, [])

    const getPokemons = () => {
        var endpoints = [];
        for (var i = 1; i < 152; i++) {
          endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
      };

    const filterPokemon = (name) => {
        var filteredPokemon = []
        if (name === ""){
            getPokemons()
        }
        for (var i in pokemons) {
            if (pokemons[i].data.name.includes(name)) {
                filteredPokemon.push(pokemons[i])
            }
        }
        setPokemons(filteredPokemon)
    }
    
    const pokemonPickHandler = (pokemonData) => {
        setPokemonData(pokemonData)
        navigate("/profile")
    }

  return (
    <div>
        <Navbar filterPokemon={filterPokemon}/>
        <Container maxWidth="false">
            <Grid container spacing={4}>
            {pokemons.length === 0 ? (<Skeletons/>
            ) : (
                pokemons.map((pokemon, key) => ( 
                    <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                        <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                            <CardsPokemon name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>
                        </Box>
                    </Grid>
                ))
            )}
            </Grid>
        </Container>
    </div>
  )
}

export default Home