// main.js

// --- Funções de Ação do Gemini (Modal) ---
function showCustomModal(message) {
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalCloseButton = document.getElementById('modalCloseButton');

    modalMessage.textContent = message;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false'); // Torna o modal visível para leitores de tela
    modalCloseButton.focus();

    modalCloseButton.onclick = () => {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true'); // Oculta o modal para leitores de tela
    };
    const handleEscape = (event) => {
        if (event.key === 'Escape') {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true'); // Oculta o modal para leitores de tela
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// --- Cookie Consent and Video Tutorial Logic ---
// These elements are not present in the consolidated HTML, so they will be null.
// The functions are kept for fidelity to the original logic, but will not execute.
const cookieConsentBanner = document.getElementById('cookieConsentBanner');
const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
const cookiePolicyLink = document.getElementById('cookiePolicyLink');

const videoTutorialModal = document.getElementById('videoTutorialModal');
const closeVideoTutorialBtn = document.getElementById('closeVideoTutorialBtn');
const skipTutorialBtn = document.getElementById('skipTutorialBtn');
const tutorialVideoFrame = document.getElementById('tutorialVideoFrame');

function showCookieBanner() {
    if (cookieConsentBanner) {
        cookieConsentBanner.classList.add('show');
        cookieConsentBanner.setAttribute('aria-hidden', 'false');
        if (acceptCookiesBtn) acceptCookiesBtn.focus();
    }
}

function hideCookieBanner() {
    if (cookieConsentBanner) {
        cookieConsentBanner.classList.remove('show');
        cookieConsentBanner.setAttribute('aria-hidden', 'true');
    }
}

function checkCookieConsent() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
        showCookieBanner();
    } else {
        checkFirstVisitAndShowTutorial();
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    hideCookieBanner();
    checkFirstVisitAndShowTutorial();
}

function checkFirstVisitAndShowTutorial() {
    const tutorialShown = localStorage.getItem('tutorialShown');
    if (!tutorialShown) {
        if (videoTutorialModal) {
            videoTutorialModal.classList.remove('hidden');
            videoTutorialModal.setAttribute('aria-hidden', 'false');
            if (tutorialVideoFrame) tutorialVideoFrame.src = `https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0`;
            if (closeVideoTutorialBtn) closeVideoTutorialBtn.focus();
        }
    }
}

function closeVideoTutorial() {
    localStorage.setItem('tutorialShown', 'true');
    if (videoTutorialModal) {
        videoTutorialModal.classList.add('hidden');
        videoTutorialModal.setAttribute('aria-hidden', 'true');
    }
    if (tutorialVideoFrame) tutorialVideoFrame.src = tutorialVideoFrame.src.replace('?autoplay=1&rel=0', '');
}

// --- Botão Voltar ao Topo ---
const backToTopBtn = document.getElementById('backToTopBtn');

// Função para verificar a posição de rolagem e mostrar/ocultar o botão
function checkScrollPosition() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        if (backToTopBtn) backToTopBtn.style.display = "block";
    } else {
        if (backToTopBtn) backToTopBtn.style.display = "none";
    }
}

// Função para rolar a página para o topo
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Drag-and-Drop for Quick Access Nursing Assistant Button ---
const quickAccessNursingAssistantBtn = document.getElementById('quickAccessNursingAssistantBtn');
let isDraggingAssistantBtn = false;
let offset = { x: 0, y: 0 }; // Use offset for initial click position relative to element

// Helper function to check for PWA or small screen (defined in header.js, assuming it's global or imported)
// For this segregated setup, we'll redefine it or ensure it's imported if using modules.
// For simplicity and quick fix, let's assume it's globally available or define a local one.
function isPWAOrSmallScreen() {
    return window.matchMedia('(display-mode: standalone)').matches || window.innerWidth <= 768;
}

