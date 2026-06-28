import React, { useState, useRef, useEffect } from 'react'
import Hero from './sections/hero'
import Navbar from './components/navbar'
import About from './sections/about'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import Project from './sections/projects';
import Contact from './sections/contact';
import { setLenis } from './components/scroll';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const container = useRef(null);
  const lenisRef = useRef(null);
  const mm = gsap.matchMedia();




  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (isMobile) return;

    lenisRef.current = new Lenis({
      duration: 2.2,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    setLenis(lenisRef.current);

    const lenis = lenisRef.current;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true
        }
      });

      tl.to('.heroLeft', {
        x: "-55vw",
        ease: "power2.inOut"
      }, 0);

      tl.to('.heroRight', {
        x: "55vw",
        ease: "power2.inOut"
      }, 0);

      tl.to('.heroBody', {
        pointerEvents: "none"
      }, 0);

      tl.to({}, { duration: 1 });

      tl.to('.projectSection', {
        yPercent: -100,
        duration: 2,
        ease: "power4.inOut"
      });

      tl.to({}, { duration: 1 });

      tl.to(".contactSection", {
        xPercent: -100,
        duration: 1,
        ease: "power5.inOut"
      });

      tl.to(".projectSection", {
        xPercent: -100,
        duration: 1,
        ease: "power5.inOut"
      }, "<");

      const landingPad = document.querySelector(".pfp-name");
      const pfp = document.querySelector(".pfp .custom-pixel-card");

      if (landingPad && pfp) {
        const padRect = landingPad.getBoundingClientRect();
        const pfpRect = pfp.getBoundingClientRect();

        const targetSize = 60;

        tl.to(".custom-pixel-card", {
          x: padRect.left - pfpRect.left + 10,
          y: padRect.top - pfpRect.top + ((padRect.height - targetSize) / 2),
          scale: targetSize / pfpRect.width,
          transformOrigin: "top left",
          ease: "power2.inOut"
        }, 0);
      }

      tl.from(".cards", {
        scale: 0.7,
        opacity: 0,
        y: 60,
        stagger: 0.15,
        ease: "back.out(1.6)",
        duration: 0.6
      }, 0);

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();

  }, { scope: container });
  return (
    <>
      <div className="idk landing-page" ref={container}>
        <Navbar />
        <div id='hero'>
          <Hero />
        </div>
        <About />
        <Project />
        <Contact />
      </div>
    </>
  )
}

export default App
