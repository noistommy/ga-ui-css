const selectBoxes=document.querySelectorAll(".ga-select-box");let targetElement;function toggleSelectBox(e){e.classList.toggle("open"),selectedItem&&(e.querySelector("input").value=selectedItem)}selectBoxes.forEach(t=>{document.addEventListener("click",e=>{t.contains(e.target)?toggleSelectBox(t):t.classList.remove("open")})});