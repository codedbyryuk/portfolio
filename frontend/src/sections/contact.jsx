import React from "react";
import './contact.css';
import { useEffect,useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './contact.css';
import SocialLinks from "../components/social_links";

gsap.registerPlugin(ScrollTrigger);


function Contact() {

    const sectionRef = useRef(null);
    const boxRef = useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, sent

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Simulate a network request
        setTimeout(() => {
            setStatus('sent');
            setFormData({ username: '', email: '', message: '' });

            // Reset back to idle after a few seconds
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (<>

        <div className="contactSection" >
            <div className="contactWrapper" >
                <div className="left">
                    <div className="text">
                        <h2>Let's <span style={{ color: "#00ff66" }}>build</span> something next.</h2>
                        <p>  Currently accepting new opportunities, custom development projects, and collaborative<br /> experiments. Send over a message to discuss a timeline or establish a connection.</p>
                    </div>
                </div>
                <div className="right">
                    <form className="reveal-item contact-form" onSubmit={handleSubmit}>

                        <div className="input-group-row">
                            <div className="input-wrapper">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="John Doe"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-wrapper">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="john@domain.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                placeholder="Detail your project or query here..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`submit-btn ${status}`}
                            disabled={status !== 'idle'}
                        >
                            {status === 'idle' && 'Send Message ↗'}
                            {status === 'sending' && 'Sending...'}
                            {status === 'sent' && 'Message Delivered ✓'}
                        </button>
                    </form>
                    <div className="socialLinks">
                    <p>Also available on</p>
                    <SocialLinks/>
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export default Contact