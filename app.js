const version = "v1.9"

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

        const historyItem = document.createElement('button');
        historyItem.classList.add('historyItem');
        historyList.appendChild(historyItem);
        historyItem.appendChild(imgHistory);

        // Открываем изображение в новой вкладке
        var newTab = window.open();
        if (newTab) {
          newTab.document.write(`
            <html>
            <head>
              <title>QR Печать — Diman ${version}</title>
              <link rel="shortcut icon" href="img/iconPrint.png">
              <link rel="shortcut icon" href="img/iconPrint.ico" type="image/x-icon">
              <style>
              
                ::selection {
                    background: #a1fb01;
                    color: #fff;
                }
                body {
                  margin: 0;
                  padding: 0;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  background-color: #000000;
                  position: relative;
                  flex-flow: column;
                  gap: 30px;
                }
                img {
                  max-width: 120%;
                  max-height: 120%;
                  border-radius: 20px;
                  z-index: 9999;
                  user-select: none;
                }
                canvas {
                  width: 100%;
                  height: 100%;
                  display: block;
                  position: fixed;
                  background-size: 100%;
                  background-repeat: no-repeat;
                  background: linear-gradient(0deg, #a1fb011f, #00ff951f);
                }
                .closingInSec {
                  position: relative;
                  color: white;
                  width: 30%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border: 7px double;
                  border-radius: 20px;
                  text-align: center;
                  gap: 10px;
                  height: 80px;
                  background: #44444412;
                  z-index: 9;
                  backdrop-filter: blur(4px);
                }
                .closingInSec svg {
                  display: flex;
                  transform: rotate(-90deg);
                }
                .closingInSec p {
                  font-size: 1.2rem;
                  font-family: Roboto;
                  font-weight: 500;
                  color: #fff;
                  margin: 0;
                }
                .closingInSec circle {
                  transition: stroke-dashoffset 0.1s linear, stroke 0.1s linear;
                }
                @media print {
                  body * {
                    display: none !important;
                    width: 100% !important;
                    height: 100% !important;
                    padding: unset !important;
                    margin: unset !important;
                  }
                  img{
                    display: unset !important;
                    max-width: 120% !important;
                    max-height: 120% !important;
                    border-radius: 20px !important;
                    z-index: 9999 !important;
                    width: unset !important;
                    height: unset !important;
                  }
                }
              </style>
            </head>
            <body>
              <div class="closingInSec">
                <p>Страница закроется через <span id="countdown">3.0</span> секунд</p>
                <svg width="30" height="30">
                  <circle cx="15" cy="15" r="12" stroke-linecap="round" stroke="#a1fb01" stroke-width="4" fill="transparent" stroke-dasharray="75.36" stroke-dashoffset="0"></circle>
                </svg>
              </div>
              <canvas id="particle-canvas"></canvas>
              <img src="${dataUrl}">
              <script>
                let countdown = 2.0;
                const span = document.getElementById('countdown');
                const circle = document.querySelector('.closingInSec circle');
                const totalLength = 2 * Math.PI * 12; // 2 * Pi * r
                circle.style.strokeDasharray = totalLength;
            
                const endColor = { r: 161, g: 251, b: 1 };
                const startColor = { r: 88, g: 255, b: 158 };
            
                const interpolateColor = (start, end, factor) => {
                  const result = [start.r + factor * (end.r - start.r), start.g + factor * (end.g - start.g), start.b + factor * (end.b - start.b)];
                  return \`rgb(\${Math.round(result[0])}, \${Math.round(result[1])}, \${Math.round(result[2])})\`;
                };
            
                const interval = setInterval(() => {
                  countdown -= 0.1;
                  if (countdown <= 0) {
                    clearInterval(interval);
                    setTimeout(() => {
                      window.close();
                    }, 200);
                  } else {
                    span.textContent = countdown.toFixed(1);
                    circle.style.strokeDashoffset = totalLength * (1 - countdown / 2);
                    const factor = countdown / 2;
                    const currentColor = interpolateColor(startColor, endColor, factor);
                    circle.style.stroke = currentColor;
                  }
                }, 100);
              </script>
              <script src="print.js"></script>
            </body>
            </html>
            `);
            newTab.document.close();
            newTab.onload = function() {
                newTab.print();
            };
        } else {
            console.error('Не удалось открыть новое окно. Возможно, оно было заблокировано.');
        }
    })
    .catch(function (error) {
        console.error('Произошла ошибка:', error);
    });
  }

// TODO Частицы ✅

function createParticleCanvas(canvasId, sizeRange) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  });

  function random(min, max) {
      return Math.random() * (max - min) + min;
  }

  class Particle {
      constructor(initial = false) {
          this.size = random(sizeRange.min, sizeRange.max);
          this.x = random(0, canvas.width);
          this.y = initial ? random(0, canvas.height) : -this.size;
          this.opacity = random(0.3, 1);
          this.speedY = random(1, 3);
          this.color = '#01c3fc';
          this.colorChange = '#9158ff';
          this.duration = random(4000, 12000);
          this.startTime = Date.now();
      }

      update() {
          const elapsed = Date.now() - this.startTime;
          const progress = Math.min(elapsed / this.duration, 1);
          this.y += this.speedY;
          if (progress >= 1) {
              this.y = canvas.height + this.size; // Удалить частицу
          } else {
              this.color = this.interpolateColor('#01c3fc', '#9158ff', progress);
          }
      }

      draw() {
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.opacity;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
          ctx.globalAlpha = 1;
      }

      interpolateColor(color1, color2, factor) {
          const c1 = this.hexToRgb(color1);
          const c2 = this.hexToRgb(color2);
          const r = Math.round(c1.r + factor * (c2.r - c1.r));
          const g = Math.round(c1.g + factor * (c2.g - c1.g));
          const b = Math.round(c1.b + factor * (c2.b - c1.b));
          return `rgb(${r},${g},${b})`;
      }

      hexToRgb(hex) {
          const bigint = parseInt(hex.slice(1), 16);
          const r = (bigint >> 16) & 255;
          const g = (bigint >> 8) & 255;
          const b = bigint & 255;
          return { r, g, b };
      }
  }

  const particles = [];

  for (let i = 0; i < 100; i++) {
      particles.push(new Particle(true));
  }

  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
          particle.update();
          particle.draw();
          if (particle.y > canvas.height + particle.size) {
              particles.splice(index, 1);
          }
      });
      requestAnimationFrame(animate);
  }

  setInterval(() => {
      particles.push(new Particle());
  }, 100);

  animate();
}

