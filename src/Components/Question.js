import React, {useState, useEffect} from 'react';
import './Question.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; 
const Question = (props) => {
    const [hasAnswered, setHasAnswered] = useState(false);
    const onAnswered = () => {
        setHasAnswered(true);
    }
    const onClick = (answer) => {
        props.answer(answer);
        onAnswered();
    }
    return (
        <div className="question">
            <p>{props.question}</p>
            <div className="buttons">
                <button className="red button" disabled={hasAnswered} onClick={() => onClick("nie")}>nie</button>
                <button className="green button" disabled={hasAnswered} onClick={() => onClick("tak")}>tak</button>
            </div>
            <CountdownCircleTimer
            onComplete={() => {
                return [true, 0];
            }}
            isPlaying={true}
            durationSeconds={props.duration}
            colors={[
                ['#004777', .33],
                ['#F7B801', .33],
                ['#A30000']
            ]}/>
        </div>
    )
}
export default Question;