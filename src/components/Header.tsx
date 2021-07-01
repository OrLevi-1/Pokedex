import React from "react";
import logo from "../images/logo.png"

interface Props {
    name: string
    url: string
}

export const Header: React.FC<Props> = () => {
    return (

        <header className="pokedexHeader">
            <img src={logo} className="logo"></img>
        </header>
    )
}
