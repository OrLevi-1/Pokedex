import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Header } from './components/Header';
import { PokemonCard } from './components/PokemonCard';
import PokemonModel from './models/pokemon.model';

interface Pokemon {
  name: string
  url : string
}

const App: React.FC = () => {
  
  const url = `https://pokeapi.co/api/v2/pokemon/`

  useEffect(()=>{
    getPokemons()
  }, [])

  const[pokemonsList, setPokemonsList] = useState<Array<PokemonModel>>([]);
  const[loading,setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string | null | undefined>();
  const [pokemon, setPokemon] = useState<Pokemon>();

  const getPokemons=()=>{
    let pokemonsArray : Array<PokemonModel> = []
      
    axios.get(url).then((response)=>{
        console.log("response",response)
        console.log("list",response.data.results)
        response.data.results.forEach((item:any)=>{
          pokemonsArray.push({
            name: item.name,
            url : item.url
          })
        })
        setPokemonsList(pokemonsArray);
    }).catch((error)=>{
      console.log("error: ",error)
    })
  }

  return (
    <>
      <Header name = "" url = ""/>
      <div className="scrollWrapper">
        <div className="cardArea">
            {pokemonsList.length>0 && pokemonsList.map((item:PokemonModel, index:number)=>{
              return (
                <div className="cardAreaColumn">
                <PokemonCard key={index} pokemon={item}/>
                </div>
              )
            })}
        </div>
      </div>
    </>
  );
}

export default App;
