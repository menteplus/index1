// header.js

// Função para detectar se é PWA ou tela pequena
function isPWAOrSmallScreen() {
    return window.matchMedia('(display-mode: standalone)').matches || window.innerWidth <= 768;
}

// Funções de Acessibilidade
// Níveis para tamanho da fonte
const fontSizeLevels = [80, 100, 120]; // Pequeno, Normal, Grande
const fontSizeTexts = ["Pequena", "Normal", "Grande"];
let currentFontSizeIndex = parseInt(localStorage.getItem('currentFontSizeIndex')) || 1; // Padrão: Normal

// Níveis para espaçamento de linha
const lineHeightLevels = [1.2, 1.5, 1.8]; // Normal, Médio, Grande
const lineHeightTexts = ["Normal", "Médio", "Grande"];
let currentLineHeightIndex = parseInt(localStorage.getItem('currentLineHeightIndex')) || 1; // Padrão: Médio

// Níveis para espaçamento de letra
const letterSpacingLevels = [0, 0.05, 0.1]; // Normal, Médio, Grande
const letterSpacingTexts = ["Normal", "Médio", "Grande"];
let currentLetterSpacingIndex = parseInt(localStorage.getItem('currentLetterSpacingIndex')) || 0; // Padrão: Normal

// Níveis para velocidade de leitura
const readingSpeedLevels = [0.8, 1.0, 1.2]; // Lenta, Normal, Rápida
const readingSpeedTexts = ["Lenta", "Normal", "Rápida"];
let currentReadingSpeedIndex = parseInt(localStorage.getItem('currentReadingSpeedIndex')) || 1; // Padrão: Normal

let contrasteAtivo = localStorage.getItem('contrasteAtivo') === 'true';
let fonteDislexia = localStorage.getItem('fonteDislexia') === 'true';
let modoEscuroAtivo = localStorage.getItem('modoEscuroAtivo') === 'true';
let corFoco = localStorage.getItem('corFoco') || 'yellow';

/**
 * Aplica as configurações de acessibilidade salvas ou padrão ao corpo do documento.
 * Isso inclui tamanho da fonte, espaçamento de linha, espaçamento de letra,
 * modo de alto contraste, modo escuro, fonte para dislexia e cor de foco.
 */
