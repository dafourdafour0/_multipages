import React, { useState, useCallback, useEffect } from 'react';

/**
 * Functional Component สำหรับเครื่องคิดเลข
 */
function Calculator() {
  // === 1. การจัดการสถานะ (State) ด้วย useState ===
  const [screen, setScreen] = useState('0'); // ตัวเลขที่แสดงบนหน้าจอ
  const [first, setFirst] = useState(0); // ตัวเลขตัวแรกสำหรับการคำนวณ
  const [second, setSecond] = useState(0); // ตัวเลขตัวสองที่ใช้สำหรับกดซ้ำ (=)
  const [lastOp, setLastOp] = useState('?'); // operator ล่าสุดที่กด ('+', '-', '=' หรือ '?')
  const [lastOpType, setLastOpType] = useState('?'); // operator สำหรับการคำนวณซ้ำ (เก็บ '+' หรือ '-')
  const [state, setState] = useState('S0'); // สถานะเครื่องคิดเลข (S0=เริ่ม/รอ, S1=พิมพ์เลข, S2=เลือก operator)

  // === 2. ฟังก์ชันการทำงานต่างๆ (ใช้ useCallback เพื่อประสิทธิภาพ) ===

  // รีเซ็ตเครื่องคิดเลขทั้งหมด (Clear Everything: CE)
  const ceClick = useCallback(() => {
    setScreen('0');
    setFirst(0);
    setSecond(0);
    setLastOp('?');
    setLastOpType('?');
    setState('S0');
  }, []);

  // กดตัวเลข (0-9)
  const numclick = useCallback((number) => {
    setScreen(prevScreen => {
      let newScreen = prevScreen;
      if (state === 'S0' || state === 'S2') { // ถ้าเริ่มใหม่ หรือหลังกด operator
        newScreen = number.toString();
        setState('S1');
      } else if (state === 'S1') { // กำลังพิมพ์เลขต่อเนื่อง
        if (prevScreen.length < 9) {
          newScreen = prevScreen + number.toString();
        }
      }
      return newScreen;
    });
  }, [state]);

  // กด Operator (+, -)
  const operatorClick = useCallback((op) => {
    setFirst(Number(screen)); // เก็บตัวเลขบนจอเป็นตัวเลขแรก
    setLastOp(op); // ตั้งค่า Operator ล่าสุด
    setLastOpType(op); // เก็บ Operator ไว้สำหรับการกด = ซ้ำ
    setState('S2'); // เปลี่ยนสถานะเป็นรอเลขถัดไป
  }, [screen]);

  // คำนวณผลลัพธ์ (=)
  const calculate = useCallback(() => {
    let result = first;
    let currentSecond = second;
    
    // Logic คำนวณตาม lastOp
    if (lastOp === '+') {
        currentSecond = Number(screen);
        result = first + currentSecond;
    } 
    else if (lastOp === '-') {
        currentSecond = Number(screen);
        result = first - currentSecond;
    }
    else if (lastOp === '=') { // กฎ = ซ้ำ
        // ใช้ currentSecond ที่เก็บไว้คำนวณซ้ำ
        if (lastOpType === '+') result = first + currentSecond;
        else if (lastOpType === '-') result = first - currentSecond;
    } 
    else if (lastOp === '?') { // ยังไม่เคยมี Operator
        currentSecond = Number(screen);
        result = currentSecond;
    }

    // อัพเดต State หลังคำนวณ
    setScreen(result.toString());
    setFirst(result);
    setSecond(currentSecond); // เก็บตัวเลขที่สองไว้สำหรับการกด = ซ้ำครั้งหน้า
    setState('S0'); // กลับสู่สถานะรอเลขใหม่
    setLastOp('='); // ตั้งค่า Operator ล่าสุดเป็น =
  }, [first, second, lastOp, lastOpType, screen, state]);

  // จัดการ Keybord Event (เทียบเท่า document.addEventListener ใน JS)
  useEffect(() => {
    const checkKeybord = (event) => {
        if (event.key >= '0' && event.key <= '9') {
            numclick(Number(event.key));
        }
        else if (event.key === '+' ) {
            operatorClick('+');
        }
        else if (event.key === '-') {
            operatorClick('-');
        }
        else if (event.key === '=' || event.key === 'Enter') {
            calculate();
        }
        else if (event.key === 'Escape') {
            ceClick();
        }
    };

    document.addEventListener('keydown', checkKeybord);
    return () => {
        document.removeEventListener('keydown', checkKeybord); // Clean up เมื่อ Component ถูกถอดออก
    };
  }, [numclick, operatorClick, calculate, ceClick]); // dependency array เพื่อให้ฟังก์ชันทำงานได้ถูกต้อง

  // Helper Function สำหรับเปลี่ยนสีปุ่ม Operator
  const getOpButtonClass = (op) => {
    // กำหนด class เป็น 'cal-btn-orenge' เมื่อปุ่มนั้นถูกเลือกอยู่
    const activeClass = (lastOp === op && lastOp !== '=' && lastOp !== '?') ? 'cal-btn-orenge' : 'cal-btn-green';
    return `cal-btn ${activeClass}`;
  };

  // === 3. ส่วนของการแสดงผล (โค้ด HTML Structure) ===
  return (
    <div className="cal-container">
      {/* หน้าจอแสดงผล: ใช้ตัวแปร state {screen} */}
      <div id="result" className="screen">{screen}</div> 
      
      {/* แถวปุ่มที่ 1 */}
      <div>
        <button className="cal-btn cal-btn-green" disabled>MC</button>
        <button className="cal-btn cal-btn-green" disabled>MR</button>
        <button className="cal-btn cal-btn-green" disabled>M+</button>
        <button className="cal-btn cal-btn-green" disabled>M-</button>
        <button onClick={ceClick} className="cal-btn cal-btn-red">CE</button>
      </div>

      {/* แถวปุ่มที่ 2 (ตัวเลข 7, 8, 9) */}
      <div>
        <button onClick={() => numclick(7)} className="cal-btn cal-btn-equal">7</button>
        <button onClick={() => numclick(8)} className="cal-btn cal-btn-equal">8</button>
        <button onClick={() => numclick(9)} className="cal-btn cal-btn-equal">9</button>
        <button className="cal-btn cal-btn-green" disabled>&divide;</button>
        <button className="cal-btn cal-btn-green" disabled>√</button>
      </div>

      {/* แถวปุ่มที่ 3 (ตัวเลข 4, 5, 6) */}
      <div>
        <button onClick={() => numclick(4)} className="cal-btn cal-btn-equal">4</button>
        <button onClick={() => numclick(5)} className="cal-btn cal-btn-equal">5</button>
        <button onClick={() => numclick(6)} className="cal-btn cal-btn-equal">6</button>
        <button className="cal-btn cal-btn-green" disabled>&times;</button>
        <button className="cal-btn cal-btn-green" disabled>%</button>
      </div>

      {/* แถวปุ่มที่ 4 (ตัวเลข 1, 2, 3 และ Minus) */}
      <div>
        <button onClick={() => numclick(1)} className="cal-btn cal-btn-equal">1</button>
        <button onClick={() => numclick(2)} className="cal-btn cal-btn-equal">2</button>
        <button onClick={() => numclick(3)} className="cal-btn cal-btn-equal">3</button>
        {/* ใช้ getOpButtonClass เพื่อเปลี่ยนสีปุ่ม - */}
        <button id="minus" onClick={() => operatorClick('-')} className={getOpButtonClass('-')}>&minus;</button>
        <button className="cal-btn cal-btn-green" disabled>1/x</button>
      </div>

      {/* แถวปุ่มที่ 5 (ตัวเลข 0, Plus, Equal) */}
      <div>
        <button onClick={() => numclick(0)} className="cal-btn cal-btn-equal">0</button>
        <button className="cal-btn cal-btn-equal" disabled>.</button>
        <button className="cal-btn cal-btn-equal" disabled>+/<sub>-</sub></button>
        {/* ใช้ getOpButtonClass เพื่อเปลี่ยนสีปุ่ม + */}
        <button id="plus" onClick={() => operatorClick('+')} className={getOpButtonClass('+')}>+</button>
        <button onClick={calculate} className="cal-btn cal-btn-green">=</button>
      </div>
    </div>
  );
}

export default Calculator;