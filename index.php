<!doctype html>
<html lang="ru">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title>Кофе-машина</title>
  </head>
  <body>
    <div class="container">
      <div class="row coffee-machine">
        
        <div class="col-6 coffee-list">
          <div class="row flex-column p-3 h-100 justify-content-around"> <!--h - высота 100%-->
            
            <div class="coffee-item col">
              <img src="img/americano.png" alt="">
              <span>Американо - 50 руб.</span>
            </div>
            
            <div class="coffee-item col">
              <img src="img/cappuccino.png" alt="">
              <span>Капучино - 78 руб.</span>
            </div>
            
            <div class="coffee-item col">
              <img src="img/espresso.png" alt="">
              <span>Эспрессо - 21 руб.</span>
            </div>
            
            <div class="coffee-item col">
              <img src="img/latte.jpg" alt="">
              <span>Латтэ - 115 руб.</span>
            </div>
            
          </div>
        </div>
        
        
        <div class="col-6 coffee-oper">
            <div class="row p-3"> <!--p-3 чтоб не прилипал роу-->
              
              <div class="col-6"><!--первая половина правой половины-->
                <div class="display">
                 <p class="display-text">Выберете кофе</p> 
                 <div class="progress"><!--из БС копировали-->
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div> <!--из БС копировали-->
                  </div>
                </div>
                <div class="coffee-cup"> <!--кружка под дисплеем-->
                  <img src="img/americano.png" alt=""><!---->
                </div>
              </div>
              <div class="col-6"> <!--правая сторона правой стороны-->
                
                <div class="input-group mb-3"><!-- Баланс взяли из Bootstrap-->
                  <input type="text" class="form-control" placeholder="Баланс" > <!--взяли из Bootstrap-(часть удалили)->
                  <div class="input-group-append"><!--взяли из Bootstrap-->
                    <span class="input-group-text" id="basic-addon2">&#8381</span><!--взяли из Bootstrap-->
                  </div>
               
                
                <div class = "atm"> <!--ATM-->
                  <img src="img/bill_acc.png" alt=""> 
                </div>
                
                <!--кнопки их Бутстрапа-->
                <button class="btn btn-primary btn-block mt-2">Сдача</button><!---Кнопка Сдача, см. описание в тетеради-->
                
                <!--Кнопка под сдачу-->
                  <div class="change-box"></div> <!--Кнопка под сдачу-->
                
                
                
              </div>
            </div>
        </div>
      </div>
    </div>


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
</html>