if (quickAccessNursingAssistantBtn) {
    // Mouse events for drag and drop
    quickAccessNursingAssistantBtn.addEventListener('mousedown', (e) => {
        if (isPWAOrSmallScreen()) { // Only enable drag for PWA/mobile
            isDraggingAssistantBtn = true;
            quickAccessNursingAssistantBtn.style.cursor = 'grabbing';

            // Get initial mouse position relative to the element
            const rect = quickAccessNursingAssistantBtn.getBoundingClientRect();
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;

            e.preventDefault(); // Prevent default browser drag behavior
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDraggingAssistantBtn) return;

        // Calculate new position relative to the viewport
        let newLeft = e.clientX - offset.x;
        let newTop = e.clientY - offset.y;

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonRect = quickAccessNursingAssistantBtn.getBoundingClientRect();

        // Constrain within viewport bounds
        newLeft = Math.max(0, Math.min(newLeft, viewportWidth - buttonRect.width));
        newTop = Math.max(0, Math.min(newTop, viewportHeight - buttonRect.height));

        // Apply new position
        quickAccessNursingAssistantBtn.style.left = `${newLeft}px`;
        quickAccessNursingAssistantBtn.style.top = `${newTop}px`;
        quickAccessNursingAssistantBtn.style.right = 'auto'; // Disable right positioning
        quickAccessNursingAssistantBtn.style.bottom = 'auto'; // Disable bottom positioning
    });

    document.addEventListener('mouseup', () => {
        if (isDraggingAssistantBtn) {
            isDraggingAssistantBtn = false;
            quickAccessNursingAssistantBtn.style.cursor = 'grab'; // Reset cursor
        }
    });

    // Touch events for drag and drop (for PWA)
    quickAccessNursingAssistantBtn.addEventListener('touchstart', (e) => {
        if (isPWAOrSmallScreen()) {
            isDraggingAssistantBtn = true;
            quickAccessNursingAssistantBtn.style.cursor = 'grabbing';

            const touch = e.touches[0];
            const rect = quickAccessNursingAssistantBtn.getBoundingClientRect();
            offset.x = touch.clientX - rect.left;
            offset.y = touch.clientY - rect.top;

            e.preventDefault(); // Prevent scrolling while dragging
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDraggingAssistantBtn) return;

        const touch = e.touches[0];
        let newLeft = touch.clientX - offset.x;
        let newTop = touch.clientY - offset.y;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonRect = quickAccessNursingAssistantBtn.getBoundingClientRect();

        newLeft = Math.max(0, Math.min(newLeft, viewportWidth - buttonRect.width));
        newTop = Math.max(0, Math.min(newTop, viewportHeight - buttonRect.height));

        quickAccessNursingAssistantBtn.style.left = `${newLeft}px`;
        quickAccessNursingAssistantBtn.style.top = `${newTop}px`;
        quickAccessNursingAssistantBtn.style.right = 'auto';
        quickAccessNursingAssistantBtn.style.bottom = 'auto';

        e.preventDefault(); // Prevent scrolling while dragging
    }, { passive: false }); // Use passive: false to allow preventDefault

    document.addEventListener('touchend', () => {
        if (isDraggingAssistantBtn) {
            isDraggingAssistantBtn = false;
            quickAccessNursingAssistantBtn.style.cursor = 'grab';
        }
    });
}

// Função para o botão de acesso rápido ao Assistente de Enfermagem
function quickAccessNursingAssistant() {
    // Hide all AI sections first (using the new accessible hiding)
    document.querySelectorAll('.ai-section').forEach(section => {
        section.classList.add('hidden-ai-section');
        section.setAttribute('aria-hidden', 'true');
    });

    const targetSection = document.getElementById('nursingAssistantSection'); // This element is not present in the consolidated code.
    if (targetSection) {
        targetSection.classList.remove('hidden-ai-section');
        targetSection.setAttribute('aria-hidden', 'false');
        targetSection.scrollIntoView({ behavior: 'smooth' });
    } else {
         showCustomModal("A seção do Assistente de Enfermagem não foi encontrada.");
    }
}

// --- Newsletter Consent Logic ---
const newsletterEmailInput = document.getElementById('newsletterEmail');
const newsletterConsentCheckbox = document.getElementById('newsletterConsent');
const subscribeNewsletterBtn = document.getElementById('subscribeNewsletterBtn');
const newsletterErrorSpan = document.getElementById('newsletterError'); // Get the error span

function updateNewsletterButtonState() {
    const email = newsletterEmailInput ? newsletterEmailInput.value.trim() : '';
    const consentGiven = newsletterConsentCheckbox ? newsletterConsentCheckbox.checked : false;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Simple email validation

    // Clear previous error message
    if (newsletterErrorSpan) newsletterErrorSpan.textContent = '';

    // Only show error for invalid email (consent error is handled on click)
    if (email && !isValidEmail) {
        if (newsletterErrorSpan) newsletterErrorSpan.textContent = "Por favor, insira um e-mail válido.";
    }

    if (subscribeNewsletterBtn) {
        subscribeNewsletterBtn.disabled = !(isValidEmail && consentGiven);
    }
}

