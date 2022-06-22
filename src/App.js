import React, { useState} from 'react';
import './App.css';

function App() {  
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [operator, setOperator] = useState('');
  const [curState, setCurState] = useState('');
  const [history, setHistory] = useState([])
  const [final, setFinal] = useState(false);

  //HANDLES USER INPUT FOR (LEFT) & (RIGHT) VALUES
  const handleInput = (e) => {
    if (curState.includes('.') && e.target.name === '.' || (curState.length >= 9)) return;
    if (left !== '') setRight(curState.concat(e.target.name));
    if (!final)  {console.log('final is false')     
    setCurState(curState.concat(e.target.name));   }
    else if (final)
    {
      console.log('final is true');
      setCurState('');
      setCurState(curState.concat(e.target.name));   
    }
    // setCurState(curState.concat(e.target.name));   
  }
  
  //ASSIGNS OPERATOR TYPE TO EQUATION
  const operatorType = (e) => {
    if (curState === '') return;
    else {
      setOperator(e.target.name);
      setCurState('');  
    }

    if (left === '') setLeft(curState);
  }

  //CALLED UPON CLICKING '=' TO GET FINAL RESULT OF EQUATION
  const getResult = () => {
    setCurState(calculate());
    setFinal(true);
  }

  //CALCULATES CURRENT EQUATION
  const calculate = () => {
    if (left === '' || right === '') return 'error';

    let calc;

    switch (operator) {
      case '/':
        if (right !== '0') {
          calc = String(parseFloat(left) / parseFloat(right));
        }
        else return 'error';
        break;
      case '+':
        calc = parseFloat(left) + parseFloat(right);
        break;
      case '*':
        calc = String(parseFloat(left) * parseFloat(right));
        break;
      case '-':
        calc = String(parseFloat(left) - parseFloat(right));
        break;
      default:
        return 'error';
    }
    if (calc.length > 9) calc = calc.slice(0, 9)+'...';
    
    //rotates array with recent 10 values
    if (history.length >= 10) history.pop(history.length);
    history.unshift(calc + '');

    return calc;
  }

  //CLEARS CURRENT EQUATION
  const clear = () => {
    setCurState('');
    setLeft('');
    setRight('');
    setOperator('');
  }

  //TURNS CURRENT INPUT INTO POSITIVE OR NEGATIVE NUM FOR EQUATION
  const plusMinus = () => {
    if (curState.charAt(0) === "-") {
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  // DISPLAYS HISTORY OF LAST 10 RESULTS
  const getPreviousResult = () => {
    setCurState('Previous results: \n\n' + history.join('\r\n'));
  }



  // PART 2 : REFACTORING -------------------------------
  // const handleInput = (e) => {
  //   setCurState(curState.concat(e.target.name));
  // }
  // const calculate = () => {
  //   try {
  //     setCurState(eval(curState).toString());
  //   }
  //   catch(err){
  //     setCurState('error');
  //   }
  // }
  // ----------------------------------------------------

  return (
    //CACLULATOR USER INTERFACE
    <div className='app'>
      {/* HEADER */}
      <div className='header'>
        <img className='header__img' src ='./Assets/HBK_logo.png' alt='' />
      </div>

      {/* COLOR PALLETE CIRCLES */}
      <div className='pallete'>
        <div className='pallete__cir --5DB3B0'></div>
        <div className='pallete__cir --2C6B89'></div>
        <div className='pallete__cir --113357'></div>
      </div>

      {/* CALCULATOR */}
      <div className='calc__container'>
        <div className='screen__wrapper'>
          <div className='screen'>{curState}</div>
        </div>
        
        <div className='calc__keypad'>
          <button className='highlight' onClick={clear}>AC</button>
          <button className='highlight' onClick={getPreviousResult}><img className='prevNums__img' src='./Assets/history.png' alt='' /></button>
          <button className='highlight' onClick={plusMinus}>+/-</button>
          <button className='highlight' name='/' onClick={operatorType}>&divide;</button>
          <button name='7' onClick={handleInput}>7</button>
          <button name='8' onClick={handleInput}>8</button>
          <button name='9' onClick={handleInput}>9</button>
          <button className='highlight' name='*' onClick={operatorType}>x</button>
          <button name='4' onClick={handleInput}>4</button>
          <button name='5' onClick={handleInput}>5</button>
          <button name='6' onClick={handleInput}>6</button>
          <button className='highlight' name='-' onClick={operatorType}>-</button>
          <button name='1' onClick={handleInput}>1</button>
          <button name='2' onClick={handleInput}>2</button>
          <button name='3' onClick={handleInput}>3</button>
          <button className='highlight' name='+' onClick={operatorType}>+</button>
          <button name='0' onClick={handleInput}>0</button>
          <button name='.' id='bold' onClick={handleInput}>.</button>
          <button className='highlight' id='result' onClick={getResult}>=</button>
        </div>
      </div>

    </div>
  );
}

export default App;
