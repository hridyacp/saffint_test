import { useState } from 'react';
import './questionCard.css';
const QuestionCard = ({ questionsList, currentIndex, setCurrentIndex, setQuestionsList, setIsAnswered }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isActive, setIsActive] = useState(null);
    const setOptions = (index) => {
        setIsClicked(true);
        setIsActive(index);
        setTimeout(() => {
            let currentAnswered = questionsList;
            let answeredId = currentAnswered.findIndex(o => o.id === currentIndex + 1);
            currentAnswered[answeredId].isAnswered = true;
            Object.keys(currentAnswered[answeredId].options).forEach(v => { currentAnswered[answeredId].options[v].isSelected = false });
            currentAnswered[answeredId].options[index].isSelected = true;
            setQuestionsList(currentAnswered);
            if (currentIndex + 1 < questionsList?.length) {
                setCurrentIndex((prev) => prev + 1);
            }
            setIsAnswered(true);
            setIsClicked(false);
            setIsActive(null);
        }, 1500)
    }

    return (
        <div className='question-container'>

            <div className={isClicked ? "mainquestion-out" : "mainquestion-in"}>{questionsList[currentIndex]?.question}
            </div>
            <div className="history">History of places
            </div>
            <div className='main-questcontainer'>
                <div className='decor-div1'></div>
                <div className='decor-div1'></div>
                <div className='decor-div1'></div>
                <div className={isClicked ? 'options-container-out' : 'options-container-in'}>
                    {questionsList[currentIndex]?.options?.map((item, index) => (
                        <div className={isActive === index ? `options-div-${item?.isSelected} active` : `options-div-${item?.isSelected}`} key={index} onClick={() => setOptions(index)}>
                            <div className='options-subdiv'> <div className={'sub-div'}></div><div className="options">{(index + 1 + 9).toString(36)}</div></div><div className="options">{item?.label}{isClicked && isActive === index ? <div className="loading"></div> : ""}</div>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
export default QuestionCard;