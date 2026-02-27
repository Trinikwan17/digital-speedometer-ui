import "./Body.css";
import { useState, useEffect, useRef } from "react";
function Body(props)
{
    const questionbox = [
        "I have 2 apples and 3 oranges, which means I can make a delicious fruit salad.",
        "Today is 12th March, 2025, and the weather forecast says it will rain later.",
        "A rectangle has 4 sides and 4 angles, making it one of the simplest shapes.",
        "The bus arrived at 8:15 AM, just in time for the students to get to school.",
        "There are 24 hours in a day, but sometimes it feels like we need more time.",
        "Room temperature is 22 degree Celcius, which is considered comfortable for most people indoors."
      ];

      let [question, setQuestion] = useState("");
      let [answer, setAnswer] = useState("");

      let[wpm,setWpm] = useState(0);
      let[accuracy,setAccuracy] = useState(0);

      let[completed,setCompleted] = useState(false);

      let startTime = useRef(null);

      useEffect(()=>{
        reset(); 
      } , [] );

      function reset()
      {
        setQuestion(questionbox[Math.floor(Math.random() *questionbox.length)]);
        setAnswer("");
        setWpm(0);
        setAccuracy(0);
        setCompleted(false);
        startTime.current=null;
      }
      
      function handleChange(event)
      {
        if(!startTime.current)
        {
            startTime.current=Date.now();
        }
        setAnswer(event.target.value);
        calculateResults(event.target.value);

      }
      
function calculateResults(userInput) {
    if (!startTime.current) return;

    const elapsedTime = (Date.now() - startTime.current) / 60000;
    const totalChars = userInput.replace(/\s/g, "").length;
    const wordsTyped = totalChars / 5;
    const currentWpm = elapsedTime > 0 ? Math.round(wordsTyped / elapsedTime) : 0;
    setWpm(currentWpm);

    const totalTyped = userInput.length;
    const correctChars = userInput.split("").filter((char, i) => char === question[i]).length;
    setAccuracy(totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0);

    if (userInput === question) {
        setCompleted(true);
        const bestWpm = localStorage.getItem("bestWpm") || 0;

        if (currentWpm > bestWpm) {
            localStorage.setItem("bestWpm", currentWpm);
            
        }
    }
    
    if(userInput===question)
    {
        setCompleted(true);
        
    }
}

      return <div className="typing-container">
            <p className="question">
                {
                [...question].map((char,i)=><span className={char===answer[i]? "correct": answer[i]? "wrong":""}>{char}</span> )
                }</p>
            <textarea 
            className="answer"
            onChange={handleChange}
            value={answer}
            disabled={completed}
            placeholder="Start typing here..."
            />
            <div className="stats">
                <p>WPM: {wpm}</p>
                <p>Accuracy: {accuracy}%</p>
            </div>
            <button className="restart-btn" onClick={reset}>Restart</button>
        </div>
    }
    export default Body;