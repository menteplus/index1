// header.js

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

function applyAccessibilitySettings() {
    document.body.style.fontSize = fontSizeLevels[currentFontSizeIndex] + '%';
    // Update text for both desktop and PWA bar
    const fontSizeElemDesktop = document.getElementById('fontSizeText');
    const fontSizeElemPWA = document.getElementById('fontSizeTextPWA'); // Assuming this ID exists in PWA bar
    if (fontSizeElemDesktop) fontSizeElemDesktop.textContent = fontSizeTexts[currentFontSizeIndex];
    if (fontSizeElemPWA) fontSizeElemPWA.textContent = fontSizeTexts[currentFontSizeIndex];

    document.documentElement.style.setProperty('--espacamento-linha', lineHeightLevels[currentLineHeightIndex]);
    const lineHeightElemDesktop = document.getElementById('lineHeightText');
    const lineHeightElemPWA = document.getElementById('lineHeightTextPWA'); // Assuming this ID exists in PWA bar
    if (lineHeightElemDesktop) lineHeightElemDesktop.textContent = lineHeightTexts[currentLineHeightIndex];
    if (lineHeightElemPWA) lineHeightElemPWA.textContent = lineHeightTexts[currentLineHeightIndex];

    document.documentElement.style.setProperty('--espacamento-letra', letterSpacingLevels[currentLetterSpacingIndex] + 'em');
    const letterSpacingElemDesktop = document.getElementById('letterSpacingText');
    const letterSpacingElemPWA = document.getElementById('letterSpacingTextPWA'); // Assuming this ID exists in PWA bar
    if (letterSpacingElemDesktop) letterSpacingElemDesktop.textContent = letterSpacingTexts[currentLetterSpacingIndex];
    if (letterSpacingElemPWA) letterSpacingElemPWA.textContent = letterSpacingTexts[currentLetterSpacingIndex];

    speechRate = readingSpeedLevels[currentReadingSpeedIndex];
    if (currentUtterance) {
        currentUtterance.rate = speechRate;
    }
    const readingSpeedElemDesktop = document.getElementById('readingSpeedText');
    const readingSpeedElemPWA = document.getElementById('readingSpeedTextPWA'); // Assuming this ID exists in PWA bar
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

function alternarTamanhoFonte() {
    currentFontSizeIndex = (currentFontSizeIndex + 1) % fontSizeLevels.length;
    localStorage.setItem('currentFontSizeIndex', currentFontSizeIndex);
    applyAccessibilitySettings();
}

function alternarEspacamentoLinha() {
    currentLineHeightIndex = (currentLineHeightIndex + 1) % lineHeightLevels.length;
    localStorage.setItem('currentLineHeightIndex', currentLineHeightIndex);
    applyAccessibilitySettings();
}

function alternarEspacamentoLetra() {
    currentLetterSpacingIndex = (currentLetterSpacingIndex + 1) % letterSpacingLevels.length;
    localStorage.setItem('currentLetterSpacingIndex', currentLetterSpacingIndex);
    applyAccessibilitySettings();
}

function alternarVelocidadeLeitura() {
    currentReadingSpeedIndex = (currentReadingSpeedIndex + 1) % readingSpeedLevels.length;
    localStorage.setItem('currentReadingSpeedIndex', currentReadingSpeedIndex);
    applyAccessibilitySettings();
}

function alternarContraste() {
    contrasteAtivo = !contrasteAtivo;
    localStorage.setItem('contrasteAtivo', contrasteAtivo);
    if (contrasteAtivo && modoEscuroAtivo) {
        modoEscuroAtivo = false;
        localStorage.setItem('modoEscuroAtivo', false);
    }
    applyAccessibilitySettings();
}

function alternarFonteDislexia() {
    fonteDislexia = !fonteDislexia;
    localStorage.setItem('fonteDislexia', fonteDislexia);
    applyAccessibilitySettings();
}

function alternarModoEscuro() {
    modoEscuroAtivo = !modoEscuroAtivo;
    localStorage.setItem('modoEscuroAtivo', modoEscuroAtivo);
    if (modoEscuroAtivo && contrasteAtivo) {
        contrasteAtivo = false;
        localStorage.setItem('contrasteAtivo', false);
    }
    applyAccessibilitySettings();
}

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

function toggleLeitura() {
    const toggleLeituraBtnDesktop = document.getElementById('toggleLeituraBtn');
    const toggleLeituraBtnPWA = document.getElementById('toggleLeituraBtnPWA'); // Assuming this ID exists in PWA bar

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

function reiniciarLeitura() {
    speechSynth.cancel();
    isReading = false;
    const toggleLeituraBtnDesktop = document.getElementById('toggleLeituraBtn');
    const toggleLeituraBtnPWA = document.getElementById('toggleLeituraBtnPWA'); // Assuming this ID exists in PWA bar

    const setButtonToPlay = (btn) => {
        if (btn) {
            btn.innerHTML = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg><span class="sr-only" id="toggleLeituraText">Reproduzir Leitura</span>';
        }
    };
    setButtonToPlay(toggleLeituraBtnDesktop);
    setButtonToPlay(toggleLeituraBtnPWA);

    toggleLeitura(); // Inicia uma nova leitura do começo
}

function pausarAnimacoes() {
    const style = document.createElement('style');
    style.innerHTML = `* { animation: none !important; transition: none !important; }`;
    document.head.appendChild(style);
}

function resetarAcessibilidade() {
    localStorage.clear();
    location.reload();
}

// Função para detectar se é PWA ou tela pequena
function isPWAOrSmallScreen() {
    return window.matchMedia('(display-mode: standalone)').matches || window.innerWidth <= 768;
}

// PWA/Mobile Specific JavaScript for Header and Accessibility Bar
const hamburgerButton = document.getElementById('hamburgerButton');
const offCanvasMenu = document.getElementById('offCanvasMenu');
const menuOverlay = document.getElementById('menuOverlay');
const desktopNav = document.querySelector('.desktop-nav');
const accessibilityToggleButton = document.getElementById('accessibilityToggleButton');
const pwaAcessibilidadeBar = document.getElementById('pwaAcessibilidadeBar');
const desktopAcessibilidadeBar = document.getElementById('barraAcessibilidade');

function togglePWAModeElements() {
    const vlibrasWidgetButton = document.querySelector('.vw-access-button'); // Get the VLibras button

    if (isPWAOrSmallScreen()) {
        // Show PWA elements by removing 'pwa-only' which sets display: none
        // The @media query will then apply display: block !important
        if (hamburgerButton) hamburgerButton.classList.remove('pwa-only');
        if (offCanvasMenu) offCanvasMenu.classList.remove('pwa-only');
        if (menuOverlay) menuOverlay.classList.remove('pwa-only');
        if (pwaAcessibilidadeBar) pwaAcessibilidadeBar.classList.remove('pwa-only');

        // Explicitly set VLibras button display
        if (vlibrasWidgetButton) vlibrasWidgetButton.style.display = 'flex';

        // Hide desktop elements
        if (desktopNav) desktopNav.classList.add('desktop-only');
        if (desktopAcessibilidadeBar) desktopAcessibilidadeBar.classList.add('desktop-only');
    } else {
        // Show desktop elements
        if (hamburgerButton) hamburgerButton.classList.add('pwa-only'); // Hide hamburger on desktop
        if (offCanvasMenu) offCanvasMenu.classList.add('pwa-only');
        if (menuOverlay) menuOverlay.classList.add('pwa-only');
        if (desktopNav) desktopNav.classList.remove('desktop-only');
        if (desktopAcessibilidadeBar) desktopAcessibilidadeBar.classList.remove('desktop-only');

        // Hide PWA elements
        if (pwaAcessibilidadeBar) pwaAcessibilidadeBar.classList.add('pwa-only');

        // Explicitly hide VLibras button
        if (vlibrasWidgetButton) vlibrasWidgetButton.style.display = 'none';

        // Ensure PWA menu and bar are closed if switching to desktop view
        if (offCanvasMenu) offCanvasMenu.classList.remove('is-open');
        if (menuOverlay) menuOverlay.classList.remove('is-open');
        if (pwaAcessibilidadeBar) pwaAcessibilidadeBar.classList.remove('is-open');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Event listeners for accessibility buttons (desktop)
    document.querySelector('#barraAcessibilidade button:nth-of-type(1)').onclick = alternarTamanhoFonte;
    document.querySelector('#barraAcessibilidade button:nth-of-type(2)').onclick = alternarEspacamentoLinha;
    document.querySelector('#barraAcessibilidade button:nth-of-type(3)').onclick = alternarEspacamentoLetra;
    document.querySelector('#barraAcessibilidade button:nth-of-type(4)').onclick = alternarVelocidadeLeitura;
    document.querySelector('#barraAcessibilidade button:nth-of-type(5)').onclick = toggleLeitura;
    document.querySelector('#barraAcessibilidade button:nth-of-type(6)').onclick = reiniciarLeitura;
    document.querySelector('#barraAcessibilidade button:nth-of-type(7)').onclick = alternarContraste;
    document.querySelector('#barraAcessibilidade button:nth-of-type(8)').onclick = alternarModoEscuro;
    document.querySelector('#barraAcessibilidade button:nth-of-type(9)').onclick = alternarFonteDislexia;
    document.querySelector('#barraAcessibilidade button:nth-of-type(14)').onclick = resetarAcessibilidade; // Assuming this is the reset button

    // Event listeners for color options
    document.querySelectorAll('.color-option').forEach(btn => {
        btn.addEventListener('click', () => definirCorFoco(btn.style.backgroundColor));
    });

    if (hamburgerButton && offCanvasMenu && menuOverlay) {
        hamburgerButton.addEventListener('click', () => {
            offCanvasMenu.classList.toggle('is-open');
            menuOverlay.classList.toggle('is-open');
            // Close accessibility bar if open
            if (pwaAcessibilidadeBar && pwaAcessibilidadeBar.classList.contains('is-open')) {
                pwaAcessibilidadeBar.classList.remove('is-open');
            }
        });

        menuOverlay.addEventListener('click', () => {
            offCanvasMenu.classList.remove('is-open');
            menuOverlay.classList.remove('is-open');
        });

        // Add event listeners for mobile submenu toggles
        document.querySelectorAll('[data-submenu-toggle]').forEach(toggleBtn => {
            toggleBtn.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent default link behavior
                const submenuId = this.dataset.submenuToggle;
                const submenu = document.getElementById(`submenu-${submenuId}`);
                if (submenu) {
                    submenu.classList.toggle('hidden');
                    const isExpanded = !submenu.classList.contains('hidden');
                    this.setAttribute('aria-expanded', isExpanded);
                    // Rotate chevron icon
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
            console.log("accessibilityToggleButton clicked!"); // Debug log
            pwaAcessibilidadeBar.classList.toggle('is-open');
            // Close hamburger menu if open
            if (offCanvasMenu && offCanvasMenu.classList.contains('is-open')) {
                offCanvasMenu.classList.remove('is-open');
                menuOverlay.classList.remove('is-open');
            }
        });

        // Close accessibility bar if clicked outside (excluding the toggle button itself)
        document.addEventListener('click', (e) => {
            if (pwaAcessibilidadeBar.classList.contains('is-open') &&
                !pwaAcessibilidadeBar.contains(e.target) &&
                !accessibilityToggleButton.contains(e.target)) {
                pwaAcessibilidadeBar.classList.remove('is-open');
            }
        });
    }

    // Apply accessibility settings on DOMContentLoaded
    applyAccessibilitySettings();
    // Toggle PWA elements visibility on load
    togglePWAModeElements();
});

// Listen for window resize to adjust PWA elements visibility
window.addEventListener('resize', togglePWAModeElements);

// Expose functions to the global scope if they are used in HTML onclick attributes
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
