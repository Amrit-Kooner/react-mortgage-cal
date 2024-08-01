import defaultImage from "../img/illustration-empty.svg"

function Results({monthlyPayments, repay}){
    const original = (
        <>
            <div className="img-wrapper">
                <img src={defaultImage} alt="illustration-img"/>
            </div>

            <div className="desc-wrapper">
                <h2 className="title">results shown here</h2>
                <p className="desc">Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
            </div>
        </>
    )

    const solution = (
        <>
            <div className="desc-wrapper">
                <h2 className="title">your results</h2>
                <p className="desc">Your results are show below based on the information you provided. 
                    to ajust the results, edit the form and click "calculate repayments" again.</p>
            </div>

            <div className="results-wrapper">
                <div className="payment">
                    <h4>Your monthly repayments</h4>
                    <div className="monthly">£{monthlyPayments}</div>
                </div>
                
                <div className="divider"></div>

                <div className="payment">
                    <h4>Total you'll repay over the term</h4>
                    <div className="repay">£{repay}</div>
                </div>
            </div>
        </>
    )

    return (
        <div className={`result ${(monthlyPayments && repay) ? "results-solution" : "results-original"}`}>
            {(monthlyPayments && repay)  ? solution : original}
        </div>
    )
}

export default Results;