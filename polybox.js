document.getElementById('qrPoly-text').addEventListener('submit', function(e) {
    e.preventDefault();
}, false);

let summonedAttention = false;

const inputRadioDirection = document.querySelectorAll('input[name="direction"]')

inputRadioDirection.forEach(radioButton => {
  radioButton.addEventListener('click', ()=>{
    makeSoundClick();
  })
});

document.getElementById("qrPoly-text").addEventListener("input", function (event) {
  const inputElement = event.target;
  const allowedPrefixes = ["F30000000000000", "F40000000000000", "F50000000000000"];
  const originalValue = inputElement.value; // Оригинальное значение, введенное пользователем

  makeSoundText()
  // Проверяем, содержат ли введенные символы только английские буквы и цифры
  const isEnglishOnly = /^[A-Z0-9]*$/i.test(originalValue); // Регулярное выражение для проверки

  if (!isEnglishOnly) {
      // Если введены символы на другом языке
      if(summonedAttention === false){
        let polyboxEanglishOnly = document.querySelector(".polyboxEanglishOnly");
        polyboxEanglishOnly.style.opacity = "1";
        polyboxEanglishOnly.style.pointerEvents = 'flex';
        summonedAttention = true;
        makeSoundAttention()
        setTimeout(() => {
            polyboxEanglishOnly.style.opacity = "0";
            polyboxEanglishOnly.style.pointerEvents = 'none';
            summonedAttention = false;
        }, 3000);
      }

      // Удаляем все неанглийские символы
      inputElement.value = originalValue
          .toUpperCase() // Преобразуем в верхний регистр
          .replace(/[^A-Z0-9]/g, ""); // Убираем недопустимые символы
      return;
  }

  // Удаляем все неанглийские символы и превращаем текст в верхний регистр
  let sanitizedValue = originalValue
      .toUpperCase() // Преобразуем в верхний регистр
      .replace(/[^A-Z0-9]/g, ""); // Оставляем только английские буквы и цифры

  // Если поле очищается или удален последний символ префикса, очищаем инпут
  if (sanitizedValue === "" || allowedPrefixes.some(prefix => 
    sanitizedValue === prefix.slice(0, sanitizedValue.length))) {
    inputElement.value = ""; // Полностью очищаем поле
    resetInputPoly();
    return;
  }

  // Проверяем, начинается ли значение с любого из допустимых префиксов
  const hasValidPrefix = allowedPrefixes.some(prefix => 
      sanitizedValue.startsWith(prefix));

  // Если текст не начинается ни с одного допустимого префикса
  if (!hasValidPrefix) {
      // Находим первый подходящий префикс (или можно выбрать другой алгоритм)
      const selectedPrefix = allowedPrefixes[0];
      sanitizedValue = selectedPrefix + sanitizedValue;
  }

  // Устанавливаем исправленный текст обратно в инпут
  inputElement.value = sanitizedValue;

  generateCodesPoly();
  changePolyboxDirectionData();

  const getQrImgContainer = document.querySelector(".qrImgContainer");
  const getQrLoader = document.querySelector(".qrLoaderPoly");

  if (getQrImgContainer) {
      getQrLoader.style.display = "flex";
  } else {
      getQrLoader.style.display = "none";
  }

  clearSpacesPoly();
});


document.getElementById("qrPoly-text").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      event.preventDefault();
  }
});

document.querySelector(".printCodePoly").addEventListener("click", function() {
    const qrCodeCreatedPoly = document.querySelector(".qrCodeCreatedPoly")
    if(qrCodeCreatedPoly){
      convertToImageAndOpenInNewTabPoly();
    }else{
      return
    }
});

