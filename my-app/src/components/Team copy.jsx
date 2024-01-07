
import React, { useState,useEffect } from 'react';
import NewPokemonDisplay from './NewDisplay.jsx';
import '../css/Team.css';

const pokemonList = [{name: "pikachu", shiny: false},{name:'1005',shiny:false},{name:'65',shiny:true},{name:'25',shiny:true},{name:"kyogre",shiny:true}, {name: "charizard", shiny: true},{name:18,shiny:true}];
function Team(){
/*
  useEffect(() => {
    const fetchData = async () => {
        const result = await axios(
        `https://pokeapi.co/api/v2/pokemon/${rand}`
      );
      setPokemonList(result.data);
    };
    fetchData();
  }, [pokemonList]);
  */
    return (
      <div className="Team">
        <table>
          <tbody>
            {pokemonList && pokemonList.map((pokemon, index) => { // Map over the list of Pokemon and display each one
                return (
                  <>
                    <td key={pokemon.name}>
                      <NewPokemonDisplay name={pokemon.name} shiny={pokemon.shiny} /> {/* Pass the pokemon object and shiny value as separate props to PokemonDisplay */}
                    </td>
                    {(index + 1) % 3 === 0 && <tr></tr>} {/* Add a line break after every 3 pokemons */}
                  </>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    );
}

export default Team;