import { useEffect, useState } from "react";
export default function Answers({answers, selectedAnswer, answerState, onSelect}) {

    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    useEffect(() => {
        const shuffled = [...answers].sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffled);
      }, [answers]);

    return(
        <ul id="answers">
        {shuffledAnswers.map((answer) => {
            const isSelected = selectedAnswer === answer;
            let cssClass = '';

            if (answerState === 'answered' && isSelected){
                cssClass = 'selected';
            }

            if ((answerState === 'correct' || answerState === 'wrong') && isSelected){
                cssClass = answerState;
            }

    return ( 
       <li key={answer}  className="answer">
         <button 
            onClick={ () => onSelect(answer)}  
            className={cssClass} 
            disabled={answerState !== ''}
            >
             {answer}
         </button>
        </li>      
       );
     })}
    </ul>
    );
}