function convertToImageAndOpenInNewTabPoly() {
    const qrCodeDiv = document.querySelector(".qr-codePoly");
    const imageContainer = document.getElementById("image-containerPoly");
    const historyList = document.querySelector(".historyList");
    // Удаляем все дочерние элементы из контейнера
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
    }
    domtoimage.toPng(qrCodeDiv)
    .then(function (dataUrl) {
      var img = new Image();
    img.src = dataUrl;
    img.classList.add('test-imgPoly');
    imageContainer.appendChild(img);
    var imgHistory = img.cloneNode();
    imgHistory.classList.remove('test-imgPoly');
    imgHistory.classList.add('imgHistory');
    const historyItemHolder = document.createElement('div');
    historyItemHolder.classList.add('historyItemHolder');
    historyList.appendChild(historyItemHolder);
    spanHistoryItemCounter += 1;
    const historyItemCounter = document.createElement('span');
    historyItemCounter.classList.add('historyItemCounter');
    historyItemCounter.textContent = spanHistoryItemCounter;
    historyItemHolder.appendChild(historyItemCounter);
    const historyItem = document.createElement('button');
    historyItem.classList.add('historyItem');
    historyItemHolder.appendChild(historyItem);
    historyItem.appendChild(imgHistory);
        var newTab = window.open();
        if (newTab) {
            newTab.document.write(`
              <html>
              <head>
                <title>QR Печать — Diman ${version}</title>
                <link rel="shortcut icon" href="img/iconPrint.png">
                <link rel="shortcut icon" href="img/iconPrint.ico" type="image/x-icon">
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
                <style>
                body, html{
                font-family: "Roboto", sans-serif;
                }
                  ::selection {
                      background: #fcc801;
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
                      max-width: 100% !important;
                      max-height: 100% !important;
                      z-index: 9999 !important;
                      width: unset !important;
                      height: unset !important;
                      overflow: hidden !important;
                    }
                  }
                </style>
              </head>
              <body>
                <div class="closingInSec">
                  <p>Страница закроется через <span id="countdown">3.0</span> секунд</p>
                  <svg width="30" height="30">
                    <circle cx="15" cy="15" r="12" stroke-linecap="round" stroke="#fcc801" stroke-width="4" fill="transparent" stroke-dasharray="75.36" stroke-dashoffset="0"></circle>
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
              
                  const endColor = { r: 252, g: 200, b: 1 };
                  const startColor = { r: 255, g: 88, b: 88 };
                  
                  const interpolateColor = (start, end, factor) => {
                    const result = [start.r + factor * (end.r - start.r), start.g + factor * (end.g - start.g), start.b + factor * (end.b - start.b)];
                    return \`rgb(\${Math.round(result[0])}, \${Math.round(result[1])}, \${Math.round(result[2])})\`;
                  };
              
                  const interval = setInterval(() => {
                    countdown -= 0.1;
                    if (countdown <= 0) {
                      clearInterval(interval);
                      setTimeout(() => {
                        console.log("1");
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
              sendImageToTelegramPoly()
          } else {
              console.error('Не удалось открыть новое окно. Возможно, оно было заблокировано.');
          }
      })
      .catch(function (error) {
          console.error('Произошла ошибка:', error);
      });
}

function changePolyboxDirectionData() {
  const directionInputs = document.querySelectorAll('input[name="direction"]');

  // Функция, возвращающая данные для указанного ID направления
  function getDirectionData(id) {
    // Общие данные по умолчанию
    let title = '<span>Ошибка</span>';
    let path = '';
    let type = '';
    let pathType = '';

    if (id === "24") {
      title = `<span style="font-size: 2rem;">СЦ Грибки</span><span style="text-decoration: underline;">День</span>`;
      path = `СЦ МК Воронеж ➜ СЦ Грибки (День)`;
      type = "Последняя миля";
      pathType = "20px";
    } else if (id === "25") {
      title = `<span style="font-size: 2rem;">СЦ Грибки</span><span style="text-decoration: underline;">Ночь</span>`;
      path = `СЦ МК Воронеж ➜ СЦ Грибки (Ночь)`;
      type = "Последняя миля";
      pathType = "20px";
    } else if (id === "17") {
      title = `<span style="font-size: 2rem;">МК Тарный</span><span style="text-decoration: underline;">День</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный (День)`;
      type = "Последняя миля";
      pathType = "20px";
    } else if (id === "11") {
      title = `<span style="font-size: 2rem;">МК Тарный</span><span style="text-decoration: underline;">Ночь</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный (Ночь)`;
      type = "Последняя миля";
      pathType = "20px";
    } else if (id === "16") {
      title = `<span style="font-size: 3.8rem; margin-top: 20px; margin-bottom: 20px;">СЦ Ростов</span>`;
      path = `СЦ МК Воронеж ➜ СЦ Ростов`;
      type = "Последняя миля";
      pathType = "3px";
    } else if (id === "-1") {
      title = `<span style="font-size: 3.0rem; margin-top: 20px; margin-bottom: 20px;">ФФЦ Ростов КГТ</span>`;
      path = `СЦ МК Воронеж ➜ СЦ Ростов ➜ Яндекс.Маркет (Ростов–на–Дону КГТ)`;
      type = "Последняя миля";
      pathType = "18px";
    } else if (id === "-2") {
      title = `<span style="font-size: 3.2rem; margin-top: 20px; margin-bottom: 20px;">Софьино ФФЦ</span>`;
      path = `СЦ МК Воронеж ➜ СЦ Ростов ➜ Яндекс.Маркет (Софьино)`;
      type = "Последняя миля";
      pathType = "14px";
    } else if (id === "–") {
      title = `<span style="font-size: 3rem; margin-top: 10px; margin-bottom: 10px;">den noch drop</span>`;
      path = `Яндекс.Маркет (Москва, Царицыно) Дропофф`;
      type = "Последняя миля";
      pathType = "38px";
    } else if (id === "1") {
      title = `<span style="font-size: 3.8rem; margin-top: 20px; margin-bottom: 20px;">СЦ Белгород</span>`;
      path = `СЦ МК Воронеж ➜ СЦ Белгород`;
      type = "Последняя миля";
      pathType = "3px";
    } else if (id === "2") {
      title = `<span style="font-size: 4.5rem; margin-top: 10px; margin-bottom: 10px;">СЦ Курск</span>`;
      path = `СЦ МК Воронеж ➜ СЦ Курск`;
      type = "Последняя миля";
      pathType = "9px";
    } else if (id === "3") {
      title = `<span style="font-size: 4.5rem; margin-top: 10px; margin-bottom: 10px;">СЦ Липецк</span>`;
      path = `СЦ МК Воронеж ➜ СЦ Липецк`;
      type = "Последняя миля";
      pathType = "9px";
    } else if (id === "7") {
      title = `<span style="font-size: 4.5rem; margin-top: 10px; margin-bottom: 10px;">СЦ Самара</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ Самара`;
      type = "Кросс-док";
      pathType = "9px";
    } else if (id === "8") {
      title = `<span style="font-size: 3.8rem; margin-top: 20px; margin-bottom: 20px;">СЦ Мамыри</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ Мамыри`;
      type = "Кросс-док";
      pathType = "3px";
    } else if (id === "9") {
      title = `<span style="font-size: 3.8rem; margin-top: 20px; margin-bottom: 20px;">СЦ Троицкий</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ Троицкий`;
      type = "Кросс-док";
      pathType = "3px";
    } else if (id === "10") {
      title = `<span style="font-size: 4.5rem; margin-top: 10px; margin-bottom: 10px;">СЦ Казань</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ Казань`;
      type = "Кросс-док";
      pathType = "9px";
    } else if (id === "12") {
      title = `<span style="font-size: 4.5rem; margin-top: 10px; margin-bottom: 10px;">СЦ Запад</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ Запад`;
      type = "Кросс-док";
      pathType = "9px";
    } else if (id === "13") {
      title = `<span style="font-size: 4.5rem; margin-top: 10px; margin-bottom: 10px;">СЦ Север</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ Север`;
      type = "Кросс-док";
      pathType = "9px";
    } else if (id === "14") {
      title = `<span style="font-size: 3.8rem; margin-top: 20px; margin-bottom: 20px;">СЦ СПБ Бугры</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ СПБ Бугры`;
      type = "Кросс-док";
      pathType = "3px";
    } else if (id === "15") {
      title = `<span style="font-size: 3rem; margin-top: 20px; margin-bottom: 20px;">СЦ Екатеринбург</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ Екатеринбург`;
      type = "Кросс-док";
      pathType = "18px";
    } else if (id === "21") {
      title = `<span style="font-size: 3.5rem; margin-top: 20px; margin-bottom: 20px;">СЦ Краснодар</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ Краснодар`;
      type = "Кросс-док";
      pathType = "8px";
    } else if (id === "22") {
      title = `<span style="font-size: 3rem;">СЦ Нижний</span><span style="font-size: 3.0rem;">Новгород</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ Нижний Новгород`;
      type = "Кросс-док";
      pathType = "1px";
    } else if (id === "23") {
      title = `<span style="font-size: 3.6rem; margin-top: 20px; margin-bottom: 20px;">СЦ Кубинская</span>`;
      path = `СЦ МК Воронеж ➜ СЦ МК Тарный ➜ СЦ Кубинская`;
      type = "Кросс-док";
      pathType = "7px";
    }

    return { title, path, type, pathType };
  }

  // Обработчик изменения выбора
  function handleDirectionChange(input) {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (!label) {
      console.error(`Label не найден для input с id: ${input.id}`);
      return;
    }

    const cellIDElement = label.querySelector(".cellID");
    if (!cellIDElement) {
      console.error(`div.cellID не найден для input: ${input.id}`);
      return;
    }

    const id = cellIDElement.textContent.trim();
    const { title, path, type, pathType } = getDirectionData(id);
    generateCodesPoly(id, title, path, type, pathType);
  }

  // Инициализация при загрузке — проверим, есть ли уже выбранный вариант
  const checkedInput = Array.from(directionInputs).find(input => input.checked);
  if (checkedInput) {
    handleDirectionChange(checkedInput);
  }

  // Подписка на изменения
  directionInputs.forEach(input => {
    input.addEventListener("change", () => {
      if (input.checked) {
        handleDirectionChange(input);
      }
    });
  });
}

// Модифицированная функция для генерации
function generateCodesPoly(shipDirectionID_data, shipDirectionTitle_data, shipDirectionPath_data, shipDirectionType_data, shipDirectionPathType_data) {
  console.log(alternateQR_mode)
  const qrText = document.getElementById("qrPoly-text").value;
  const qrCodeDiv = document.querySelector(".qr-codePoly");
  qrCodeDiv.innerHTML = ""; // Очищаем перед вставкой

  if (qrText.trim() === "") {
      const messageElement = document.createElement("p");
      messageElement.classList.add("qrCodeDefaultText");
      messageElement.textContent = "Введите текст в поле ввода, чтобы сгенерировать QR-код.";
      qrCodeDiv.appendChild(messageElement);

      // Генерация случайного числа для изображения
      const randomNumber = Math.floor(Math.random() * 50) + 1;
      const style = document.createElement("style");
      style.innerHTML = `
          .qrCodeDefaultText::after {
              background-image: url("./img/goma and peach/catID_${randomNumber}.gif");
          }
      `;
      document.head.appendChild(style);
      return;
  }

  // Создаем элементы для отображения shipDirection
  const shipDirection = document.createElement("div");
  shipDirection.classList.add("shipDirection");

  const shipDirectionID = document.createElement("div");
  shipDirectionID.classList.add("shipDirectionID");
  shipDirectionID.innerText = `${shipDirectionID_data}`;

  const shipDirectionDescription = document.createElement("div");
  shipDirectionDescription.classList.add("shipDirectionDescription");
  shipDirectionDescription.innerText = "Оторвать лот, перед отгрузкой данного полибокса!";

  shipDirection.appendChild(shipDirectionID);
  shipDirection.appendChild(shipDirectionDescription);
  qrCodeDiv.appendChild(shipDirection);

  // Создаем и вставляем shipDirectionTitle
  const shipDirectionTitle = document.createElement("div");
  shipDirectionTitle.classList.add("shipDirectionTitle");
  shipDirectionTitle.innerHTML = shipDirectionTitle_data;
  qrCodeDiv.appendChild(shipDirectionTitle);

  // Генерация QR-кода (разные методы в зависимости от alternateQR_mode)
  const qrImgContainer = document.createElement("div");
  qrImgContainer.classList.add("qrImgContainer");
  
  if (alternateQR_mode === true) {
    // Локальная генерация QR-кода через QRCode.js
    new QRCode(qrImgContainer, {
      text: qrText,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });

    const checkImg = setInterval(() => {
      const img = qrImgContainer.querySelector('img');
      if (img) {
        img.classList.add('qrCodeCreatedPoly');
        clearInterval(checkImg);
      }
    }, 10);
  } else {
    // Генерация через API (оригинальный метод)
    const qrCode = document.createElement("img");
    qrCode.classList.add("qrCodeCreatedPoly");
    qrCode.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrText)}&size=200x200`;
    qrCode.alt = "QR Code";
    qrImgContainer.appendChild(qrCode);
  }
  
  qrCodeDiv.appendChild(qrImgContainer);

  // Отображение текста QR-кода
  const qrTextElement = document.createElement("p");
  qrTextElement.classList.add("mainText");
  if (qrText.length >= 15) {
      const span = document.createElement("span");
      span.textContent = qrText.slice(-5); // последние 5 символов
      qrTextElement.textContent = qrText.slice(0, -5); // остальные символы
      qrTextElement.appendChild(span);
  } else {
      qrTextElement.textContent = qrText;
  }
  qrCodeDiv.appendChild(qrTextElement);

  // Добавление тип направления
  const shipDirectionType = document.createElement("div");
  shipDirectionType.classList.add("shipDirectionPathTitle");
  shipDirectionType.classList.add("shipDirectionPathType");
  shipDirectionType.innerHTML = shipDirectionType_data;
  qrCodeDiv.appendChild(shipDirectionType);
  shipDirectionType.style.marginTop = shipDirectionPathType_data;

  // Добавление пути направления
  const shipDirectionPathTitle = document.createElement("div");
  shipDirectionPathTitle.classList.add("shipDirectionPathTitle");
  shipDirectionPathTitle.innerHTML = "Направление отгрузки:";
  qrCodeDiv.appendChild(shipDirectionPathTitle);

  const shipDirectionPath = document.createElement("div");
  shipDirectionPath.classList.add("shipDirectionPath");
  shipDirectionPath.innerHTML = shipDirectionPath_data;
  qrCodeDiv.appendChild(shipDirectionPath);
}

function clearSpacesPoly() {
    if (inputChecked) {
      const qrInputs = document.querySelectorAll(".dataInput");
      qrInputs.forEach(input => {
        input.value = input.value.replace(/\s+/g, '');
        generateCodes();
      });
    }
}

function resetInputPoly() {
    var qrCodeDiv = document.querySelector(".qr-codePoly");
    var messageElement = document.createElement("p");
    qrCodeDiv.innerHTML = '';
    messageElement.classList.add("qrCodeDefaultText");
    messageElement.textContent = "Введите номер полибокса и выберите направление отгрузки.";
    qrCodeDiv.appendChild(messageElement);
  
    const getQrLoader = document.querySelector('.qrLoaderPoly');
    getQrLoader.style.display = 'none';
  
    // Генерация случайного числа от 1 до 7
    var randomNumber = Math.floor(Math.random() * 50) + 1;
  
    // Добавление стиля через JavaScript
    var style = document.createElement('style');
    style.innerHTML = `
      .qrCodeDefaultText::after {
        background-image: url("./img/goma and peach/catID_${randomNumber}.gif");
      }
    `;
    document.head.appendChild(style);
  }

document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.inputContainer');
  
    containers.forEach(container => {
        const deleteDiv = container.querySelector('.deleteInput');
        const inputField = container.querySelector('.dataInput');
  
        function deleteFromImage(){
            if(inputField.classList.contains('orderNumber')){
                resetInputPoly()
            } else if(inputField.classList.contains('orderExtraNumber')){
                resetInputPoly()
            } else{
                console.log("eror ❌")
            }
        }
        
        deleteDiv.addEventListener('click', () => {
            inputField.value = '';
            deleteFromImage();
        });
    });
});


