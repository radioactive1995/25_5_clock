import './App.css';
import React, {useState, useEffect} from 'react';
import Button from './Button'

//const minutesToSeconds = (num) => num * 60

const defaultCountState = {count: 1500, type: 'session'}
function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [countState, setCountState] = useState(defaultCountState);
  const [playPause, setPlayPause ] = useState(false);
  const time = new Date(countState.count * 1000).toLocaleTimeString(navigator.language, {minute:'2-digit', second:'2-digit'});

  const switchCounter = () => {
    var id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    if (countState.type === 'session' && countState.count < 0 ) {
      console.log('switch to break, countState: ' + countState.count)
      setCountState({count: breakLength * 60, type: 'break' })
      let audio = document.querySelector('#beep');
      audio.play()
    }
    if (countState.type === 'break' && countState.count < 0 ) {
      console.log('switch to session, countState: ' + countState.count)
      setCountState({count: sessionLength * 60, type: 'session' })
      let audio = document.querySelector('#beep');
      audio.play()
    }
  }
  
  useEffect(() => {
    if (playPause === true) {
      switchCounter()
      setTimeout( () => {
        setCountState((prevValue) => ({count: prevValue.count - 1 , type: prevValue.type }))  
      }, 1000);
    }
  }, [countState])

  const playPauseHandler = () => {
    setPlayPause(playPause === false ? () => true : () => false)

    if (!playPause) {
      setTimeout( () => { 
        setCountState((prevValue) => ({count: prevValue.count -1 , type: prevValue.type }))       
      }, 1000);
    }

    else {
      var id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    }
  }

  const refreshHandler = () => {
    var id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id);
        window.clearInterval(id);
      }
    setBreakLength(5);
    setSessionLength(25);
    setCountState({...defaultCountState});
    setPlayPause(false);
    let audio = document.querySelector('#beep');
    audio.pause();
    audio.currentTime = 0;
  }


  let timeLabel = [...countState.type];
  timeLabel[0] = timeLabel[0].toUpperCase()
  timeLabel = timeLabel.join('')

  
  
  return (
    <div className="container">
      <div className='display'>
        <div id='break-length'>{breakLength}</div>
        <div id="time-left" style={countState.count < 1 ? {color: 'rgb(119, 46, 99)'} : {}}><p>{sessionLength === 60 ? '60:00' : time}</p></div>
        <div id='session-length'>{sessionLength}</div>
        <div id='timer-label'><p>{timeLabel}</p></div>
        </div>
      <div className='buttons'>
      <Button element={'break'} label={'Break Length'} setBreakLength={setBreakLength} playPause={playPause} setCountState={setCountState} sessionLength={sessionLength} breakLength={breakLength} />
      <div id='start_stop' className='icon play-pause' onClick={playPauseHandler}></div>
      <div id='reset' className='icon refresh' onClick={refreshHandler}></div>
      <Button element={'session'} label={'Session Length'} setSessionLength={setSessionLength} playPause={playPause} setCountState={setCountState} sessionLength={sessionLength} breakLength={breakLength} />
      </div>
      <audio id="beep" src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' />
    </div>
  );
}

export default App;
