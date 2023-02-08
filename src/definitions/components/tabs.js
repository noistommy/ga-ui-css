let tabParent;
let tabs = document.querySelectorAll('.tab-item');
let bTabs = document.querySelectorAll('.browser .tab-menu .tab-item');
const closes = document.querySelectorAll('.btn-close');
const add = document.querySelector('.tab-plus');


tabs.forEach(tab => {
    tab.addEventListener('click', e => selectTab(e));
})

closes.forEach(btn => {
    btn.addEventListener('click', e => removeTab(e));
})

add.addEventListener('click', e => addTab(e))

bTabs[0].classList.add('active');

setWidth();
function selectTab({target}) {
    tabParent = target.parentElement;
    for (let t of tabParent.children) {
        t.classList.remove('active')
    }
    target.classList.add('active')
}

function removeTab(e) {
    const targetEl = e.target.parentElement;
    if (targetEl.classList.contains('active')) {
        const sibling = targetEl.previousSibling;
        sibling.classList.add('active');
    }
    targetEl.remove();
    setWidth();
    e.stopPropagation();
}

function addTab() {
    if(tabs.length >= 15) {
        alert('허용 탭 초과');
        return;
    }
    const newItem = createNewTab();
    const closeBtn = createCloseButton();
    // closeBtn.addEventListener('click', e => removeTab(e));
    // newItem.addEventListener('click', e => selectTab(e));
    newItem.append(closeBtn);
    document.querySelector('.browser .tab-menu').append(newItem);
    setWidth();
}

function createNewTab () {
    const item = document.createElement('div');
    const text = document.createElement('span');
    item.classList.add('tab-item', 'tab');
    text.classList.add('tabText', 'ellipsis');
    text.textContent = 'new item';
    item.append(text);
    item.addEventListener('click', e => selectTab(e));
    return item;
}

function createCloseButton () {
    const item = document.createElement('div');
    const icon = document.createElement('i');
    item.classList.add('btn-close','ga-button','icon','tiny','circle');
    icon.classList.add('fa', 'fa-close');
    item.append(icon);
    item.addEventListener('click', e => removeTab(e));
    return item;
}

function setWidth() {
    tabs = document.querySelectorAll('.browser .tab-menu .tab-item');
    tabs.forEach(tab => {
        tab.style.width = (100 / tabs.length) + '%';
    })
}

// class Browser {
//     constructor(options = {}) {
//
//     }
// }

