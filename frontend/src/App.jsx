import React, { useState, useRef, useEffect } from 'react'
import Hero from './sections/hero'
import Navbar from './components/navbar'
import About from './sections/about'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from '@studio-freight/lenis';
import Project from './sections/projects';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const container = useRef(null);



  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,       // How long the smooth scroll animation lasts (higher = more buttery)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Clean physics curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,   // Turn on smooth scrolling for mouse wheels
      wheelMultiplier: 1.4, // <-- THE MAGIC KNOB: Increase this (e.g., 1.5 to 2.0) to make a small scroll move a lot further!
    });

    // Connect Lenis to GSAP ScrollTrigger so they remain perfectly synced
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Clean up on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: true,

      }
    });

    tl.to('.heroLeft', { x: "-55vw", pointerEvents: "none", ease: "power2.inOut" }, 0)
      .to('.heroRight', { x: "55vw", pointerEvents: "none", ease: "power2.inOut" }, 0);
    tl.to('.heroBody', { pointerEvents: "none" }, 0)

    tl.to('.idk', {
      backgroundColor: "#000000",
      duration: 1,
    }, 0)
    tl.to({}, {
      duration: 1
    });

    tl.to('.projectSection', {
      yPercent: -100,
      ease: "power2.inOut"
    });


    let moveX = 0;
    let moveY = 0;
    let scaleDown = 1;
    const landingPad = document.querySelector('.pfp-name');
    const pfp = document.querySelector('.pfp .custom-pixel-card');

    if (landingPad && pfp) {
      const padRect = landingPad.getBoundingClientRect();
      const pfpRect = pfp.getBoundingClientRect();

      const targetSize = 60;

      const scaleDown = targetSize / pfpRect.width;

      const moveX = padRect.left - pfpRect.left + 10;
      const moveY = padRect.top - pfpRect.top + ((padRect.height - targetSize) / 2);



      // tl.to('.pfp img', {
      //   x: moveX,
      //   y: moveY,
      //   scale: scaleDown,
      //   transformOrigin: "top left", // Ensures it shrinks toward the correct grid coordinate
      //   ease: "power2.inOut"
      // }, 0);
      tl.to('.custom-pixel-card', {
        x: moveX,
        y: moveY,
        scale: scaleDown,
        transformOrigin: "top left",
        ease: "power2.inOut"
      }, 0);
    }

    tl.from('.card', {
      scale: 0.7,             /* Start shrunken down */
      opacity: 0,             /* Start completely invisible */
      y: 60,                  /* Slide upward slightly as they pop */
      stagger: 0.15,          /* 0.15s delay between each card's entry */
      ease: "back.out(1.6)",  /* The magic bounce ease. Increase 1.5 for more bounce */
      duration: 0.6
      /* Smooth window duration for the entry */
    }, 0);
   
  }, { scope: container });


  return (
    <>
      <div className="idk landing-page" ref={container}>
        <Navbar />
        <Hero />
        <About />
        <Project />
      </div>
    </>
  )
}

export default App