function applyAccessibilitySettings() {
    document.body.style.fontSize = fontSizeLevels[currentFontSizeIndex] + '%';
    // Atualiza o texto para as barras de acessibilidade desktop e PWA
    const fontSizeElemDesktop = document.getElementById('fontSizeText');
    const fontSizeElemPWA = document.getElementById('fontSizeTextPWA');
    if (fontSizeElemDesktop) fontSizeElemDesktop.textContent = fontSizeTexts[currentFontSizeIndex];
    if (fontSizeElemPWA) fontSizeElemPWA.textContent = fontSizeTexts[currentFontSizeIndex];

    document.documentElement.style.setProperty('--espacamento-linha', lineHeightLevels[currentLineHeightIndex]);
    const lineHeightElemDesktop = document.getElementById('lineHeightText');
    const lineHeightElemPWA = document.getElementById('lineHeightTextPWA');
    if (lineHeightElemDesktop) lineHeightElemDesktop.textContent = lineHeightTexts[currentLineHeightIndex];
    if (lineHeightElemPWA) lineHeightElemPWA.textContent = lineHeightTexts[currentLineHeightIndex];

    document.documentElement.style.setProperty('--espacamento-letra', letterSpacingLevels[currentLetterSpacingIndex] + 'em');
    const letterSpacingElemDesktop = document.getElementById('letterSpacingText');
    const letterSpacingElemPWA = document.getElementById('letterSpacingTextPWA');
    if (letterSpacingElemDesktop) letterSpacingElemDesktop.textContent = letterSpacingTexts[currentLetterSpacingIndex];
    if (letterSpacingElemPWA) letterSpacingElemPWA.textContent = letterSpacingTexts[currentLetterSpacingIndex];

    speechRate = readingSpeedLevels[currentReadingSpeedIndex];
    if (currentUtterance) {
        currentUtterance.rate = speechRate;
    }
    const readingSpeedElemDesktop = document.getElementById('readingSpeedText');
    const readingSpeedElemPWA = document.getElementById('readingSpeedTextPWA');
    if (readingSpeedElemDesktop) readingSpeedElemDesktop.textContent = readingSpeedTexts[currentReadingSpeedIndex];
    if (readingSpeedElemPWA) readingSpeedElemPWA.textContent = readingSpeedTexts[currentReadingSpeedIndex];

    if (contrasteAtivo) document.body.classList.add('contraste-alto'); else document.body.classList.remove('contraste-alto');
    if (fonteDislexia) document.body.classList.add('fonte-dislexia'); else document.body.classList.remove('fonte-dislexia');
    if (modoEscuroAtivo) document.body.classList.add('dark-mode'); else document.body.classList.remove('dark-mode');
    document.documentElement.style.setProperty('--cor-foco-acessibilidade', corFoco);

    document.querySelectorAll('.color-option').forEach(btn => {
        if (btn.style.backgroundColor === corFoco) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
}

/**
 * Alterna o tamanho da fonte entre os níveis predefinidos.
 */
function alternarTamanhoFonte() {
    currentFontSizeIndex = (currentFontSizeIndex + 1) % fontSizeLevels.length;
    localStorage.setItem('currentFontSizeIndex', currentFontSizeIndex);
    applyAccessibilitySettings();
}

/**
 * Alterna o espaçamento de linha entre os níveis predefinidos.
 */
function alternarEspacamentoLinha() {
    currentLineHeightIndex = (currentLineHeightIndex + 1) % lineHeightLevels.length;
    localStorage.setItem('currentLineHeightIndex', currentLineHeightIndex);
    applyAccessibilitySettings();
}

/**
 * Alterna o espaçamento de letra entre os níveis predefinidos.
 */
function alternarEspacamentoLetra() {
    currentLetterSpacingIndex = (currentLetterSpacingIndex + 1) % letterSpacingLevels.length;
    localStorage.setItem('currentLetterSpacingIndex', currentLetterSpacingIndex);
    applyAccessibilitySettings();
}

/**
 * Alterna a velocidade de leitura entre os níveis predefinidos.
 */
function alternarVelocidadeLeitura() {
    currentReadingSpeedIndex = (currentReadingSpeedIndex + 1) % readingSpeedLevels.length;
    localStorage.setItem('currentReadingSpeedIndex', currentReadingSpeedIndex);
    applyAccessibilitySettings();
}

/**
 * Alterna o modo de alto contraste. Desativa o modo escuro se ativado.
 */
function alternarContraste() {
    contrasteAtivo = !contrasteAtivo;
    localStorage.setItem('contrasteAtivo', contrasteAtivo);
    if (contrasteAtivo && modoEscuroAtivo) {
        modoEscuroAtivo = false;
        localStorage.setItem('modoEscuroAtivo', false);
    }
    applyAccessibilitySettings();
}

/**
 * Alterna a fonte para dislexia.
 */
function alternarFonteDislexia() {
    fonteDislexia = !fonteDislexia;
    localStorage.setItem('fonteDislexia', fonteDislexia);
    applyAccessibilitySettings();
}

/**
 * Alterna o modo escuro. Desativa o modo de alto contraste se ativado.
 */
function alternarModoEscuro() {
    modoEscuroAtivo = !modoEscuroAtivo;
    localStorage.setItem('modoEscuroAtivo', modoEscuroAtivo);
    if (modoEscuroAtivo && contrasteAtivo) {
        contrasteAtivo = false;
        localStorage.setItem('contrasteAtivo', false);
    }
    applyAccessibilitySettings();
}

/**
 * Define a cor de foco para acessibilidade.
 * @param {string} color - A cor a ser definida (ex: 'yellow', 'lime').
 */
function definirCorFoco(color) {
    corFoco = color;
    localStorage.setItem('corFoco', corFoco);
    applyAccessibilitySettings(); // Re-apply to update selected class
}

// Variáveis para controle da leitura
let currentUtterance = null;
let isReading = false;
const speechSynth = window.speechSynthesis;
let speechRate = readingSpeedLevels[currentReadingSpeedIndex]; // Inicializa com a velocidade do nível

/**
 * Inicia, pausa ou retoma a leitura de texto da página.
 */
function toggleLeitura() {
    const toggleLeituraBtnDesktop = document.getElementById('toggleLeituraBtn');
    const toggleLeituraBtnPWA = document.getElementById('toggleLeituraBtnPWA');

    const setButtonState = (btn, isPlaying) => {
        if (btn) {
            btn.innerHTML = isPlaying
                ? '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg><span class="sr-only" id="toggleLeituraText">Pausar Leitura</span>'
                : '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg><span class="sr-only" id="toggleLeituraText">Reproduzir Leitura</span>';
        }
    };

    if (speechSynth.speaking && !speechSynth.paused) {
        // Se estiver falando e não pausado, pause
        speechSynth.pause();
        isReading = false;
        setButtonState(toggleLeituraBtnDesktop, false);
        setButtonState(toggleLeituraBtnPWA, false);
    } else if (speechSynth.paused) {
        // Se estiver pausado, retome
        speechSynth.resume();
        isReading = true;
        setButtonState(toggleLeituraBtnDesktop, true);
        setButtonState(toggleLeituraBtnPWA, true);
    } else {
        // Se não estiver falando, inicie uma nova leitura
        speechSynth.cancel(); // Garante que não há outras falas na fila
        const texto = document.body.innerText;
        currentUtterance = new SpeechSynthesisUtterance(texto);
        currentUtterance.lang = 'pt-BR';
        currentUtterance.rate = speechRate;

        currentUtterance.onend = () => {
            isReading = false;
            setButtonState(toggleLeituraBtnDesktop, false);
            setButtonState(toggleLeituraBtnPWA, false);
        };

        speechSynth.speak(currentUtterance);
        isReading = true;
        setButtonState(toggleLeituraBtnDesktop, true);
        setButtonState(toggleLeituraBtnPWA, true);
    }
}

/**
 * Reinicia a leitura do texto da página do começo.
 */
function reiniciarLeitura() {
    speechSynth.cancel();
    isReading = false;
    const toggleLeituraBtnDesktop = document.getElementById('toggleLeituraBtn');
    const toggleLeituraBtnPWA = document.getElementById('toggleLeituraBtnPWA');

    const setButtonToPlay = (btn) => {
        if (btn) {
            btn.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg><span class="sr-only" id="toggleLeituraText">Reproduzir Leitura</span>';
        }
    };
    setButtonToPlay(toggleLeituraBtnDesktop);
    setButtonToPlay(toggleLeituraBtnPWA);

    toggleLeitura(); // Inicia uma nova leitura do começo
}

/**
 * Pausa todas as animações e transições CSS na página.
 */
function pausarAnimacoes() {
    const style = document.createElement('style');
    style.innerHTML = `* { animation: none !important; transition: none !important; }`;
    document.head.appendChild(style);
}

/**
 * Redefine todas as configurações de acessibilidade para os valores padrão
 * e recarrega a página.
 */
function resetarAcessibilidade() {
    localStorage.clear();
    location.reload();
}

/**
 * Exibe um modal customizado com uma mensagem.
 * @param {string} message - A mensagem a ser exibida no modal.
 */
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
// Estes elementos não estão presentes no código HTML consolidado,
// então as funções relacionadas a eles não serão totalmente funcionais.
const cookieConsentBanner = document.getElementById('cookieConsentBanner');
const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
const cookiePolicyLink = document.getElementById('cookiePolicyLink');

const videoTutorialModal = document.getElementById('videoTutorialModal');
const closeVideoTutorialBtn = document.getElementById('closeVideoTutorialBtn');
const skipTutorialBtn = document.getElementById('skipTutorialBtn');
const tutorialVideoFrame = document.getElementById('tutorialVideoFrame');

/**
 * Mostra o banner de consentimento de cookies.
 */
function showCookieBanner() {
    if (cookieConsentBanner) {
        cookieConsentBanner.classList.add('show');
        cookieConsentBanner.setAttribute('aria-hidden', 'false');
        if (acceptCookiesBtn) acceptCookiesBtn.focus();
    }
}

/**
 * Oculta o banner de consentimento de cookies.
 */
function hideCookieBanner() {
    if (cookieConsentBanner) {
        cookieConsentBanner.classList.remove('show');
        cookieConsentBanner.setAttribute('aria-hidden', 'true');
    }
}

/**
 * Verifica se o consentimento de cookies foi dado e, se não, exibe o banner.
 * Caso contrário, verifica e exibe o tutorial em vídeo.
 */
function checkCookieConsent() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
        showCookieBanner();
    } else {
        checkFirstVisitAndShowTutorial();
    }
}

