document.getElementById("qr-text").addEventListener("input", function() {
    generateCodes();
});

document.querySelector(".print__code").addEventListener("click", function() {
    convertToImageAndPrint();
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

function convertToImageAndPrint() {
    var qrCodeDiv = document.getElementById("qr-code");
    var imageContainer = document.getElementById("image-container");

    // Удаляем все дочерние элементы из контейнера
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
    }

    domtoimage.toPng(qrCodeDiv)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            img.classList.add('test-img');
            imageContainer.appendChild(img);

            // Ждем некоторое время перед вызовом печати
            setTimeout(function() {
                window.print();
            }, 200);
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

// FСоздание частиц
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