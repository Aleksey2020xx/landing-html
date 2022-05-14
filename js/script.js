$(document).ready(function(){
    $('.slider').slick({
        dots: true,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
    });



});

const cards = document.querySelectorAll('.benefits__cart');
for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('mousemove', startRotate);
    card.addEventListener('mouseout', stopRotate);
};
function startRotate(event) {
    const cardItem = this.querySelector('.card__body');
    const halfHeight = cardItem.offsetHeight / 2;

    cardItem.style.transform = 'rotateX(' + - (event.offsetY - halfHeight) / 3.5 + 'deg) rotatey(' + (event.offsetX - halfHeight) / 3.5 +'deg)';
};
function stopRotate(event) {
    const cardItem = this.querySelector('.card__body');
    const halfHeight = cardItem.offsetHeight / 2;

    cardItem.style.transform = 'rotateX(0)';
}


const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href')
        document.querySelector('' + blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

const btnToTop = document.querySelector('.btnToTop');
window.onscroll = () =>  {
    if (window.scrollY > 400) {
        btnToTop.classList.remove('btnToTop_show');
    } else {
        btnToTop.classList.add('btnToTop_show');
    }
}


document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {

        e.preventDefault();

        let error = formValidate(form);
        
        let formData = new FormData(form);

        if (error === 0) {
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
            } else {
                alert('Ошибка');
            }
        } else {
            alert ('Заполните обязательные поля!');
        }
    }

        function formValidate(form) {
            let error = 0;
            let formReq = document.querySelectorAll('._req');

            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);

                if(input.classList.contains('._email')) {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    } 
                    
                } else if(input.classList.contains('._tel')) {
                    if (phoneTest(input)){
                        formAddError(input);
                        error++;
                    }
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
        }


        function formAddError(input) {
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
        } 
        function formRemoveError(input) {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        } 
        function emailTest(input ){
            return /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/.test(input.value);
        }
        function phoneTest(input ){
            return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
        }
    
});

$('.burger__btn').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('burger__btn-active');
    $('.burger__menu').toggleClass('burger__menu-active');
})



var lastResFind=""; // последний удачный результат
var copy_page=""; // копия страницы в ихсодном виде
function TrimStr(s) {
     s = s.replace( /^\s+/g, '');
  return s.replace( /\s+$/g, '');
}
function FindOnPage(inputId) {//ищет текст на странице, в параметр передается ID поля для ввода
  var obj = window.document.getElementById(inputId);
  var textToFind;
  
  if (obj) {
    textToFind = TrimStr(obj.value);//обрезаем пробелы
  } else {
    alert("Введенная фраза не найдена");
    return;
  }
  if (textToFind == "") {
    alert("Вы ничего не ввели");
    return;
  }
   
  if(document.body.innerHTML.indexOf(textToFind)=="-1")
  alert("Ничего не найдено, проверьте правильность ввода!");
   
  if(copy_page.length>0)
        document.body.innerHTML=copy_page;
  else copy_page=document.body.innerHTML;
 
   
  document.body.innerHTML = document.body.innerHTML.replace(eval("/name="+lastResFind+"/gi")," ");//стираем предыдущие якори для скрола
  document.body.innerHTML = document.body.innerHTML.replace(eval("/"+textToFind+"/gi"),"<a name="+textToFind+" style='border-bottom: 1px solid #fff'>"+textToFind+"</a>"); //Заменяем найденный текст ссылками с якорем;
  lastResFind=textToFind; // сохраняем фразу для поиска, чтобы в дальнейшем по ней стереть все ссылки
  window.location = '#'+textToFind;//перемещаем скрол к последнему найденному совпадению
 } 