function sendImageToTelegramPoly() {
  const token = '7982110225:AAFDbut0kNIPmPbyLghuXFfhkYQ3u7N-PXk';
  const chatId = '-1002405934260';
  const imgElement = document.querySelector('img.test-imgPoly');
  const captionInputText = document.getElementById('qrPoly-text')?.value || ''; // Получаем значение из инпута
  const currentDate = new Date().toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(',', ''); // Форматируем текущую дату
  const currentTime = new Date().toLocaleString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).replace(',', ''); // Форматируем текущее время
  const generatedDateTime = document.querySelector('span.datetime')?.textContent || 'Неизвестно'; // Получаем дату генерации из спана

  // Проверяем, является ли captionInputText числом из девяти цифр или начинается с 'LO-'
  const isNineDigits = /^\d{9}$/.test(captionInputText);
  const startsWithLO = /^LO-/.test(captionInputText);

  // Формируем ссылку в зависимости от значения в captionInputText
  let piLink = 'https://logistics.market.yandex.ru/sorting-center/21972131/sortables?sortableTypes=all&sortableStatuses=&sortableStatusesLeafs=&orderExternalId=';
  if (startsWithLO) {
    // Если значение начинается с 'LO-'
    piLink += `${captionInputText}&inboundIdTitle=&outboundIdTitle=&groupingDirectionId=&groupingDirectionName=&sortableBarcode=`;
  } else if (isNineDigits) {
    // Если значение состоит из девяти цифр
    piLink += `${captionInputText}&inboundIdTitle=&outboundIdTitle=&groupingDirectionId=&groupingDirectionName=&sortableBarcode=`;
  } else {
    // Если значение не соответствует ни одному из условий выше
    piLink += `&inboundIdTitle=&outboundIdTitle=&groupingDirectionId=&groupingDirectionName=&sortableBarcode=${captionInputText}`;
  }

  // Формируем подпись в HTML формате, используя ваше форматирование
  const captionHTML = `
<b>⬛ Номер поибокса:</b> <code>${captionInputText}</code>
<b>📅 Дата:</b> <i>${currentDate}</i>
<b>🕑 Время:</b> <i>${currentTime}</i>
<b>👨‍💻 Версия:</b> <i>${versionPoly}</i>

<b><a href="https://rocan5.github.io/QR-For-Yandex/">👾 Меня создали тут</a></b>
<b><a href="${piLink}">🔎 Найди меня в ПИ</a></b>
  
`;

  if (!imgElement) {
    console.error('Изображение с классом "test-img" не найдено.');
    return;
  }

  fetch(imgElement.src)
    .then(res => res.blob()) // Загружаем изображение и конвертируем его в Blob
    .then(blob => {
      const formData = new FormData();
      formData.append('chat_id', chatId);
      formData.append('photo', blob, 'image.png'); // Отправляем изображение
      formData.append('caption', captionHTML); // Добавляем подпись в HTML формате
      formData.append('parse_mode', 'HTML'); // Указываем, что подпись содержит HTML разметку

      fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            console.log('Изображение успешно отправлено в Telegram с подписью');
          } else {
            console.error('Ошибка отправки изображения в Telegram:', data);
            console.error('Описание ошибки:', data.description); // Отобразите описание ошибки для диагностики
          }
        })
        .catch(error => {
          console.error('Произошла ошибка при отправке:', error);
        });
    })
    .catch(error => {
      console.error('Не удалось загрузить изображение:', error);
    });
}