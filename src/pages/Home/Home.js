import { useEffect, useState } from "react";
import Questions from "../../api/Questions";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './home.css';
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import ConfirmDialogue from "../../components/ConfirmDialogue/ConfirmDialogue";

const Home = () => {
    const [questionsList, setQuestionsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [passMark, setPassmark] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        getQuestionList();
    }, []);

    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    const getQuestionList = async () => {
        const response = await Questions();
        const data = shuffleArray(response?.questions);
        data.forEach(async function (element, index) {
           await shuffleArray(element.options);
            element.isAnswered = "false";
            element.id = index + 1;
            element.options.forEach(function (el) {
                el.isSelected = "false";
            });
        });
        setQuestionsList(data);
        setPassmark(response?.passmark);
    }

    const setIndex = (type) => {
        let completedPercent
        let count = questionsList.filter((answer) => answer?.isAnswered === true).length
        if (type === 'Inc') {
            if (currentIndex < questionsList?.length)
                setCurrentIndex((prev) => prev + 1)
        }
        else if (type === 'Dec') {
            if (currentIndex !== 0)
                setCurrentIndex((prev) => prev - 1)
        }
        completedPercent = (count) * 100 / (questionsList?.length);
        setCompleted(completedPercent);
    }

    useEffect(() => {
        setIndex()
        setIsAnswered(false);
    }, [isAnswered])

    const openConfirmDialogue = () => {
        setIsFinished(true);
    }

    return (
        <div className="App">
            <div className="main-container">

                <div className="progress-container"  >
                    <Grid container item xs={12}>
                        <Grid item xs={2} >
                            {currentIndex !== 0 ?
                                <FontAwesomeIcon icon={faAngleLeft} onClick={() => setIndex('Dec')} style={{cursor:"pointer"}} /> :
                                ""}
                        </Grid>
                        <Grid item xs={8}>
                            <span className={'labelStyles'} >{currentIndex + 1}/{questionsList?.length}</span>
                        </Grid>
                        <Grid item xs={2}>
                            {currentIndex !== questionsList?.length - 1 ?
                                <FontAwesomeIcon icon={faAngleRight} onClick={() => setIndex('Inc')} style={{cursor:"pointer"}} /> :
                                (currentIndex + 1) === questionsList?.length ?
                                    <span style={{fontSize:"18px",cursor:"pointer"}} onClick={openConfirmDialogue}>Submit</span> :
                                    ""}
                        </Grid>
                    </Grid>

                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <div className={'containerStyles'}>
                            <div className={'fillerStyles'} style={{ width: `${completed}%` }}>
                            </div>
                        </div>
                    </Grid>
                </div>
                <div className="answered-count">
                    <div>
                        Answered: {questionsList.filter((answer) => answer?.isAnswered === true).length}
                    </div>
                    <div>
                        Not Answered: {questionsList?.length - questionsList.filter((answer) => answer?.isAnswered === true).length}
                    </div>
                </div>
                <div className="questions">
                <QuestionCard questionsList={questionsList} currentIndex={currentIndex} setCurrentIndex={(currentIndex) => setCurrentIndex(currentIndex)}
                    setQuestionsList={(questionsList) => setQuestionsList(questionsList)} isAnswered={isAnswered} setIsAnswered={(answered) => setIsAnswered(answered)} />
</div>
            </div>
            {isFinished ?
                <ConfirmDialogue isFinished={isFinished} setIsFinished={(isFinished) => setIsFinished(isFinished)} passMark={passMark}
                    questionsList={questionsList} currentIndex={currentIndex} completed={completed} /> : ""}
        </div>

    )
}
export default Home;