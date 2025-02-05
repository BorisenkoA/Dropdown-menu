const chooseColor = document.getElementById("menuButton");
const showItem = document.querySelector(".select-wrap");

const data = [
  "Red",
  "Green",
  "Yellow",
  "Blue",
  "Purple",
  "Orange",
  "Black",
  "White",
  "Pink",
  "Lightblue",
  "Rosegold",
];

chooseColor.addEventListener("click", function (event) {
  showItem.classList.toggle("hidden");
  const isExpanded = chooseColor.getAttribute("aria-expanded") === "true";
  chooseColor.setAttribute("aria-expanded", !isExpanded);
  event.stopPropagation();
});

data.forEach((item) => {
  // Ми пробігаємось по масиву зі значеннями, які будуть формувати наш список елементів випадного меню.
  const liElements = document.createElement("li"); // Динамічно створюємо елементи 'li' і присвоюємо їх у змінну для подальших дій.
  liElements.classList.add("select-wrap-item"); // Динамічно додаємо кожному 'li' клас select-wrap-item.
  liElements.textContent = item; // І присвоєюмо контент згідно індексу - li[0] - "Red", li[1] - "Green" і так далі.

  liElements.setAttribute("role", "menuitem"); // Динамічно додаємо нашим 'li' ARIA атрибут role="menuitem".
  liElements.setAttribute("tabindex", "0"); // Динамічно додаємо нашим 'li' ARIA атрибут tabindex="0".

  showItem.appendChild(liElements); // Додаємо нові 'li' до обгортки із класом 'select-wrap', яка присвоєний змінній showItem.

  liElements.addEventListener("click", function () {
    // Вішаємо функцію обробник подій на наші 'li'.
    showItem.classList.add("hidden"); // При кліку на будь яку 'li' список має закритись.
    chooseColor.textContent = liElements.textContent; // І текст кнопки, яка відкриває меню має змінитись на текст обраної 'li'.
    chooseColor.focus(); // Після завершення події кнопка, яка відкриває меню залишається у фокусі.
  });
});

//listItem.forEach((item) => {
//  item.addEventListener("click", function () {
//    showItem.classList.add("hidden");
//    chooseColor.textContent = this.textContent;
//  });
//});

document.addEventListener("click", function () {
  showItem.classList.add("hidden");
  chooseColor.focus(); // Після завершення події кнопка, яка відкриває меню залишається у фокусі.
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !showItem.classList.contains("hidden")) {
    showItem.classList.add("hidden");
    chooseColor.focus(); // Після завершення події кнопка, яка відкриває меню залишається у фокусі.
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !showItem.classList.contains("hidden")) {
    event.stopPropagation();

    const activeElement = document.activeElement;

    if (activeElement && activeElement.classList.contains("select-wrap-item")) {
      showItem.classList.add("hidden");
      chooseColor.textContent = activeElement.textContent;
    }
  }
});

let index = -1; // Змінна тримає поточну позицію обраного елемента у списку. Спочатку значення -1, це означає відсутність обраного елемента.

document.addEventListener("keydown", function (event) {
  const listItem = document.querySelectorAll(".select-wrap-item");

  const menuIsVisible = !showItem.classList.contains("hidden"); // Перевірка, чи меню активне: якщо воно не містить класу "hidden", значить, випадаюче меню відкрите.

  if (menuIsVisible) {
    if (event.key === "ArrowDown") {
      if (index < listItem.length - 1) {
        // Перевірка, чи index менший за максимальний індекс елементів списку (listItem.length - 1). Якщо так, збільшуємо index на 1. Початковий стан, index = -1. Це значення менше за listItem.length - 1 (чим являється в нашому випадку 4 - 1 = 3). Тобто ми виконуємо умову, збільшуємо index++ (index = index + 1). Таким чином з початкового стану при index = -1 ми потрапляємо до 1 пункту списку. Тепер index = 0. І так далі...
        index++;
        const prevIndex = index - 1; // Зберігаємо попередній індекс, щоб зняти виділення з попереднього елемента. Нам потрібно зберігати це значення, щоб потім можна було видалити виділення з попереднього елементу при переході. Тобто грубо кажучи, цей пункт починає працювати при переході з 1 на 2 елемент.
        listItem[index].classList.add("selected"); // Новому вибраному елементу додається клас "selected", що відповідає за виділення. На першому елементі listItem[0] і ми додаємо йому клас "selected" з відповідним виділенням кольором.
        if (prevIndex >= 0) {
          // Якщо попередній індекс prevIndex >= 0, то з попереднього елемента знімається клас "selected". Знову, цей пункт починає працювати при переході з 1 на 2 елемент.
          listItem[prevIndex].classList.remove("selected");
        }
        console.log("Down is pressed");
      }
    } else if (event.key === "ArrowUp") {
      if (index > 0) {
        // Перевіряємо, чи index більше за 0. Якщо так, зменшуємо index на 1. Припустимо, ми переходимо з 4 елементу на 3. Маємо index = 3, що більше за 0. Умова виконується.
        index--; // Зменшуємо індекс на 1 (index = index - 1).
        const prevIndex = index + 1; // Зберігаємо індекс попереднього елемента. Тобто це грубо кажучи індекс того елемента, з якого ми переходимо (4-го).
        listItem[index].classList.add("selected"); // Новому вибраному елементу додаємо клас "selected". 3-й елемент отримає клас, який в стилях визначений відповідним кольором, щоб користувач бачив зміну елементу.
        listItem[prevIndex].classList.remove("selected"); // З попереднього елемента знімаємо клас "selected". В даному випадку ми видаляємо виділення з 4-го елементу.
      }
      console.log("Up is pressed");
    } else if (event.key === "Enter" && index >= 0) {
      event.preventDefault();
      // Якщо натиснуто клавішу Enter або Tab (за умови, що index >= 0), виконується вибір поточного елемента. Наприклад, якщо у нас обраний 3 елемент, його індекс = 2. Це >= 0. Тобто умова справедлива, код в дужках виконується.
      console.log("Enter is pressed");
      chooseColor.textContent = listItem[index].textContent; // Копіюємо текст обраного елемента у змінну chooseColor.textContent. Грубо кажучи ми обираємо елемент і наступним кроком ховаємо випадаюче меню.
      showItem.classList.add("hidden"); // Ховаємо випадаюче меню шляхом додавання класу "hidden".
      chooseColor.focus();
    }
  }
});

const maxListItemShow = 10; // Кількість елементів списку, яку ми хочемо бачити у видимій зоні випадаючого вікна.
const listItemHeight = 50; // Висота одного елемента списку (взята із файлу зі стилями).

showItem.style.maxHeight = `${maxListItemShow * listItemHeight}px`; // Динамічно вказуємо максимальну висоту випадного меню, яке складається із 10 пунктів.
showItem.style.overflowY = "auto"; // Вказуємо вертикальний скрол автоматичним. Без цього у всіх елементи, що будуть додані після 10 будуть відсутні стилі (рамки) і не буде скролу. Але функціонал буде виконуватись (елемент буде обиратись і закривати меню.)
