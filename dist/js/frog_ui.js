

function selectButtons(e, t) {
    const buttonList = t.querySelectorAll('.ga-button')
    for(let btn of buttonList) {
        btn.classList.remove('selected')
        if(btn === e) {
            btn.classList.add('selected')
        }
    }
}

function useSelectButton() {
    const buttons = document.querySelectorAll('.ga-buttons');

    buttons.forEach(elem => {
        elem.addEventListener('click', e => { selectButtons(e.target, elem) })
    })
}
const lastDayList = [31,28,31,30,31,30,31,31,30,31,30,31];
const days = ['일', '월', '화', '수', '목', '금', '토']
const calendar = document.querySelector('.ga-calendar');
const wrapper = document.querySelector('.cell-wrapper');

const getDate = () => {
    const y = new Date().getFullYear();
    const m = new Date().getMonth() + 1;
    const d = new Date().getDate();
    return { dy: y, dm: m, dd: d }
}

const {dy, dm, dd} = getDate();
const getStartDay = (year, month) => {
    let startIndex = 0;

    let basicDay = 365 * (year - 1); // 현재 월 기준 전년까지 기본 일 수
    // 윤년 계산
    let leafDay = Math.floor((year-1)/4) -  Math.floor((year-1)/100) +  Math.floor((year-1)/400);
    // 현재 해 오늘까지의 일 수
    let currentYearDay = 1;

    if(month > 1 && year%4 === 0 && (year%100 !== 0 || year%400 === 0)) {
        lastDayList[1] = 29;
    } else {
        lastDayList[1] = 28;
    }

    for(let i=0;i<(month - 1); i++) {
        currentYearDay += lastDayList[i];
    }
    startIndex = (basicDay + leafDay + currentYearDay)%7;
    return startIndex;
};

function setCalendar (year = dy, month = dm, date = dd) {
    if (!wrapper) return;
    // if (month != dm) date = 1;
    let startDay = getStartDay(year, month);

    let dayList = [];

    let currLast = lastDayList[month-1];
    let prevLast = (month === 1) ? 31 : lastDayList[month - 2];

    let currDay = 1;
    let nextDay = 1;

    for(let i=0;i<6; i++) {
        for(let j=0; j<7; j++) {
            const cell = document.createElement('span')
            cell.style['--x'] = j;
            cell.style['--y'] = i;
            cell.setAttribute('style', `--x:${j};--y: ${i}` )
            cell.classList.add('cell')
            if(i===0 && j < startDay) {
                cell.classList.add('disabled')
                cell.dataset.name = prevLast + (j - startDay) + 1
            } else if(currDay <= currLast) {
                if( j === 0) {
                    cell.classList.add('sun')
                }
                if( j === 6) {
                    cell.classList.add('sat')
                }
                if( currDay === date) {
                    cell.classList.add('today')
                }
                cell.dataset.name = currDay;
                currDay++
            } else {
                cell.classList.add('disabled')
                cell.dataset.name = nextDay
                nextDay++
            }
            dayList.push(cell)
            wrapper.append(cell)
        }
    }
    if(nextDay > 7) {
        dayList = dayList.slice(0,-7)
    }

    calendar.querySelector('span.year').innerHTML = year+'년';
    calendar.querySelector('span.month').innerHTML = month+'월';

    return dayList;
}


// setCalendar();


//
// document.getElementById('calDate').addEventListener('click', () => {
//     const result = setCalendar(2022, 11);
//     console.log(result);
// })
// const checkbox = document.querySelectorAll('.ga-checkbox');

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
    const cbs = wrapper.querySelectorAll('.ga-checkbox');
    cbs.forEach(elem => {
        if (elem.className.indexOf('radio') > -1) {
            elem.addEventListener('click', e => { selectRadio(e.target, elem) })
        } else {
            elem.addEventListener('click', e => { changChecked(e.target, elem) })
        }
    })

}

function useEditInput () {
  const editInput = document.querySelector('.edit');
  const editToggle = document.querySelector('.edit-btn');
  const inputEl = editInput.querySelector('input')
  const result = {
    get useValue() {
      return this._txt || '';
    },
    set useValue(value) {
      this._txt = value
    }
  }

  editToggle.onclick = () => {
    const hasEdit = editInput.classList.contains('editable')
    if (hasEdit) {
      result.useValue = inputEl.value;
      editToggle.innerHTML = "<i class='fa fa-pen' />"
      editInput.classList.remove('editable')
    } else {
      editToggle.innerHTML = "<i class='fa fa-check' />"
      editInput.classList.add('editable')
      editInput.querySelector('input').focus()
      editInput.querySelector('input').select()
    }
  }
}
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

const showB = document.querySelector('.show-btn');
let closeB = null

const modal = document.querySelector('.ga-modal-container');
const closeModal = () => {
  modal.classList.remove('open')
}
closeB = document.querySelector('.close');
if(modal) {
  showB.onclick = () => {
    modal.classList.add('open')
    // closeB = document.querySelector('.close');
    // closeB.addEventListener('click', closeModal)
  }
  closeB.onclick = () => {
    closeModal()
  }
}




const panel = document.querySelector('.ga-panel.collapse');

