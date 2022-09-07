import './App.css';
import React, {useState, useEffect} from 'react';
import Button from './Button'

const minutesToSeconds = (num) => num * 60

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [countState, setCountState] = useState({count: 25, type: 'session'});
  const [playPause, setPlayPause ] = useState(false);
  const time = new Date(minutesToSeconds(countState.count) * 1000).toLocaleTimeString(navigator.language, {minute:'2-digit', second:'2-digit'});

  const switchCounter = () => {
    var id = window.setTimeout(function() {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    if (countState.type === 'session' && countState.count < 0 ) {
      console.log('switch to break')
      setCountState({count: breakLength, type: 'break' })
    }
    if (countState.type === 'break' && countState.count < 0 ) {
      console.log('switch to session')
      setCountState({count: sessionLength, type: 'session' })
    }
  }
  
  useEffect(() => {
    if (playPause === true) {
      switchCounter()
      setTimeout( () => {
        setCountState((prevValue) => ({count: prevValue.count -1/60 , type: prevValue.type }))  
      }, 1000);
    }
  }, [countState])

  const playPauseHandler = () => {
    setPlayPause(playPause === false ? () => true : () => false)

    if (!playPause) {
      setTimeout( () => { 
        setCountState((prevValue) => ({count: prevValue.count -1/60 , type: prevValue.type }))       
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
      }
    setBreakLength(5);
    setSessionLength(25);
    setCountState({count: 25, type: 'session'});
    setPlayPause(false);
  }


  let timeLabel = [...countState.type];
  timeLabel[0] = timeLabel[0].toUpperCase()
  timeLabel = timeLabel.join('')

  
  
  return (
    <div className="container">
      <div className='display'>
        <div id='break-length'><p>{breakLength}</p></div>
        <div id="time-left"><p>{sessionLength === 60 ? '60:00' : time}</p></div>
        <div id='session-length'><p>{sessionLength}</p></div>
        <div id='timer-label'><p>{timeLabel}</p></div>
        </div>
      <div className='buttons'>
      <Button element={'break'} setBreakLength={setBreakLength} playPause={playPause} setCountState={setCountState} sessionLength={sessionLength} breakLength={breakLength} />
      <div className='icon play-pause' onClick={playPauseHandler}></div>
      <div className='icon refresh' onClick={refreshHandler}></div>
      <Button element={'session'} setSessionLength={setSessionLength} playPause={playPause} setCountState={setCountState} sessionLength={sessionLength} breakLength={breakLength} />
      </div>
    </div>
  );
}

export default App;
