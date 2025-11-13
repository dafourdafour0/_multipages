import { useState } from "react"

const RadixCounter = () => {
    //     grtter, setter
    const [value, setValue] = useState(0)

    const toHex = (num) => {
    return num.toString(16).toUpperCase().padStart(3, "0")
    }

    const minusClick = () =>{
        console.log('-')
        if(value <=0){
            setValue(prev => prev <= 0 ? 4095 : prev - 1);
            return
        }else{
            setValue(prev => prev - 1)//set value by previous value
        }
        
    }
    const resetClick = () =>{
        setValue(0)
        console.log('reset')
    }
    const plusClick = () =>{
        console.log('+')
            setValue(prev => (prev >= 4095 ? 0 : prev + 1));

            return
        
        //setValue(value + 1)set direct to value
        //setValue(prev => prev+1)set value by previous value
    }

    
    return(
         //container
        <div className="border border-2 border-dark rounded-3 p-3 m-auto" style={{width:'400px'}}>
            {/* title */}
            <div className="text-center fw-bold fs-4" >RADIX COUNTER</div>

            {/* body */}
            <div className='d-flex justify-content-between mt-3 '>
                <div className="text-center">
                    <span className="fw-bold">[HEX]</span>
                    <div className="font-monospace">{value.toString(16).padStart(3,'0')}</div>
                </div>
                <div className="text-center">
                    <span className="fw-bold">[DEC]</span>
                    <div className="font-monospace  text-primary">{value.toString(10).padStart(4,'0')}</div>
                </div>
                <div className="text-center">
                    <span className="fw-bold">[OCT]</span>
                    <div className="font-monospace">{value.toString(8).padStart(4,'0')}</div>
                </div>
                <div className="text-center">
                    <span className="fw-bold">[BIN]</span>
                    <div className="font-monospace">{value.toString(2).padStart(12,'0')}</div>
                </div>
            </div>

            {/* button*/}
            <div className="d-flex justify-content-around gap-3 mt-3">
                <button className="btn btn-danger px-4" onClick={ minusClick}>&minus;</button>
                <button className="btn btn-secondary px-4" onClick={resetClick}>RESET</button>
                <button className="btn btn-success px-4" onClick={plusClick}>+</button>
            </div>
        </div>
    )


}
export default RadixCounter