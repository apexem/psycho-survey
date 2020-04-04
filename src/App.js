import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Question from './Components/Question';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; 

function App() {
  const [start, setStart] = useState(false);
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function sendData(data) {
    const url = "https://badanie-1e6e.restdb.io/rest/wyniki";
    const response = await fetch(url, {
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
    setStart(true);
    await sleep(3000);
    const questions = ['lubisz placki?', 'lubisz gofry?', 'lubisz rybke?', 'lubisz kotleta?'];
    const answers = [];
    for(let i =0; i < questions.length; i++) {
      answers.push("brak");
      const answerCallback = (answer) => {
        answer[i] = answer;
      }
      const questionComponent = <Question duration={2} answer={answerCallback} question={questions[i]}></Question>;
      ReactDOM.render(<p></p>, document.getElementById('root'));
      ReactDOM.render(questionComponent, document.getElementById('root'));
      await sleep(2000);
    }
    ReactDOM.render(<p className="App-header">Dziekuję!</p>, document.getElementById('root'));
    await sendData({odpowiedzi: answers});
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
        <button onClick={startSurvey}>Start</button>
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