/**
 * Aceita os cookies, oculta o banner e verifica/exibe o tutorial.
 */
function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    hideCookieBanner();
    checkFirstVisitAndShowTutorial();
}

/**
 * Verifica se o tutorial de boas-vindas já foi exibido e, se não, o exibe.
 */
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

/**
 * Fecha o modal do tutorial em vídeo.
 */
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

/**
 * Verifica a posição de rolagem da página e mostra/oculta o botão "Voltar ao Topo".
 */
function checkScrollPosition() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        if (backToTopBtn) backToTopBtn.style.display = "block";
    } else {
        if (backToTopBtn) backToTopBtn.style.display = "none";
    }
}

/**
 * Rola a página suavemente para o topo.
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Drag-and-Drop para o Botão de Acesso Rápido ao Assistente de Enfermagem ---
const quickAccessNursingAssistantBtn = document.getElementById('quickAccessNursingAssistantBtn');
let isDraggingAssistantBtn = false;
let offset = { x: 0, y: 0 }; // Usa offset para a posição inicial do clique em relação ao elemento

if (quickAccessNursingAssistantBtn) {
    // Eventos do mouse para arrastar e soltar
    quickAccessNursingAssistantBtn.addEventListener('mousedown', (e) => {
        if (isPWAOrSmallScreen()) { // Habilita o arrasto apenas para PWA/mobile
            isDraggingAssistantBtn = true;
            quickAccessNursingAssistantBtn.style.cursor = 'grabbing';

            // Obtém a posição inicial do mouse em relação ao elemento
            const rect = quickAccessNursingAssistantBtn.getBoundingClientRect();
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;

            e.preventDefault(); // Previne o comportamento padrão de arrasto do navegador
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDraggingAssistantBtn) return;

        // Calcula a nova posição em relação à viewport
        let newLeft = e.clientX - offset.x;
        let newTop = e.clientY - offset.y;

        // Obtém as dimensões da viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonRect = quickAccessNursingAssistantBtn.getBoundingClientRect();

        // Restringe dentro dos limites da viewport
        newLeft = Math.max(0, Math.min(newLeft, viewportWidth - buttonRect.width));
        newTop = Math.max(0, Math.min(newTop, viewportHeight - buttonRect.height));

        // Aplica a nova posição
        quickAccessNursingAssistantBtn.style.left = `${newLeft}px`;
        quickAccessNursingAssistantBtn.style.top = `${newTop}px`;
        quickAccessNursingAssistantBtn.style.right = 'auto'; // Desativa o posicionamento 'right'
        quickAccessNursingAssistantBtn.style.bottom = 'auto'; // Desativa o posicionamento 'bottom'
    });

    document.addEventListener('mouseup', () => {
        if (isDraggingAssistantBtn) {
            isDraggingAssistantBtn = false;
            quickAccessNursingAssistantBtn.style.cursor = 'grab'; // Reinicia o cursor
        }
    });

    // Eventos de toque para arrastar e soltar (para PWA)
    quickAccessNursingAssistantBtn.addEventListener('touchstart', (e) => {
        if (isPWAOrSmallScreen()) {
            isDraggingAssistantBtn = true;
            quickAccessNursingAssistantBtn.style.cursor = 'grabbing';

            const touch = e.touches[0];
            const rect = quickAccessNursingAssistantBtn.getBoundingClientRect();
            offset.x = touch.clientX - rect.left;
            offset.y = touch.clientY - rect.top;

            e.preventDefault(); // Previne o rolamento durante o arrasto
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

        e.preventDefault(); // Previne o rolamento durante o arrasto
    }, { passive: false }); // Usa passive: false para permitir preventDefault

    document.addEventListener('touchend', () => {
        if (isDraggingAssistantBtn) {
            isDraggingAssistantBtn = false;
            quickAccessNursingAssistantBtn.style.cursor = 'grab';
        }
    });
}

/**
 * Função para o botão de acesso rápido ao Assistente de Enfermagem.
 * Oculta todas as seções de IA e rola para a seção do assistente de enfermagem.
 */
