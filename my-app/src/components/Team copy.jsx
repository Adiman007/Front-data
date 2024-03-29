
import React, { useState,useEffect } from 'react';
import NewPokemonDisplay from './NewDisplay.jsx';
import axios from 'axios';
import '../css/Team.css';
import Cookies from 'js-cookie';


function Team(){
  const [pokemonList,setPokemonList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      //const token = localStorage.getItem('token'); // Get the user bearer token from local storage
      const token = Cookies.get('jwt');
      const config = {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      };
      const result = await axios.get(`https://backend-web-app.onrender.com/users/me`, config); // Pass the config object with headers
      setPokemonList(result.data.pokemons);
    };
    fetchData();
  }, []); // Add an empty dependency array
  
    return (
      <div className="Team">
        <table>
          <tbody>
            {pokemonList && pokemonList.map((pokemon, index) => { // Map over the list of Pokemon and display each one
                return (
                  <>
                    <td key={pokemon.name}>
                      <NewPokemonDisplay name={pokemon.id} shiny={pokemon.shiny} /> {/* Pass the pokemon object and shiny value as separate props to PokemonDisplay */}
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