import React from "react";
import './navbar.css';


function Navbar() {
    return (<>

        <div className="navbarBody">
            
                <nav>
                    <div className="nav-left">
                        <a href="">Home</a>
                        <a href="">About</a>
                    </div>

                    <div className="nav-right">
                        <a href="">Projects</a>
                        <a href="">Contact</a>
                    </div>
                </nav>
            
        </div>

    </>)
}


export default Navbar;