function quickAccessNursingAssistant() {
    // Oculta todas as seções de IA primeiro (usando a nova ocultação acessível)
    document.querySelectorAll('.ai-section').forEach(section => {
        section.classList.add('hidden-ai-section');
        section.setAttribute('aria-hidden', 'true');
    });

    const targetSection = document.getElementById('nursingAssistantSection'); // Este elemento não está presente no código consolidado.
    if (targetSection) {
        targetSection.classList.remove('hidden-ai-section');
        targetSection.setAttribute('aria-hidden', 'false');
        targetSection.scrollIntoView({ behavior: 'smooth' });
    } else {
         showCustomModal("A seção do Assistente de Enfermagem não foi encontrada.");
    }
}

// --- Lógica de Consentimento da Newsletter ---
const newsletterEmailInput = document.getElementById('newsletterEmail');
const newsletterConsentCheckbox = document.getElementById('newsletterConsent');
const subscribeNewsletterBtn = document.getElementById('subscribeNewsletterBtn');
const newsletterErrorSpan = document.getElementById('newsletterError'); // Obtém o span de erro

/**
 * Atualiza o estado do botão de assinatura da newsletter com base na validação do e-mail e consentimento.
 */
function updateNewsletterButtonState() {
    const email = newsletterEmailInput ? newsletterEmailInput.value.trim() : '';
    const consentGiven = newsletterConsentCheckbox ? newsletterConsentCheckbox.checked : false;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Validação simples de e-mail

    // Limpa a mensagem de erro anterior
    if (newsletterErrorSpan) newsletterErrorSpan.textContent = '';

    // Mostra erro apenas para e-mail inválido (erro de consentimento é tratado no clique)
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
    // Atualização do estado inicial
    updateNewsletterButtonState();

    subscribeNewsletterBtn.addEventListener('click', () => {
        const email = newsletterEmailInput.value.trim();
        const consentGiven = newsletterConsentCheckbox.checked;
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        // Re-verifica as condições no clique para garantir que todas as validações passem
        if (!isValidEmail) {
            if (newsletterErrorSpan) newsletterErrorSpan.textContent = "Por favor, insira um e-mail válido.";
            return;
        }
        if (!consentGiven) {
            // Esta mensagem agora é exibida apenas no clique se o consentimento estiver faltando
            if (newsletterErrorSpan) newsletterErrorSpan.textContent = "Por favor, marque a caixa de consentimento para receber informações.";
            return;
        }

        // Se o e-mail for fornecido e o consentimento for dado
        if (typeof showCustomModal === 'function') {
            showCustomModal(`Obrigado por assinar nossa newsletter, ${email}!`);
        } else {
            console.log(`Obrigado por assinar nossa newsletter, ${email}!`);
        }
        newsletterEmailInput.value = ''; // Limpa o input
        newsletterConsentCheckbox.checked = false; // Desmarca o checkbox
        updateNewsletterButtonState(); // Atualiza o estado do botão após o envio
    });
}

