// ==========================================================
// APOORV GAUR - PORTFOLIO INTERACTION SCRIPT
// Clean Vanilla JavaScript (Simple, readable, zero dependencies)
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. DARK / LIGHT THEME TOGGLE
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.textContent = '☀️'; // Click to switch to light
    } else {
      themeIcon.textContent = '🌙'; // Click to switch to dark
    }
  }

  // 2. MOBILE MENU TOGGLE
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const mobileDropdown = document.getElementById('mobile-dropdown');

  if (mobileToggleBtn && mobileDropdown) {
    mobileToggleBtn.addEventListener('click', () => {
      mobileDropdown.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileDropdown.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDropdown.classList.add('hidden');
      });
    });
  }

  // 3. COPY EMAIL TO CLIPBOARD
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.color = '#10b981';
        copyBtn.style.borderColor = '#10b981';

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.color = '';
          copyBtn.style.borderColor = '';
        }, 2000);
      });
    });
  }

  // 4. CONTACT FORM (Opens web Gmail directly + provides fallback)
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);

      // 1. Web Gmail compose link (works in any browser without needing desktop mail app)
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=apoorvgaur2006@gmail.com&su=${subject}&body=${body}`;
      
      // 2. Standard desktop mailto link
      const mailtoUrl = `mailto:apoorvgaur2006@gmail.com?subject=${subject}&body=${body}`;

      // Open Gmail compose in a new tab
      window.open(gmailUrl, '_blank');

      // Display friendly feedback with direct click options
      formFeedback.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 8px;">Opening Gmail in a new tab...</div>
        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
          <a href="${gmailUrl}" target="_blank" class="btn btn-sm btn-primary" style="text-decoration:none;">
            Open Gmail ↗
          </a>
          <a href="${mailtoUrl}" class="btn btn-sm btn-outline" style="text-decoration:none;">
            Open Mail App
          </a>
        </div>
      `;
      formFeedback.className = 'form-feedback success';
      formFeedback.classList.remove('hidden');

      // Clear the form fields after sending
      setTimeout(() => {
        contactForm.reset();
      }, 3000);
    });
  }

  // 5. BACK TO TOP BUTTON
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
