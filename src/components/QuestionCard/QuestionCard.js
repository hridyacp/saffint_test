import { useEffect, useState } from 'react';
import './questionCard.css';
const QuestionCard=({questionsList,currentIndex,setCurrentIndex,setQuestionsList,setCompleted,setIsAnswered})=>{
    const [isClicked,setIsClicked]=useState(false);
    const [isActive,setIsActive]=useState(null);
    console.log(questionsList,currentIndex,"quest")
   const setOptions=(index)=>{
    setIsClicked(true);
    setIsActive(index);
    // setTimeout(()=>{
    //     let currentAnswered={};
    //     let answered=[];
    //     answered=answeredList;
    //     console.log(answered);
    //     currentAnswered.id=currentIndex+1;
    //     currentAnswered.question=questionsList[currentIndex]?.question;
    //     currentAnswered.option=questionsList[currentIndex]?.options[index]?.label;
    //     currentAnswered.isCorrect=questionsList[currentIndex]?.options[index]?.isCorrect;
        
    //    const uniqueAnswered=answered.filter((item)=>{return item.id!==currentAnswered.id});
    //    console.log(uniqueAnswered,"unique")
    //    uniqueAnswered.push(currentAnswered);
        
    //     setAnsweredList(uniqueAnswered);
        
    //     let completedPercent;
    //     setCurrentIndex((prev)=>prev+1)
    //     completedPercent=(currentIndex+1)*100/questionsList?.length-1;
    //     setCompleted(completedPercent);
    //     setIsClicked(false);
    //     setIsActive(null);
    // },3000)
    setTimeout(()=>{
        let currentAnswered=questionsList;
        let answeredId = currentAnswered.findIndex(o => o.id === currentIndex+1 );
        currentAnswered[answeredId].answer=questionsList[currentIndex]?.options[index]?.label;
         currentAnswered[answeredId].isAnswered=true;
         setQuestionsList(currentAnswered);
         if(currentIndex<questionsList?.length){
         setCurrentIndex((prev)=>prev+1);
         }
         setIsAnswered(true);
        setIsClicked(false);
        setIsActive(null);
    },3000)
   }

    return(
        <div className='question-container'>
           
            <div className="mainquestion">{questionsList[currentIndex]?.question}
            </div>
            
                <div className='main-questcontainer'>
                <div className='container'>
            <div className='decor-div1'></div>
            <div className='decor-div1'></div>
            <div className='decor-div1'></div>
            </div>
            <div className='options-container'>
           {questionsList[currentIndex]?.options?.map((item,index)=>(
            <div className={isActive===index?'options-div active':'options-div'} key={index} onClick={()=>setOptions(index)}>
           <div className='options-subdiv'> <div className={'sub-div'}></div><div className="options">{(index+1 + 9).toString(36)}</div></div><div  className="options">{item?.label}{isClicked && isActive===index?<div className="loading"></div>:""}</div>
           
            </div>
           ))}
           </div>
           </div>
            
        </div>
    )
}
export default QuestionCard;