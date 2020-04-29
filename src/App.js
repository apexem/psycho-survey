import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Question from './Components/Question';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; 

function App() {
  function LearningExamples() {
    return (
      <div className="App-header">
        <p>Defetyzm - Priapizm</p>
        <p>Kanikuła - Chędożyć</p>
        <p>Arywizm - Mitrężyć</p>
        <p>Promiskuityzm - Spuneryzm</p>
        <p>Transcendentny - Szczeznąć</p>
        <CountdownCircleTimer
              isPlaying={true}
              durationSeconds={45}
              colors={[
                  ['#004777', .33],
                  ['#F7B801', .33],
                  ['#A30000']
              ]}/>
      </div>
    )
  }
  const [start, setStart] = useState(false);
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const questions = ['Transcendentny Chędożyć',
  'Defetyzm Priapizm',
  'Promiskuityzm Szczeznąć',
  'Kanikuła Chędożyć',
  'Promiskuityzm Spuneryzm',
  'Artywizm Chędożyć',
  'Arywizm Szczeznąć',
  'Defetyzm Spuneryzm',
  'Arywizm Mitrężyć',
  'Promiskuityzm Mitrężyć',
  'Transcendentny Szczeznąć'];

  async function sendData(data) {
    const url = "https://badanie-1e6e.restdb.io/rest/wyniki";
    await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'x-apikey': '5e88a103111788414066c65c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  async function startSurvey(e) {
    e.preventDefault();
    let shouldPlayMusic = window.location.search === '?bleed=true';
    let audio;
    setStart(true);
    await sleep(3000);
    const examples = <LearningExamples></LearningExamples>
    if(shouldPlayMusic) {
      audio = new Audio('/bleed.mp3');
      audio.play();
    }
    ReactDOM.render(examples, document.getElementById('root'));
    await sleep(45000);
    const answers = [];
    if(audio) {
      audio.pause();
    }
    for(let i =0; i < questions.length; i++) {
      answers.push({
       answer: "brak",
      });
      let start = Date.now();
      const answerCallback = (answer) => {
        answers[i].answer = answer;
        answers[i].time = Date.now() - start;
      };
      const questionComponent = <Question duration={3} answer={answerCallback} question={questions[i]}></Question>;
      ReactDOM.render(<p></p>, document.getElementById('root'));
      ReactDOM.render(questionComponent, document.getElementById('root'));
      await sleep(3000);
    }
    ReactDOM.render(<p className="App-header">Dziekuję!</p>, document.getElementById('root'));
    await sendData({
      odpowiedzi: answers,
      muza: shouldPlayMusic
    });
    console.log(answers);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Witaj!
        </p>
        <p>
          Badanie powstało na potrzeby projektu z przedmiotu procesy poznawcze I efektywne. 
        </p>
        <p>Jego wyniki służyć będą jedynie w celach edukacyjnych.</p>
        <p>
        Badanie jest anonimowe.
        Jeśli wyrażasz zgodę kliknij start. Badanie rozpocznie się po 3 sekundach.
        </p>
        <button disabled={start} onClick={startSurvey}>Start</button>
        <CountdownCircleTimer
            isPlaying={start}
            durationSeconds={3}
            colors={[
                ['#004777', .33],
                ['#F7B801', .33],
                ['#A30000']
            ]}/>
      </header>
    </div>
  );
}

export default App;
