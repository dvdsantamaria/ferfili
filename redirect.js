(function () {
    const path = window.location.pathname;
    const isSpanishPage = path.endsWith('index.html') || path === '/' || path.endsWith('/');
    const isEnglishPage = path.endsWith('index_en.html');

    function doRedirect(targetLang) {
        const currentLang = isSpanishPage ? 'es' : 'en';
        if (targetLang === currentLang) return;

        if (targetLang === 'es') {
            window.location.href = 'index.html';
        } else {
            window.location.href = 'index_en.html';
        }
    }

    // 1. Local storage preference (Manual override)
    const preferredLang = localStorage.getItem('preferredLanguage');
    if (preferredLang) {
        doRedirect(preferredLang);
        return;
    }

    // 2. Browser language detection
    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    const detectedLang = browserLang.startsWith('es') ? 'es' : 'en';

    doRedirect(detectedLang);

    // 3. Listen for manual language switches to save preference
    window.addEventListener('DOMContentLoaded', () => {
        const esLinks = document.querySelectorAll('a[href*="index.html"]');
        const enLinks = document.querySelectorAll('a[href*="index_en.html"]');

        esLinks.forEach(link => {
            link.addEventListener('click', () => {
                localStorage.setItem('preferredLanguage', 'es');
            });
        });
        enLinks.forEach(link => {
            link.addEventListener('click', () => {
                localStorage.setItem('preferredLanguage', 'en');
            });
        });
    });
})();
