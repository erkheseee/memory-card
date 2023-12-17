import { useState, useEffect } from 'react';
import './App.css'

const names = ['snorlax', 'charizard', 'meowth', 'squirtle', 'onix', 'eevee', 'pikachu', 'bulbasaur', 'greninja', 'mewtwo', 'jigglypuff', 'weedle'];
const temp = [];  

function App() {
  const [images, setImages] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

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

  useEffect(() => {
    bestScore == 12 && alert("You have won");
  },[bestScore])

  function shuffleNewCards() {
    // console.log("AAAAAAAAAAAA");
      const temp2 = [...temp].sort(() => Math.random() - 0.5).map((pokemon) => ({...pokemon, key: Math.random()}));
      setImages(temp2);
      setScore(0);
      setClickedCards([]);
    }

  function shuffleCards() {
      // console.log('BBBBBBBBBBB');
      const temp2 = [...images].sort(() => Math.random() - 0.5).map((pokemon) => ({...pokemon}));
      setImages(temp2);
    }

  function handleCardClick(id) {
    if (clickedCards.includes(id) == true){
        shuffleNewCards();
        alert("Game Over!")
    }
    if (!clickedCards.includes(id) == true){
    setClickedCards(current => [...current, id]);
    setScore(score+1);
    bestScore<=score && setBestScore(score+1);
    score == 12 && alert("You Win!");
    shuffleCards();
    }
  }

  return (
    <>
      <div>
        <h1 style={{color: 'orange'}}>Pokémon Memory Card Game by @erkheseee</h1>
        <button onClick={shuffleNewCards}>New Game</button>
        <div className='score'>
          <h3>Score: {score}</h3>
          <h3>Best Score: {bestScore}</h3>
        </div>
      </div>
      <div className='container'>
        {images.map(image => (
          <div className="card" key={image.key} onClick={() => {handleCardClick(image.key)}}><img src={image.src} alt={image.src} ></img><a>{images.name}</a></div>
        ))}
      </div>
      <h2 style={{color: 'orange'}}>Get points by clicking on a pokémon, but do not click on any more than once!</h2>
    </>
  )
}

export default App
