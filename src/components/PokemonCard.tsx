import axios from 'axios';
import React, { useState } from 'react'
import PokemonModel from '../models/pokemon.model';
import Swal from 'sweetalert2';

interface PokemonCardProps {
    pokemon: PokemonModel;
    loading: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = (props: PokemonCardProps) => {
    const Swal = require('sweetalert2');
    const [pokemonImage, setPokemonImage] = useState<string>();

    axios.get(props.pokemon.url).then((response) => {
        //console.log("image",response.data.sprites.front_default);
        setPokemonImage(response.data.sprites.front_default);
    }).catch((error) => {
        console.log("error: ", error)
    })
    if (props.loading) {
        return <h2>Loading...</h2>
    }
    return (
        <div className="pokemonCard" onClick={() => Swal.fire({
            title: props.pokemon.name
        })}>
            <div className="pokemonCardWrapper">
                <div className="pokemonImage">
                    <img src={pokemonImage} alt={"image"} />
                </div>
                <div className="pokemonName">
                    {props.pokemon.name}
                </div>
            </div>
        </div>

    );
}