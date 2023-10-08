let list;
const items = document.querySelectorAll('.ga-list > .item');
let selectedItem;

items.forEach(item => {
    item.addEventListener('click', (e) => selectItem(e));
    if (item.getAttribute('draggable')) {
        item.addEventListener('mousedown', (e) => { onMouseDown(e) })
    }
    
})

function selectItem({currentTarget, clientX, clientY}) {
    list = currentTarget.parentNode;
    // console.log(document.elementFromPoint(clientX, clientY))
    for (let i of list.children) {
        i.classList.remove('selected')
    }
    currentTarget.classList.add('selected')
    selectedItem = currentTarget.textContent;
}

// const activeItem = document.querySelector('.item');

// item.addEventListener('mousedown', (e) => { onMouseDown(e) })

function onMouseDown({currentTarget}) {
    // console.log(currentTarget)
    currentTarget.classList.add('draggable-item-active')
    currentTarget.addEventListener('drag', (e) => { onDrag(e) })
    currentTarget.addEventListener('dragend', (e) => { onDragEnd(e) })
}

function onDrag({currentTarget, clientX, clientY}) {
    list = currentTarget.parentNode;
    let swapItem = document.elementFromPoint(clientX, clientY) === null ? currentTarget : document.elementFromPoint(clientX, clientY)

    if(list === swapItem.parentNode) {
        swapItem = swapItem !== currentTarget.nextSibling ? swapItem : swapItem.nextSibling
        list.insertBefore(currentTarget, swapItem)
    }

}

function onDragEnd({currentTarget}) {
    // console.log(currentTarget)
    currentTarget.classList.remove('draggable-item-active')
}
