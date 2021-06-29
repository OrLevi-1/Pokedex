import axios from 'axios';
import React , {useState} from 'react'
import img1 from "../images/logo.png"
import PokemonModel from '../models/pokemon.model';

interface PokemonCardProps {
    pokemon : PokemonModel;
}

export const PokemonCard: React.FC<PokemonCardProps> = (props:PokemonCardProps) => {

    const[pokemonImage,setPokemonImage] = useState<string>();

    axios.get(props.pokemon.url).then((response)=>{
        console.log("image",response.data.sprites.front_default);
        setPokemonImage(response.data.sprites.front_default);
    }).catch((error)=>{
      console.log("error: ",error)
    })
        return (
            <div className = "pokemonCard">
                <div className="pokemonCardWrapper">
                    <div className="pokemonImage">
                        <img src={pokemonImage} alt={"image"}/>
                    </div>
                    <div className="pokemonName">
                        {props.pokemon.name}
                    </div>
                </div>
            </div>
            
        );
}