import React, { useState } from "react";
import { getLenis } from "./scroll";
import './navbar.css';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const goTo = (progress) => {

        const lenis = getLenis();

        const trigger = ScrollTrigger.getAll()[0];

        const target =
            trigger.start +
            (trigger.end - trigger.start) * progress;

        lenis.scrollTo(target);
    };

    return (<>

        <div className="navbarBody">

            <nav>

                {/* Desktop */}
                <div className="nav-left">
                    <a onClick={() => goTo(0)}>Home</a>
                    <a onClick={() => goTo(0.25)}>About</a>
                </div>

                <div className="nav-right">
                    <a onClick={() => goTo(0.70)}>Projects</a>
                    <a onClick={() => goTo(1.0)}>Contact</a>
                </div>

                {/* Mobile Hamburger */}
                <div
                    className={`menu-btn ${menuOpen ? "open" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </nav>
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

                <a href="#hero">
                    Home
                </a>

                <a href="#about">
                    About
                </a>

                <a href="#project">
                    Projects
                </a>

                <a href="#contact">
                    Contact
                </a>

            </div>

        </div >

    </>)
}


export default Navbar;