import { FiTrash2 } from "react-icons/fi";

function Header({handleClear}){
    return (
        <div className="header-wrapper">
            <h1>mortgage calulator</h1> 
            <button type="button" title="Clear All Fields" onClick={handleClear}>
                <span className="trash-icon"><FiTrash2/></span>
            </button>
        </div>  
    )
}

export default Header;