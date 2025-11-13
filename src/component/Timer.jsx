import { useState, useEffect } from "react"

function Timer({ name }) {
  const [second, setSecond] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    let t
    if (running) {
      t = setInterval(() => {
        setSecond(s => s + 1)
      }, 1000)
    }
    return () => clearInterval(t)
  }, [running])

  const reset = () => {
    setRunning(false)
    setSecond(0)
  }

  const toggle = () => setRunning(!running)

  const toTime = s => {
    const d = Math.floor(s / 86400)
    const h = Math.floor((s % 86400) / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60

    if (d > 0) return `${d}d ${h}h ${m}m ${sec < 10 ? "0" + sec : sec}s`
    if (h > 0) return `${h}h ${m}m ${sec < 10 ? "0" + sec : sec}s`
    return `${m}m ${sec < 10 ? "0" + sec : sec}s`
  }

  return (
    <div
      className="border border-black border-2 rounded-3 mx-auto mt-3 bg-secondary-subtle p-3"
      style={{ width: 'fit-content' }}
    >
      <h1 className="text-primary text-center">{name || 'TIMER'}</h1>

      <div className="border border-black border-1 rounded-2 text-end px-2 fs-4 bg-white">
        {toTime(second)}
      </div>

      <div className="d-flex justify-content-between gap-3 mt-3">
        <button className="btn btn-danger" onClick={reset}>
          <i className="bi bi-arrow-counterclockwise"></i>&nbsp;RESET
        </button>

        <button
          className={`btn ${running ? 'btn-warning' : 'btn-success'}`}
          onClick={toggle}
        >
          <i className={`bi ${running ? 'bi-pause' : 'bi-play'}`}></i>&nbsp;
          {running ? 'PAUSE' : 'RUN'}
        </button>
      </div>
    </div>
  )
}

export default Timer