// --- JavaScript Específico para PWA/Mobile ---
const hamburgerButton = document.getElementById('hamburgerButton');
const offCanvasMenu = document.getElementById('offCanvasMenu');
const menuOverlay = document.getElementById('menuOverlay');
const desktopNav = document.querySelector('.desktop-nav');
const accessibilityToggleButton = document.getElementById('accessibilityToggleButton');
const pwaAcessibilidadeBar = document.getElementById('pwaAcessibilidadeBar');
const desktopAcessibilidadeBar = document.getElementById('barraAcessibilidade');

/**
 * Alterna a visibilidade dos elementos específicos para PWA/Mobile
 * e Desktop com base na largura da tela ou modo de exibição PWA.
 */
function togglePWAModeElements() {
    const vlibrasWidgetButton = document.querySelector('.vw-access-button'); // Obtém o botão VLibras

    if (isPWAOrSmallScreen()) {
        // Mostra elementos PWA removendo 'pwa-only' que define display: none
        // A media query @media então aplicará display: block !important
        if (hamburgerButton) hamburgerButton.classList.remove('pwa-only');
        if (offCanvasMenu) offCanvasMenu.classList.remove('pwa-only');
        if (menuOverlay) menuOverlay.classList.remove('pwa-only');
        if (pwaAcessibilidadeBar) pwaAcessibilidadeBar.classList.remove('pwa-only');

        // Define explicitamente a exibição do botão VLibras
        if (vlibrasWidgetButton) vlibrasWidgetButton.style.display = 'flex';

        // Oculta elementos desktop
        if (desktopNav) desktopNav.classList.add('desktop-only');
        if (desktopAcessibilidadeBar) desktopAcessibilidadeBar.classList.add('desktop-only');
    } else {
        // Mostra elementos desktop
        if (hamburgerButton) hamburgerButton.classList.add('pwa-only'); // Oculta hambúrguer no desktop
        if (offCanvasMenu) offCanvasMenu.classList.add('pwa-only');
        if (menuOverlay) menuOverlay.classList.add('pwa-only');
        if (desktopNav) desktopNav.classList.remove('desktop-only');
        if (desktopAcessibilidadeBar) desktopAcessibilidadeBar.classList.remove('desktop-only');

        // Oculta elementos PWA
        if (pwaAcessibilidadeBar) pwaAcessibilidadeBar.classList.add('pwa-only');

        // Oculta explicitamente o botão VLibras
        if (vlibrasWidgetButton) vlibrasWidgetButton.style.display = 'none';

        // Garante que o menu PWA e a barra estejam fechados se mudar para a visualização desktop
        if (offCanvasMenu) offCanvasMenu.classList.remove('is-open');
        if (menuOverlay) menuOverlay.classList.remove('is-open');
        if (pwaAcessibilidadeBar) pwaAcessibilidadeBar.classList.remove('is-open');
    }
}

