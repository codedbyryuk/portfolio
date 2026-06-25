import React, { useState, useEffect, useRef, cloneElement } from "react";
import './hero.css';
import Navbar from "../components/navbar";
import gsap from 'gsap';
import PixelTransition from "../components/pixelTransition";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

function Hero() {

    const [commit, setCommit] = useState({ message: "Fetching latest updates...", date: "" })

    useEffect(() => {
        const username = "codedbyryuk";
        const repo = "portfolio";

        fetch(`https://api.github.com/repos/${username}/${repo}/commits?per_page=1`)
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => {
                if (data && data[0]) {
                    const fullMessage = data[0].commit.message;

                    const cleanMessage = fullMessage.length > 50
                        ? fullMessage.substring(0, 50) + "..."
                        : fullMessage;

                    const rawData = new Date(data[0].commit.commiter);
                    const formattedDate = rawData.toLocaleDateString('en-us', {
                        month: "short",
                        day: "numeric"
                    });

                    setCommit({ message: cleanMessage, date: formattedDate });


                }
            }).catch(() => {
                setCommit({ message: "System operational", date: "Latest" });
            });
    }, []);

    const hoverIn = (e) => {
        gsap.to(e.currentTarget, { y: -10, duration: 0.25 });
    };

    const hoverOut = (e) => {
        gsap.to(e.currentTarget, { y: 0, duration: 0.25 });
    };

    return (
        <>
            <div className="heroBody">

                <div className="hero heroLeft">
                    <div className="headings">
                        <h1>Making things i wish existed.</h1>
                        <p>

                            A collection of tools, websites, experiments, and things that started as random ideas.</p>
                    </div>
                    <div className="leftWidget">
                        <div className="availability-widget">
                            <div className="widget-status">
                                <span className="pulse-dot status-pulse"></span>
                                <span className="widget-label">CURRENT AVAILABILITY:</span>
                            </div>
                            <div className="widget-content">
                                <span className="status-msg">Open for commissions & collabs</span>
                            </div>
                        </div>



                        <img onMouseEnter={hoverIn} onMouseLeave={hoverOut}
                            onClick={() => window.location.href = "https://www.github.com/codedbyryuk"} className="profile-widget" style={{ width: "69px" }} src="/github.svg" alt="" />

                    </div>

                </div>
                <div className="scrollUp" onMouseEnter={hoverIn} onMouseLeave={hoverOut} title="scroll down!">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 12L12 8M12 8L8 12M12 8V16M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                </div>
                <div className=" hero heroRight">
                    <div className="bgText">DEVELOPER<br />BUILDER</div>
                    <div className="commit-widget">
                        <div className="widget-status">
                            <span className="pulse-dot"></span>
                            <span className="widget-label">LIVE STATUS:</span>
                        </div>
                        <div className="widget-content">
                            <span className="commit-msg">"{commit.message}"</span>
                            {commit.date && <span className="commit-date">{commit.date}</span>}
                        </div>
                    </div>
                </div>
                <div className="pfp">
                    {/* <img src="/pfp_def.png"  onMouseEnter={hoverIn} onMouseLeave={hoverOut}/> */}
                    <PixelTransition
                        firstContent={
                            <img
                                src="/pfp_def.png"
                                alt="default pixel transition content, a cat!"
                                style={{ width: "230px" }}
                            />
                        }
                        secondContent={
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    cursor: "pointer",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    placeItems: "center",
                                    backgroundColor: "#11111191"
                                }}
                            >
                                <img style={{ width: "50px", border: "none", borderRadius: "0" }} src="/instagram_col.svg" />
                                <p style={{ fontWeight: 900, fontFamily: "suisse", fontSize: "1.4rem" }}><a style={{ color: "#ffffff" }} href="https://www.instagram.com/codedbyryuk" target="_blank">codedbyryuk</a></p>
                            </div>
                        }
                        gridSize={8}
                        pixelColor="#ffffff"
                        once={false}
                        animationStepDuration={0.4}
                        className="custom-pixel-card"
                    />

                </div>

            </div>
        </>
    )
}
//<div>Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a>is licensed by CC BY 4.0</div>

export default Hero;