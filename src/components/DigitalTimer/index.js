import {useState, useRef} from 'react'
import './index.css'

const DigitalTimer = () => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const startOrPauseTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current)
    } else {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(intervalRef.current)
              return 0
            }
            setMinutes(prevMinutes => prevMinutes - 1)
            return 59
          }
          return prevSeconds - 1
        })
      }, 1000)
    }
    setIsRunning(prevState => !prevState)
  }

  const resetTimer = () => {
    clearInterval(intervalRef.current)
    setMinutes(25)
    setSeconds(0)
    setIsRunning(false)
  }

  const onIncrement = () => {
    if (!isRunning) {
      setMinutes(prevMinutes => prevMinutes + 1)
    }
  }

  const onDecrement = () => {
    if (!isRunning && minutes > 1) {
      setMinutes(prevMinutes => prevMinutes - 1)
    }
  }

  // useEffect(() => {
  //   return () => clearInterval(intervalRef.current)
  // }, [])
  return (
    <div className="bg-container">
      <h1 className="heading">Digital Timer</h1>

      <div className="top">
        <div className="timer-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/digital-timer-elapsed-bg.png"
            alt="timer background"
            className="timer-image"
          />
          <div className="clock-container">
            <h1 className="timer-text">
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </h1>
            <p className="status-text">{isRunning ? 'Running' : 'Paused'}</p>
          </div>
        </div>

        <div className="right-container">
          <div className="controls-container">
            <div className="start-reset">
              <button type="button" className="bot" onClick={startOrPauseTimer}>
                <img
                  src={
                    isRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={isRunning ? 'pause icon' : 'play icon'}
                  className="controller"
                />
              </button>
              <p className="start">{isRunning ? 'Pause' : 'Start'}</p>
            </div>

            <div className="start-reset">
              <button type="button" className="bot" onClick={resetTimer}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="controller"
                />
              </button>
              <p>Reset</p>
            </div>
          </div>
          <div className="timer-limit-container">
            <p className="timer-limit-text">Set Timer limit</p>
            <div className="adjuster">
              <button
                type="button"
                className="adjust-btn"
                onClick={onDecrement}
              >
                -
              </button>
              <p className="timer-limit">{minutes}</p>
              <button
                type="button"
                className="adjust-btn"
                onClick={onIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalTimer
