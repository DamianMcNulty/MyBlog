// Explicit content version toggle for original and AI-generated posts.
document.addEventListener('DOMContentLoaded', function() {
    const originalContentElement = document.querySelector('[data-content-type="original"]');
    const aiContentElement = document.querySelector('[data-content-type="ai"]');
    const toggleButtons = Array.from(document.querySelectorAll('[data-content-toggle]'));

    if (!originalContentElement || !aiContentElement || toggleButtons.length === 0) {
        return;
    }

    function setContentVersion(version) {
        const showAI = version === 'ai';
        originalContentElement.style.display = showAI ? 'none' : 'block';
        aiContentElement.style.display = showAI ? 'block' : 'none';

        toggleButtons.forEach(function(button) {
            const isActive = button.getAttribute('data-content-toggle') === version;
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            setContentVersion(button.getAttribute('data-content-toggle'));
        });
    });

    // Original content is always the safe, transparent default.
    setContentVersion('original');
});
