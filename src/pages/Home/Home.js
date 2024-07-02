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
    const [answeredList,setAnsweredList]=useState([]);
    console.log(answeredList,"answer")
    useEffect(()=>{
     getQuestionList();
    },[]);

    useEffect(()=>{
        console.log(completed)
    },[currentIndex])

    const getQuestionList=async()=>{
    const response= await Questions();
    setQuestionsList(response?.questions);
    setPassmark(response?.passmark);
    }

    const setIndex=(type)=>{
        let completedPercent
        if(type==='Inc'){
        setCurrentIndex((prev)=>prev+1)
        completedPercent=(currentIndex+1)*100/questionsList?.length-1;
        }
    else{
        setCurrentIndex((prev)=>prev-1)
        completedPercent=(currentIndex-1)*100/questionsList?.length-1;
    }
    setCompleted(completedPercent);
    }
console.log(completed,"completed")
    return(
        <div className="App">
            <div style={{display:"flex",flexDirection:"column",height:"100vh", flexGrow: 1,gap:"80px"}}>
          
            <div className="progress-container"  >
                <Grid container item xs={12}>
        <Grid item xs={2} >
            {currentIndex!==0?
        <FontAwesomeIcon icon={faAngleLeft} onClick={()=>setIndex('Dec')}/>:
        ""}
        </Grid>
        <Grid item xs={8}>
        <span className={'labelStyles'} >{currentIndex}/{questionsList?.length-1}</span>
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
       
            <QuestionCard questionsList={questionsList} currentIndex={currentIndex} setCurrentIndex={(currentIndex)=>setCurrentIndex(currentIndex)} 
            answeredList={setAnsweredList} setAnsweredList={(answeredList)=>setAnsweredList(answeredList)} setCompleted={(completed)=>setCompleted}/>
       
        </div>
      </div>

    )
}
export default Home;