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

function printQRCode() {
    window.print();
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
