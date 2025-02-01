const chooseColor = document.getElementById("menuButton");
const showItem = document.querySelector(".select-wrap");
const listItem = document.querySelectorAll(".select-wrap li");

chooseColor.addEventListener("click", function (event) {
  showItem.classList.toggle('hidden');
  const isExpanded = chooseColor.getAttribute('aria-expanded') === 'true';
  chooseColor.setAttribute('aria-expanded', !isExpanded);
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