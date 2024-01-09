import React from "react";
import "../css/UserInfo.css"
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

function UserInfo() {
    const [user, setUser] = useState(null);
    const [pokemonTypesFinal, setPokemonTypesFinal] = useState([]);
    const [shinyNumber, setShinyNumber] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the request headers
                }
            };
            const result = await axios.get(`http://localhost:3001/users/me`, config); // Pass the config object with headers
            setUser(result.data);  
            const pokemonTypes = {};
            result.data.pokemons.forEach(pokemon => {
                pokemon.types.forEach(type => {
                    if (!pokemonTypes[type]) {
                        pokemonTypes[type] = 1;
                    } else {
                        pokemonTypes[type] += 1;
                    }
                });
            });

            var shinyCount = 0;
            result.data.pokemons.forEach(pokemon => {
                if (pokemon.shiny === true) {
                    shinyCount += 1;
                }
            });
            console.log(pokemonTypes);
            setPokemonTypesFinal(Object.entries(pokemonTypes));
            setShinyNumber(shinyCount);
        };
        fetchData();
    }, [])

    return (
        <div className="UserInfo-div">
            {user && 
                <>
                    <p className="UserInfo-Title">
                        Some infos about you
                    </p>
                    <p className="UserInfo-text">
                        Your name : {user.username}
                    </p>
                    <p className="UserInfo-text">
                        Your id : {user._id}
                    </p>
                    <p className="UserInfo-text">
                        You have : {user.pokedollars} $ in your bank account
                    </p>
                    <p className="UserInfo-text">
                        You have {user.pokemons.length} pokemons
                    </p>
                    <p className="UserInfo-text">
                        Shiny Pokemons: {shinyNumber}
                    </p>
                    <p className="UserInfo-text">
                        Shiny repartitions: {shinyNumber/user.pokemons.length*100}%
                    </p>
                    <p className="UserInfo-text">
                        Pokemon Types: 
                        {pokemonTypesFinal.map(([type, count]) => (
                            <span key={type}> | {type} : {count} </span>
                        ))}
                    </p>
                    
                </>
            }
        </div>
    );
}

export default UserInfo;