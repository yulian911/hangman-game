import { useCallback, useEffect, useState } from 'react'
import words from './wordList.json'

import HangManDrawing from './HangManDrawing';
import HangManWord from './HangManWord';
import Keyboard from './Keyboard';

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessesLetters, setGuessesLetters] = useState<string[]>([])

  const incorrectLetters =guessesLetters.filter(letter =>!wordToGuess.includes(letter))

  console.log(wordToGuess)
  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess
    .split("")
    .every(letter => guessesLetters.includes(letter))
    
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessesLetters.includes(letter) || isLoser || isWinner) return

      setGuessesLetters(currentLetters => [...currentLetters, letter])
    },
    [guessesLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [guessesLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== "Enter") return

      e.preventDefault()
      setGuessesLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])
  


  return (
    <div style={{
      maxWidth:"800px",
      display: "flex",
      flexDirection:'column',
      gap: "2px",
      margin: "0 auto",
      alignItems:"center",
    }}>
      <div style={{fontSize:"2rem", textAlign:'center'}}>
      {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try - Refresh to try again"}
      </div>
      <HangManDrawing numberOfGuesses ={incorrectLetters.length}/>
      <HangManWord guessesLetters={guessesLetters} wordToGuess={wordToGuess} reveal={isLoser}/>
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessesLetters.filter(letter =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
      
    </div>
  )
}

export default App
