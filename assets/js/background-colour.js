document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const toggle = document.getElementById('background-colour-toggle');
    const picker = document.getElementById('background-colour-picker');
    const input = document.getElementById('background-colour-input');
    const reset = document.getElementById('background-colour-reset');
    const lightPreview = document.getElementById('background-light-preview');
    const darkPreview = document.getElementById('background-dark-preview');
    const storageKey = 'blog-background-colour';
    const defaults = { source: '#F6F4EF', light: '#F6F4EF', dark: '#202124' };

    if (!toggle || !picker || !input || !reset) return;

    function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    function hexToHsl(hex) {
        const value = hex.replace('#', '');
        const red = parseInt(value.slice(0, 2), 16) / 255;
        const green = parseInt(value.slice(2, 4), 16) / 255;
        const blue = parseInt(value.slice(4, 6), 16) / 255;
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        const lightness = (max + min) / 2;
        let hue = 45;
        let saturation = 0;
        if (max !== min) {
            const delta = max - min;
            saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
            if (max === red) hue = ((green - blue) / delta + (green < blue ? 6 : 0)) * 60;
            else if (max === green) hue = ((blue - red) / delta + 2) * 60;
            else hue = ((red - green) / delta + 4) * 60;
        }
        return { h: hue, s: saturation * 100, l: lightness * 100 };
    }

    function hslToHex(hue, saturation, lightness) {
        const h = ((hue % 360) + 360) % 360 / 360;
        const s = saturation / 100;
        const l = lightness / 100;
        const hueToRgb = function(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        let red = l, green = l, blue = l;
        if (s !== 0) {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            red = hueToRgb(p, q, h + 1 / 3);
            green = hueToRgb(p, q, h);
            blue = hueToRgb(p, q, h - 1 / 3);
        }
        return '#' + [red, green, blue].map(function(value) {
            return Math.round(value * 255).toString(16).padStart(2, '0');
        }).join('').toUpperCase();
    }

    function deriveColours(source) {
        const hsl = hexToHsl(source);
        const hue = hsl.s < 4 ? 45 : hsl.h;
        return {
            source: source,
            light: hslToHex(hue, 18, 96),
            dark: hslToHex(hue + 180, 14, 15)
        };
    }

    function applyColours(colours, persist) {
        root.style.setProperty('--custom-light-background', colours.light);
        root.style.setProperty('--custom-dark-background', colours.dark);
        root.style.setProperty('--custom-background-selection', colours.source);
        input.value = colours.source;
        if (lightPreview) lightPreview.style.backgroundColor = colours.light;
        if (darkPreview) darkPreview.style.backgroundColor = colours.dark;
        if (persist) {
            try { localStorage.setItem(storageKey, JSON.stringify(colours)); } catch (_) {}
        }
    }

    function closePicker() {
        picker.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function() {
        const isOpen = !picker.hidden;
        picker.hidden = isOpen;
        toggle.setAttribute('aria-expanded', String(!isOpen));
        if (isOpen) toggle.focus();
    });

    input.addEventListener('input', function() {
        applyColours(deriveColours(input.value), true);
    });

    reset.addEventListener('click', function() {
        applyColours(defaults, true);
        closePicker();
        toggle.focus();
    });

    document.addEventListener('click', function(event) {
        if (!picker.hidden && !picker.contains(event.target) && event.target !== toggle && !toggle.contains(event.target)) {
            closePicker();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !picker.hidden) {
            closePicker();
            toggle.focus();
        }
    });

    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch (_) {}
    const validSaved = saved && /^#[0-9A-Fa-f]{6}$/.test(saved.source) && /^#[0-9A-Fa-f]{6}$/.test(saved.light) && /^#[0-9A-Fa-f]{6}$/.test(saved.dark);
    applyColours(validSaved ? saved : defaults, false);
});
