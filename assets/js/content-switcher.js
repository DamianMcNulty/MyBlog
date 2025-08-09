
// Content switcher for AI vs Original content based on theme
document.addEventListener('DOMContentLoaded', function() {
    console.log('Content switcher starting...');
    
    // Check if we're on a single post page with AI content
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

    // Store the original content
    const originalContent = originalContentElement.innerHTML;

    function getCurrentTheme() {
        // Check multiple ways the theme might be indicated
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        
        // Check data attributes
        if (htmlElement.getAttribute('data-theme') === 'dark' || 
            bodyElement.getAttribute('data-theme') === 'dark') {
            return 'dark';
        }
        
        // Check CSS classes
        if (htmlElement.classList.contains('dark') || 
            bodyElement.classList.contains('dark')) {
            return 'dark';
        }
        
        // Check localStorage
        const storedTheme = localStorage.getItem('theme') || localStorage.getItem('colorScheme');
        if (storedTheme === 'dark') {
            return 'dark';
        }
        
        // Check computed styles
        const bodyStyle = getComputedStyle(bodyElement);
        const bgColor = bodyStyle.backgroundColor;
        
        // If background is very dark (assuming dark theme)
        if (bgColor && bgColor.startsWith('rgb(')) {
            const rgb = bgColor.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
                const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
                if (brightness < 128) {
                    return 'dark';
                }
            }
        }
        
        // Default to light
        return 'light';
    }

    function switchContent() {
        const currentTheme = getCurrentTheme();
        const isDark = currentTheme === 'dark';
        const contentArticle = document.querySelector('.content article');

        if (!contentArticle) return;

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

    // Monitor for any changes that might indicate theme switching
    const observer = new MutationObserver(function(mutations) {
        let shouldSwitch = false;
        
        mutations.forEach(function(mutation) {
            // Check for attribute changes
            if (mutation.type === 'attributes') {
                const attrName = mutation.attributeName;
                if (attrName === 'data-theme' || attrName === 'class' || attrName === 'style') {
                    shouldSwitch = true;
                }
            }
            
            // Check for added/removed nodes that might be theme-related
            if (mutation.type === 'childList') {
                const addedNodes = Array.from(mutation.addedNodes);
                const removedNodes = Array.from(mutation.removedNodes);
                
                [...addedNodes, ...removedNodes].forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.classList && (
                            node.classList.contains('dark') || 
                            node.classList.contains('light') ||
                            node.getAttribute && node.getAttribute('data-theme')
                        )) {
                            shouldSwitch = true;
                        }
                    }
                });
            }
        });
        
        if (shouldSwitch) {
            setTimeout(switchContent, 50);
        }
    });

    // Observe both html and body for changes
    observer.observe(document.documentElement, {
        attributes: true,
        childList: true,
        subtree: false,
        attributeFilter: ['data-theme', 'class', 'style']
    });

    observer.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: false,
        attributeFilter: ['data-theme', 'class', 'style']
    });

    // Listen for storage changes (in case theme is stored in localStorage)
    window.addEventListener('storage', function(e) {
        if (e.key === 'theme' || e.key === 'colorScheme') {
            setTimeout(switchContent, 50);
        }
    });

    // Listen for clicks anywhere on the page that might trigger theme changes
    document.addEventListener('click', function(e) {
        // Look for any button or element that might be a theme toggle
        const element = e.target;
        if (element.tagName === 'BUTTON' || 
            element.getAttribute('role') === 'button' ||
            element.classList.contains('toggle') ||
            element.textContent.toLowerCase().includes('theme') ||
            element.textContent.toLowerCase().includes('dark') ||
            element.textContent.toLowerCase().includes('light')) {
            setTimeout(switchContent, 100);
        }
    });

    // Initial content switch
    setTimeout(switchContent, 100);

    console.log('Content switcher initialized successfully');
});
