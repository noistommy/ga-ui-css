const showB = document.querySelector('.show-btn');
let closeB = null

const modal = document.querySelector('.be-modal-container');
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



