import React, { useState } from 'react'
import RedixCounter from "../component/RedixCounter"
import Value from "../component/Value"
import Timer from "../component/Timer"
import Adder from "../component/Adder"
import Temperature from "../component/temperature"

const component = () => {
      const[counter,setCounter] = useState(0)
      
    return ( 
    <>
    <h1 className='Component-container'>Component page</h1>
    <div>                   
        <RedixCounter />
        <Value name={'COUNTER'} value={counter} setValue={setCounter}/>
        <Timer/>
        <Adder name={'ADDER'}/>
        <Temperature name="Temperature" />

        <p className='text-center fw-bold mt-3'>67114425 วุฒิเมศร์ พงศ์วราทวีพร</p>
      </div>
    </> 
    );
}
 
export default component;