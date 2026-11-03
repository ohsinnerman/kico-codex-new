(() => {
  const html = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const localDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // taste-skill-ignore: numbering
    const day = String(date.getDate()).padStart(2, '0'); // taste-skill-ignore: numbering
    return `${year}-${month}-${day}`;
  };

  const fromLocalDate = (value) => {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  const addDays = (date, days) => {
    const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    result.setDate(result.getDate() + days);
    return result;
  };

  const dateLabel = (date, withYear = false) => new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    ...(withYear ? { year: 'numeric' } : {})
  }).format(date);

  const setVisible = (element, visible) => {
    if (!element) return;
    if (visible) {
      element.hidden = false;
      element.style.visibility = 'visible';
    } else {
      element.style.visibility = 'hidden';
      element.hidden = true;
    }
  };

  const initPlanner = () => {
    const startInput = document.getElementById('start-date');
    const preferredInput = document.getElementById('preferred-start');
    const status = document.getElementById('planner-status');
    const stages = [...document.querySelectorAll('.stage-sheet[data-weeks]')];
    if (!startInput || !status) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    startInput.min = localDate(today);

    const nextMonday = new Date(today);
    const daysUntilMonday = (8 - today.getDay()) % 7 || 7;
    nextMonday.setDate(nextMonday.getDate() + daysUntilMonday);
    startInput.value = localDate(nextMonday);

    const update = () => {
      if (!startInput.value) {
        status.textContent = 'Choose a start date to see your proposed course dates.';
        stages.forEach((stage) => {
          const [firstWeek, lastWeek] = stage.dataset.weeks.split('-');
          const label = stage.querySelector('[data-week-label]');
          if (label) label.textContent = `Weeks ${firstWeek}–${lastWeek}`;
        });
        if (preferredInput && preferredInput.dataset.userEdited !== 'true') preferredInput.value = '';
        return;
      }
      const start = fromLocalDate(startInput.value);
      const week12Start = addDays(start, (12 - 1) * 7);
      const finish = addDays(week12Start, (5 - week12Start.getDay() + 7) % 7);
      status.textContent = `With a start date of ${dateLabel(start, true)}, week 12 finishes on Friday, ${dateLabel(finish, true)}.`;

      stages.forEach((stage) => {
        const [firstWeek, lastWeek] = stage.dataset.weeks.split('-').map(Number);
        const firstDay = addDays(start, (firstWeek - 1) * 7);
        const lastDay = addDays(start, lastWeek * 7 - 1);
        const label = stage.querySelector('[data-week-label]');
        if (!label) return;
        const spansYear = firstDay.getFullYear() !== lastDay.getFullYear();
        label.textContent = `Weeks ${firstWeek}–${lastWeek}, ${dateLabel(firstDay, spansYear)} – ${dateLabel(lastDay, spansYear)}`;
      });

      if (preferredInput && preferredInput.dataset.userEdited !== 'true') {
        preferredInput.value = startInput.value;
      }
    };

    startInput.addEventListener('input', update);
    startInput.addEventListener('change', update);
    preferredInput?.addEventListener('input', () => { preferredInput.dataset.userEdited = 'true'; });
    preferredInput?.addEventListener('change', () => { preferredInput.dataset.userEdited = 'true'; });
    update();
  };

  const initAccordions = () => {
    const setupGroup = (selector, firstOpen) => {
      const buttons = [...document.querySelectorAll(selector)];
      if (!buttons.length) return;

      buttons.forEach((button, index) => {
        const panel = document.getElementById(button.getAttribute('aria-controls'));
        if (!panel) return;
        const open = button.getAttribute('aria-expanded') === 'true' || (firstOpen && index === 0);
        button.setAttribute('aria-expanded', String(open));
        setVisible(panel, open);

        button.addEventListener('click', () => {
          const wasOpen = button.getAttribute('aria-expanded') === 'true';
          buttons.forEach((item) => {
            item.setAttribute('aria-expanded', 'false');
            const otherPanel = document.getElementById(item.getAttribute('aria-controls'));
            setVisible(otherPanel, false);
          });

          if (!wasOpen) {
            button.setAttribute('aria-expanded', 'true');
            setVisible(panel, true);
            panel.focus({ preventScroll: true });
          }
        });
      });
    };

    setupGroup('.stage-toggle', false);
    setupGroup('.faq-toggle', true);
  };

  const initForm = () => {
    const form = document.getElementById('enquiry-form');
    const status = document.getElementById('form-status');
    if (!form || !status) return;

    form.querySelectorAll('input, select').forEach((field) => {
      field.addEventListener('input', () => field.removeAttribute('aria-invalid'));
      field.addEventListener('change', () => field.removeAttribute('aria-invalid'));
    });

    const addLink = (parent, text, href) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = text;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      parent.append(' ', link);
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      status.replaceChildren();
      const name = form.elements.namedItem('name');
      const phone = form.elements.namedItem('phone');
      const email = form.elements.namedItem('email');
      const consent = form.elements.namedItem('consent');
      const normalizedPhone = phone.value.replace(/[\s-]/g, '');
      const mobilePattern = /^(?:\+91)?[6-9]\d{9}$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      const invalid = [];

      const check = (field, valid) => {
        if (!valid) {
          field.setAttribute('aria-invalid', 'true');
          invalid.push(field);
        } else {
          field.removeAttribute('aria-invalid');
        }
      };

      check(name, name.value.trim().length > 1);
      check(phone, mobilePattern.test(normalizedPhone));
      check(email, emailPattern.test(email.value.trim()));
      check(consent, consent.checked);

      if (invalid.length) {
        status.textContent = 'Please correct the marked fields and agree to be contacted before continuing.';
        invalid[0].focus();
        return;
      }

      const city = form.elements.namedItem('city').value.trim();
      const state = form.elements.namedItem('state').value.trim();
      const location = [city, state].filter(Boolean).join(', ');
      const preferred = form.elements.namedItem('preferred-start').value;
      const gender = form.elements.namedItem('gender').value;
      const greeting = 'Hello KiCo, I would like to ask about the Digital Marketing Mastery Program.';
      const lines = [
        greeting,
        `Name: ${name.value.trim()}`,
        `Phone: ${phone.value.trim()}`,
        `Email: ${email.value.trim()}`,
        location ? `Location: ${location}` : '',
        gender ? `Gender: ${gender}` : '',
        preferred ? `Preferred start: ${dateLabel(fromLocalDate(preferred), true)}` : ''
      ].filter(Boolean);
      const message = lines.join('\n');
      const whatsappUrl = `https://wa.me/919315939588?text=${encodeURIComponent(message)}`;
      const emailUrl = `mailto:admin@kicoedtech.xyz?subject=${encodeURIComponent('Course enquiry')}&body=${encodeURIComponent(message)}`;
      const opened = window.open(whatsappUrl, '_blank');

      if (opened) {
        opened.opener = null;
        status.append('WhatsApp opened with your details. Just press send.');
        addLink(status, 'Email KiCo instead', emailUrl);
      } else {
        status.append('Your browser blocked the new tab. Choose a link to continue.');
        addLink(status, 'Open WhatsApp with your details', whatsappUrl);
        addLink(status, 'Email KiCo instead', emailUrl);
      }
    });
  };

  const initHeader = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;
    if (/\b(?:Chrome|Chromium)\//.test(navigator.userAgent)) {
      const svgNs = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNs, 'svg');
      svg.classList.add('filter-defs');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      const filter = document.createElementNS(svgNs, 'filter');
      filter.setAttribute('id', 'header-refraction');
      const turbulence = document.createElementNS(svgNs, 'feTurbulence');
      turbulence.setAttribute('type', 'fractalNoise');
      turbulence.setAttribute('baseFrequency', '0.012 0.035');
      turbulence.setAttribute('numOctaves', '1');
      turbulence.setAttribute('seed', '7');
      turbulence.setAttribute('result', 'noise');
      const displacement = document.createElementNS(svgNs, 'feDisplacementMap');
      displacement.setAttribute('in', 'SourceGraphic');
      displacement.setAttribute('in2', 'noise');
      displacement.setAttribute('scale', '3');
      displacement.setAttribute('xChannelSelector', 'R');
      displacement.setAttribute('yChannelSelector', 'G');
      filter.append(turbulence, displacement);
      svg.append(filter);
      document.body.prepend(svg);
    }
    let queued = false;
    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      queued = false;
    };
    window.addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();

    document.querySelectorAll('.mobile-menu nav a').forEach((link) => {
      link.addEventListener('click', () => { link.closest('details').open = false; });
    });
  };

  const initEntrances = () => {
    const elements = [...document.querySelectorAll('[data-entrance]')];
    if (!elements.length) return;
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    elements.forEach((element) => observer.observe(element));
  };

  const initHeroCrossfade = () => {
    const scenes = [...document.querySelectorAll('.hero-scene')];
    if (scenes.length < 2 || reduceMotion.matches) return;
    let current = scenes.findIndex((scene) => scene.classList.contains('is-active'));
    if (current < 0) current = 0;
    let timer = 0;

    const schedule = () => {
      window.clearTimeout(timer);
      if (document.visibilityState === 'hidden') return;
      timer = window.setTimeout(() => {
        scenes[current].classList.remove('is-active');
        scenes[current].setAttribute('aria-hidden', 'true');
        current = (current + 1) % scenes.length;
        scenes[current].classList.add('is-active');
        scenes[current].setAttribute('aria-hidden', 'true');
        schedule();
      }, 7200);
    };

    document.addEventListener('visibilitychange', schedule);
    reduceMotion.addEventListener?.('change', (event) => {
      if (event.matches) window.clearTimeout(timer);
      else schedule();
    });
    schedule();
  };

  const initGlassFallback = () => {
    const observer = new MutationObserver(() => {
      if (!html.classList.contains('glass-fallback')) return;
      html.classList.remove('has-glass');
    });
    observer.observe(html, { attributes: true, attributeFilter: ['class'] });
  };

  const mountGlass = () => {
    const mount = document.getElementById('glass-mount');
    if (!mount || !window.WebGLRenderingContext || typeof window.html2canvas !== 'function') {
      html.classList.add('glass-fallback');
      return;
    }

    const probe = document.createElement('canvas');
    if (!probe.getContext('webgl')) {
      html.classList.add('glass-fallback');
      return;
    }

    const targets = [
      { text: '12 weeks', label: 'See the course format and 12-week length', target: '#program' },
      { text: 'Live online', label: 'Read how the live online classes work', target: '#program' },
      { text: 'Certified', label: 'Read about the KiCo certificate', target: '#founder' }
    ];
    Container.snapshotTarget = document.querySelector('.hero-section') || document.body;
    const facts = new Container({ type: 'pill', tintOpacity: 0.12 });
    facts.element.setAttribute('aria-label', 'Course facts');
    mount.appendChild(facts.element);

    const activate = (selector) => {
      document.querySelector(selector)?.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
    };

    targets.forEach((item) => {
      const button = new Button({
        text: item.text,
        size: 16,
        type: 'pill',
        tintOpacity: 0.12,
        onClick: () => activate(item.target)
      });
      button.element.setAttribute('role', 'link');
      button.element.setAttribute('tabindex', '0');
      button.element.setAttribute('aria-label', item.label);
      button.element.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        activate(item.target);
      });
      facts.addChild(button);
    });

    const confirmMount = () => {
      if (html.classList.contains('glass-fallback')) {
        html.classList.remove('has-glass');
        return;
      }
      const ready = facts.webglInitialized && facts.children.every((child) => child.webglInitialized);
      if (ready) {
        html.classList.add('has-glass');
        return;
      }
      window.requestAnimationFrame(confirmMount);
    };
    window.requestAnimationFrame(confirmMount);
  };

  const initGlass = () => {
    if (!document.getElementById('glass-mount')) return;
    initGlassFallback();
    window.addEventListener('load', () => {
      document.fonts.ready.then(mountGlass).catch(() => {
        html.classList.add('glass-fallback');
      });
    }, { once: true });
  };

  const boot = () => {
    initPlanner();
    initAccordions();
    initForm();
    initHeader();
    initEntrances();
    initHeroCrossfade();
    initGlass();
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
