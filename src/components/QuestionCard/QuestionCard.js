import './questionCard.css';
const QuestionCard=({questionsList,currentIndex,setCurrentIndex,answeredList,setAnsweredList,setCompleted})=>{
    
   const setOptions=(index)=>{
    let answered={};
    answered.question=questionsList[currentIndex]?.question;
    answered.option=questionsList[currentIndex]?.options[index]?.label;
    answered.isCorrect=questionsList[currentIndex]?.options[index]?.isCorrect;
    setAnsweredList((prev)=>[...prev,answered]);
    let completedPercent;
    setCurrentIndex((prev)=>prev+1)
    completedPercent=(currentIndex+1)*100/questionsList?.length-1;
    setCompleted(completedPercent);
   }
    return(
        <div style={{display:"flex",flexDirection:"column",height:"100%",flexGrow:1,gap:"100px"}}>
           
            <span className="mainquestion">{questionsList[currentIndex]?.question}</span>
           
                <div className='options-container'>
           {questionsList[currentIndex]?.options?.map((item,index)=>(
            <div key={index} className="options" onClick={()=>setOptions(index)}>{item?.label}</div>
           ))}
           </div>
            
        </div>
    )
}
export default QuestionCard;