if (hamburgerButton && offCanvasMenu && menuOverlay) {
    hamburgerButton.addEventListener('click', () => {
        offCanvasMenu.classList.toggle('is-open');
        menuOverlay.classList.toggle('is-open');
        // Fecha a barra de acessibilidade se estiver aberta
        if (pwaAcessibilidadeBar && pwaAcessibilidadeBar.classList.contains('is-open')) {
            pwaAcessibilidadeBar.classList.remove('is-open');
        }
    });

    menuOverlay.addEventListener('click', () => {
        offCanvasMenu.classList.remove('is-open');
        menuOverlay.classList.remove('is-open');
    });

    // Adiciona event listeners para alternadores de submenu móveis
    document.querySelectorAll('[data-submenu-toggle]').forEach(toggleBtn => {
        toggleBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Previne o comportamento padrão do link
            const submenuId = this.dataset.submenuToggle;
            const submenu = document.getElementById(`submenu-${submenuId}`);
            if (submenu) {
                submenu.classList.toggle('hidden');
                const isExpanded = !submenu.classList.contains('hidden');
                this.setAttribute('aria-expanded', isExpanded);
                // Rotaciona o ícone de chevron
                const icon = this.querySelector('i.fa-chevron-down, i.fa-chevron-right');
                if (icon) {
                    if (isExpanded) {
                        icon.classList.remove('fa-chevron-right');
                        icon.classList.add('fa-chevron-down');
                    } else {
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-right');
                    }
                }
            }
        });
    });
}

