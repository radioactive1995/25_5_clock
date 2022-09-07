import './Button.css'

export default function Button ({element, setBreakLength, setSessionLength, playPause, setCountState, sessionLength, breakLength, label}) {

    const incrementHandler = () => {
        if (!playPause) {
            
            if(element === 'break' && breakLength+1 <= 60)
            {
                setBreakLength((prevVal) => prevVal + 1);
                setCountState((prevValue) => ({count:  prevValue.type === element ? breakLength * 60 + 60 : prevValue.count, type: prevValue.type })) 
            }

            else if(element === 'session' && sessionLength+1 <= 60)
            {
                setSessionLength((prevVal) => prevVal + 1);
                setCountState((prevValue) => ({count:  prevValue.type === element ? sessionLength * 60 + 60 : prevValue.count, type: prevValue.type })) 
            } 
        }
    }

    const decrementHandler = () => {
        if (!playPause) {

            if(element === 'break' && breakLength-1 > 0)
            {
                setBreakLength((prevVal) => prevVal - 1);
                setCountState((prevValue) => ({count:  prevValue.type === element ? breakLength * 60 - 60 : prevValue.count, type: prevValue.type })) 
            }

            else if(element === 'session' && sessionLength-1 > 0)
            {
                setSessionLength((prevVal) => prevVal - 1);
                setCountState((prevValue) => ({count:  prevValue.type === element ? sessionLength * 60 - 60 : prevValue.count, type: prevValue.type })) 
            } 
        }
    }

    return (
        <div className='button-container'>
            <div id={`${element}-decrement`} className='icon arrow-down' onClick={decrementHandler}></div>
            <p id={`${element}-label`}>{label}</p>
            <div id={`${element}-increment`} className='icon arrow-up' onClick={incrementHandler}></div>
        </div>
    )
}