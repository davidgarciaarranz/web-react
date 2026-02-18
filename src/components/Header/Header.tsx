import React, { useState, useEffect } from 'react';
import './Header.scss';
import logo from '../../assets/images/LOGO BLANCO SIN FONDO.png';

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const controlHeader = () => {
            if (isMenuOpen) return; // No ocultar si el menú está abierto en móvil
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                // Desplazando hacia abajo y ha pasado el umbral de 100px
                setIsVisible(false);
            } else {
                // Desplazando hacia arriba
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', controlHeader);
        return () => {
            window.removeEventListener('scroll', controlHeader);
        };
    }, [lastScrollY, isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        event.preventDefault();
        setIsMenuOpen(false); // Cerrar menú al hacer click

        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Función para scroll lento personalizado
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            const duration = 1500; // Duración en ms para que sea lento
            let start: number | null = null;

            const animation = (currentTime: number) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };

            // Función de suavizado (easeInOutQuad)
            const ease = (t: number, b: number, c: number, d: number) => {
                t /= d / 2;
                if (t < 1) return (c / 2) * t * t + b;
                t--;
                return (-c / 2) * (t * (t - 2) - 1) + b;
            };

            requestAnimationFrame(animation);
        }
    };

    return (
        <header className={`header-container ${!isVisible ? 'header-hidden' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="header-logo" onClick={(e) => scrollToSection(e as any, 'init')}>
                <img src={logo} alt="Will Only Will" />
            </div>

            <button className="hamburger" onClick={toggleMenu} aria-label="Menu">
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
                <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
            </button>
            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                <a href="#newsletter" className="nav-link" onClick={(e) => scrollToSection(e, 'newsletter')}>
                    <span></span><span></span><span></span><span></span>
                    ¿Quién soy?
                </a>
                <a href="#photos" className="nav-link" onClick={(e) => scrollToSection(e, 'photos')}>
                    <span></span><span></span><span></span><span></span>
                    Galería
                </a>
                <a href="#contact" className="nav-link" onClick={(e) => scrollToSection(e, 'contact')}>
                    <span></span><span></span><span></span><span></span>
                    Contacto
                </a>
            </nav>
        </header>
    );
};

export default Header;