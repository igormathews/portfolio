import React from 'react';

// Local image assets
const imgSoarMobileAppView = "/images/soar-mobile-app.png";
const imgAbodeEmptyStates = "/images/abode-empty-states.png";
const imgImage1 = "/images/project-showcase.png";
const imgWebsiteBentoboxes = "/images/website-bentoboxes.png";
const imgKlinity = "/images/klinity.png";
const imgWorksona = "/images/worksona.png";
const imgVector = "/images/logo.svg";

export default function Portfolio() {
  const styles = {
    container: {
      display: 'flex',
      position: 'relative',
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(90deg, #17171a 0%, #17171a 100%)',
    },
    aside: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '640px',
      height: '100%',
      background: 'linear-gradient(90deg, #17171a 0%, #17171a 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    },
    asideContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
      padding: '32px',
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
      width: '248.9px',
      height: '16px',
    },
    navLinks: {
      display: 'flex',
      gap: '24px',
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: '500',
      fontSize: '16px',
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
      paddingBottom: '80px',
      paddingTop: '240px',
      width: '100%',
    },
    heroContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '48px',
      alignItems: 'center',
      width: '100%',
    },
    heading: {
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: '700',
      fontSize: '32px',
      lineHeight: '35px',
      color: '#f6fcff',
      textAlign: 'center',
      margin: 0,
    },
    textContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      alignItems: 'center',
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: '500',
      fontSize: '16px',
      color: '#f6fcff',
      textAlign: 'center',
      width: '100%',
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
      padding: '16px 24px',
      borderRadius: '80px',
      border: 'none',
      cursor: 'pointer',
      height: '56px',
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
      marginLeft: '640px',
      height: '100vh',
      overflow: 'auto',
    },
    mainBackground: {
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      padding: '64px 84px',
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
              src={imgVector}
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
                <button style={styles.ctaButton}>
                  <span style={styles.ctaButtonText}>Chat with Igor</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div style={styles.main}>
        <div style={styles.mainBackground}>
          <div style={styles.projectsContainer}>
            {/* Project 1: Soar Mobile App */}
            <div style={styles.projectCard}>
              <img
                src={imgSoarMobileAppView}
                alt="Soar mobile app view"
                style={styles.projectImage}
              />
            </div>

            {/* Project 2: Abode Empty States */}
            <div style={styles.projectCard}>
              <img
                src={imgAbodeEmptyStates}
                alt="Abode empty states"
                style={styles.projectImage}
              />
            </div>

            {/* Project 3: Image 1 */}
            <div style={styles.projectCard}>
              <img
                src={imgImage1}
                alt="Project showcase"
                style={styles.projectImage}
              />
            </div>

            {/* Project 4: Website Bentoboxes */}
            <div style={styles.projectCard}>
              <img
                src={imgWebsiteBentoboxes}
                alt="Website bentoboxes"
                style={styles.projectImage}
              />
            </div>

            {/* Project 5: Klinity */}
            <div style={styles.projectCard}>
              <img
                src={imgKlinity}
                alt="Klinity project"
                style={styles.projectImage}
              />
            </div>

            {/* Project 6: Worksona */}
            <div style={styles.projectCard}>
              <img
                src={imgWorksona}
                alt="Worksona project"
                style={styles.projectImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
