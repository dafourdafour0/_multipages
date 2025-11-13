import { useEffect, useState } from "react"
import Value from "./Value"

const Temperature = () => {
    const [celsius, setCelsius] = useState(0)
    const [fahrenheit, setFahrenheit] = useState(32)
    const [kelvin, setKelvin] = useState(273.15)

    useEffect(() => {
        let c = celsius
        setFahrenheit((c * 9 / 5) + 32)
        setKelvin(c + 273.15)
    }, [celsius])

    useEffect(() => {
        let f = (fahrenheit - 32) * 5 / 9
        setCelsius(f)
        setKelvin(f + 273.15)
    }, [fahrenheit])

    useEffect(() => {
        let k = kelvin - 273.15
        setCelsius(k)
        setFahrenheit(((k) * 9 / 5) + 32)
    }, [kelvin])

    return (
        <div className="border border-black border-2 mx-auto mt-3 rounded-3 p-3" style={{ width: 'fit-content' }}>
            <h1 className="text-center text-primary">TEMPERATURE</h1>
            <div className="d-flex justify-content-around align-items-center fs-2">
                <div className="badge bg-primary">{celsius.toFixed(2)} °C</div>
                <div className="badge bg-primary">{fahrenheit.toFixed(2)} °F</div>
                <div className="badge bg-primary">{kelvin.toFixed(2)} K</div>
            </div>
            <div className="d-flex gap-2">
                <Value name={'CELSIUS'} value={celsius} type={'real'} setValue={setCelsius} />
                <Value name={'FAHRENHEIT'} value={fahrenheit} type={'real'} setValue={setFahrenheit} />
                <Value name={'KELVIN'} value={kelvin} type={'real'} setValue={setKelvin} />
            </div>
        </div>
    )
}

export default Temperature