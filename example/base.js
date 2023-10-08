// const modeMatch = window.matchMedia('(prefers-color-scheme: dark)')

// if (modeMatch.matches) {
//     document.documentElement.classList.add('dark-mode')
// } else {
//     document.documentElement.classList.add('light-mode')
// }
// let currentMode = ''
const sideMenu = document.querySelector('.side-menu');
const toggleBtn = document.querySelector('.toggle-mode');
const showMenu = document.querySelector('.show-menu');
function toggleMode()  {
    if (document.documentElement.classList.contains('light-mode')) {
        document.documentElement.classList.remove('light-mode')
        document.documentElement.classList.add('dark-mode') 
        toggleBtn.innerHTML = '<i class="fa fa-sun"></i>'
    } else if (document.documentElement.classList.contains('dark-mode')) {
        document.documentElement.classList.remove('dark-mode')
        document.documentElement.classList.add('light-mode')
        toggleBtn.innerHTML = '<i class="fa fa-moon"></i>'
    } else {
        document.documentElement.classList.add('light-mode')
        toggleBtn.innerHTML = '<i class="fa fa-moon"></i>'
    }
}
function toggleMenu() {
    const sideMenu = document.querySelector('.side-menu')
    let stateMenu = sideMenu.classList.contains('open')
    if (stateMenu) {
        sideMenu.classList.remove('open')
    } else {
        sideMenu.classList.add('open')
    }
}
toggleMode()

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => toggleMode())
}
if(showMenu) {
    showMenu.addEventListener('click', () => {
        sideMenu.classList.add('open')
    })
    
    sideMenu.addEventListener('click', () => {
        sideMenu.classList.remove('open')
    })    
}

