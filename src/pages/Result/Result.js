import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './result.css';
import { Grid } from "@mui/material";

const Result=()=>{
    const { state } = useLocation();
    const [totalAnswered,setTotalAnswered]=useState(null);
    const [correctAnswer, setCorrectAnswer]=useState(null);
    const [isPassed,setIsPassed]=useState(false);
    const [isCheck,setIsCheck]=useState(false);
    const navigate=useNavigate();
console.log(state?.completed,"comp")
    useEffect(()=>{
        const answeredCount = state?.questionsList.reduce((acc, item) => {
            if (item.options.find(option => option.isSelected===true && option.isCorrect===true)) {
              acc++;
            }
            return acc;
          }, 0);
          setCorrectAnswer(answeredCount);
        let percentage=answeredCount*100/state?.questionsList?.length;
        setTotalAnswered(percentage);
        if(percentage>=state?.passMark){
            setIsPassed(true)
        }
        else{
            setIsPassed(false);
        }
    },[])

    const retakeTest=()=>{
        navigate('/');
    }

    const checkAnswers=()=>{
        setIsCheck(true);
    }

    return(
        <div className="App">
        <div className="result-container">
        <Grid item xs={12}>
        <span className={'labelStyles'} >{(state?.currentIndex)+1}/{state?.questionsList?.length}</span>
        </Grid>
        {/* <Grid item xs={12} style={{display:"flex",justifyContent:"center"}}> */}
        <div className={'containerStyle'}>
      <div className={'fillerStyle'} style={{width:`${state?.completed}%`}}>
      </div>
    </div>
        {/* </Grid> */}
    <div className="answered-result">
    <div>
Answered: {state?.questionsList.filter ((answer) => answer?.isAnswered === true).length}
</div>
<div>
Not Answered: {state?.questionsList?.length-state?.questionsList.filter ((answer) => answer?.isAnswered === true).length}
</div>
    </div>
    <div className="total-result">
        {correctAnswer} out of {state?.questionsList?.length} answered correctly.
    </div>
    {isPassed?
    <div className="passed">Congratulations!! You have cleared the test. Your score is {totalAnswered}%.<div>You really 'mapped' out that quiz! Great job!</div><div className="link" onClick={checkAnswers}>Check answers</div> </div>:
    <div className="failed">Sorry, you did not clear the test. Your score is {totalAnswered}%. Passing score is 80%. <div>Don't worry, even great explorers got lost sometimes. Keep charting your course!</div>
    <div className="retake"><div className="link" onClick={retakeTest}> Take test again.</div> <div className="link"  onClick={checkAnswers}> Check answers </div></div></div>}
    {isCheck?    <div className='question-container'>
           
           <div className="mainquestion">{state?.questionsList[0]?.question}
           </div>
           
               <div className='main-questcontainer'>
               <div className='container'>
           <div className='decor-div1'></div>
           <div className='decor-div1'></div>
           <div className='decor-div1'></div>
           </div>
           <div className='options-container'>
          {state?.questionsList[0]?.options?.map((item,index)=>(
           <div className={`options-div-${item?.isSelected}`} key={index} >
          <div className='options-subdiv'> <div className={'sub-div'}></div><div className="options">{(index+1 + 9).toString(36)}</div></div><div  className="options">{item?.label}</div>
          
           </div>
          ))}
          </div>
          </div>
           
       </div>
        :""}
    </div>
  </div>
    )
}
export default Result;