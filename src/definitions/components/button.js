const buttons = document.querySelectorAll('.ga-buttons');

buttons.forEach(elem => {
    elem.addEventListener('click', e => {selectButtons(e.target, elem)})
})

function selectButtons(e, t) {
    const buttonList = t.querySelectorAll('.ga-button')
    for(let btn of buttonList) {
        btn.classList.remove('selected')
        if(btn === e) {
            btn.classList.add('selected')
        }
    }
}