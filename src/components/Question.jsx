import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import { useState, useEffect } from "react";
import QUESTIONS from "../questions.js"


export default function Question({
    key,
    index,
    onSelectAnswer,  
    onSkipAnswer,
    onNextQuestion,
    onPrevQuestion
   }) {
 

     const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
      });

    useEffect(() => {
      setAnswer({
        selectedAnswer: "",
        isCorrect: null,
      });
    }, [index]);

    let answerState = '';

    if ( answer.selectedAnswer && answer.isCorrect !== null){
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if (answer.selectedAnswer) {
        answerState = 'answered' ;
    }

    const handleSelectAnswer = (selected) => {
      setAnswer({
        selectedAnswer: selected,
        isCorrect: null, 
      });
      onSelectAnswer(selected); 
    };


    return (
    <div id="question">
        <h2>{QUESTIONS[index].text}</h2>
       <Answers 
       answers={QUESTIONS[index].answers} 
       selectedAnswer={answer.selectedAnswer}
       answerState={answerState}
       onSelect={handleSelectAnswer}
       />
    
     
       
       <button style={{ marginRight: '10px' }} className='bton' onClick={onPrevQuestion}>
         Prev
       </button>
       <button style={{ marginRight: '10px' }} className='bton' onClick={onSkipAnswer}>
         Skip
       </button>
       <button 
          style={{ marginRight: '10px' , marginTop: '10px'}} 
          className='bton' 
          onClick={onNextQuestion}
          >
         Next
       </button>
    </div>
    );
}