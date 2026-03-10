import React, { useState, useEffect } from 'react';

// ========================================
// PORTFOLIO CONFIGURATION
// Update this section to change content
// ========================================

const PORTFOLIO_CONFIG = {
  // Logo
  logo: "/images/logo.svg",

  // Project Images (in order of display)
  projects: [
    {
      name: "Soar Mobile App",
      image: "/images/soar-mobile-app.png",
      alt: "Soar mobile app view"
    },
    {
      name: "Abode Empty States",
      image: "/images/abode-empty-states.png",
      alt: "Abode empty states"
    },
    {
      name: "Project Showcase",
      image: "/images/project-showcase.png",
      alt: "Project showcase"
    },
    {
      name: "Website Bentoboxes",
      image: "/images/website-bentoboxes.png",
      alt: "Website bentoboxes"
    },
    {
      name: "Klinity",
      image: "/images/klinity.png",
      alt: "Klinity project"
    },
    {
      name: "Worksona",
      image: "/images/worksona.png",
      alt: "Worksona project"
    }
  ]
};

export default function Portfolio() {
  // Mobile detection
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      position: 'relative',
      width: '100%',
      height: isMobile ? 'auto' : '100vh',
      minHeight: '100vh',
      background: 'linear-gradient(90deg, #17171a 0%, #17171a 100%)',
    },
    aside: {
      position: isMobile ? 'relative' : 'absolute',
      left: 0,
      top: 0,
      width: isMobile ? '100%' : '640px',
      height: isMobile ? 'auto' : '100%',
      background: 'linear-gradient(90deg, #17171a 0%, #17171a 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: isMobile ? 'visible' : 'auto',
    },
    asideContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      padding: isMobile ? '24px 16px' : '32px',
      width: '100%',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: '16px',
      paddingTop: '24px',
      width: '100%',
    },
    logo: {
      width: isMobile ? '180px' : '248.9px',
      height: isMobile ? '11.6px' : '16px',
      objectFit: 'contain',
    },
    navLinks: {
      display: 'flex',
      gap: isMobile ? '16px' : '24px',
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: '500',
      fontSize: isMobile ? '14px' : '16px',
      color: '#f6fcff',
    },
    navLink: {
      opacity: 0.3,
      cursor: 'pointer',
      lineHeight: '20px',
    },
    heroSection: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      alignItems: 'center',
      paddingBottom: isMobile ? '40px' : '80px',
      paddingTop: isMobile ? '60px' : '240px',
      width: '100%',
    },
    heroContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '32px' : '48px',
      alignItems: 'center',
      width: '100%',
    },
    heading: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: '700',
      fontSize: isMobile ? '24px' : '32px',
      lineHeight: isMobile ? '28px' : '35px',
      color: '#f6fcff',
      textAlign: 'center',
      margin: 0,
    },
    textContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '12px' : '16px',
      alignItems: 'center',
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: '500',
      fontSize: isMobile ? '14px' : '16px',
      color: '#f6fcff',
      textAlign: 'center',
      width: '100%',
      padding: isMobile ? '0 8px' : '0',
    },
    bodyText: {
      lineHeight: '24px',
      margin: 0,
    },
    priceText: {
      lineHeight: '24px',
      margin: 0,
    },
    highlight: {
      fontWeight: '500',
    },
    ctaContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    ctaButton: {
      background: '#ff4f28',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '14px 32px' : '16px 24px',
      borderRadius: '80px',
      border: 'none',
      cursor: 'pointer',
      height: isMobile ? '52px' : '56px',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '300px' : 'none',
    },
    ctaButtonText: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: '500',
      fontSize: '16px',
      color: '#ffffff',
      margin: 0,
    },
    main: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      marginLeft: isMobile ? '0' : '640px',
      height: isMobile ? 'auto' : '100vh',
      overflow: isMobile ? 'visible' : 'auto',
    },
    mainBackground: {
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      padding: isMobile ? '32px 16px' : '64px 84px',
      width: '100%',
    },
    projectsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      alignItems: 'center',
      width: '100%',
    },
    projectCard: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRadius: '16px',
      width: '100%',
    },
    projectImage: {
      width: '100%',
      height: 'auto',
      display: 'block',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
    },
  };

  return (
    <div style={styles.container}>
      {/* Aside Section */}
      <div style={styles.aside}>
        <div style={styles.asideContainer}>
          {/* Navigation */}
          <div style={styles.nav}>
            <img
              src={PORTFOLIO_CONFIG.logo}
              alt="Logo"
              style={styles.logo}
            />
            <div style={styles.navLinks}>
              <div style={styles.navLink}>Feed</div>
              <div style={styles.navLink}>About</div>
            </div>
          </div>

          {/* Hero Section */}
          <div style={styles.heroSection}>
            <div style={styles.heroContent}>
              {/* Heading */}
              <div>
                <p style={styles.heading}>Design partner for AI founders.</p>
                <p style={styles.heading}>100+ projects. 12 years in tech.</p>
              </div>

              {/* Body Text */}
              <div style={styles.textContent}>
                <div>
                  <p style={styles.bodyText}>You bring the vision and direction. We bring the product thinking</p>
                  <p style={styles.bodyText}>and design.</p>
                </div>
                <div>
                  <p style={styles.priceText}>
                    All on a simple <span style={styles.highlight}>$7,347/m</span> plan or <span style={styles.highlight}>$1,999/weekly</span>.
                  </p>
                  <p style={styles.priceText}>Slack Communication. Unlimited Design. Cancel Anytime.</p>
                </div>
              </div>

              {/* CTA Button */}
              <div style={styles.ctaContainer}>
                <a href="https://t.me/emptyomind" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <button style={styles.ctaButton}>
                    <span style={styles.ctaButtonText}>Chat with Igor</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div style={styles.main}>
        <div style={styles.mainBackground}>
          <div style={styles.projectsContainer}>
            {PORTFOLIO_CONFIG.projects.map((project, index) => (
              <div key={index} style={styles.projectCard}>
                <img
                  src={project.image}
                  alt={project.alt}
                  style={styles.projectImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
