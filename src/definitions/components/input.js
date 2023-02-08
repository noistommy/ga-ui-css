const editInput = document.querySelector('.edit');
const editToggle = document.querySelector('.edit-btn');

editToggle.onclick = () => {
  const hasEdit = editInput.classList.contains('editable')
  if (hasEdit) {
    editToggle.innerHTML = "<i class='fa fa-pen' />"
    editInput.classList.remove('editable')
  } else {
    editToggle.innerHTML = "<i class='fa fa-check' />"
    editInput.classList.add('editable')
    editInput.querySelector('input').focus()
  }
}

const inputEl = editInput.querySelector('input')

inputEl.onkeydown = (e) => {
  console.log(e)
}