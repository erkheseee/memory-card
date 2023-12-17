import { useState, useEffect } from 'react';
import './App.css'

const names = ['snorlax', 'charizard', 'meowth', 'squirtle', 'onix', 'eevee', 'pikachu', 'bulbasaur', 'greninja', 'mewtwo', 'jigglypuff', 'weedle'];
const temp = [];  

function App() {
  const [images, setImages] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    let ignore = false;
    names.map((name) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => response.json())
      .then(function (pokemon) {
        let object = {};
        object.src = pokemon['sprites']['front_default'];
        object.name = name;
        !ignore && temp.push(object);
      })
    });
    return () => { ignore = true };
  }, []);

  function shuffleCards() {
    const temp2 = [...temp].sort(() => Math.random() - 0.5).map((pokemon) => ({...pokemon, key: Math.random()}));
    console.log(temp2);
    setImages(temp2);
    setScore(0);
  }

  function handleCardClick(id) {
    console.log('hi');
  }

  return (
    <>
      <div>
        <button onClick={shuffleCards}>New Game</button>
        <div className='score'>
          <h3>Score: {score}</h3>
          <h3>Best Score: {bestScore}</h3>
        </div>
      </div>
      <div className='container'>
        {images.map(image => (
          <div className="card" key={image.key} onClick={handleCardClick(image.key)}><img src={image.src} alt={image.src} ></img><a>{images.name}</a></div>
        ))}
      </div>
    </>
  )
}

export default App