if (accessibilityToggleButton && pwaAcessibilidadeBar) {
    accessibilityToggleButton.addEventListener('click', () => {
        console.log("accessibilityToggleButton clicked!"); // Log de depuração
        pwaAcessibilidadeBar.classList.toggle('is-open');
        // Fecha o menu hambúrguer se estiver aberto
        if (offCanvasMenu && offCanvasMenu.classList.contains('is-open')) {
            offCanvasMenu.classList.remove('is-open');
            menuOverlay.classList.remove('is-open');
        }
    });

    // Fecha a barra de acessibilidade se clicado fora (excluindo o próprio botão de alternância)
    document.addEventListener('click', (e) => {
        if (pwaAcessibilidadeBar.classList.contains('is-open') &&
            !pwaAcessibilidadeBar.contains(e.target) &&
            !accessibilityToggleButton.contains(e.target)) {
            pwaAcessibilidadeBar.classList.remove('is-open');
        }
    });
}

// Exporta as funções para que possam ser acessadas globalmente (se necessário)
// ou importadas por outros módulos.
window.alternarTamanhoFonte = alternarTamanhoFonte;
window.alternarEspacamentoLinha = alternarEspacamentoLinha;
window.alternarEspacamentoLetra = alternarEspacamentoLetra;
window.alternarVelocidadeLeitura = alternarVelocidadeLeitura;
window.toggleLeitura = toggleLeitura;
window.reiniciarLeitura = reiniciarLeitura;
window.alternarContraste = alternarContraste;
window.alternarModoEscuro = alternarModoEscuro;
window.alternarFonteDislexia = alternarFonteDislexia;
window.definirCorFoco = definirCorFoco;
window.resetarAcessibilidade = resetarAcessibilidade;
window.showCustomModal = showCustomModal;
window.acceptCookies = acceptCookies;
window.closeVideoTutorial = closeVideoTutorial;
window.scrollToTop = scrollToTop;
window.quickAccessNursingAssistant = quickAccessNursingAssistant;
window.updateNewsletterButtonState = updateNewsletterButtonState;
window.togglePWAModeElements = togglePWAModeElements;

// Event listeners que devem ser chamados após o DOM estar pronto
document.addEventListener('DOMContentLoaded', () => {
    applyAccessibilitySettings(); // Aplica configurações de acessibilidade
    checkCookieConsent(); // Verifica consentimento de cookies e tutorial

    // Estado inicial do botão Voltar ao Topo
    checkScrollPosition();

    // Estado inicial da newsletter
    updateNewsletterButtonState();

    // Alterna a visibilidade dos elementos PWA na carga
    togglePWAModeElements();

    // Event Listeners para Cookie Consent e Video Tutorial (garante que os elementos existam antes de anexar)
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

    // Adiciona o listener para o evento de rolagem (para o botão Voltar ao Topo)
    window.addEventListener('scroll', checkScrollPosition);

    // Ouve o redimensionamento da janela para ajustar a visibilidade dos elementos PWA
    window.addEventListener('resize', togglePWAModeElements);
});
