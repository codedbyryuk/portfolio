import React, { useState, useEffect, useRef } from "react";
import './projects.css';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const LOCAL_PROJECTS = [
    {
        name: "Pokemon Bid Wars",
        description: "A Pokemon fan-game in which players bid on a pokemon to get it and build their team. The battle takes place in pokemon showdown",
        logo: "/pokemonbidwars_pfp.png", // Path to your local asset or external URL
        link: "https://pokemonbidwars.pages.dev",
        gallery:"/pokebidwars_gal.png"
    },
    {
        name: "FireSideTalks",
        description: "A simple chatting web-app made with web sockets.",
        logo: "/firesidetalk_ico.png",
        link: "https://firesidetalk.pages.dev",
        gallery:"/firesidetalks_gal.png"
    },
];


function Project() {

    const [repos, setRepos] = useState([]);


    const scrollRef = useRef(null);
    const githubScrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth;

            if (direction === 'left') {
                scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        fetch('https://api.github.com/users/codedbyryuk/repos?sort=updated')
            .then(res => res.json())
            .then(data => {
                const originalRepos = data.filter(repo => !repo.fork);
                setRepos(originalRepos);
            })
            .catch(err => console.error("Failed Fetching Repos ", err))
    }, []);

    useEffect(() => {
        const container = githubScrollRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            const isScrollingDown = e.deltaY > 0;
            const canScrollDown = container.scrollHeight - container.scrollTop > container.clientHeight + 1;
            const canScrollUp = container.scrollTop > 0;

            // If the box can still scroll internally, kill the page scroll and scroll manually
            if ((isScrollingDown && canScrollDown) || (!isScrollingDown && canScrollUp)) {
                e.preventDefault(); // Stifles the outer page/section scroll completely
                container.scrollTop += e.deltaY; // Manually executes the scroll internally
            }
        };

        // CRITICAL: { passive: false } allows e.preventDefault() to actually function
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [repos]);


    return (<>
        <div className="projectSection" id="project">
            <div className="cards projects-top-header">
                <div className="header-title-group">
                    <h2 className="global-section-title">Verified <span style={{color:"var(--text-pure)"}}>Repositories</span></h2>
                    <p className="global-section-desc">A real-time directory syncing active repositories directly from GitHub <br />
                        alongside custom-crafted software tools and frameworks.</p>
                </div>

                {/* Dynamic indicator badge */}
                <div className="status-metric-badge">
                    <span className="pulse-dot"></span>
                    <span className="badge-text">{repos.length} Live Directories Connected</span>
                </div>
            </div>
            <div className="projectContainer">
                <div className="project-box githubRepos">
                    <h2 className="box-title">GitHub Activity</h2>


                    <div className="scroll-container"
                        ref={githubScrollRef}>
                        {repos.map(repo => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="repo-card"
                            >
                                <h3 className="repo-name">{repo.name}</h3>
                                <p className="repo-desc">
                                    {repo.description || "No description provided."}
                                </p>
                                {repo.language && (
                                    <span className="repo-lang">{repo.language}</span>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="project-box customProjects">
                    <h2 className="box-title">Featured Builds</h2>

                    <div className="scroll-container-horizontal" ref={scrollRef}>
                        {LOCAL_PROJECTS.map((project, index) => (
                            <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="custom-project-card">
                                <div className="project-header">
                                    <img src={project.logo} alt={`${project.name} logo`} className="project-logo" />
                                    <h3 className="repo-name">{project.name}</h3>
                                </div>
                                <p className="repo-desc">{project.description}</p>
                                <div className="gal_pics">
                                <img src={project.gallery} alt="" className="gallery" />
                                </div>
                            </a>
                        ))}

                    </div>
                    <div className="scrollBtns">
                        <img src="/left_arrow.svg" alt="" onClick={() => scroll('left')} />
                        <img src="/right_arrow.svg" alt="" onClick={() => scroll('right')} />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Project;