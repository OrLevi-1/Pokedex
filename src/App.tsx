import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import { Header } from './components/Header';
import { PokemonCard } from './components/PokemonCard';
import PokemonModel from './models/pokemon.model';
import { Search } from './components/Search';
import { Pagination } from './components/Pagination';

interface Pokemon {
  name: string
  url : string
}

const App: React.FC = () => {
  
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1200`

  const[pokemonsList, setPokemonsList] = useState<Array<PokemonModel>>([]);
  const[loading,setLoading] = useState<boolean>(false);
  const[currentIndex,setCurrentIndex] = useState(1);
  const[itemsPerPage,setItemsPerPage] = useState(40);

  const [name, setName] = useState<string | null | undefined>();
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(()=>{
    getPokemons()
  }, [])

  const getPokemons = async () => {
    setLoading(true);
    let pokemonsArray : Array<PokemonModel> = []

    await axios.get(url).then((response)=>{
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
    setLoading(false);
  }

  // Get Current Posts
  const indexOfLastItem = currentIndex * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pokemonsList.slice(indexOfFirstItem,indexOfLastItem);

  // Change Page
  const paginate = (pageNumber:number) => setCurrentIndex(pageNumber);

  return (
    <>
      <Header name = "" url = ""/>
      <div className="searchBar"> 
        <Search />
      </div>
      <div className="scrollWrapper">
        <div className="cardArea">
            {pokemonsList.length>0 && currentItems.map((item:PokemonModel, index:number)=>{
              return (
                <div className="cardAreaColumn">
                <PokemonCard key={index} pokemon={item} loading={loading}/>
                </div>
              )
            })}
        </div>
        <Pagination cardsPerPage = {itemsPerPage} totalCards = {pokemonsList.length} paginate={paginate}/>
      </div>
    </>
  );
}

export default App;
