import { FaCalculator } from "react-icons/fa6";

function FormBtn({}){
    return (
        <button type='submit' className="form-btn">
            <span className="cal-icon"><FaCalculator/></span>
            calculate repayment
        </button>
    )
}

export default FormBtn;