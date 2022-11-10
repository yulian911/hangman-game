import React from 'react'


type HangmanWordProps = {
    guessesLetters: string[]
    wordToGuess: string
    reveal:boolean
  }
  

const HangManWord = ({guessesLetters,wordToGuess,  reveal = false,}:HangmanWordProps) => {


  return (
    <div style={{display:'flex',gap:".25em",fontSize:'4rem',fontWeight:"bold",textTransform:'uppercase',fontFamily:"monospace"}}>
        {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          <span
            style={{
              visibility:
              guessesLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessesLetters.includes(letter) && reveal ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  )
}

export default HangManWord