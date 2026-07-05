// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import ThreeScene from './components/ThreeScene';
import portfolioData from './data.json';

export default function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [time, setTime] = useState('— : —');
  const [repos, setRepos] = useState([]);

  // github activity

  useEffect(() => {
    fetch('https://api.github.com/users/codedbyryuk/repos?sort=updated')
      .then(res => res.json())
      .then(data => {
        const originalRepos = data.filter(repo => !repo.fork);
        setRepos(originalRepos);
      })
      .catch(err => console.error("Failed Fetching Repos ", err))
  }, []);

  // Loader 
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setIsLoaded(true);
      setIsReady(true);
      return;
    }

    let currentProgress = 0;
    let target = 0;
    const timer = setInterval(() => {
      target = Math.min(target + Math.random() * 18, 92);
      currentProgress += (target - currentProgress) * 0.35;

      if (currentProgress > 90) {
        currentProgress = 100;
        setLoadProgress(100);
        clearInterval(timer);
        setIsLoaded(true);
        setTimeout(() => setIsReady(true), 80);
      } else {
        setLoadProgress(currentProgress);
      }
    }, 90);

    return () => clearInterval(timer);
  }, []);

  // Clock 
  useEffect(() => {
    const tick = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false
        }).format(new Date());
        setTime(formatted);
      } catch (e) {
        const d = new Date();
        setTime(String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"));
      }
    };
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);

  // Scroll and intersection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Reveal Observer
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // nav
    const sections = document.querySelectorAll("main .section");
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });

    sections.forEach(sec => spyObserver.observe(sec));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
      spyObserver.disconnect();
    };
  }, [isReady]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={`${isReady ? 'is-ready' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {!isLoaded && (
        <div id="loader" aria-hidden="false">
          <div className="loader-mark">FA</div>
          <div className="loader-bar"><span style={{ width: `${loadProgress}%` }}></span></div>
          <div className="loader-pct">INITIALIZING — {Math.floor(loadProgress)}%</div>
        </div>
      )}

      <div className="layout">
        <header className="sidebar" id="sidebar">
          <div className="sidebar-top">
            <a href="#hero" className="wordmark">CODEDBYRYUK</a>
            <p className="role-tag">Software&nbsp;Developer</p>
          </div>

          <button className="menu-toggle" onClick={toggleMenu} aria-expanded={menuOpen}>
            {menuOpen ? 'Close' : 'Menu'}
          </button>

          <nav className="index-nav" id="siteNav" aria-label="Section index">
            <ul>
              {['hero', 'about', 'stack', 'work', 'contact'].map((section, idx) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    className={`nav-link ${activeSection === section ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <span className="nav-num">0{idx}</span>
                    <span className="nav-label">{section === 'hero' ? 'Intro' : section.charAt(0).toUpperCase() + section.slice(1)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-bottom">
            <div className="clock"><span className="dot" aria-hidden="true"></span><span>{time}</span></div>
            <ul className="social-row">
              <li><a href="https://github.com/codedbyryuk" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://discord.com/users/1507692324157788180" target="_blank" rel="noopener noreferrer">Discord</a></li>
              <li><a href="https://x.com/codedbyryuk" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
            </ul>
            <a href="mailto:codedbyryuk@gmail.com" className="email-link">codedbyryuk@gmail.com</a>
          </div>
        </header>

        <main id="main">
          {/* Hero Section */}
          <section id="hero" className="section hero">
            <p className="eyebrow reveal">Fig. 00 — Status</p>
            <div className="status-line reveal"><span className="status-dot" aria-hidden="true"></span>Available for new projects — Q3 2026</div>
            <h1 className="hero-headline">
              <span><em>I build web software</em></span>
              <span><em>with the precision of</em></span>
              <span><em>an engineer and the</em></span>
              <span><em>eye of an editor.</em></span>
            </h1>
            <p className="hero-sub reveal">I am a full-stack developer focused on performant interfaces, developer tooling, and the small details most people never notice.</p>

            <ThreeScene />

            <p className="scroll-cue"><span className="scroll-line"></span>Scroll</p>
          </section>

          {/* About Section */}
          <section id="about" className="section">
            <p className="eyebrow reveal">Fig. 01 — About</p>
            <h2 className="section-heading reveal">Profile</h2>
            <div className="about-grid">
              <p className="about-copy reveal">
                I'm <strong>Fahim Akhtar</strong>, a software developer who likes software that behaves the way you'd expect it to. Most of my work sits at the intersection of front-end engineering and product design — building interfaces that are fast by default, not fast after a round of optimization. Lately I've been spending more time on developer tooling: the scripts, libraries, and small internal tools that make a team's day-to-day work a little less painful.
              </p>
              <dl className="spec-list reveal">
                <div><dt>Based in</dt><dd>Assam, India</dd></div>
                <div><dt>Focused on</dt><dd>Web platforms &amp; dev tools</dd></div>
                <div><dt>Currently</dt><dd>Open to freelance &amp; full-time</dd></div>
                <div><dt>Reachable via</dt><dd>codedbyryuk@gmail.com</dd></div>
              </dl>
            </div>
          </section>

          {/* skills Section */}
          <section id="stack" className="section">
            <p className="eyebrow reveal">Fig. 02 — Stack</p>
            <h2 className="section-heading reveal">Tools &amp; technologies</h2>
            <div className="stack-grid">
              {portfolioData.stack.map((group, index) => (
                <div key={index} className="stack-group reveal">
                  <h3>{group.category}</h3>
                  <ul>
                    {group.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          {/* Github Activity */}
          <section id='githubActivity' className='section'>
            <p className="eyebrow reveal">Fig. 03 — GitHub Activity</p>
            <h2 className="section-heading reveal">Repositories</h2>

            {/* The scrollable wrapper matching the layout style */}
            <div className="repo-scroll-container reveal">
              <div className="work-list">
                {repos.map((r, idx) => (
                  <a
                    key={r.id}
                    className="work-item"
                    href={r.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Sequential numbering padded with a leading zero */}
                    <span className="work-num">{String(idx + 1).padStart(2, '0')}</span>

                    <div className="work-main">
                      <h3>
                        {r.name}
                        {r.language && <span className="work-year">{r.language}</span>}
                      </h3>
                      <p className="work-desc">
                        {r.description || "No description provided for this repository."}
                      </p>
                    </div>

                    <div className="work-side">
                      <span className="work-arrow" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M5 19 19 5M9 5h10v10" />
                        </svg>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* projects Section */}
          <section id="work" className="section">
            <p className="eyebrow reveal">Fig. 04 — Selected work</p>
            <h2 className="section-heading reveal">Projects</h2>
            <div className="work-list">
              {portfolioData.projects.map((project) => (
                <a key={project.id} className="work-item reveal" href={project.link} target="_blank" rel="noopener noreferrer">
                  <span className="work-num">{project.id}</span>
                  <div className="work-main">
                    <h3>{project.title} <span className="work-year">{project.year}</span></h3>
                    <p className="work-desc">{project.description}</p>
                    <div className="work-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="work-side">
                    {/* Render the inner SVG diagram securely from the JSON string */}
                    <svg
                      className="work-diagram"
                      viewBox="0 0 64 64"
                      fill="none"
                      stroke="#15161B"
                      strokeWidth="1.2"
                      dangerouslySetInnerHTML={{ __html: project.diagram }}
                    />
                    <span className="work-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M5 19 19 5M9 5h10v10" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="section contact">
            <p className="eyebrow reveal">Fig. 05 — Contact</p>
            <h2 className="section-heading contact-heading reveal">Let's build<br />something.</h2>
            <a href="mailto:codedbyryuk@gmail.com" className="email-cta reveal">codedbyryuk@gmail.com</a>
            <div className="contact-row reveal">
              <a href="#" className="btn">Download résumé</a>
              <ul className="social-row">
                <li><a href="https://github.com/codedbyryuk" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://discord.com/users/1507692324157788180" target="_blank" rel="noopener noreferrer">Discord</a></li>
                <li><a href="https://x.com/codedbyryuk" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
              </ul>
            </div>
            <footer className="site-footer">
              <span>© {new Date().getFullYear()} Fahim Akhtar. Built from scratch, no template.</span>
              <span>Scroll {String(scrollProgress).padStart(3, '0')}% — India {time}</span>
            </footer>
          </section>

        </main>
      </div>
    </div>
  );
}