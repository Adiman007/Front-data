import React, { useState,useEffect } from "react";
import NewPokemonDisplay from "../components/NewDisplay";
import axios from "axios";
import "../css/RandomPage.css";
import Navbar from "../components/navbar";

export default function RandomPage()  {
  const randomPokemonId = Math.floor(Math.random() * 1000) + 1
  const [pokemon, setPokemon] = useState(randomPokemonId);
  const [shiny, setShiny] = useState(false);
  const [dollars, setDollars] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonList,setPokemonList] = useState([]);
  const [payment,setPayment] = useState(100);
  const shinyChance = Math.random();
  console.log(shinyChance);
  const shinyPrice = 1500;
  const basicPrice = 100;

  useEffect(() => {
    const getUser = async () => {
      //const token = localStorage.getItem('token'); // Get the user bearer token from local storage
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTljMTg0NDE3Y2U2ZGRjMTJmOWY0MTAiLCJpYXQiOjE3MDQ3MzAxODZ9.Wom3mkKXoB5f3P8pSHzwH_puRnnIm3nkGqsYNmsvVUM";
    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the request headers
      }
    };
    const result = await axios.get(`http://localhost:3001/users/me`, config); // Pass the config object with headers
    console.log(result.data);
    setPokemonList(result.data.pokemons);
    setDollars(result.data.pokedollars);
    };
  getUser();
}, []); 
    
  useEffect(() => {
    const getPokemonName = async () => {
        
        const result = await axios(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      setPokemonName(result.data.name);
    };
    getPokemonName();
  }, [pokemon]);

  function hacthPokemonClick() {
    if (dollars < basicPrice && shiny === false) {
      alert("You don't have enough money to hatch a pokemon");
      return;
    } 
    if (dollars < shinyPrice && shiny === true) {
      alert("You don't have enough money to hatch a shiny pokemon");
      return;
    }
    while (pokemon in pokemonList){
      setPokemon(Math.floor(Math.random() * 1000) + 1);
    }
    if (shiny === false) {
      setPayment(-basicPrice);
    } else {
      setPayment(-shinyPrice);
    }
    if (shinyChance >= 0.95 && shiny === false) {
      setShiny(true);
    }
    //const token = localStorage.getItem('token'); // Get the user bearer token from local storage
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTljMTg0NDE3Y2U2ZGRjMTJmOWY0MTAiLCJpYXQiOjE3MDQ3MzAxODZ9.Wom3mkKXoB5f3P8pSHzwH_puRnnIm3nkGqsYNmsvVUM";
    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the request headersz
      }
    };
    const result = axios.patch(`http://localhost:3001/users/me`, { pokemons: {id: pokemon, name: pokemonName, shiny: shiny}, pokedollars: payment }, config); // Pass the data payload along with the config object
    console.log(result);
  }

    return (
      <>
      <Navbar />
      <div className="pokemon">
        <NewPokemonDisplay name={pokemon} shiny={shiny}/>
        <p className="money">${dollars}$</p>
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