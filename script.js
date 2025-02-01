const chooseColor = document.querySelector(".choose-color");
const showItem = document.querySelector(".select-wrap");
const listItem = document.querySelectorAll(".select-wrap li");

chooseColor.addEventListener("click", function (event) {
  showItem.classList.toggle('hidden');
  event.stopPropagation();
});

listItem.forEach((item) => {
  item.addEventListener('click', function() {
    showItem.classList.add('hidden');
    chooseColor.textContent = this.textContent;
  })
});

document.addEventListener('click', function() {
  showItem.classList.add('hidden');
})