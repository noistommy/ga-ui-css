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
