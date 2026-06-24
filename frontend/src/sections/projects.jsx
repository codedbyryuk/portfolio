import React from "react";
import './projects.css';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);






function Project() {

    return (<>
        <div className="projectSection">
            <div className="projectContainer">
                <div className="githubRepos">

                </div>
                <div className="customProjects">

                </div>
            </div>
        </div>
    </>)
}

export default Project;