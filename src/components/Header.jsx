import React, { useState, useEffect } from 'react';
import githubLogo from '../assets/imgs/github-logo.png';
import brandImg from '../assets/imgs/brand.jpg';

export default function Header({ openHistory, openDropdown }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);

  // Détecter changement de taille viewport
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1100);
      if (window.innerWidth >= 1100) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  return (
    <header>
      <div className="headerGrid">
        {/* Zone gauche : logos ou hamburger */}
        <div className="headerLeft">
          {isMobile ? (
            <>
              <button className="hamburger" onClick={toggleMobileMenu}>
                &#9776;
              </button>
              {mobileMenuOpen && (
                <ul className="mobileMenu">
                  <li onClick={() => { openHistory(); setMobileMenuOpen(false); }}>
                    Historique
                  </li>
                  <li onClick={() => { openDropdown(); setMobileMenuOpen(false); }}>
                    A Propos
                  </li>
                  <li>
                    <a href="https://github.com/MagicAres" target="_blank">GitHub</a>
                  </li>
                  <li>
                    <a href="https://www.deviantart.com/magicares" target="_blank">DeviantArt</a>
                  </li>

                </ul>
              )}
            </>
          ) : (
            <div id="logo">
              <a href="https://github.com/MagicAres" target="_blank">
                <img src={githubLogo} alt="Github logo" width="40" height="40" title="Github" />
              </a>
              <a href="https://www.deviantart.com/magicares" target="_blank">
                <img src={brandImg} alt="MagicAres DeviantArt" width="40" height="40" title="DeviantArt" />
              </a>
              <br />
              <sup>MagicAres</sup>
            </div>
          )}
        </div>

        {/* Zone centrale : titre */}
        <div className="headerCenter">
          <h1>21 Jake</h1>
        </div>

        {/* Zone droite : boutons */}
        {!isMobile && (
          <div className="headerRight">
            <button className="btnNav1" onClick={openHistory}>Historique</button>
            <button className="btnNav2" onClick={openDropdown}>A Propos</button>
          </div>
        )}
      </div>
    </header>
  );
}
