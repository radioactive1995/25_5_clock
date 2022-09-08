import './App.css';
import React, {useState, useEffect} from 'react';
import Button from './Button'

const convertToMinutes = (seconds) => Math.floor(seconds / 60);
const convertToRemainingSeconds = (minutes, seconds) => seconds - minutes * 60;
const padTo2Digits = (num) => num.toString().padStart(2, '0')
const defaultCountState = {count: 1500, type: 'session'}

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [countState, setCountState] = useState(defaultCountState);
  const [playPause, setPlayPause ] = useState(false);
  const [timeLabel, setTimeLabel] = useState('Session');

  const switchCounter = () => {

    if (countState.type === 'session' && countState.count === -1 ) {
      setCountState({count: breakLength * 60, type: 'break' })
      setTimeLabel(() => 'Break');
      let audio = document.querySelector('#beep');
      audio.play()
    }
    if (countState.type === 'break' && countState.count === -1 ) {
      setCountState({count: sessionLength * 60, type: 'session' })
      setTimeLabel(() => 'Session');
      let audio = document.querySelector('#beep');
      audio.play()
    }
  }
  
  useEffect(() => {
    if (playPause === true) {
      switchCounter()
      var timeOut = setInterval( () => {
        setCountState((prevValue) => ({count: prevValue.count - 1 , type: prevValue.type }))  
      }, 1000);
    }
  return () => {clearInterval(timeOut)}
  })

  const playPauseHandler = () => {
    setPlayPause(playPause === false ? () => true : () => false)
  }

  const refreshHandler = () => {

    setBreakLength(5);
    setSessionLength(25);
    setCountState({...defaultCountState});
    setPlayPause(false);
    setTimeLabel('Session')
    let audio = document.querySelector('#beep');
    audio.pause();
    audio.currentTime = 0;
  }

  let minutes = padTo2Digits(convertToMinutes(countState.count));
  let seconds = padTo2Digits(convertToRemainingSeconds(minutes, countState.count))
  
  return (
    <div className="container">
      <div className='display'>
        <div ><p id='break-length'>{breakLength}</p><Button element={'break'} label={'Break Length'} setBreakLength={setBreakLength} playPause={playPause} setCountState={setCountState} sessionLength={sessionLength} breakLength={breakLength} /></div>
        <div id="time-left" style={countState.count < 60 ? {color: 'rgb(255, 0, 0, 0.85)'} : {}}><p>{minutes}:{seconds}</p></div>
        <div ><p id='session-length'>{sessionLength}</p><Button element={'session'} label={'Session Length'} setSessionLength={setSessionLength} playPause={playPause} setCountState={setCountState} sessionLength={sessionLength} breakLength={breakLength} /></div>
        
        <div id='timer-label'><p>{timeLabel}</p></div>
        </div>
      <div className='buttons'>
      <div id='start_stop' className='icon play-pause' onClick={playPauseHandler}></div>
      <div id='reset' className='icon refresh' onClick={refreshHandler}></div>
      </div>
      <audio id="beep" src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' />
    </div>
  );
}

export default App;
