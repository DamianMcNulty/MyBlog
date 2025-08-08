
// Content switcher for AI vs Original content based on theme
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    function switchContent() {
        const isDark = body.classList.contains('colorscheme-dark') || 
                      (body.classList.contains('colorscheme-auto') && 
                       window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        // Find all content containers with both AI and original versions
        const contentContainers = document.querySelectorAll('[data-content-type]');
        
        contentContainers.forEach(container => {
            const contentType = container.getAttribute('data-content-type');
            
            if (isDark && contentType === 'original') {
                container.style.display = 'none';
            } else if (isDark && contentType === 'ai') {
                container.style.display = 'block';
            } else if (!isDark && contentType === 'ai') {
                container.style.display = 'none';
            } else if (!isDark && contentType === 'original') {
                container.style.display = 'block';
            }
        });
        
        // Update content labels
        const contentLabels = document.querySelectorAll('.content-mode-label');
        contentLabels.forEach(label => {
            if (isDark) {
                label.textContent = '🤖 AI Generated Content';
                label.style.color = '#42a5f5';
            } else {
                label.textContent = '✏️ Original Content';
                label.style.color = '#28a745';
            }
        });
    }
    
    // Switch content on page load
    switchContent();
    
    // Listen for theme changes
    if (toggle) {
        toggle.addEventListener('click', function() {
            // Wait for theme to change then switch content
            setTimeout(switchContent, 100);
        });
    }
    
    // Listen for system theme changes (for auto mode)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', switchContent);
});
