import React, { useEffect } from "react";
import './about.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const LOCAL_PROJECTS = [
    {
        name: "Sovern Lab Portfolio",
        description: "Professional portfolio built with React, GSAP animations, and integrated 3D elements.",
        logo: "/favicon.svg", // Path to your local asset or external URL
        link: "https://yourlink.com"
    },
    {
        name: "Vrynt Flow Dashboard",
        description: "An Electron-based application syncing developer stats from GitHub and Cloudflare.",
        logo: "icons.svg",
        link: "https://yourlink.com"
    }
];


function About() {

    const hoverIn = (e) => {
        gsap.to(e.currentTarget, { y: -10, duration: 0.25 });
    };

    const hoverOut = (e) => {
        gsap.to(e.currentTarget, { y: 0, duration: 0.25 });
    };
   

    return (
        <>
            <div className="aboutTrigger"></div>
            <div className="aboutBody">

                <div className="card boxes">
                    <div className="card bento aboutme" onMouseEnter={() => {
                        const pfp = document.querySelector('.pfp'); // Swap with your actual PFP class name
                        if (pfp) pfp.style.marginTop = '-4px';
                    }}
                        onMouseLeave={() => {
                            const pfp = document.querySelector('.pfp'); // Swap with your actual PFP class name
                            if (pfp) pfp.style.marginTop = '0px';
                        }}

                    >
                        <div className="head">
                            <span className="tag aboutTag">ABOUT ME</span>
                            <div className="pfp-name">
                                <div className="dummy"></div>
                                <p className="bento">Fahim Akhtar</p>
                            </div>
                        </div>
                        <div className="card paras">
                            <p className="leftTxt">Hi, I am Fahim and I enjoy building software, exploring new technologies,
                                and turning ideas into working projects.
                            </p>
                            <p className="rightTxt"> Most of my work starts with curiosity—whether it's a
                                tool, a game, a website, or an experiment worth pursuing.</p></div>
                    </div>
                    <div className="secbox">
                        <div className="card box bento toolbox" onMouseEnter={hoverIn} onMouseLeave={hoverOut}><span className="tag aboutTag">MY SKILLS</span>

                            <div className="skills">
                                <img className=" skillIcon" src="/favicon.svg" alt="react" />
                                <img className=" skillIcon" src="/cpp.svg" alt="c++" />
                                <img className=" skillIcon" src="/c-lang.svg" alt="c-lang" />
                                <img className=" skillIcon" src="/java-svgrepo-com.svg" alt="java" />
                                <img className=" skillIcon" src="/js-svgrepo-com.svg" alt="JS" />
                                <img className=" skillIcon" src="/node-js-svgrepo-com.svg" alt="nodejs" />
                                <img className=" skillIcon" src="/python-svgrepo-com.svg" alt="python" />
                            </div>
                        </div>
                        <div className=" card box bento status" onMouseEnter={hoverIn} onMouseLeave={hoverOut}><span className="tag aboutTag">CURRENT STATUS</span>
                            <div className="info">
                                <p><span>Current Project: </span>SaaS web app.</p>
                                <p><span>Exploring: </span>Backend architectures.</p>
                                <p><span>Status: </span>Actively building and learning.</p>
                                <br />
                                <p><span>OS: </span>Arch Linux</p>
                                <p><span>IDE: </span>VS Code</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* PROJECT SECTION */}

           

        </>
    )
}

export default About;