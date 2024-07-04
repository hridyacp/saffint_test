import { useEffect, useState } from "react";
import Questions from "../../api/Questions";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import QuestionCard from "../../components/QuestionCard/QuestionCard";

const Home=()=>{
    const [questionsList,setQuestionsList]=useState([]);
    const [currentIndex,setCurrentIndex]=useState(0);
    const [passMark,setPassmark]=useState(0);
    const [completed,setCompleted]=useState(0);
    const [isAnswered,setIsAnswered]=useState(false);

    useEffect(()=>{
     getQuestionList();
    },[]);

    useEffect(()=>{
        console.log(completed,'completed')
    },[currentIndex])

    const getQuestionList=async()=>{
    const response= await Questions();
    const data=response?.questions;
    data.forEach(function (element,index) {
        element.isAnswered = "false";
        element.answer="";
        element.id=index+1;
      });
    setQuestionsList(data);
    setPassmark(response?.passmark);
    }

    const setIndex=(type)=>{
        let completedPercent
        let count=questionsList.filter ((answer) => answer?.isAnswered === true).length
        console.log(count,"count")
        if(type==='Inc'){
            if(currentIndex<questionsList?.length)
        setCurrentIndex((prev)=>prev+1)
        }
    else if(type==='Dec'){
        if(currentIndex!==0)
        setCurrentIndex((prev)=>prev-1)
    }
    completedPercent=(count)*100/(questionsList?.length);
    setCompleted(completedPercent);
    }

    useEffect(()=>{
setIndex()
setIsAnswered(false);
    },[isAnswered])

    return(
        <div className="App">
            <div className="main-container">
          
            <div className="progress-container"  >
                <Grid container item xs={12}>
        <Grid item xs={2} >
            {currentIndex!==0?
        <FontAwesomeIcon icon={faAngleLeft} onClick={()=>setIndex('Dec')}/>:
        ""}
        </Grid>
        <Grid item xs={8}>
        <span className={'labelStyles'} >{currentIndex+1}/{questionsList?.length}</span>
        </Grid>
        <Grid item xs={2}>
        {currentIndex!==questionsList?.length-1?
        <FontAwesomeIcon icon={faAngleRight} onClick={()=>setIndex('Inc')}/>:
        ""}
        </Grid>
        </Grid>
    
        <Grid item xs={12} style={{display:"flex",justifyContent:"center"}}>
        <div className={'containerStyles'}>
      <div className={'fillerStyles'} style={{width:`${completed}%`}}>
      </div>
    </div>
        </Grid>
        </div>
        <div className="answered-count">
        <div>
Answered: {questionsList.filter ((answer) => answer?.isAnswered === true).length}
</div>
<div>
Not Answered: {questionsList?.length-questionsList.filter ((answer) => answer?.isAnswered === true).length}
</div>
        </div>
            <QuestionCard questionsList={questionsList} currentIndex={currentIndex} setCurrentIndex={(currentIndex)=>setCurrentIndex(currentIndex)} 
          setQuestionsList={(questionsList)=>setQuestionsList(questionsList)} setCompleted={(completed)=>setCompleted(completed)}
            isAnswered={isAnswered} setIsAnswered={(answered)=>setIsAnswered(answered)}/>
       
        </div>
      </div>

    )
}
export default Home;