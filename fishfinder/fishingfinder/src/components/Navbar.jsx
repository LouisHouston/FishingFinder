import { Link } from "react-router-dom";


function Navbar(){



    return(
        <header>
        <nav>
                <Link to='./Home' className="navbar-logo"> 
                    🐟Fishing Finder🐟 
                </Link> 
            <Link to='./Login' className="navbar-items"> Login </Link>
            <Link to='./Login' className="navbar-items"> Login </Link>
        </nav>
        </header>
    )



}


export default Navbar;