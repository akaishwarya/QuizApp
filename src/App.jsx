
import { useState } from 'react'
import './App.css'
import questionData from "./question.json"
import { useEffect } from 'react';

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, SetScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
      let interval;
      if(timer> 0 && !showScore){
        interval = setInterval(() => {
          setTimer((prevTime) => prevTime - 1)
        }, 1000);
      }else{
       
        setShowScore(true);
      }

      return () => clearInterval(interval)
  }, [timer, showScore])

  const handleAnswerClick = (selecteOption) => {
    if(selecteOption === questionData[currentQuestion].correctOption){
      SetScore((prevScore) => prevScore + 1)
    }
    if(currentQuestion < questionData.length-1){
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10)
    } else{
      setShowScore(true)
    }

  }

  const handleRestartQuiz = () =>  {
    setCurrentQuestion(0);
    SetScore(0);
    setShowScore(false);
    setTimer(10);
  }


  return (
    <>
        <div className='quiz-app'>
         { showScore ?  (<div className="score-section"  >
            <h2>Your Score: {score}/{questionData.length }</h2>
            <button onClick={handleRestartQuiz}>Restart</button>
          </div> ) : (<div className='question-section'>
            <h2>Question {currentQuestion + 1}</h2>
            <p>{questionData[currentQuestion].question}</p>
            <div className="options">
             {questionData[currentQuestion].options.map((option, index) => (<button onClick={() => handleAnswerClick(option)} key={index}>{option}</button>))}
            </div>
            <div className="timer">Time Left: <span>{timer}s</span></div>

          </div>)}

          
        </div>
    </>
  )
}

export default App
