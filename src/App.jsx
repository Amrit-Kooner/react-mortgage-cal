import './global.css'
import { useState } from 'react'
import Calculator from './components/Calculator';
import Results from './components/Results';

function App() {
  const [monthlyPayments, setMonthlyPayments] = useState(null);
  const [repay, setRepay] = useState(null);

  function clearResults(){
    setMonthlyPayments(null)
    setRepay(null);
  }

  function handlePayment(result){
    setMonthlyPayments(result);
  }

  function handleRepay(result){
    setRepay(result);
  }

  return (
    <div className='main-container'>
      <div className='content'>
        <Calculator handlePayment={handlePayment} handleRepay={handleRepay} clearResults={clearResults} />
        <Results monthlyPayments={monthlyPayments} repay={repay}/>
      </div>
    </div>
  )
}

export default App
