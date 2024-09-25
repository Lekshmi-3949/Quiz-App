import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";
import SnackbarContent from '@mui/material/SnackbarContent';


export default function Quiz(){
  const [userAnswers, setUserAnswers] = useState([]); 
  const [currentQuestionIndex,setcurrentQuestionIndex] = useState(0);
  const [quizIsComplete, setQuizIsComplete] = useState(false);
  const [showWarning, setShowWarning] = useState(false);


    const handleSelectAnswer = (answer) => {
        
        setUserAnswers((prevUserAnswers) =>{

            const updatedAnswers = [...prevUserAnswers];
            updatedAnswers[currentQuestionIndex] = answer;
            return updatedAnswers;
        });
        setShowWarning(false);
    };
    console.log(userAnswers);

   

    if (quizIsComplete){
         return <Summary userAnswers={userAnswers}/>
    }

    const handleNextQuestion = (answer) => {
        
        if (!userAnswers[currentQuestionIndex]) {
            setShowWarning(true);
            return; 
          }
    
        if (currentQuestionIndex < QUESTIONS.length -1){
          setcurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
           setQuizIsComplete(true);
        }
     
      }
      

      const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0){
          setcurrentQuestionIndex(currentQuestionIndex - 1);
        } else {
          alert("Wrong Index");
        }
      }  

      const handleSkipQuestion = () => {
        if (currentQuestionIndex < QUESTIONS.length -1){
            setcurrentQuestionIndex(currentQuestionIndex + 1);
            handleSelectAnswer(null)
          }else {
            setQuizIsComplete(true);
         }
      }


    return (
    <div id="quiz">
        
    <Question 
    index={currentQuestionIndex}
    onSelectAnswer={handleSelectAnswer}
     onSkipAnswer={handleSkipQuestion}
    onNextQuestion={handleNextQuestion}
    onPrevQuestion={handlePrevQuestion}
    />
    {showWarning && (
            <SnackbarContent style={{ marginTop: "10px"}}
            message={
               ' Please choose an option before proceeding to the next question.'
            }
            />
        )}
  </div>
 );
}