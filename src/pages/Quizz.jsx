import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import './Quizz.css';

function Quizz() {
  const [countryList, setCountryList] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        const filtered = res.data.filter(c => c.flags && c.name);
        setCountryList(filtered);
        const country = getRandomCountry(filtered);
        setCurrentCountry(country);
        setOptions(generateOptions(country, filtered));
      })
      .catch(err => console.error(err));
  }, []);

  const getRandomCountry = (list) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  const generateOptions = (correct, list) => {
    const options = [correct];
    while (options.length < 3) {
      const random = getRandomCountry(list);
      if (!options.find(c => c.name.common === random.name.common)) {
        options.push(random);
      }
    }
    return shuffleArray(options);
  };

  const shuffleArray = (arr) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  const handleChoice = (choice) => {
    if (choice.name.common === currentCountry.name.common) {
      setReveal(true);
      setTimeout(() => {
        const newCountry = getRandomCountry(countryList);
        setScore(score + 1);
        setCurrentCountry(newCountry);
        setOptions(generateOptions(newCountry, countryList));
        setReveal(false);
      }, 1000);
    } else {
      setGameOver(true);
    }
  };

  const handleReplay = () => {
    const newCountry = getRandomCountry(countryList);
    setScore(0);
    setGameOver(false);
    setCurrentCountry(newCountry);
    setOptions(generateOptions(newCountry, countryList));
    setReveal(false);
  };

  if (!currentCountry) return <p>Chargement...</p>;

  return (
    <div 
      className="quiz-background"
      style={{
        backgroundImage: currentCountry ? 
          `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${currentCountry.flags.svg})` : 
          'none'
      }}
    >
      <div className="quiz-content">
        <div className="quiz-container">
          <h2>Quel est ce pays ?</h2>
          <img
            src={currentCountry.flags.png}
            alt="drapeau"
            className={`quiz-flag ${reveal ? 'reveal' : ''}`}
          />

          {!gameOver ? (
            <div className="quiz-active">
              <div className="choices">
                {options.map((opt, idx) => (
                  <button key={idx} onClick={() => handleChoice(opt)}>
                    {opt.name.common}
                  </button>
                ))}
              </div>
              <p className="score">Score : {score}</p>
            </div>
          ) : (
            <div className="quiz-over">
              <p>Raté ! C'était : {currentCountry.name.common}</p>
              <p>Score final : {score}</p>
              <button className="replay-btn" onClick={handleReplay}>Rejouer</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quizz;
