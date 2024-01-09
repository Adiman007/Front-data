import React, { useState, useEffect } from "react";
import "../css/RandomPage.css";
import axios from "axios";
import Cookies from 'js-cookie';
import NewPokemonDisplay from "../components/NewDisplay";
import Navbar from "../components/navbar";

export default function RandomPage()  {
  const [money, setMoney] = useState(0); // initial money
  const pokemonCost = 100;
  const pokemonCostShiny =1500; // cost to hatch a pokemon
  const [pokemon, setPokemon] = useState(null); // initial pokemon
  const [shiny, setShiny] = useState(false); // initial shiny value
  const [payment,setPayment] = useState(100); // initial payment value

  useEffect(() => {
    const token = Cookies.get('jwt');
    const config = {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the request headers
      }
    };
    axios.get('http://localhost:3001/users/me', config)
      .then(response => {
        setMoney(response.data.pokedollars);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  useEffect(() => {
    if (shiny === true) {
      setPayment(- pokemonCostShiny);
    } else {
      setPayment(- pokemonCost);
    }
  }, [shiny]);

  useEffect(() => {
    if (pokemon){
    const token = Cookies.get('jwt');
    setMoney(money + payment);
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      };
      const types = pokemon.types.map(type => type.type.name);
      axios.patch('http://localhost:3001/users/me', { pokemons: { id: pokemon.id, name: pokemon.name, height: pokemon.height , weight: pokemon.weight, types: types ,shiny: shiny }, pokedollars : payment }, config)
        .then(response => {
          console.log('Pokemon added to user database:', response.data);
        })
        .catch(error => {
          console.error('There was an error adding the Pokemon to user database:', error);
        });
      }
  }, [pokemon]);

  const getRandomPokemon = async () => {
    const rand = Math.floor(Math.random() * 1010) + 1;
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${rand}`)
      .then(response => {
        setPokemon(response.data);
        return response.data;
      });
  }

  const hatchPokemon = async () => {
    var cost = pokemonCost;
    if(shiny){
      cost = pokemonCostShiny;
    }
    if (money >= cost) {
      await getRandomPokemon();
    } else {
      alert("You don't have enough money to hatch a Pokemon");
    }
  }

  return (
    <>
      <Navbar />
      <div className="pokemon">
        <div className="money-display">You have ${money}</div>
        {pokemon && <div className="pokemon-name-display">Your new Pokemon is {pokemon.name}
        <NewPokemonDisplay name={pokemon && pokemon.name} shiny={shiny} />
        </div>
        }
        
        <button className="pokemon-button" onClick={() => setShiny(!shiny)}>
        swap to {!shiny ? "100% shiny chance" : "5% shiny chance"}
        </button>
        <button className="pokemon-button" onClick={hatchPokemon}>
          Hacth a random {shiny ? "shiny" : ""} pokemon {shiny ? "1500$" : "100$"}
        </button>
      </div>
    </>
  );
}