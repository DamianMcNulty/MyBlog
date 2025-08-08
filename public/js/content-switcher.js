// Content switcher for AI vs Original content based on theme
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a single post page
    const contentElement = document.querySelector('.content');
    if (!contentElement) {
        return;
    }

    // Find the dark mode toggle button (it might have different selectors)
    const colorSchemeToggle = document.querySelector('button[id="dark-mode-toggle"]') || 
                              document.querySelector('[data-theme-toggle]') ||
                              document.querySelector('.theme-toggle') ||
                              document.querySelector('button[aria-label*="theme"]');

    if (!colorSchemeToggle) {
        console.log('Theme toggle button not found');
        return;
    }

    // Get AI content from the page data (if available)
    const aiContentElement = document.querySelector('[data-ai-content]');
    if (!aiContentElement) {
        console.log('No AI content found on this page');
        return;
    }

    const aiContent = aiContentElement.getAttribute('data-ai-content');
    const originalContentElement = document.querySelector('.content article');
    if (!originalContentElement) {
        console.log('Article content not found');
        return;
    }

    const originalContent = originalContentElement.innerHTML;

    function getCurrentTheme() {
        // Check various ways the theme might be stored
        return document.documentElement.getAttribute('data-theme') || 
               document.body.getAttribute('data-theme') ||
               (document.documentElement.classList.contains('dark') ? 'dark' : 'light') ||
               localStorage.getItem('theme') ||
               (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    function switchContent() {
        const currentTheme = getCurrentTheme();
        const isDark = currentTheme === 'dark';
        const contentArticle = document.querySelector('.content article');

        if (isDark && aiContent) {
            // Show AI content in dark mode
            contentArticle.innerHTML = aiContent;
            console.log('Switched to AI content (dark mode)');
        } else {
            // Show original content in light mode
            contentArticle.innerHTML = originalContent;
            console.log('Switched to original content (light mode)');
        }
    }

    // Listen for theme changes
    colorSchemeToggle.addEventListener('click', function() {
        setTimeout(switchContent, 100); // Small delay to let theme change take effect
    });

    // Listen for theme changes via mutation observer (in case theme is changed programmatically)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && 
                (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class')) {
                switchContent();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme', 'class']
    });

    // Initial content switch based on current theme
    setTimeout(switchContent, 100);

    console.log('Content switcher initialized');
});