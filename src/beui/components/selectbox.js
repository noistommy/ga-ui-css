const selectBoxes = document.querySelectorAll('.be-select-box');
let targetElement;


selectBoxes.forEach(elem => {
    document.addEventListener('click', e => {
        if(elem.contains(e.target)) {
            toggleSelectBox(elem)
        } else {
            elem.classList.remove('open')
        }
    })
})

function toggleSelectBox(elem) {
    elem.classList.toggle('open')
    if(selectedItem) {
        elem.querySelector('input').value = selectedItem
    }
}
