import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Cookies from 'js-cookie';

const PokemonTypeHistogram = () => {
  const [chartData, setChartData] = useState(null);

useEffect(() => {
    const fetchData = async () => {
        const token = Cookies.get('jwt');
        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the request headers
            }
        };
        const result = await axios.get(`http://localhost:3001/users/me`, config); // Pass the config object with headers
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

        console.log(pokemonTypes);
        setChartData(
            {
                labels: Object.keys(pokemonTypes),
                datasets: [
                    {
                        label: 'Number of pokemons',
                        data: Object.values(pokemonTypes),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1,
                    },
                ],
            }
        );
    };
    fetchData();
}, [])

  return (
    <div>
        {chartData && console.log(chartData)}
    {chartData &&
      <Bar
      key={chartData.labels.join(',')}
      data={chartData}
      options={{
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }}
    />
    }
    </div>
  );
}

export default PokemonTypeHistogram;