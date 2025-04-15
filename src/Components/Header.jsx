import React, { useState, useEffect } from 'react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[21] transition-all duration-300 ease-in-out px-12 py-12 ${scrolled ? 'translate-y-0' : ''}`}>
      <div className={`w-full h-12 flex justify-between items-center ${scrolled ? 'bg-[rgba(26,26,26,0.8)] py-10 px-12' : 'bg-[rgba(26,26,26,0.6)] backdrop-blur-[10px] py-12 px-12'} border border-[rgba(255,255,255,0.1)] rounded-xl shadow-lg`}>
        <div className="text-2xl font-bold text-white m-auto text-shadow hover:text-shadow-lg transition-all duration-300 ">
          <span className='text-yellow-400'>SkillHive</span>
        </div>
        <nav className="flex gap-8 items-center">
          <a href="#" className="text-[rgba(255,255,255,0.8)] hover:text-white text-base transition-all duration-300 relative py-2 hover:text-shadow-md after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent after:transition-all after:duration-300">Home</a>
          <a href="#" className="text-[rgba(255,255,255,0.8)] hover:text-white text-base transition-all duration-300 relative py-2 hover:text-shadow-md after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent after:transition-all after:duration-300">About</a>
          <a href="#" className="text-[rgba(255,255,255,0.8)] hover:text-white text-base transition-all duration-300 relative py-2 hover:text-shadow-md after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent after:transition-all after:duration-300">Services</a>
          <a href="#" className="text-[rgba(255,255,255,0.8)] hover:text-white text-base transition-all duration-300 relative py-2 hover:text-shadow-md after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent after:transition-all after:duration-300">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;