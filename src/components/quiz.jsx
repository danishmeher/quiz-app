import React from "react";
import "./quiz.css";
import { data } from "../assets/data.js";
import { useState } from "react";
import { useRef } from "react";
const quiz = () => {
  const [index, setindex] = useState(0);
  const [questions, setquestions] = useState(data[index]);
    const [lock, setlock] = useState(false)
    const [score, setscore] = useState(0)
    const [result, setresult] = useState(false)

    let option1 = useRef(null)
    let option2 = useRef(null)
    let option3 = useRef(null)
    let option4 = useRef(null)

    let option_array = [option1 , option2 , option3 , option4];

  const checkAns = (e, ans) => {
    if(lock===false){
    if (questions.ans === ans) {
      e.target.classList.add("correct");
      setlock(true);
      setscore(prev=>prev+1)
    }
    else{
        e.target.classList.add("wrong");
        setlock(true)
        option_array[questions.ans-1].current.classList.add("correct")
    }    
    }
  };
  const nextQ = (i)=>{
    if(lock===true){
      if(i===data.length-1){
        setresult(true);
        return 0;
      }
      setindex(i=>i+1);
        setquestions(data[++i])
        setlock(false)
        option_array.map((option)=>{
          option.current.classList.remove("correct")
          option.current.classList.remove("wrong")})
    }
  }
  const reset = ()=>{
    setindex(0);
    setquestions(data[0]);
    setscore(0);
    setresult(false)
    setlock(false)
  }
  return (
    <>
    <div className="container">
      <h1>Quiz App</h1>
       <hr />
      {result ? " " : 
        <>
      <h2>
        {index + 1}.{questions.question}
      </h2>
      <ul>
        <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{questions.option1}</li>
        <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{questions.option2}</li>
        <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{questions.option3}</li>
        <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{questions.option4}</li>
      </ul>
      
      <button onClick={()=> nextQ(index)}>Next</button>
      
      <div className="index">{index+1} of 5 questions</div>
    </>
      }
      {result ?<><h2>You Score {score} out of {data.length}</h2>
      <button onClick={()=>reset()}>Reset</button>
      </> : " "}
   
    </div>
    
  </>
  );
  
};

export default quiz;
