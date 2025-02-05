

function selectButtons(e, t) {
    const buttonList = t.querySelectorAll('.be-button')
    for(let btn of buttonList) {
        btn.classList.remove('selected')
        if(btn === e) {
            btn.classList.add('selected')
        }
    }
}

function useSelectButton() {
    const buttons = document.querySelectorAll('.be-buttons');

    buttons.forEach(elem => {
        elem.addEventListener('click', e => { selectButtons(e.target, elem) })
    })
}