import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [images, setImages] = useState([]);

  function fetchPokemonData(pokemon) {
    let url = pokemon.url // <--- this is saving the pokemon url to a      variable to us in a fetch.(Ex: https://pokeapi.co/api/v2/pokemon/1/)
    fetch(url)
      .then(response => response.json())
      .then(function (pokeData) {
        let object = {};
        object.src = pokeData['sprites']['front_default'];
        object.key = Math.random();
        setImages(current => [...current, object]);
      })
  }

  const retrieveData = async () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=6&offset=30')
      .then(response => response.json())
      .then(function (allpokemon) {
        allpokemon.results.forEach(function (pokemon) {
          fetchPokemonData(pokemon);
        })
      })
  }

  useEffect(() => {
    retrieveData();
  }, []);

  console.log(images);

  return (
      <div className='App'>
        {images.map(image => (
          <div key={image.key}><img src={image.src} alt={image.src} ></img></div>
        ))}
      </div>
  )
}

export default App
