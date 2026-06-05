// ========================================
// THEME SWITCHER - 5 THEMES + DARK/LIGHT MODE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // THEME SELECTION
    // ========================================
    const themeOptions = document.querySelectorAll('.theme-option');
    const darkLightToggle = document.getElementById('darkLightToggle');
    
    // Load saved theme from localStorage
    function loadSavedTheme() {
        const savedTheme = localStorage.getItem('selectedTheme');
        const savedMode = localStorage.getItem('darkLightMode');
        
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        } else {
            document.body.setAttribute('data-theme', 'gold');
        }
        
        if (savedMode === 'light') {
            document.body.classList.add('light');
            if (darkLightToggle) {
                darkLightToggle.innerHTML = '☀️<span>Dark/Light</span>';
            }
        } else {
            document.body.classList.remove('light');
            if (darkLightToggle) {
                darkLightToggle.innerHTML = '🌙<span>Dark/Light</span>';
            }
        }
    }
    
    // Save theme to localStorage
    function saveTheme(theme) {
        localStorage.setItem('selectedTheme', theme);
    }
    
    // Save mode to localStorage
    function saveMode(mode) {
        localStorage.setItem('darkLightMode', mode);
    }
    
    // Theme selection handler
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            document.body.setAttribute('data-theme', theme);
            saveTheme(theme);
            
            // Close theme menu
            const themeMenu = document.getElementById('themeMenu');
            if (themeMenu) {
                themeMenu.classList.remove('active');
            }
        });
    });
    
    // Dark/Light mode toggle
    if (darkLightToggle) {
        darkLightToggle.addEventListener('click', function() {
            const isLight = document.body.classList.contains('light');
            
            if (isLight) {
                document.body.classList.remove('light');
                saveMode('dark');
                this.innerHTML = '🌙<span>Dark/Light</span>';
            } else {
                document.body.classList.add('light');
                saveMode('light');
                this.innerHTML = '☀️<span>Dark/Light</span>';
            }
        });
    }
    
    // Load saved theme on page load
    loadSavedTheme();
});