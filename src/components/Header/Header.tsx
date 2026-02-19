import React, { useState, useEffect, useRef } from 'react';
import './Header.scss';
import logo from '../../assets/images/LOGO BLANCO SIN FONDO.png';

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const controlHeader = () => {
            if (isMenuOpen) return;
            setIsVisible(window.scrollY <= lastScrollY.current || window.scrollY <= 100);
            lastScrollY.current = window.scrollY;
        };
        window.addEventListener('scroll', controlHeader);
        return () => window.removeEventListener('scroll', controlHeader);
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const scrollToSection = (sectionId: string) => {
        setIsMenuOpen(false);
        const section = document.getElementById(sectionId);
        if (!section) return;

        const headerOffset = 80;
        const startPosition = window.pageYOffset;
        const distance = section.getBoundingClientRect().top + startPosition - headerOffset - startPosition;
        const duration = 1500;
        let start: number | null = null;

        const ease = (t: number, b: number, c: number, d: number) => {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        const animation = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            window.scrollTo(0, ease(timeElapsed, startPosition, distance, duration));
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    };

    return (
        <header className={`header-container ${!isVisible ? 'header-hidden' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <button className="header-logo" onClick={() => scrollToSection('init')}>
                <img src={logo} alt="Will Only Will" />
            </button>

            <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            </button>

            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                <a href="#newsletter" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('newsletter'); }}>
                    <span></span><span></span><span></span><span></span>
                    ¿Quién soy?
                </a>
                <a href="#gallery" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>
                    <span></span><span></span><span></span><span></span>
                    Galería
                </a>
                <a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                    <span></span><span></span><span></span><span></span>
                    Contacto
                </a>
            </nav>
        </header>
    );
};

export default Header;