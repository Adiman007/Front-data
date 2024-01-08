import React, { useState,useEffect } from "react";
import NewPokemonDisplay from "../components/NewDisplay";
import axios from "axios";
import "../css/RandomPage.css";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";

export default function RandomPage()  {
  const randomPokemonId = Math.floor(Math.random() * 1000) + 1
  const [pokemon, setPokemon] = useState(randomPokemonId);
  const [shiny, setShiny] = useState(false);
  const [dollars, setDollars] = useState(null);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonList,setPokemonList] = useState([]);
  const [payment,setPayment] = useState(null);
  const shinyChance = Math.random();
  
  const shinyPrice = -1500;
  const basicPrice = -100;

  useEffect(() => {
    const getUser = async () => {    
    const token = Cookies.get('jwt');
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
    console.log(`c'est un shiny ? ${shiny}`);
    setPayment(-100);
    if (shiny === true) {
      setPayment(-1500);
    }
    
    if (shinyChance >= 0.95 && shiny === false) {
      setShiny(true);
    }
    const token = Cookies.get('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the request headersz
      }
    };
    console.log(payment)

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