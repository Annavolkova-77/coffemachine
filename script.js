"use strict"

let balance = document.querySelector(".balance");/* создаем Балансе добавили Балансе и теперь находим элемент Баланс*/
let displayText = document.querySelector(".display-text");
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");

let coffeeStatus = "waiting"; //"cooking", "ready"


coffeeCup.onclick = takeCoffee; // второй вариант повесить событие: забрать кружку кликом


function buyCoffee(name, cost,  elem) {/*функция заказ кофе*/
  /*alert(balance.value);/*смотрим, что в Балансе*/ /*добавили elem*/
  
  if (coffeeStatus != "waiting") {/*если что то уже готовится (не находится в состоянии ожидания, то ничего не делай.*/
    return;
  }
  let afterBuyValue = +balance.value - cost; /*    */
  if ((balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) { /*или нет денег или тект, то Недостаточно средств и завершить Ретурн*/
    balance.style.border = "2px solid red" ; /*обратились к  balance к css свойству style и изменили его на красную рамочку, когда недостаточно средств*/
    balance.style.backgroundColor = "pink";/*свойство розовый фон у balance поменяли*/
    changeDisplayText("Недостаточно средств");
    return;
  }
  balance.style.border = "none" ; /*если достточно средств, то нет рамки*/
  balance.style.backgroundColor = "white";/*если досточно средств, то вернули белый фон*/
    
  balance.value = (+balance.value - cost).toFixed(2); /* Присваиваем новое значение balance и убираем копейки:.toFixed(2) убираем все после 2 знака после запятой*/
  cookCoffee(name, elem);/*вызвали функцию вместо allert("Ваш " + name + " готовится!");*/
  
  //alert("Ваш " + name + " готовится!");
}

function cookCoffee(name, elem) { /*добавили функцию готовки и вывод в консоль текущего значение*/
  /*console.log(elem); /*Американо, 78, this*/
  
  coffeeStatus = "cooking";  /*кофе готовится*/
  changeDisplayText("Ваш " + name + " готовится");/*Ваш кофе готовится*/
  
  
  let  cupImg = elem.querySelector("img"); /*ставим переменную, которая ищет картинку*/
  let cupSrc = cupImg.getAttribute("src");/*объявляем переменную, записываем значение атрибута src*/
  coffeeCup.setAttribute("src", cupSrc);/*примениим  setAttribute, который меняет атрибут src на cupSrc*/
  /*console.log(cupImg); /*показывает в консоли картинку готовящейся кружки*/
  coffeeCup.style.opacity = "0%";/*невидимая кружка вначале*/
  coffeeCup.classList.remove("d-none");/*убрать класс*/
  
  /*coffeeCup.classList.remove("d-none") // убрать класс
  coffeeCup.classList.add("") // добавить класс
  coffeeCup.classList.toggle("") // вкл/выкл класс
  coffeeCup.classList.contains("") // содержит ли класс*/
  
  
  let readyPercent = 0;/*начальное значение 0, далее на сколько % приготовилось*/
  let cookingInterval = setInterval(function() { /*используем функцию setInterval*/
    readyPercent++
    progressBar.style.width = readyPercent + "%"; /*заполняется прогрессбар*/
    coffeeCup.style.opacity = readyPercent + "%"; /*кружка постепенно становится видимой*/
    if (readyPercent == 100) {
      coffeeStatus = "ready";
      changeDisplayText("Ваш " + name + " готов !");/*Ваш кофе готов*/
      coffeeCup.style.cursor = "pointer"; /*появляется рука, когда приготовится кофе*/
      clearInterval(cookingInterval);/*чтоб полоска не шла дальше (заканчивается */
    }
  }, 100);
}

function takeCoffee() { /*забрать кофе*/
  if (coffeeStatus != "ready") { /*если не готов, то ничего не делать, т.е return*/
    return;
  }
  coffeeStatus = "waiting";/*в ожидание следующего заказа*/
  coffeeCup.classList.add("d-none"); /*скрыть */
  coffeeCup.style.cursor = "auto";/**/
  progressBar.style.width = "0%"; /*прогресс бар в ноль*/
  changeDisplayText("Выберите кофе");/*когда кофе забрали, высвечивается Выберите кофе*/
  
  
}


function changeDisplayText(text) {
  //displayText.innerText = "<span>"+text+"</span>";
  displayText.innerHTML = "<span>"+text+"</span>";
}

//--------------------------Drag'n'Drop--------------------------//


let bills = document.querySelectorAll(".wallet img");/*выбираем все картинки из класса wallet  и с img*/

for(let i = 0; i < bills.length; i++) { /*перебираем массив из картинок*/
  bills[i].onmousedown = takeMoney; /*вешаем функцию takeMoney, когда мышь нажата*/
}

function takeMoney(event) {
  
  event.preventDefault();/*отключает функции стандартные, которые встроены в браузер, купюра тащится без призраков*/
  
  let bill = this;/*возвращает элемент, на которое сработало событие*/
  let billCost = bill.getAttribute('cost');/*вынимает значение cost из Index */
  console.log(billCost);
  
  
  bill.style.position = "absolute"/*чтобы можно таскать купюры*/
  bill.style.transform = "rotate(90deg)";/*чтобы поворачивать купюры*/
  
  // координаты купюр

  let billCoords = bill.getBoundingClientRect();
  let billWidth = billCoords.width/*переменная - ширина купюры*/
  let billHeight = billCoords.height/*переменная - ширина купюры*/
  
  
  bill.style.top = event.clientY - billWidth/2 + "px";/*купюры по центру Курсора*/
  bill.style.left = event.clientX - billHeight/2+ "px";/*купюры по центру Курсора*/
  
  window.onmousemove = (event) => { /*отслеживаем положение курсора, */
  bill.style.top = event.clientY - billWidth/2 + "px";/*купюры тащатся за курсором*/
  bill.style.left = event.clientX - billHeight/2+ "px";/*купюры тащатся за курсором*/
  
    /*console.log(event.clientX, event.clientY)*/
  };
  
  bill.onmouseup = dropMoney;
  
    /*console.log(event);
  console.log(event.clientX, event.clientY);/*выводит координаты купюры в зависимости от того, где нажимаем на купюру*/

}

function dropMoney()/*отжатие мыши*/{
  window.onmousemove = null; /*купюра не двигается за курсором, когда отжимаем кнопку мыши*/
  
}






