import React, { useEffect, useState,Component } from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../css/histo.css"

const options = {
  title: 'Repartition of your pokemons by type',
  legend: { position: 'top', maxLines: 2 },
  interpolateNulls: false,
}
const options2 = {
  title: "Lengths of dinosaurs, in meters",
  legend: { position: "none" },
  interpolateNulls: false,
};
const options3 = {
    title: "Company Performance",
    curveType: "function",
    legend: { position: "top" },
    interpolateNulls: false,
};


const PokemonTypeHistogram = () => {
  const [chartData, setChartData] = useState(null);
  const [chartData2, setChartData2] = useState(null);
  const [chartData3, setChartData3] = useState(null);

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
        const listNameHeight = [["name","height"]];
        const listHeightWeight = [["name","weight"]];
        result.data.pokemons.forEach(pokemon => {
          listNameHeight.push([pokemon.name,pokemon.height]);
          listHeightWeight.push([pokemon.height,pokemon.weight]);
          pokemon.types.forEach(type => {
            if (!pokemonTypes[type]) {
              pokemonTypes[type] = 1;
            } else {
              pokemonTypes[type] += 1;
            }
          });
        });
        console.log(listNameHeight);
        const keys = Object.keys(pokemonTypes);
        const values = Object.values(pokemonTypes);
        var list=[["Types","Number"]];
        for (let i = 0; i < keys.length; i++) {
          list.push([keys[i],values[i]])
        }
        setChartData(list); // Set the chartData to the list array
        setChartData2(listNameHeight);
        setChartData3(listHeightWeight);
        
    };
    fetchData();
}, [])

  return (
    <>
    <table className="table">
      <thead>
        <tr>
          <td>
              <div className="Piechart-types">
                  <h2>Piechart of your Pokemon types</h2>
                  <Chart
                    chartType="PieChart"
                    data={chartData}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                  />

                </div>
          </td>
          <td>
              <div className="Histogram-types">
                <h2>Histogram of your Pokemon types</h2>
                <Chart
                  chartType="BarChart"
                  data={chartData}
                  options={options}
                  width={"100%"}
                  height={"400px"}
                />
                </div>
           </td>
        </tr>
    <tr>
      <td>
    <div className="Histogram-types">
      <h2>Repartition of Pokemons' height</h2>
      <Chart
        chartType="Histogram"
        data={chartData2}
        options={options2}
        width={"100%"}
        height={"400px"}
      />
    </div>
    </td>
    <td>
    <div className="Histogram-types">
      <h2>Pokemons' heigth relative to weigth</h2>
      <Chart
        chartType="Scatter"
        width="80%"
        height="400px"
        data={chartData3}
        options={options3}
      />
    </div>
    </td>
    </tr>
    </thead>
    </table>
    </>
  );
}

export default PokemonTypeHistogram;