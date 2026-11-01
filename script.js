/**
 * PORTFÓLIO PROFISSIONAL — LEONARDO MORAES
 * Arquivo: script.js
 * Funcionalidades & Animações Fluidas (Estilo Lusion):
 * 1. Alternância de tema claro/escuro com persistência (localStorage)
 * 2. Animação de entrada inicial coreografada na apresentação (Hero)
 * 3. Header dinâmico com backdrop blur adaptativo ao rolar
 * 4. Menu de navegação fixo com destaque de seção ativa (Scrollspy)
 * 5. Menu mobile responsivo com overlay e animação de abertura/fechamento
 * 6. Rolagem suave calibrada para todos os links internos
 * 7. Animações de entrada com IntersectionObserver escalonadas (Staggered Reveal)
 * 8. Efeito sutil de profundidade, parallax e inclinação 3D (Tilt) no Hero e nos Cards de Projetos
 * 9. Validação interativa do formulário de contato no navegador
 * 10. Cópia rápida do e-mail com feedback visual (Toast)
 * 11. Suporte total a preferências de redução de movimento (prefers-reduced-motion)
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. SISTEMA DE TEMA CLARO / ESCURO COM TRANSIÇÃO ELEGANTE
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const STORAGE_KEY = 'leonardo_moraes_portfolio_theme';

  const setTheme = (theme) => {
    document.body.classList.add('theme-transitioning');
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro');
    }

    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 450);
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  initTheme();

  /* ==========================================================================
     2. ANIMAÇÃO DE ENTRADA NA APRESENTAÇÃO INICIAL (HERO ENTRY)
     ========================================================================== */
  const initHeroAnimations = () => {
    if (prefersReducedMotion) return;

    const heroElements = document.querySelectorAll(
      '.hero-content .badge-role, .hero-title, .hero-description, .editable-hint, .hero-actions, .hero-highlights, .hero-visual'
    );

    heroElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.12}s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.12}s`;
    });

    // Disparar transição no próximo frame
    requestAnimationFrame(() => {
      setTimeout(() => {
        heroElements.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      }, 60);
    });
  };

  initHeroAnimations();

  /* ==========================================================================
     3. HEADER DINÂMICO & MENU MOBILE RESPONSIVO
     ========================================================================== */
  const siteHeader = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  const handleHeaderScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (siteHeader) {
      if (scrollY > 30) {
        siteHeader.style.boxShadow = '0 6px 20px rgba(37, 43, 41, 0.06)';
      } else {
        siteHeader.style.boxShadow = 'none';
      }
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  const toggleMobileMenu = (forceState) => {
    const isCurrentlyActive = mobileToggle ? mobileToggle.classList.contains('is-active') : false;
    const shouldOpen = forceState !== undefined ? forceState : !isCurrentlyActive;

    if (mobileToggle) {
      mobileToggle.classList.toggle('is-active', shouldOpen);
      mobileToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    }
    if (navMenu) {
      navMenu.classList.toggle('is-open', shouldOpen);
    }
    if (menuOverlay) {
      menuOverlay.classList.toggle('is-active', shouldOpen);
      menuOverlay.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
    }

    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleMobileMenu(false);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('is-open')) {
      toggleMobileMenu(false);
    }
  });

  /* ==========================================================================
     4. ROLAGEM SUAVE CALIBRADA & SCROLLSPY (DESTAQUE DA SEÇÃO ATIVA)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  const handleScrollSpy = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const offset = 160;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - offset;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 88;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     5. REVELAÇÃO GRADUAL (INTERSECTION OBSERVER — ESTILO LUSION)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    // Stagger para elementos em grid (cards de projetos, habilidades)
    document.querySelectorAll('.projects-grid, .skills-categories, .about-grid').forEach((grid) => {
      const children = grid.querySelectorAll('.reveal-on-scroll, .project-card, .skill-category-card');
      children.forEach((child, index) => {
        child.style.transitionDelay = `${(index % 4) * 0.12}s`;
      });
    });

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  /* ==========================================================================
     6. PARALLAX SUTIL & INCLINAÇÃO 3D (TILT) NOS CARDS E NO HERO
     ========================================================================== */
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    
    // Tilt no Card Visual do Hero com efeito magnético suave
    const heroCardTracker = document.getElementById('hero-card-tracker');
    const visualCard = heroCardTracker ? heroCardTracker.querySelector('.visual-card') : null;
    const topCard = heroCardTracker ? heroCardTracker.querySelector('.top-card') : null;
    const bottomCard = heroCardTracker ? heroCardTracker.querySelector('.bottom-card') : null;

    if (heroCardTracker && visualCard) {
      heroCardTracker.addEventListener('mousemove', (e) => {
        const rect = heroCardTracker.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        visualCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;

        // Parallax sutil nos cards flutuantes
        if (topCard) {
          topCard.style.transform = `translate(${((x - centerX) * 0.04).toFixed(1)}px, ${((y - centerY) * 0.04 - 2).toFixed(1)}px)`;
        }
        if (bottomCard) {
          bottomCard.style.transform = `translate(${((x - centerX) * -0.04).toFixed(1)}px, ${((y - centerY) * -0.04 - 2).toFixed(1)}px)`;
        }
      });

      heroCardTracker.addEventListener('mouseleave', () => {
        visualCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        if (topCard) topCard.style.transform = 'translate(0, 0)';
        if (bottomCard) bottomCard.style.transform = 'translate(0, 0)';
      });
    }

    // Microinteração 3D suave nos cards de projetos
    const projectCards = document.querySelectorAll('.project-card:not(.project-card-placeholder)');
    projectCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  /* ==========================================================================
     7. VALIDAÇÃO DO FORMULÁRIO DE CONTATO NO NAVEGADOR
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const setFieldError = (input, errorElementId, message) => {
      const errorEl = document.getElementById(errorElementId);
      if (message) {
        input.classList.add('error');
        if (errorEl) {
          errorEl.textContent = message;
          errorEl.classList.add('visible');
        }
      } else {
        input.classList.remove('error');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.remove('visible');
        }
      }
    };

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(String(email).toLowerCase());
    };

    const validateField = (input) => {
      const id = input.id;
      const val = input.value.trim();

      if (id === 'name') {
        if (!val) {
          setFieldError(input, 'name-error', 'Por favor, informe seu nome.');
          return false;
        } else if (val.length < 2) {
          setFieldError(input, 'name-error', 'O nome deve ter pelo menos 2 caracteres.');
          return false;
        } else {
          setFieldError(input, 'name-error', '');
          return true;
        }
      }

      if (id === 'email') {
        if (!val) {
          setFieldError(input, 'email-error', 'Por favor, informe seu endereço de e-mail.');
          return false;
        } else if (!isValidEmail(val)) {
          setFieldError(input, 'email-error', 'Informe um e-mail válido (ex: nome@dominio.com).');
          return false;
        } else {
          setFieldError(input, 'email-error', '');
          return true;
        }
      }

      if (id === 'subject') {
        if (!val) {
          setFieldError(input, 'subject-error', 'Por favor, informe o assunto da mensagem.');
          return false;
        } else {
          setFieldError(input, 'subject-error', '');
          return true;
        }
      }

      if (id === 'message') {
        if (!val) {
          setFieldError(input, 'message-error', 'Por favor, digite sua mensagem.');
          return false;
        } else if (val.length < 10) {
          setFieldError(input, 'message-error', 'A mensagem deve ter pelo menos 10 caracteres.');
          return false;
        } else {
          setFieldError(input, 'message-error', '');
          return true;
        }
      }

      return true;
    };

    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('error')) {
            validateField(input);
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput);
      const isEmailValid = validateField(emailInput);
      const isSubjectValid = validateField(subjectInput);
      const isMessageValid = validateField(messageInput);

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const submitBtn = document.getElementById('form-submit-btn');
        const originalContent = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>Validando dados...</span>`;
        }

        setTimeout(() => {
          if (formFeedback) {
            formFeedback.classList.remove('hidden');
            formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
          }

          contactForm.reset();
        }, 600);
      } else {
        const firstError = contactForm.querySelector('.form-input.error, .form-textarea.error');
        if (firstError) {
          firstError.focus();
        }
      }
    });
  }

  /* ==========================================================================
     8. COPIAR E-MAIL COM FEEDBACK VISUAL (TOAST)
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailAddressEl = document.getElementById('email-address');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimeout = null;

  const showToast = (message) => {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.remove('hidden');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  };

  if (copyEmailBtn && emailAddressEl) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailText = emailAddressEl.textContent.trim();
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailText);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = emailText;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }
        showToast('E-mail copiado para a área de transferência!');
      } catch (err) {
        showToast('Endereço: ' + emailText);
      }
    });
  }

});
