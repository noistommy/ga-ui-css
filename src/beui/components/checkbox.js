// const checkbox = document.querySelectorAll('.be-checkbox');

function changChecked(e, t, s=null) {
    let input = e.previousSibling
    input.checked = s ? s : !input.checked;
    t.classList.toggle('checked')
}

function selectRadio(e, elem) {
    const name = e.previousSibling.getAttribute('name');
    const radioList = document.querySelectorAll(`[name="${name}"]`)
    for(let r of radioList) {
        r.checked = false
        r.parentElement.classList.remove('checked')
    }
    changChecked(e, elem)
}

// checkbox.forEach(elem => {
//     if(elem.className.indexOf('radio') > -1) {
//         elem.addEventListener('click', e => {selectRadio(e.target, elem)})
//     } else {
//         elem.addEventListener('click', e => {changChecked(e.target, elem)})
//     }
// })

function useCheckBox(wrapper = document) {
    const cbs = wrapper.querySelectorAll('.be-checkbox');
    cbs.forEach(elem => {
        if (elem.className.indexOf('radio') > -1) {
            elem.addEventListener('click', e => { selectRadio(e.target, elem) })
        } else {
            elem.addEventListener('click', e => { changChecked(e.target, elem) })
        }
    })

}