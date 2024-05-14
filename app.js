document.getElementById("qr-text").addEventListener("input", function() {
    generateCodes();
});

document.querySelector(".print__code").addEventListener("click", function() {
    convertToImageAndOpenInNewTab();
});

function generateCodes() {
    var qrText = document.getElementById("qr-text").value;
    var qrCodeDiv = document.getElementById("qr-code");
    qrCodeDiv.innerHTML = "";

    if (qrText.trim() === "") {
        var messageElement = document.createElement("p");
        messageElement.textContent = "Введите текст в поле ввода, чтобы сгенерировать QR-код.";
        qrCodeDiv.appendChild(messageElement);
        return;
    }



    // Создание и добавление h1 "СЦ Воронеж" и span с датой и временем в один div
    var companyInfoDiv = document.createElement("div");
    companyInfoDiv.id = "company-info";
    var companyName = document.createElement("h1");
    companyName.textContent = "СЦ Воронеж";
    var dateTime = document.createElement("span");
    dateTime.id = "datetime";
    dateTime.textContent = getCurrentDateTime();
    companyInfoDiv.appendChild(companyName);
    companyInfoDiv.appendChild(dateTime);
    qrCodeDiv.appendChild(companyInfoDiv);

    // Генерация QR-кода
    var qrCode = document.createElement("img");
    qrCode.src = "https://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(qrText) + "&size=200x200";
    qrCode.alt = "QR Code";
    qrCodeDiv.appendChild(qrCode);

    var qrTextElement = document.createElement("p");
    qrTextElement.textContent = qrText;
    qrCodeDiv.appendChild(qrTextElement);
}

function getCurrentDateTime() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    return (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + year + ' ' +
           (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function convertToImageAndOpenInNewTab() {
    const qrCodeDiv = document.getElementById("qr-code");
    const imageContainer = document.getElementById("image-container");
    const historyList = document.querySelector(".historyList");

    // Удаляем все дочерние элементы из контейнера
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
    }

    // Генерируем изображение и добавляем его в контейнер
    domtoimage.toPng(qrCodeDiv)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            img.classList.add('test-img');
            imageContainer.appendChild(img);

            // Клонируем изображение для истории
            var imgHistory = img.cloneNode();
            imgHistory.classList.remove('test-img');
            imgHistory.classList.add('imgHistory');

            const historyItem = document.createElement('div');
            historyItem.classList.add('historyItem');
            historyList.appendChild(historyItem);
            historyItem.appendChild(imgHistory);

            // Открываем изображение в новой вкладке
            var newTab = window.open();
            if (newTab) {
                newTab.document.write(`
                <html>
                <head>
                  <title>QR Печать — Diman v1.4.1</title>
                  <style>
                    body {
                      margin: 0;
                      padding: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                      background-color: #323232;
                    }
                    img {
                      max-width: 120%;
                      max-height: 120%;
                      border-radius: 20px;
                    }
                  </style>
                  <link rel="shortcut icon" href="/iconPrint.png">
                </head>
                <body>
                  <img src="${dataUrl}">
                </body>
                </html>
                `);
            newTab.document.close();
            } else {
                console.error('Не удалось открыть новое окно. Возможно, оно было заблокировано.');
            }
        })
        .catch(function (error) {
            console.error('Произошла ошибка:', error);
        });
}



