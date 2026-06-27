import React from "react";
import { getLenis } from "./scroll";
import './navbar.css';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollToPlugin);

function Navbar() {

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
                <div className="nav-left">
                    <a onClick={() => goTo(0)} >Home</a>
                    <a onClick={() => goTo(0.25)}>About</a>
                </div>

                <div className="nav-right">
                    <a onClick={() => goTo(0.70)}>Projects</a>
                    <a onClick={() => goTo(1.0)}>Contact</a>
                </div>
            </nav >

        </div >

    </>)
}


export default Navbar;