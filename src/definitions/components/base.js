const modeMatch = window.matchMedia('(prefers-color-scheme: dark)')

if (modeMatch.matches) {
    document.documentElement.classList.add('dark-mode')
} else {
    document.documentElement.classList.add('light-mode')
}
