import { useState } from "react";
import FormBtn from "./FormBtn";
import Header from "./Header";

function Calculator({handlePayment, handleRepay, clearResults}){
    const [mortValues, setMortValues] = useState({mortAmount:null, mortTerm:null, mortRate:null, mortType:null})
    const {mortAmount, mortTerm, mortRate, mortType} = mortValues;

    const [mortErrors, setMortErrors] = useState({mortAmountError:false, mortTermError:false, mortRateError:false, mortTypeError:false});
    const {mortAmountError, mortTermError, mortRateError, mortTypeError} = mortErrors;

    // -------------------------------------------------------------------------------------------- FORM CLEAR

    function handleClear(){
        setMortValues({mortAmount:null, mortTerm:null, mortRate:null, mortType:null})
        clearResults();
    }

    // -------------------------------------------------------------------------------------------- MAIN CALCULATION

    function calculate(){
        const P = parseFloat(mortAmount);
        const R = parseFloat(mortRate) / 100;
        const T = parseFloat(mortTerm);

        const totalPayments = T * 12;
        const monthlyInterestRate = R / 12;
        const numerator = P * monthlyInterestRate;
        const denominator = 1 - (1 + monthlyInterestRate) ** (-totalPayments);
        const monthlyPayment = numerator / denominator;

        calculateRepay(monthlyPayment, totalPayments, P, R, T);
        calculateMonthly(monthlyPayment, P, R);
    }

    function calculateRepay(monthlyPayment, totalPayments, P, R, T) {
        if (mortType === 'repayment') {
            const totalRepayment = monthlyPayment * totalPayments;
            handleRepay(totalRepayment.toFixed(2));
        } else if (mortType === 'interest-only') {
            const totalRepayment = P + (P * R * T);
            handleRepay(totalRepayment.toFixed(2));
        }
    }

    function calculateMonthly(monthlyPayment, P, R) {
        if (mortType === 'repayment') {
            handlePayment(monthlyPayment.toFixed(2));
        } else if (mortType === 'interest-only') {
            const monthlyPayment = P * (R / 12);
            handlePayment(monthlyPayment.toFixed(2));
        }
    }

    // -------------------------------------------------------------------------------------------- FORM VALUEVALIDATION

    function handleSubmit(event) {
        event.preventDefault();

        setMortErrors({mortAmountError:(mortAmount == null), 
                       mortTermError:(mortTerm == null), 
                       mortRateError:(mortRate == null), 
                       mortTypeError:(mortType == null)})
            
        const currMortAmountError = (mortAmount == null);
        const currMortTermError = (mortTerm == null);
        const currMortRateError = (mortRate == null);
        const currMortTypeError = (mortType == null);
      
        if (currMortAmountError || currMortTermError || currMortRateError || currMortTypeError){
          clearResults(); 
        } else {
          calculate();
        }
    }

    // -------------------------------------------------------------------------------------------- FORM INPUT VALIDATION

function onChangeCondition(event) {
    const parsedValue = parseFloat(event.target.value);

    setMortValues((prev) => ({...prev, [event.target.name]: Number.isFinite(parsedValue) && parsedValue >= 0 ? parsedValue : null}));
}

    function validateFactor(factor){
        const parsedFactor = parseFloat(factor);

        return Number.isFinite(parsedFactor) ? parsedFactor : "";
    }

    // --------------------------------------------------------------------------------------------

    return (
        <form onSubmit={handleSubmit} className="calculator">
            <Header handleClear={handleClear}/>

            <div className={`input-wrapper ${mortAmountError && "input-error"}`}>
                <label htmlFor="amount" className="main-label">mortgage amount</label>
                <div className="input-bg">
                    <span className="input-symbol">£</span>
                    <input type="number" name="mortAmount" onChange={(event) => onChangeCondition(event)} value={validateFactor(mortAmount)}/>
                </div>
                {mortAmountError && <span className="error-msg">This field is required.</span>}
            </div>

            <div className="input-wrapper">
                <div className={`input-group ${mortTermError && "input-error"}`}>
                    <label htmlFor="term" className="main-label">mortgage term</label>
                    <div className="input-bg">
                        <input type="number" name="mortTerm" onChange={(event) => onChangeCondition(event)} value={validateFactor(mortTerm)}/>
                        <span className="input-symbol">years</span>
                    </div>
                    {mortTermError && <span className="error-msg">This field is required.</span>}
                </div>

                <div className={`input-group ${mortRateError && "input-error"}`}>
                    <label htmlFor="rate" className="main-label">intrest rate</label>
                    <div className="input-bg">
                        <input type="number" name="mortRate" onChange={(event) => onChangeCondition(event)} value={validateFactor(mortRate)}/>
                        <span className="input-symbol">%</span>
                    </div>
                    {mortRateError && <span className="error-msg">This field is required.</span>}
                </div>
            </div>

            <div className={`input-wrapper ${mortTypeError && "input-error"}`}>
                <label htmlFor="radios" className="main-label">Mortgage Type</label>
                
                <div className="radio-op" onClick={() => setMortValues((prev) => ({...prev, mortType: "repayment"}))}>
                    <input readOnly id="repayment" type="radio" value="repayment" name="mortType" checked={mortType === "repayment"}/>
                    <label htmlFor="repayment">Repayment</label>
                </div>

                <div className="radio-op" onClick={() => setMortValues((prev) => ({...prev, mortType: "interest-only"}))}>
                    <input readOnly id="interest-only" type="radio" value="interest-only" name="mortType" checked={mortType === "interest-only"}/>
                    <label htmlFor="interest-only">Interest Only</label>
                </div>
                {mortTypeError && <span className="error-msg">This field is required.</span>}
            </div>

            <FormBtn/>
        </form>
    )
}

export default Calculator;