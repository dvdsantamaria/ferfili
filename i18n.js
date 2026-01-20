document.addEventListener('DOMContentLoaded', () => {
    const lang = document.documentElement.lang || 'es';
    applyTranslations(lang);
});

function applyTranslations(lang) {
    // Check if translations object exists (loaded from translations.js)
    if (typeof translations === 'undefined') {
        console.error('Translations data not found. Make sure translations.js is loaded.');
        return;
    }

    const data = translations[lang];
    if (!data) {
        console.error(`No translations found for language: ${lang}`);
        return;
    }

    // Apply to elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (data[key]) {
            if (element.tagName === 'META') {
                element.setAttribute('content', data[key]);
            } else if (element.tagName === 'TITLE') {
                document.title = data[key];
            } else {
                element.textContent = data[key];
            }
        }
    });

    console.log(`Translations applied for: ${lang}`);
}