// ? Частицы
// Функция создания случайного числа между min && max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// !Создание частиц
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = random(2, 6);
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${random(0, window.innerWidth)}px`;
    particle.style.top = '-10px';
    particle.style.opacity = random(0.3, 1);
    document.getElementById('particle-container').appendChild(particle);

    // Анимация движения и смены цвета
    const animation = particle.animate([
        { top: '-10px', backgroundColor: '#01c3fc' },
        { top: '100vh', backgroundColor: '#9158ff' }
    ], {
        duration: random(4000, 12000),
        easing: 'linear',
        iterations: 1
    });

    // Убирает частицы после анимацмя или когда ушли за экран
    animation.onfinish = () => {
        particle.remove();
    };
    animation.oncancel = () => {
        particle.remove();
    };
}

// Переодичность создания частиц
setInterval(createParticle, 100);

// Убирает частицы за экраном
setInterval(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
            particle.remove();
        }
    });
}, 500);

// Кнопка очистки Input
const clearInputBtn = document.querySelector(".clear__input")
const inputUnderReset = document.querySelector(".inputUnderReset")
function clearInput(){
    const qrInput = document.querySelector(".order__input")
    var qrCodeDiv = document.getElementById("qr-code");
    var messageElement = document.createElement("p");
    qrCodeDiv.innerHTML = '';
    qrInput.value = "";
    messageElement.textContent = "Введите текст в поле ввода, чтобы сгенерировать QR-код.";
    qrCodeDiv.appendChild(messageElement);
}
inputUnderReset.addEventListener("click", ()=>{
    clearInput()
});
clearInputBtn.addEventListener("click", ()=>{
    clearInput()
});


// * qrHistory
const qrHistory = document.querySelector(".qrHistory")
const historyToggleOpen = document.querySelector(".historyToggleOpen")
const historyToggleClose = document.querySelector(".historyToggleClose")

historyToggleOpen.addEventListener("click",()=>{
    qrHistory.style.display = "block"
    historyToggleOpen.style.display = "none"
    setTimeout(()=>{
        qrHistory.style.transform = "translateX(0)"
    },1)
})
historyToggleClose.addEventListener("click",()=>{
    qrHistory.style.transform = "translateX(-100%)"
    setTimeout(()=>{
        qrHistory.style.display = "none"
        historyToggleOpen.style.display = "flex"
    },300)
})

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
document.addEventListener('DOMContentLoaded', function() {
    // Функция для обновления счетчика в div с классом historyCounter
    function updateCounter() {
        var historyList = document.querySelector('.historyList');
        var historyCounter = document.querySelector('.historyCounter');

        // Получаем количество элементов в historyList
        var itemCount = historyList ? historyList.children.length : 0;

        // Если есть хотя бы один элемент, и его значение больше 1, показываем historyCounter
        if (itemCount > 0) {
            historyCounter.style.display = 'flex';
            historyCounter.textContent = itemCount;
        } else {
            historyCounter.style.display = 'none';
        }
    }

    // Вызываем функцию для обновления содержимого при загрузке страницы
    updateCounter();

    // Создаем новый экземпляр MutationObserver
    var observer = new MutationObserver(function(mutationsList) {
        // При каждой мутации вызываем функцию для обновления счетчика
        updateCounter();
    });

    // Наблюдаем за изменениями в списке
    var historyList = document.querySelector('.historyList');
    if (historyList) {
        observer.observe(historyList, { childList: true });
    }

    // Обработчик события для кнопки с классом print__code
    var printCodeButton = document.querySelector('.print__code');
    if (printCodeButton) {
        printCodeButton.addEventListener('click', function() {
            // Вызываем функцию для обновления содержимого при клике на кнопку
            updateCounter();
        });
    }
});
// TODO 
document.addEventListener('DOMContentLoaded', function() {
    // Находим родительский элемент, куда будем добавлять .historyItem
    var historyList = document.querySelector('.historyList');
  
    // Функция для открытия картинки в новой странице
    function openImageInNewPage(imageSrc) {
      // Открываем новую страницу
      var newWindow = window.open();
      // Записываем в новую страницу HTML с картинкой и стилями
      newWindow.document.write(`
        <html>
        <head>
          <title>QR История — Diman v1.4.1</title>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #323232;
            }
            img {
              max-width: 120%;
              max-height: 120%;
              border-radius: 20px;
            }
          </style>
          <link rel="shortcut icon" href="/iconTab.png">
        </head>
        <body>
          <img src="${imageSrc}">
        </body>
        </html>
      `);
      // Закрываем запись в новой странице
      newWindow.document.close();
    }
  
    // Функция-обработчик для открытия картинки по клику на .historyItem
    function openImageHandler(event) {
      var imageSrc = this.querySelector('img').src;
      openImageInNewPage(imageSrc);
    }
  
    // Создаем новый экземпляр MutationObserver
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        // Проверяем, были ли добавлены новые элементы
        if (mutation.addedNodes.length > 0) {
          // Для каждого нового элемента проверяем, является ли он .historyItem
          mutation.addedNodes.forEach(function(node) {
            if (node.classList && node.classList.contains('historyItem')) {
              // Если да, добавляем к нему слушатель событий
              node.addEventListener('click', openImageHandler);
            }
          });
        }
      });
    });
  
    // Начинаем наблюдение за mutations
    observer.observe(historyList, { childList: true });
  });
  
  