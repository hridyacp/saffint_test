import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './result.css';
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const Result = () => {
    const { state } = useLocation();
    const [totalAnswered, setTotalAnswered] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [isPassed, setIsPassed] = useState(false);
    const [isCheck, setIsCheck] = useState(false);
    const navigate = useNavigate();
    console.log(state?.completed, "comp")
    useEffect(() => {
        const answeredCount = state?.questionsList.reduce((acc, item) => {
            if (item.options.find(option => option.isSelected === true && option.isCorrect === true)) {
                acc++;
            }
            return acc;
        }, 0);
        setCorrectAnswer(answeredCount);
        let percentage = answeredCount * 100 / state?.questionsList?.length;
        setTotalAnswered(percentage);
        if (percentage >= state?.passMark) {
            setIsPassed(true)
        }
        else {
            setIsPassed(false);
        }
    }, [])

    const retakeTest = () => {
        navigate('/');
    }

    const checkAnswers = () => {
        setIsCheck(true);
    }

    return (
        <div className="App">
            <div className="result-container">
                {/* <div className="answered-percent">
                    <div className="correct-answer">
                        <FontAwesomeIcon icon={faCheck} />{correctAnswer}<div className="divide"></div> {totalAnswered}%
                    </div>
                    <div className="wrong-answer">
                        <FontAwesomeIcon icon={faXmark} />{wrongAnswer}<div className="divide"></div> {wrongPercent}%
                    </div>
                </div> */}
             
                <div className="message-container">
                <div className="inspire">Great Work!!</div>
                <div>
                {isPassed ?
                    <div className="passed">Congratulations!! You have cleared the test.<div>You really 'mapped' out that quiz! Great job!</div>
                        <div className="retake"><div className="link" onClick={retakeTest}> Take test again.</div> <div className="link" onClick={checkAnswers}>Check answers</div></div> </div> :
                    <div className="failed">You are almost there. <div>Don't worry, even great explorers got lost sometimes. Keep charting your course!</div>
                        <div className="retake"><div className="link" onClick={retakeTest}> Take test again.</div> <div className="link" onClick={checkAnswers}> Check answers </div></div></div>}
                        </div>
                        </div>
                        <Grid container className={"answered-result"} justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={6} md={3} >
                        Answered: {state?.questionsList.filter((answer) => answer?.isAnswered === true).length}
                    </Grid>
                    <Grid item xs={6} md={3}>
                        Skipped: {state?.questionsList?.length - state?.questionsList.filter((answer) => answer?.isAnswered === true).length}
                    </Grid>
                    <Grid item xs={6} md={3}>
                       Correct Answer: {correctAnswer}
                    </Grid>
                    <Grid item xs={6} md={3}>
                       Percentage: {totalAnswered}%
                    </Grid>
                </Grid>

                <Grid container className="total-result">
                    <Grid item xs={6}>{correctAnswer} out of {state?.questionsList?.length} answered correctly.</Grid> 
                    <Grid item xs={6}>Passing score is 80%.</Grid>
                </Grid>
                        <div>
                {isCheck ?
                     <Grid container rowSpacing={2} justifyContent={"flex-start"}>
                        {state?.questionsList?.map((quest,i) => (
                            <Grid item md={6} xs={12} style={{ paddingLeft: "10%" }}>
                                <div className='question-contain'>
                                   <div className="mainquestion">{i+1}. <span >{quest?.question}</span>
                                    </div>
                                    <div className='options-contain'>
                                        {quest?.options?.map((item, index) => (
                                            <div className={item?.isCorrect ? `options-div correct` : item?.isSelected && !item?.isCorrect ? 'options-div incorrect' : 'options-div'} key={index}>
                                             <div className="options" style={{justifyContent:"space-around"}}> <div>{(index + 1 + 9).toString(36)}</div>
                                                    <div>{item?.label}</div> </div> {item?.isCorrect?<FontAwesomeIcon icon={faCheck} />:item?.isSelected && !item?.isCorrect?<FontAwesomeIcon icon={faXmark} />:<FontAwesomeIcon icon={faXmark} style={{visibility:"hidden"}}/>}    
                                            </div>
                                        ))}
                                    </div>
                                </div></Grid>)
                        )}
                     </Grid>
                    : ""}
                    </div>
            </div>
        </div>
    )
}
export default Result;