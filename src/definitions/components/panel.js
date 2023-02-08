const panel = document.querySelector('.ga-panel.collapse');
const toggle = panel.querySelector('.panel-toggle-btn');
const content = document.querySelector('.content-wrapper')

toggle.addEventListener('click', e => {
    const isOpen = panel.classList.contains('open');
    if (isOpen) {
        panel.classList.remove('open')
    } else {
        panel.classList.add('open')
    }
})