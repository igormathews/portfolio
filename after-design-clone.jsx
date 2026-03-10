import React, { useState, useEffect } from 'react';

const AfterDesignClone = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const portfolioItems = [
    { title: 'Soar Mobile App', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop', tag: 'Mobile' },
    { title: 'Abode Health App', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop', tag: 'Healthcare' },
    { title: 'OpenStatus Dashboard', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop', tag: 'SaaS' },
    { title: 'PoppyAI Interface', image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200&h=800&fit=crop', tag: 'AI' },
    { title: 'Worksona Website', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop', tag: 'Web' },
    { title: 'Saturn Platform', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop', tag: 'Platform' },
    { title: 'Nabi Health', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop', tag: 'Wellness' },
    { title: 'Design System', image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=800&fit=crop', tag: 'System' },
  ];

  const testimonials = [
    {
      name: 'Max',
      company: 'OpenStatus',
      text: 'Working with After has been transformative for our product. Their attention to detail and product thinking is exceptional.'
    },
    {
      name: 'Rachel',
      company: 'Nabi Health',
      text: 'The team brought our vision to life with incredible design work. They understand AI products deeply.'
    },
    {
      name: 'Steven',
      company: 'Kleinveld',
      text: 'Fantastic design partner. Fast iterations, beautiful output, and truly collaborative process.'
    }
  ];

  const colors = {
    light: {
      bg: '#F8F8F0',
      sidebar: '#efefef',
      text: '#191919',
      textSecondary: '#666666',
      border: '#e0e0e0'
    },
    dark: {
      bg: '#191919',
      sidebar: '#000000',
      text: '#F8F8F0',
      textSecondary: '#999999',
      border: '#333333'
    }
  };

  const theme = isDarkMode ? colors.dark : colors.light;

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    },
    sidebar: {
      width: '33.333%',
      minWidth: '400px',
      backgroundColor: theme.sidebar,
      padding: '60px 40px',
      position: 'sticky',
      top: 0,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      transition: 'background-color 0.3s ease',
    },
    logo: {
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '60px',
      letterSpacing: '-0.02em',
    },
    nav: {
      display: 'flex',
      gap: '24px',
      marginBottom: '60px',
    },
    navLink: {
      fontSize: '14px',
      color: theme.text,
      textDecoration: 'none',
      opacity: 0.7,
      transition: 'opacity 0.2s ease',
      cursor: 'pointer',
    },
    headline: {
      fontSize: '28px',
      fontWeight: '700',
      lineHeight: '1.3',
      marginBottom: '24px',
      letterSpacing: '-0.03em',
    },
    subheadline: {
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '32px',
      color: theme.textSecondary,
    },
    clients: {
      fontSize: '13px',
      marginBottom: '32px',
      color: theme.textSecondary,
      lineHeight: '1.8',
    },
    pricing: {
      fontSize: '16px',
      fontWeight: '600',
      marginBottom: '8px',
    },
    pricingDetails: {
      fontSize: '13px',
      color: theme.textSecondary,
      marginBottom: '32px',
    },
    telegramButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 24px',
      backgroundColor: theme.text,
      color: theme.bg,
      border: 'none',
      borderRadius: '24px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.2s ease',
      marginTop: 'auto',
    },
    mainContent: {
      flex: 1,
      padding: '60px 40px',
      overflowY: 'auto',
    },
    gallery: {
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      maxWidth: '1200px',
    },
    portfolioItem: {
      borderRadius: '16px',
      overflow: 'hidden',
      backgroundColor: theme.sidebar,
      transition: 'transform 0.3s ease, background-color 0.3s ease',
    },
    portfolioImage: {
      width: '100%',
      height: 'auto',
      display: 'block',
      objectFit: 'cover',
    },
    portfolioCaption: {
      padding: '16px 20px',
      fontSize: '14px',
      fontWeight: '600',
    },
    testimonialsSection: {
      marginTop: '80px',
      paddingTop: '60px',
      borderTop: `1px solid ${theme.border}`,
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '40px',
      letterSpacing: '-0.02em',
    },
    testimonialCard: {
      marginBottom: '32px',
      padding: '24px',
      backgroundColor: theme.sidebar,
      borderRadius: '12px',
      transition: 'background-color 0.3s ease',
    },
    testimonialText: {
      fontSize: '15px',
      lineHeight: '1.6',
      marginBottom: '16px',
      fontStyle: 'italic',
    },
    testimonialAuthor: {
      fontSize: '13px',
      fontWeight: '600',
      color: theme.textSecondary,
    },
    themeToggle: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.sidebar,
      color: theme.text,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      transition: 'all 0.3s ease',
      zIndex: 1000,
    },
    mobileContainer: {
      '@media (maxWidth: 768px)': {
        flexDirection: 'column',
      }
    },
    mobileSidebar: {
      '@media (maxWidth: 768px)': {
        width: '100%',
        minWidth: 'unset',
        position: 'relative',
        height: 'auto',
      }
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.themeToggle}
        onClick={() => setIsDarkMode(!isDarkMode)}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <aside style={styles.sidebar}>
        <div style={styles.logo}>After Design Studio</div>

        <nav style={styles.nav}>
          <a style={styles.navLink}
             onMouseEnter={(e) => e.target.style.opacity = '1'}
             onMouseLeave={(e) => e.target.style.opacity = '0.7'}>
            Brand Heroes
          </a>
          <a style={styles.navLink}
             onMouseEnter={(e) => e.target.style.opacity = '1'}
             onMouseLeave={(e) => e.target.style.opacity = '0.7'}>
            About Us
          </a>
        </nav>

        <h1 style={styles.headline}>
          Design partner for AI founders
        </h1>

        <p style={styles.subheadline}>
          You bring the vision and direction. We bring the product thinking and design.
        </p>

        <div style={styles.clients}>
          <strong>100+ projects. 12 years in tech.</strong>
          <br /><br />
          Nabi · Soar · Abode · PwC · Volvo · Saturn · PoppyAI · Worksona · OpenStatus
        </div>

        <div style={styles.pricing}>
          $7,347/m or $1,999/weekly
        </div>
        <div style={styles.pricingDetails}>
          Unlimited design, cancel anytime
        </div>

        <button style={styles.telegramButton}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
          <span>💬</span>
          Start on Telegram
        </button>
      </aside>

      <main style={styles.mainContent}>
        <div style={styles.gallery}>
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              style={styles.portfolioItem}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img
                src={item.image}
                alt={item.title}
                style={styles.portfolioImage}
              />
              <div style={styles.portfolioCaption}>
                {item.title}
                <span style={{
                  marginLeft: '12px',
                  fontSize: '12px',
                  opacity: 0.6,
                  fontWeight: '400'
                }}>
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        <section style={styles.testimonialsSection}>
          <h2 style={styles.sectionTitle}>What clients say</h2>

          {testimonials.map((testimonial, index) => (
            <div key={index} style={styles.testimonialCard}>
              <p style={styles.testimonialText}>"{testimonial.text}"</p>
              <p style={styles.testimonialAuthor}>
                — {testimonial.name}, {testimonial.company}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default AfterDesignClone;
