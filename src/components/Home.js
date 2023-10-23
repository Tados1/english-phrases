import './Home.css'
import { useState } from 'react'

const Home = ({ data }) => {
  const [randomWord, setRandomWord] = useState('')
  const [guessWord, setGuessWord] = useState('')
  const [isCorrectGuess, setIsCorrectGuess] = useState(false)
  const [isNotCorrectGuess, setIsNotCorrectGuess] = useState(false)
  const [readyToGuessing, setReadyToGuessing] = useState(false)
  const [hideStartGuessing, setHideStartGuessing] = useState(true)
  const [noPhrases, setNoPhrases] = useState(false)
  const [correctWord, setCorrectWord] = useState('')

  const startGuessing = () => {
    if (!data || data.length === 0) {
      setNoPhrases(true);
      return;
    } 
    setReadyToGuessing(true);
    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomWord(data[randomIndex].slovakWord);
    setCorrectWord(data[randomIndex].englishWord); 
    setHideStartGuessing(false);
  }

  const sendGuessWord = (e) => {
    e.preventDefault();
    
    if (guessWord.toLowerCase() === correctWord.toLowerCase()) {
      setIsCorrectGuess(true);
    } else {
      setIsNotCorrectGuess(true);
    }

    setTimeout(() => {
      setIsCorrectGuess(false);
      setIsNotCorrectGuess(false);
      setGuessWord('');
      startGuessing();
    }, 800);
  }

  return (
    <div className="content">
      {hideStartGuessing && <button onClick={startGuessing} className='start-button'>Start Guessing</button>}
      {noPhrases ? (
        <div>There are no more phrases...</div>
      ) : readyToGuessing && (
        <div className="guess-word">
          <div className='english-guess-word'><p>{randomWord}</p></div>
          <form>
            <input
              type="text"
              placeholder="Guess the phrase"
              onChange={(e) => setGuessWord(e.target.value)}
              value={guessWord}
            />
            <button onClick={sendGuessWord}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </form>
          {isCorrectGuess && <div className='right-answer'><h1>You guessed it!</h1></div>}
          {isNotCorrectGuess && 
            <div className='wrong-answer'>
              <h1>You didn't guess!</h1>
              <p>Right phrase is: {correctWord}</p>
            </div>}
        </div>
      )}
    </div>
  );
}

export default Home;