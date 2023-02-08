const showB = document.querySelector('.show-btn');
let closeB = null

const modal = document.querySelector('.ga-modal-container');
const closeModal = () => {
  modal.classList.remove('open')
}
closeB = document.querySelector('.close');
showB.onclick = () => {
  modal.classList.add('open')
  // closeB = document.querySelector('.close');
  // closeB.addEventListener('click', closeModal)
}
closeB.onclick = () => {
  closeModal()
}


