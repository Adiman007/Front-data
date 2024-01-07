import React, { useState } from "react";
import NewPokemonDisplay from "../components/NewDisplay";
import "../css/RandomPage.css";
import Navbar from "../components/navbar";

export default function RandomPage()  {
  const randomPokemonId = Math.floor(Math.random() * 1000) + 1
  const [pokemon, setPokemon] = useState(randomPokemonId);
  const [shiny, setShiny] = useState(false);
  const [randShiny, setRandShiny] = useState(false);

  function hacthPokemonClick() {
    setPokemon(Math.floor(Math.random() * 1000) + 1);
  }

    return (
      <>
      <Navbar />
      <div className="pokemon">
        <NewPokemonDisplay name={pokemon} shiny={shiny}/>
        <button className="pokemon-button" onClick={() => setShiny(!shiny)}>
        swap to {!shiny ? "100% shiny chance" : "5% shiny chance"}
        </button>
        <button className="pokemon-button" onClick={hacthPokemonClick}>
          Hacth a random {shiny ? "shiny" : ""} pokemon {shiny ? "1500$" : "100$"}
        </button>
      </div>
      </>
    );
  }