const content = document.querySelector('.content-wrapper')

if(panel) {
    const toggle = panel.querySelector('.panel-toggle-btn');
    toggle.addEventListener('click', e => {
        const isOpen = panel.classList.contains('open');
        if (isOpen) {
            panel.classList.remove('open')
        } else {
            panel.classList.add('open')
        }
    })
}

const selectBoxes = document.querySelectorAll('.ga-select-box');
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

if(add) {
    add.addEventListener('click', e => addTab(e))
}

if(bTabs.length > 0) {
    bTabs[0].classList.add('active');
}


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


const openBtn = document.querySelector('.open-btn');
const clearBtn = document.querySelector('.clear-btn');
const statusIcon = {
  success: 'circle-check',
  info: 'circle-info',
  danger: 'circle-exclamation',
  attention: 'triangle-exclamation',
  importance: 'star'

}

function toastBoard () {
  let container = null
  let toasts = []
  let toastId = 0
  const addToast = (type, message, options) => {
    container = getContainer()
    const toast = createToast(type, message, options)
    const close = setCloseButton()
    let intervalId = null
    if (options.closeButton) {
      toast.appendChild(close)
    }
    console.log(toastId)
    container.classList.add(options.containerClass)
    // toast.classList.add(`ga-${type}`)
    const hideToast = () => {
      toastId--
      toast.classList.remove('fade')
      toast.addEventListener('transitionend', () => {
        console.log('interval:', intervalId)
        removeToast()
        clearTimeout(intervalId)
      })
    }
    container.appendChild(toast)
    toast.classList.add('fade')
    intervalId = setTimeout(hideToast, 5000)
    toasts.push(toast)
    toastId++

    if (options.closeButton) {
      close.onclick = (e) => {
        e.stopPropagation()
        hideToast()
      }
    }
    if (options.clickToClose) {
      toast.onclick = () => {
        hideToast()
      }
    }

    const removeToast = () => {
      toast.remove()
      if(!toastId) {
        container.remove()
      }
    }
  }
  const getContainer = () => {
    let container = null
    const container_class = 'toast_board'
    toastId = toastId < 0 ? 0 : toastId
    if(toastId) {
      container = document.querySelector(`.${container_class}`)
    } else {
      container = createContainer()
      document.body.appendChild(container)
    }
    return container
  }
  const createContainer = () => {
    const container_class = 'toast_board'
    const containerEl = document.createElement('div')
    containerEl.classList.add(container_class)
    return containerEl
  }
  const createToast = (type, msg, opt) => {
    const toastEl = document.createElement('div')
    const contentsEl = document.createElement('div')
    contentsEl.classList.add('toast-contents')
    contentsEl.innerHTML = `[<span class="bolder">toast_${toastId}</span>]${msg}`
    let iconEl = document.createElement('div')
    toastEl.classList.add('toast')
    if(opt.theme === 'light') {
      toastEl.classList.add(`ga-${type}-light`)
    } else if(opt.theme === 'icon') {
      iconEl.classList.add(`ga-${type}-text`)
    } else if(opt.theme === 'icon-bg') {
      iconEl.classList.add(`ga-${type}`)
    } else if(opt.theme === 'line') {
      toastEl.classList.add(`line-left`)
      contentsEl.classList.add(`ga-${type}-border`)
      opt.toastIcon = false
    } else {
      toastEl.classList.add(`ga-${type}`)
    }
    if (opt.toastIcon) {
      iconEl.classList.add('toast-close')
      iconEl.innerHTML = `<i class="fa fa-${statusIcon[type] || 'hexagon-exclamation'}" />`
      toastEl.appendChild(iconEl)
    }
    if (opt.round) {
      toastEl.classList.add('round')
    }

    toastEl.appendChild(contentsEl)

    return toastEl
  }
  const setCloseButton = () => {
    const closeEl = document.createElement('div')
    closeEl.classList.add('toast-close')
    closeEl.innerHTML = `<i class="fa fa-xmark" />`
    return closeEl
  }
  const clearContainer = () => {
    const toasts = container.querySelectorAll('.toast')
    for ( let i = toasts.length - 1; i >= 0;i-- ) {
      clearToast(toasts[i])
    }
  }
  const clearToast = (toastEl) => {
    toastEl.remove()
    if(container.querySelectorAll('.toast').length === 0) {
      container.remove()
      toastId = 0
    }
  }

  return { addToast, clearContainer }
}

const tBoard = toastBoard()

openBtn.addEventListener('click', (e) => {
  // if(e.target.nodeName !== 'BUTTON') return
  const type = e.target.textContent
  tBoard.addToast(type, 'This is Toast Testing.', {
    containerClass: 'top-right',
    toastIcon: true,
    closeButton: true,
    clickToClose: true,
    theme: 'icon-bg',
    round: true
  })
  // setInterval( () => {
  //   tBoard.addToast(type, 'This is Toast Testing.', {
  //     containerClass: 'top-right',
  //     toastIcon: true,
  //     closeButton: true,
  //     clickToClose: false,
  //     theme: 'light'
  //   })
  // }, 2000)
});

clearBtn.addEventListener('click', tBoard.clearContainer)

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

