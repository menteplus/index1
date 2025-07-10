document.addEventListener('DOMContentLoaded', () => {
    // Back to Top Button Functionality
    const backToTopBtn = document.getElementById('backToTopBtn');

    function checkScrollPosition() {
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        }
    }

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Modal Functionality (Video Tutorial and Custom Content)
    const videoTutorialModal = document.getElementById('videoTutorialModal');
    const tutorialVideo = document.getElementById('tutorialVideo');
    const customModal = document.getElementById('customModal');
    const customModalTitle = document.getElementById('customModalTitle');
    const customModalContent = document.getElementById('customModalContent');
    const closeCustomModalBtn = document.getElementById('closeCustomModalBtn');
    const closeVideoTutorialBtn = document.getElementById('closeVideoTutorialBtn');
    const skipTutorialBtn = document.getElementById('skipTutorialBtn');

    function showVideoTutorialModal() {
        if (videoTutorialModal) {
            videoTutorialModal.classList.remove('hidden');
            if (tutorialVideo) {
                tutorialVideo.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                tutorialVideo.focus();
            }
        }
    }

    function closeVideoTutorial() {
        if (videoTutorialModal) {
            videoTutorialModal.classList.add('hidden');
            if (tutorialVideo) {
                tutorialVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        }
    }

    function showCustomModal(title, content) {
        if (customModal) {
            customModalTitle.textContent = title;
            customModalContent.innerHTML = content;
            customModal.classList.remove('hidden');
            if (closeCustomModalBtn) {
                closeCustomModalBtn.focus();
            }
        }
    }

    if (closeCustomModalBtn) {
        closeCustomModalBtn.addEventListener('click', () => {
            if (customModal) {
                customModal.classList.add('hidden');
            }
        });
    }

    // Close modals by clicking outside (overlay)
    if (videoTutorialModal) {
        videoTutorialModal.addEventListener('click', (event) => {
            if (event.target === videoTutorialModal) {
                closeVideoTutorial();
            }
        });
    }

    if (customModal) {
        customModal.addEventListener('click', (event) => {
            if (event.target === customModal) {
                customModal.classList.add('hidden');
            }
        });
    }

    // Cookie Consent Functionality (These elements were not in the provided HTML snippet,
    // but the JavaScript functions were present, suggesting a separate banner)
    const cookieConsentBanner = document.getElementById('cookieConsentBanner');
    const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
    const cookiePolicyLink = document.getElementById('cookiePolicyLink');

    function showCookieConsent() {
        if (cookieConsentBanner && !localStorage.getItem('cookiesAccepted')) {
            cookieConsentBanner.classList.remove('hidden');
        }
    }

    function acceptCookies() {
        localStorage.setItem('cookiesAccepted', 'true');
        if (cookieConsentBanner) {
            cookieConsentBanner.classList.add('hidden');
        }
    }

    // Event Listeners for Cookie Consent and Video Tutorial
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', acceptCookies);
    }
    if (closeVideoTutorialBtn) {
        closeVideoTutorialBtn.addEventListener('click', closeVideoTutorial);
    }
    if (skipTutorialBtn) {
        skipTutorialBtn.addEventListener('click', closeVideoTutorial);
    }
    if (cookiePolicyLink) {
        cookiePolicyLink.addEventListener('click', (e) => {
            e.preventDefault();
            showCustomModal("Política de Cookies", "Esta é a Política de Cookies. (Conteúdo a ser adicionado)");
        });
    }

    // Add the scroll event listener (for the Back to Top button)
    window.onscroll = function() {
        checkScrollPosition();
    };

    // Call showCookieConsent on load if the banner HTML was available
    // showCookieConsent(); // Uncomment if you add the cookie banner HTML
});