createParticleCanvas('particle-canvas', { min: 2, max: 6 });
createParticleCanvas('particle-canvasDemo', { min: 10, max: 15 });


// TODO Кнопка очистки Input ✅
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

// TODO Кнопка очщения Input от лишних пробелов ✅

const inputUpperResetSpaces = document.querySelector(".inputUpperResetSpaces");

function clearSpaces(){
  const qrInput = document.querySelector(".order__input");
  let inputValue = qrInput.value;
  inputValue = inputValue.replace(/\s+/g, ''); // Удаление всех пробелов
  qrInput.value = inputValue;
  generateCodes()
}

inputUpperResetSpaces.addEventListener("click", ()=>{
  clearSpaces();
});



// * qrHistory
const qrHistory = document.querySelector(".qrHistory")
const changelogHistory = document.querySelector(".changelogHistory")
const historyToggleOpen = document.querySelector(".historyToggleOpen")
const historyToggleClose = document.querySelector(".historyToggleClose")
const changelogToggleOpen = document.querySelector(".changelogToggleOpen")
const changelogToggleClose = document.querySelector(".changelogToggleClose")
const menu = document.querySelector(".menu")
let menuState = false;

function toggleMenu(){
  if(!menuOpen == true){
    menu.style.display = "flex"
  } else{
    menu.style.display = "none"
  }
}

function openQrHistory(){
  qrHistory.style.display = "block"
  toggleMenu()
  setTimeout(()=>{
      qrHistory.style.transform = "translateX(0)"
  },1)
}

function closeQrHistry(){
  qrHistory.style.transform = "translateX(-100%)"
  setTimeout(()=>{
      qrHistory.style.display = "none"
      toggleMenu()
  },300)
}

function openChangeLog(){
  changelogHistory.style.display = "block"
  toggleMenu()
  setTimeout(()=>{
      changelogHistory.style.transform = "translateX(0)"
  },1)
}

function closeChangeLog(){
  changelogHistory.style.transform = "translateX(-100%)"
  setTimeout(()=>{
      changelogHistory.style.display = "none"
      toggleMenu()
  },300)
}

historyToggleOpen.addEventListener("click", ()=>{
  menuOpen = true;
  openQrHistory()
  toggleMenu()
})

historyToggleClose.addEventListener("click",()=>{
  closeQrHistry();
  menuOpen = false;
})

changelogToggleOpen.addEventListener("click",()=>{
  menuOpen = true;
  openChangeLog();
  toggleMenu()
})
changelogToggleClose.addEventListener("click", ()=>{
  closeChangeLog();
  menuOpen = false;
  setTimeout(() => {
    document.querySelectorAll('.changeLogItem').forEach(item => {
      item.classList.remove('open');
    });
  }, 300);
})

document.querySelectorAll('.itemTitle').forEach(item => {
  item.addEventListener('click', function() {
      this.closest('.changeLogItem').classList.toggle('open');
  });
});

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
          <title>QR История — Diman ${version}</title>
          <link rel="shortcut icon" href="img/iconTab.png">
          <link rel="shortcut icon" href="img/iconTab.ico" type="image/x-icon">
          <style>
                  body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #000000;
                  }
                  img {
                    max-width: 120%;
                    max-height: 120%;
                    border-radius: 20px;
                    z-index: 9999;
                  }
                  canvas{
                    width: 100%;
                    height: 100%;
                    display: block;
                    position: fixed;
                    background-size: 100%;
                    background-repeat: no-repeat;
                    background: linear-gradient(0deg, #ff00c51f, #ffa04f1f)
                }
                </style>
              </head>
              <body>
                  <canvas id="particle-canvas"></canvas>
                <img src="${imageSrc}">
                <script src="history.js"></script>
              </body>
              </html>
      `);
      // Закрываем запись в новой странице
      newWindow.document.close();
      newWindow.onload = function() {
          newTab.print();
      };
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
  

  const qrTypeSwitch = document.querySelector('.qrTypeSwitch')
  const coolDownIndicator = document.querySelector('.coolDownIndicator')

  qrTypeSwitch.addEventListener('click', function(){
    const coolDown = 1000;
    this.classList.toggle('qrTypeSwitch__clicked')
    this.setAttribute('disabled', true)
    coolDownIndicator.style.background = "linear-gradient(0deg, #fff, #6c6c6c)"
    coolDownIndicator.style.height = "0"
    coolDownIndicator.style.transition = `${coolDown + "ms"} linear`
    setTimeout(() => {
      this.removeAttribute('disabled', false)
      coolDownIndicator.style.background = "transparent"
      coolDownIndicator.style.height = "100%"
      coolDownIndicator.style.transition = "unset"
    }, coolDown + 200);
  })
  