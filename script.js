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
  
  let bill = this; /*текущее значение*/
  let billCost = bill.getAttribute('cost');/*вынимает значение cost из Index */
  
  if (inAtm(bill)) {
   balance.value = +balance.value + +billCost /*купюра пропадает и балансе зачисляется*/
   bill.remove();/*Метод, который УДАЛЯЕТ элемент со страницф!!! (купюра удаляется)*/
  } 
}

function inAtm(bill) {/*находится ли купюра в банкомате*/
  
  let billCoord = bill.getBoundingClientRect();/*находим  коорд купюру*/
  let atm = document.querySelector(".atm");/*нашли АТМ*/
  let atmCoord = atm.getBoundingClientRect();/*находим коорд атм*/
  
  //-------- ищем координаты купюры и атм
  
  let billLeftTopCornerX = billCoord.x;/*левый верхний край купюры*/
  let billLeftTopCornerY = billCoord.y;
  
  let billRightTopCornerX = billCoord.x +  billCoord.width;/*правый верхний край купюры (прибавили ширину)*/
  let billRightTopCornerY = billCoord.y;
  
  
  let atmLeftTopCornerX = atmCoord.x;/*левый верхний край АТМ*/
  let atmLeftTopCornerY = atmCoord.y;
  
  let atmRightTopCornerX = atmCoord.x + atmCoord.width;/*правый верхний край АТМ*/
  let atmRightTopCornerY = atmCoord.y;
  
  let atmLeftBottomCornerX = atmCoord.x;/*левый нижний край АТМ*/
  let atmLeftBottomCornerY = atmCoord.y + atmCoord.height/3;/**/
  
  let atmRightBottomCornerX = atmCoord.x + atmCoord.width;/*правый нижний край АТМ*/
  let atmRightBottomCornerY = atmCoord.y + atmCoord.height/3;
  
  //----Условие: попадает ли купюра в Атм 
  
  if (
      billLeftTopCornerX >= atmLeftTopCornerX /*проверяем, что только левый верхний угол купюры попадает в атм*/
      && billLeftTopCornerY >= atmLeftTopCornerY
      && billRightTopCornerX <= atmRightTopCornerX /*проверяем, что только правый верхний угол купюры попадает в атм*/
      && billRightTopCornerY >= atmRightTopCornerY
      
      && billLeftTopCornerX >= atmLeftBottomCornerX/*сравниваем лев верх край купюры и ниж край атм*/
      && billRightTopCornerY <= atmLeftBottomCornerY
    ){
      return true;
    } else {
      return false;
    }
  
}

//------------------Сдача!--------------

let changeButton = document.querySelector(".change"); /*ищем класс кнопки Сдача*/
changeButton.onclick = takeChange;/*вешаем событие - функцию takeChange*/


function takeChange() { /*функция - забрать сдачу*/
   /*tossCoin("10");/*вызвали функция создания монеток*/
   if (balance.value <= 0 ) { //если нет денег, то не выдаем сдачу, value - значение баланса
   changeButton.onclick = takeChange;/*чтоб НЕ выпадали лишние сдача!!!*/
    return; 
   }
   changeButton.onclick = null; /*чтоб НЕ выпадали лишние сдача!!!*/
   if (balance.value - 10 >= 0) {
     setTimeout (() => { // задержка звука
     tossCoin("10"); //выдать 10
     balance.value -= 10;// вычесть 10 из баланса
     return takeChange();
     }, 300);
   } else if (balance.value - 5 >= 0) {
     setTimeout (() => { // задержка звука
     tossCoin("5");
     balance.value -= 5;
     return takeChange();
     }, 300);
   }else if (balance.value - 2 >= 0) {
     setTimeout (() => { // задержка звука
     tossCoin("2");
     balance.value -= 2;
     return takeChange();
     }, 300);
   }else if (balance.value - 1 >= 0) {
     setTimeout (() => { // задержка звука
     tossCoin("1");
     balance.value -= 1;
     return takeChange();
     }, 300);
   }
}

function tossCoin(cost) { /*функция создания монеток*/
  let changeContainer = document.querySelector(".change-box");/*ищем класс контейнера для сдачи*/
  let changeContainerCoords = changeContainer.getBoundingClientRect()/*координаты бокса для сдачи*/
  
  
  let coinSrc = "";/*путь к картинки нашей монетки*/
  
  switch (cost) {
    case "10":
      coinSrc = "img/10rub.png";/*путь к картинки  монетки 10руб*/
      break;
    case "5":
      coinSrc = "img/5rub.png";
      break;
    case "2":
      coinSrc = "img/2rub.png";
      break;
    case "1":
      coinSrc = "img/1rub.png";
      break;
  }
  
  /*
  //---создание монеток внутки контейнера c помощью innerHTML
  changeContainer.innerHTML += `
    <img src="${coinSrc}" style="height: 50px"> 
  `*/
  
  //---создание монеток внутки контейнера c помощью changeContainer.append(coin)
  
 let coin = document.createElement("img");
 coin.setAttribute("src", coinSrc);
 coin.style.height = "50px";
 coin.style.width = "50px";
 coin.style.cursor = "pointer";
 coin.style.display = "inline-block";/**/
 coin.style.position = "absolute";/**/
 coin.style.userSelect = "none";/*чтоб не выделялись монеты, когда падают*/
  
 changeContainer.append(coin);/*Прикрепить после внутри элемента*/
 /*changeContainer.prepend(coin);/*Прикрепить до внутри элемента
  
  changeContainer.after(coin);/*после контейнера
  changeContainer.before(coin);/*перед контейнера
  
  changeContainer.replace(coin);/*заменяет элементы*/
  
  coin.style.top = Math.round(Math.random() * (changeContainerCoords.height - 53)) + "px";/* рандомная функция  - монетки случайным образом кладутся*/
  coin.style.left = Math.round(Math.random() * (changeContainerCoords.width - 53)) + "px";
  
  coin.onclick = () => coin.remove();/*вешаем событие - монетки пропадают при на их нажатии*/
  
  let coinSound = new Audio("sound/coindrop.mp3");/*звук падающих монет*/
     /*coinSound.src = "sound/coindrop.mp3"*/
     coinSound.play();/*проиграть с помощью метода Плэй*/
    
  
} 
  