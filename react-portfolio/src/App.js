import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import resume from "./resume";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const strings = useMemo(
    () => [
      "ML Enthusiast",
      "Python Developer",
      "Creative Coder",
      "Data Storyteller",
    ],
    []
  );

  // Optimized particles initialization for better performance
  const initParticles = () => {
    if (window.particlesJS) {
      // Reduced particle count and simplified config for better performance
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: window.innerWidth < 768 ? 30 : 50, // Fewer particles on mobile
            density: { enable: true, value_area: 1200 },
          },
          color: { value: ["#00cc00", "#0000cc"] }, // Reduced colors
          shape: { type: "circle" },
          opacity: { value: 0.4, random: false }, // Reduced opacity, no randomness
          size: { value: 2, random: false }, // Smaller, consistent size
          line_linked: {
            enable: true,
            distance: 100, // Reduced distance
            color: document.body.classList.contains("light-mode")
              ? "#333333"
              : "#ffffff",
            opacity: 0.3, // Reduced opacity
            width: 1,
          },
          move: {
            enable: true,
            speed: 1, // Slower movement for better performance
            direction: "none",
            random: false, // Consistent movement
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false }, // Disabled for performance
            onclick: { enable: false }, // Disabled for performance
          },
        },
        retina_detect: true,
      });
    }
  };

  const updateParticles = () => {
    initParticles();
  };

  // Theme toggle effect
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.body.classList.add("light-mode");
    }
  }, []);

  const toggleTheme = () => {
    try {
      setIsDarkMode(!isDarkMode);
      document.body.classList.toggle("light-mode");
      localStorage.setItem("theme", isDarkMode ? "light" : "dark");
      updateParticles();
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  };

  // Optimized typing animation effect with reduced frequency
  useEffect(() => {
    const currentString = strings[currentStringIndex];
    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setTypedText(currentString.substring(0, typedText.length - 1));
          if (typedText === "") {
            setIsDeleting(false);
            setCurrentStringIndex((prev) => (prev + 1) % strings.length);
          }
        } else {
          setTypedText(currentString.substring(0, typedText.length + 1));
          if (typedText === currentString) {
            setTimeout(() => setIsDeleting(true), 1500); // Reduced pause time
          }
        }
      },
      isDeleting ? 60 : 80 // Slightly slower for better performance
    );

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentStringIndex, strings]);

  useEffect(() => {
    // Optimized script loading with lazy initialization
    let scriptsLoaded = 0;
    const totalScripts = 1; // Only particles.js, others are loaded from HTML

    const checkAllScriptsLoaded = () => {
      scriptsLoaded++;
      if (scriptsLoaded === totalScripts) {
        // All critical scripts loaded, initialize features
        setTimeout(() => {
          try {
            initParticles();
          } catch (error) {
            console.warn("Particles initialization failed:", error);
          }
        }, 100);
      }
    };

    // Load particles.js only if not already loaded
    if (!window.particlesJS) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js";
      script.async = true; // Non-blocking load
      script.onload = checkAllScriptsLoaded;
      script.onerror = () => {
        console.warn("Failed to load particles.js");
        scriptsLoaded++; // Count as loaded to prevent hanging
      };
      document.head.appendChild(script);
    } else {
      // Already loaded
      checkAllScriptsLoaded();
    }

    // Optimized EmailJS initialization with debouncing
    const initEmailJS = () => {
      try {
        if (window.emailjs) {
          window.emailjs.init("6X7mvxAySdY5YAJse");
        } else {
          // Reduced polling frequency for better performance
          const checkEmailJS = setInterval(() => {
            if (window.emailjs) {
              try {
                window.emailjs.init("6X7mvxAySdY5YAJse");
                clearInterval(checkEmailJS);
              } catch (error) {
                console.warn("EmailJS initialization failed:", error);
                clearInterval(checkEmailJS);
              }
            }
          }, 200); // Increased interval

          // Clear interval after 3 seconds (reduced from 5)
          setTimeout(() => {
            clearInterval(checkEmailJS);
          }, 3000);
        }
      } catch (error) {
        console.warn("EmailJS setup failed:", error);
      }
    };

    // Delay EmailJS to prioritize visual elements
    setTimeout(initEmailJS, 500);

    // Optimized contact form setup with lazy loading
    const setupContactForm = () => {
      const contactForm = document.getElementById("contact-form");
      const formStatus = document.getElementById("form-status");
      const submitBtn = document.getElementById("submit-btn");

      if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
          e.preventDefault();

          // Disable button and show sending message
          if (submitBtn) submitBtn.disabled = true;
          if (formStatus) {
            formStatus.textContent = "Sending...";
            formStatus.style.color = "#66ff66";
          }

          // Send email using EmailJS
          if (window.emailjs) {
            window.emailjs
              .sendForm("service_8yfweaj", "template_swuhyxo", this)
              .then(
                function () {
                  if (formStatus) {
                    formStatus.textContent = "Message sent successfully!";
                    formStatus.style.color = "#66ff66";
                  }
                  contactForm.reset();
                  setTimeout(function () {
                    if (formStatus) formStatus.textContent = "";
                  }, 3000);
                },
                function (error) {
                  if (formStatus) {
                    formStatus.textContent =
                      "Failed to send message. Please try again.";
                    formStatus.style.color = "#ff6666";
                  }
                  console.error("EmailJS error:", error);
                }
              )
              .finally(function () {
                if (submitBtn) submitBtn.disabled = false;
              });
          }
        });
      }
    };

    // Lazy load contact form - only when user scrolls near contact section
    let contactFormSetup = false;
    const setupContactFormLazy = () => {
      if (!contactFormSetup) {
        setupContactForm();
        contactFormSetup = true;
      }
    };

    // Setup contact form when contact section comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === "contact") {
          setupContactFormLazy();
          observer.unobserve(entry.target);
        }
      });
    });

    // Start observing contact section after a delay
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        observer.observe(contactSection);
      }
    }, 1000);

    // Initialize AOS with optimized settings
    setTimeout(() => {
      if (window.AOS) {
        window.AOS.init({
          duration: 800, // Reduced from 1200
          once: true,
          offset: 50, // Reduced offset
          disable: window.innerWidth < 768, // Disable on mobile for performance
        });
      }
    }, 800); // Reduced delay

    // Disable Tilt.js completely to prevent errors - use CSS fallback instead
    const addFallbackClasses = () => {
      try {
        const tiltCards = document.querySelectorAll(".tilt-card");
        tiltCards.forEach((card) => {
          card.classList.add("tilt-fallback");
        });
        console.log("CSS hover effects applied - optimized for performance");
      } catch (fallbackError) {
        console.warn("Fallback CSS application failed:", fallbackError);
      }
    };

    // Apply CSS fallback immediately for better performance
    setTimeout(addFallbackClasses, 500);

    // Page transition effect - optimized
    const transition = document.querySelector(".page-transition");
    if (transition) {
      // Use requestAnimationFrame for smooth animation
      requestAnimationFrame(() => {
        transition.style.opacity = "0";
        setTimeout(() => {
          if (transition.parentNode) {
            transition.parentNode.removeChild(transition);
          }
        }, 300); // Reduced timeout
      });
    }

    // Cleanup function - optimized
    return () => {
      try {
        // Clean up particles if initialized
        if (window.pJSDom && window.pJSDom[0]) {
          window.pJSDom[0].pJS.fn.vendors.destroypJS();
          window.pJSDom = [];
        }

        // Clean up intersection observer
        if (observer) {
          observer.disconnect();
        }
      } catch (error) {
        console.warn("Cleanup failed:", error);
      }
    };
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = 60;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".navbar")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleRippleEffect = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  return (
    <div className="App">
      {/* Page Transition */}
      <div className="page-transition"></div>

      {/* Theme Toggle */}
      <div className="theme-toggle" aria-label="Toggle theme">
        <label className="cyber-switch">
          <input type="checkbox" checked={!isDarkMode} onChange={toggleTheme} />
          <span className="cyber-slider">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
          </span>
        </label>
      </div>

      {/* Navigation */}
      <nav className="navbar" aria-label="Main navigation">
        <div className="container">
          <div className="navbar-content">
            <a
              className="navbar-brand"
              href="#header"
              onClick={(e) => handleNavClick(e, "#header")}
            >
              Sreelal
            </a>

            {/* Desktop Navigation */}
            <div className="nav-links desktop-nav">
              {[
                "about",
                "education",
                "experience",
                "skills",
                "projects",
                "contact",
              ].map((section) => (
                <a
                  key={section}
                  className="nav-link"
                  href={`#${section}`}
                  onClick={(e) => handleNavClick(e, `#${section}`)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
              ></span>
              <span
                className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
              ></span>
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
            {[
              "about",
              "education",
              "experience",
              "skills",
              "projects",
              "contact",
            ].map((section) => (
              <a
                key={section}
                className="mobile-nav-link"
                href={`#${section}`}
                onClick={(e) => handleNavClick(e, `#${section}`)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Particles Background */}
      <div id="particles-js" className="particles-background"></div>

      {/* Header Section */}
      <header id="header" className="d-flex align-items-center">
        <div className="container text-center">
          <h1 data-text={resume.name}>{resume.name}</h1>
          <p className="lead mb-5">
            <span id="typed-text">{typedText}</span>
            <span className="cursor">|</span>
          </p>
          <div className="social-links mt-4">
            {resume.email && (
              <a
                href={`mailto:${resume.email}`}
                className="social-icon cyber-icon"
                title="Email"
                aria-label="Email"
              >
                <i className="fas fa-envelope"></i>
              </a>
            )}
            {resume.github && (
              <a
                href={resume.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon cyber-icon"
                title="GitHub"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            )}
            {resume.linkedin && (
              <a
                href={resume.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon cyber-icon"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {resume.tableau && (
              <a
                href={resume.tableau}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon cyber-icon"
                title="Tableau"
                aria-label="Tableau"
              >
                <i className="fas fa-chart-bar"></i>
              </a>
            )}
            {resume.leetcode && (
              <a
                href={resume.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon cyber-icon"
                title="LeetCode"
                aria-label="LeetCode"
              >
                <i className="fas fa-code"></i>
              </a>
            )}
            {resume.phone && (
              <a
                href={`tel:${resume.phone}`}
                className="social-icon cyber-icon"
                title="Phone"
                aria-label="Phone"
              >
                <i className="fas fa-phone"></i>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <h2
            className="section-title text-center mb-5"
            data-aos="zoom-in-down"
          >
            About Me
          </h2>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <p className="lead text-center" data-aos="fade-up">
                {resume.about}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-5">
        <div className="container">
          <h2
            className="section-title text-center mb-5"
            data-aos="zoom-in-down"
          >
            Education
          </h2>
          <div className="row">
            {resume.education.map((edu, index) => (
              <div
                key={index}
                className="col-md-6 mb-4"
                data-aos="slide-right"
                data-aos-delay={index * 150}
              >
                <div className="card cyber-card tilt-card">
                  <div className="card-body">
                    <h4 className="card-title">{edu.institution}</h4>
                    <p className="card-text">
                      {edu.degree}
                      <br />
                      <small>
                        {edu.duration} | {edu.location}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-5">
        <div className="container">
          <h2
            className="section-title text-center mb-5"
            data-aos="zoom-in-down"
          >
            Experience
          </h2>
          <div className="row">
            {resume.experience.map((exp, index) => (
              <div
                key={index}
                className="col-md-6 mb-4"
                data-aos="slide-left"
                data-aos-delay={index * 150}
              >
                <div className="card cyber-card tilt-card">
                  <div className="card-body">
                    <h4 className="card-title">{exp.organization}</h4>
                    <p className="card-text">
                      {exp.role}
                      <br />
                      <small>
                        {exp.duration} | {exp.location}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-5">
        <div className="container">
          <h2
            className="section-title text-center mb-5"
            data-aos="zoom-in-down"
          >
            Skills
          </h2>
          <div className="row">
            {resume.skills.map((skill, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card cyber-card">
                  <div className="card-body">
                    <h5 className="card-title">{skill.category}</h5>
                    <ul className="list-unstyled">
                      {skill.value.map((item, itemIndex) => (
                        <li key={itemIndex} className="skill-chip">
                          <i className="fas fa-code me-2"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Projects</h2>
          <div className="row">
            {resume.projects.map((project, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card cyber-card">
                  <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        className="btn btn-primary ripple"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View project ${project.name}`}
                        onClick={handleRippleEffect}
                      >
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section id="languages" className="py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Languages</h2>
          <div className="text-center">
            {resume.languages.map((lang, index) => (
              <span
                key={index}
                className="badge cyber-badge"
                style={{
                  background: index % 2 === 0 ? "#66ff66" : "#6666ff",
                  color: "#000",
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="py-5">
        <div className="container">
          <h2 className="section-title text-center mb-5">Interests</h2>
          <div className="text-center">
            {resume.interests.map((interest, index) => (
              <span
                key={index}
                className="badge cyber-badge"
                style={{
                  background: index % 2 === 0 ? "#66ff66" : "#6666ff",
                  color: "#000",
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container text-center">
          <h2 className="section-title mb-5">Get in Touch</h2>

          {/* Contact Form */}
          <div className="row">
            <div className="col-md-8 mx-auto mb-4">
              <div className="card cyber-card">
                <div className="card-body">
                  <p className="mb-4">Send me a message:</p>

                  <form id="contact-form">
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control cyber-input"
                        id="from_name"
                        name="from_name"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control cyber-input"
                        id="reply_to"
                        name="reply_to"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control cyber-input"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control cyber-input"
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Your Message"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary ripple"
                      id="submit-btn"
                    >
                      Send Message
                    </button>
                    <div id="form-status" className="mt-3"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="row mt-4">
            <div className="col-md-8 mx-auto">
              <div className="card cyber-card">
                <div className="card-body">
                  <h4 className="mb-4">Connect With Me</h4>
                  <div className="social-links d-flex justify-content-center flex-wrap">
                    {resume.email && (
                      <a
                        href={`mailto:${resume.email}`}
                        className="social-icon cyber-icon mb-3"
                        title="Email"
                      >
                        <i className="fas fa-envelope"></i>
                      </a>
                    )}
                    {resume.linkedin && (
                      <a
                        href={resume.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon cyber-icon mb-3"
                        title="LinkedIn"
                      >
                        <i className="fab fa-linkedin"></i>
                      </a>
                    )}
                    {resume.github && (
                      <a
                        href={resume.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon cyber-icon mb-3"
                        title="GitHub"
                      >
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                    {resume.leetcode && (
                      <a
                        href={resume.leetcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon cyber-icon mb-3"
                        title="LeetCode"
                      >
                        <i className="fas fa-code"></i>
                      </a>
                    )}
                    {resume.tableau && (
                      <a
                        href={resume.tableau}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon cyber-icon mb-3"
                        title="Tableau"
                      >
                        <i className="fas fa-chart-bar"></i>
                      </a>
                    )}
                    {resume.phone && (
                      <a
                        href={`tel:${resume.phone}`}
                        className="social-icon cyber-icon mb-3"
                        title="Phone"
                      >
                        <i className="fas fa-phone"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4">
        <div className="container">
          <p>
            © {resume.name} 2025 | Code & Craft by{" "}
            <i className="fas fa-code text-accent"></i>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
