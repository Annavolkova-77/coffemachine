"use strict"

let balance = document.querySelector(".balance");/* создаем Балансе добавили Балансе и теперь находим элемент Баланс*/

function buyCoffee(name, cost) {/*функция заказ кофе*/
  /*alert(balance.value);/*смотрим, что в Балансе*/
  let afterBuyValue = +balance.value - cost; /*    */
  if ((balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) { /*или нет денег или тект, то Недостаточно осредств и завершить Ретурн*/
    alert("Недостаточно средств!");
    return;
  }
  balance.value = (+balance.value - cost).toFixed(2); /* Присваиваем новое значение Балансе и убираем копейки:.toFixed(2) убираем все после 2 знака после запятой*/
  alert("Ваш " + name + " готовится!");
}



