import React from "react";
import "../css/UserInfo.css"
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

function UserInfo() {
    const [user, setUser] = useState(null);
    const [pokemonTypesFinal, setPokemonTypesFinal] = useState([]);
    const [shinyNumber, setShinyNumber] = useState(0);
    const [averageHeight, setAverageHeight] = useState(0);
    const [averageWeight, setAverageWeight] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('jwt');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the request headers
                }
            };
            console.log("we will perform a get request to /users/me");
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
            var height = 0;
            var weight = 0;
            result.data.pokemons.forEach(pokemon => {
                if (pokemon.height){
                    height += pokemon.height;
                }
                if (pokemon.weight){
                    weight += pokemon.weight;
                }
                if (pokemon.shiny === true) {
                    shinyCount += 1;
                }
            });
            console.log(pokemonTypes);
            setPokemonTypesFinal(Object.entries(pokemonTypes));
            setShinyNumber(shinyCount);
            setAverageHeight(Number((height/result.data.pokemons.length).toFixed(1)));
            setAverageWeight(Number((weight/result.data.pokemons.length).toFixed(1)));
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
                        Shiny repartitions: {Number(shinyNumber/user.pokemons.length*100).toFixed(1)}%
                    </p>
                    <p className="UserInfo-text">
                        Pokemon Types: 
                        {pokemonTypesFinal.map(([type, count]) => (
                            <span key={type}> | {type} : {count} </span>
                        ))}
                    </p>
                    <p className="UserInfo-text">
                        Average size of your pokemons {averageHeight} cm
                    </p>
                    <p className="UserInfo-text">
                        Average weight of your pokemons {averageWeight} kg
                    </p>
                </>
            }
        </div>
    );
}

export default UserInfo;