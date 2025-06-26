import react from "react";
import { Link } from "react-router-dom";

function Footer(){

    return(
        <footer className="bg-white dark:bg-primary dark:text-white border-t"> 
        <div className="p-5 gap-5 flex justify-left"> 
            <Link
              to="./Privacy"
              className="hover:underline"
            >
              Privacy
            </Link>
            {" "}
           <Link
              to="./Terms"
              className="hover:underline"
            >
              Terms
            </Link>
            </div>
        </footer>
    )
}

export default Footer;