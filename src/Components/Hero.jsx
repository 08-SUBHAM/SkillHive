import React, { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  const wrapperRef = useRef(null);
  const resizeTimerRef = useRef(null);
  const lastFrameRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const createHoneycomb = () => {
    if (!wrapperRef.current) return;
    
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    setDimensions({
      width: viewportWidth,
      height: viewportHeight
    });
  };

  const generateHexGrid = () => {
    const hexHeight = 150;
    const hexWidth = 180;
    const rowHeight = hexHeight * 0.75;
    
    const numRows = Math.ceil(dimensions.height / rowHeight) - 2;
    const hexPerRow = Math.ceil(dimensions.width / (hexWidth * 0.75)) + 5;
    
    const rows = [];
    
    for (let i = 0; i < numRows; i++) {
      const hexagons = [];
      for (let j = 0; j < hexPerRow; j++) {
        hexagons.push(
          <div key={`hex-${i}-${j}`} className={styles.hexagon}>
            <div className={styles['hexagon-ambient']} />
            <div className={styles['hexagon-glow']} />
            <div className={styles['hexagon-shape']} />
            <div className={styles['hexagon-edge']} />
          </div>
        );
      }
      rows.push(
        <div key={`row-${i}`} className={styles.hex}>
          {hexagons}
        </div>
      );
    }
    
    return rows;
  };

  const updateHexagons = (e) => {
    const currentTime = performance.now();
    const fps = 60;
    const fpsInterval = 1000 / fps;

    if (currentTime - lastFrameRef.current < fpsInterval) return;
    lastFrameRef.current = currentTime;

    const hexagons = wrapperRef.current?.querySelectorAll(`.${styles.hexagon}`)
    if (!hexagons) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const radius = 300;

    hexagons.forEach(hex => {
      const rect = hex.getBoundingClientRect();
      const hexCenterX = rect.left + rect.width / 2;
      const hexCenterY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - hexCenterX, 2) + 
        Math.pow(mouseY - hexCenterY, 2)
      );

      if (distance < radius) {
        const intensity = 1 - (distance / radius);
        
        const dirX = hexCenterX - mouseX;
        const dirY = hexCenterY - mouseY;
        const length = Math.sqrt(dirX * dirX + dirY * dirY);
        const normalizedDirX = dirX / length;
        const normalizedDirY = dirY / length;
        
        const maxElevation = 15;
        const elevation = Math.floor(maxElevation * intensity);
        
        const glow = hex.querySelector(`.${styles['hexagon-glow']}`);
        const ambient = hex.querySelector(`.${styles['hexagon-ambient']}`);
        const shape = hex.querySelector(`.${styles['hexagon-shape']}`);
        const edge = hex.querySelector(`.${styles['hexagon-edge']}`);
        
        if (glow) {
          glow.style.opacity = intensity;
          glow.style.transform = `scale(${1 + intensity * 0.2})`;
        }
        
        if (ambient) {
          ambient.style.opacity = intensity * 0.8;
          ambient.style.transform = `scale(${1 + intensity * 0.5})`;
        }
        
        if (shape) {
          shape.style.transform = `translateZ(${elevation}px)`;
        }
        
        if (edge) {
          edge.style.opacity = intensity;
          edge.style.transform = `translateZ(${elevation + 1}px)`;
        }

        hex.style.transform = `
          translate3d(${normalizedDirX * elevation * 0.5}px,
                    ${normalizedDirY * elevation * 0.5}px,
                    0)
          rotateX(${-normalizedDirY * 15 * intensity}deg)
          rotateY(${normalizedDirX * 15 * intensity}deg)
        `;
        
        hex.style.zIndex = Math.floor(intensity * 20) + 1;
      } else {
        const glow = hex.querySelector(`.${styles['hexagon-glow']}`);
        const ambient = hex.querySelector(`.${styles['hexagon-ambient']}`);
        const shape = hex.querySelector(`.${styles['hexagon-shape']}`);
        const edge = hex.querySelector(`.${styles['hexagon-edge']}`);
        
        if (glow) glow.style.opacity = '0';
        if (ambient) ambient.style.opacity = '0';
        if (shape) shape.style.transform = 'translateZ(0)';
        if (edge) edge.style.opacity = '0';
        
        hex.style.transform = 'translate3d(0, 0, 0)';
        hex.style.zIndex = '1';
      }
    });
  };

  useEffect(() => {
    createHoneycomb();
    
    const handleResize = () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      resizeTimerRef.current = setTimeout(createHoneycomb, 250);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseMove={updateHexagons}
      onMouseOver={(e) => {
        if (e.target.classList.contains(styles.hexagon)) {
          e.target.classList.add(styles.glow);
        }
      }}
      onMouseOut={(e) => {
        if (e.target.classList.contains(styles.hexagon)) {
          e.target.classList.remove(styles.glow, styles.active);
        }
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && generateHexGrid()}
    </div>
  );
};

export default Hero;