if (newsletterEmailInput && newsletterConsentCheckbox && subscribeNewsletterBtn) {
    newsletterEmailInput.addEventListener('input', updateNewsletterButtonState);
    newsletterConsentCheckbox.addEventListener('change', updateNewsletterButtonState);
    // Initial state update
    updateNewsletterButtonState();

    subscribeNewsletterBtn.addEventListener('click', () => {
        const email = newsletterEmailInput.value.trim();
        const consentGiven = newsletterConsentCheckbox.checked;
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        // Re-check conditions on click to ensure all validations pass
        if (!isValidEmail) {
            if (newsletterErrorSpan) newsletterErrorSpan.textContent = "Por favor, insira um e-mail válido.";
            return;
        }
        if (!consentGiven) {
            // This message is now only shown on click if consent is missing
            if (newsletterErrorSpan) newsletterErrorSpan.textContent = "Por favor, marque a caixa de consentimento para receber informações.";
            return;
        }

        // If email is provided and consent is given
        if (typeof showCustomModal === 'function') {
            showCustomModal(`Obrigado por assinar nossa newsletter, ${email}!`);
        } else {
            console.log(`Obrigado por assinar nossa newsletter, ${email}!`);
        }
        newsletterEmailInput.value = ''; // Clear input
        newsletterConsentCheckbox.checked = false; // Uncheck checkbox
        updateNewsletterButtonState(); // Update button state after submission
    });
}

// --- Cookie Consent and Video Tutorial Logic (continued) ---
// Event Listeners for Cookie Consent and Video Tutorial (ensure elements exist before attaching)
// These elements are not present in the consolidated HTML, so these listeners will not attach.
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
        showCustomModal("Esta é a Política de Cookies. (Conteúdo a ser adicionado)");
    });
}

// --- Calculator Specific JavaScript ---
document.addEventListener('DOMContentLoaded', () => {
    const frascoDisponivelInput = document.getElementById('frascoDisponivel');
    const seringaSelect = document.getElementById('seringa');
    const prescricaoMedicaInput = document.getElementById('prescricaoMedica');
    const calcularBtn = document.getElementById('calcularBtn');
    const gerarPdfBtn = document.getElementById('gerarPdfBtn');
    const limparBtn = document.getElementById('limparBtn');
    const resultadoBox = document.getElementById('resultadoBox');
    const resultadoTexto = document.getElementById('resultadoTexto');

    // Variáveis globais para o Firebase (serão preenchidas pelo ambiente)
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    // Mantendo a codificação original que causava o erro, conforme solicitado.
    // Esta linha pode causar um erro de ReferenceError: Cannot access 'initialAuthToken' before initialization
    // se 'initialAuthToken' for usado antes de ser definido no escopo global ou se '__initial_auth_token'
    // não estiver disponível no ambiente de execução.
    const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? initialAuthToken : null;


    calcularBtn.addEventListener('click', () => {
        const frascoDisponivel = parseFloat(frascoDisponivelInput.value);
        const seringa = parseFloat(seringaSelect.value);
        const prescricaoMedica = parseFloat(prescricaoMedicaInput.value);

        if (isNaN(frascoDisponivel) || isNaN(seringa) || isNaN(prescricaoMedica) ||
            frascoDisponivel <= 0 || seringa <= 0 || prescricaoMedica <= 0) {
            showCustomModal('Por favor, preencha todos os campos com valores numéricos válidos e maiores que zero.');
            resultadoBox.classList.add('hidden');
            return;
        }

        // Fórmula: (Prescrição Médica * Seringa) / Frasco Disponível
        const resultadoMl = (prescricaoMedica * seringa) / frascoDisponivel;

        resultadoTexto.textContent = `Você deve aspirar ${resultadoMl.toFixed(2)} ml de insulina.`;
        resultadoBox.classList.remove('hidden');
    });

    gerarPdfBtn.addEventListener('click', () => {
        showCustomModal('A funcionalidade "Gerar PDF" não está implementada nesta versão.');
    });

    // Event listener for the Limpar button
    limparBtn.addEventListener('click', () => {
        frascoDisponivelInput.value = '100'; // Reset to default value
        seringaSelect.value = '1'; // Reset to default value
        prescricaoMedicaInput.value = '10'; // Reset to default value
        resultadoBox.classList.add('hidden'); // Hide the result box
        resultadoTexto.textContent = ''; // Clear the result text
    });
});

// Consolidado window.addEventListener('load') - Moved to main.js for general page initialization
window.addEventListener('load', () => {
    // applyAccessibilitySettings(); // This is now called from header.js DOMContentLoaded
    checkCookieConsent(); // Checks cookie consent and tutorial
    checkScrollPosition(); // Back to Top button initial state
    updateNewsletterButtonState(); // Newsletter initial state
    // togglePWAModeElements(); // This is now called from header.js DOMContentLoaded
});

// Adiciona o listener para o evento de rolagem (para o botão Voltar ao Topo)
window.onscroll = function() {
    checkScrollPosition();
};

// Expose functions to the global scope if they are used in HTML onclick attributes
window.showCustomModal = showCustomModal;
window.quickAccessNursingAssistant = quickAccessNursingAssistant;
window.scrollToTop = scrollToTop;
