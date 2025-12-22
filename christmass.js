let isChristmasDates = false
function isChristmas() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    
    if(currentMonth === 11 && currentDate >= 5 && currentDate <= 31){
        isChristmasDates = true
    } else isChristmasDates = false
}
isChristmas()

if (isChristmasDates === true) {
    const bodyElement = document.querySelector('body')
    const santaAndDears = document.createElement('div');
    santaAndDears.classList.add('santaWrapper')
    santaAndDears.innerHTML = `
        <div class="sleigh-santa">
            <div class="santaBanner">
                <p>С новым годом !</p>
            </div>
            <div class="santa santa--sleigh">
                <div class="santa__hat">
                <div class="santa__hat-part"></div>
                <div class="santa__hat-part"></div>
                </div>
                <div class="santa__face">
                <div class="santa__eyebrows santa__eyebrows--right"></div>
                <div class="santa__eyebrows santa__eyebrows--left"></div>
                <div class="santa__eye santa__eye--right"></div>
                <div class="santa__eye santa__eye--left"></div>
                <div class="santa__nose"></div>
                <div class="santa__cheek santa__cheek--right"></div>
                <div class="santa__cheek santa__cheek--left"></div>
                <div class="santa__beard">
                    <div class="santa__beard-part"></div>
                    <div class="santa__beard-part"></div>
                    <div class="santa__beard-part"></div>
                </div>
                <div class="santa__mouth"></div>
                </div>
                <div class="santa__body">
                <div class="santa__body-top"></div>
                <div class="santa__hand santa__hand--left">
                    <div class="santa__hand-inner"></div>
                </div>
                <div class="santa__hand santa__hand--right"></div>
                </div>
            </div>
            <div class="sleigh-feet"></div>
            <div class="lead">
                <div class="lead-inner"></div>
            </div>
            <div class="lead lead--back">
                <div class="lead-inner"></div>
            </div>
            <div class="reindeer">
                <div class="reindeer__face">
                <div class="reindeer__ear"></div>
                <div class="reindeer__horn reindeer__horn--right"></div>
                <div class="reindeer__horn reindeer__horn--left"></div>
                </div>
                <div class="reindeer__body">
                <div class="reindeer__foot reindeer__foot--front">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__foot reindeer__foot--front reindeer__foot--inside">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__foot reindeer__foot--back">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__foot reindeer__foot--back reindeer__foot--inside">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__tail"></div>
                <div class="reindeer__spots"></div>
                </div>
            </div>
            <div class="reindeer reindeerSecond">
                <div class="reindeer__face">
                <div class="reindeer__ear"></div>
                <div class="reindeer__horn reindeer__horn--right"></div>
                <div class="reindeer__horn reindeer__horn--left"></div>
                </div>
                <div class="reindeer__body">
                <div class="reindeer__foot reindeer__foot--front">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__foot reindeer__foot--front reindeer__foot--inside">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__foot reindeer__foot--back">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__foot reindeer__foot--back reindeer__foot--inside">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__tail"></div>
                <div class="reindeer__spots"></div>
                </div>
            </div>
            <div class="lead reindeerSecond">
                <div class="lead-inner"></div>
            </div>
            <div class="lead lead--back reindeerSecond">
                <div class="lead-inner"></div>
            </div>
            <div class="reindeer reindeerThird">
                <div class="reindeer__face">
                <div class="reindeer__ear"></div>
                <div class="reindeer__horn reindeer__horn--right"></div>
                <div class="reindeer__horn reindeer__horn--left"></div>
                </div>
                <div class="reindeer__body">
                <div class="reindeer__foot reindeer__foot--front">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__foot reindeer__foot--front reindeer__foot--inside">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__foot reindeer__foot--back">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__foot reindeer__foot--back reindeer__foot--inside">
                    <div class="reindeer__foot-inner"></div>
                </div>
                <div class="reindeer__tail"></div>
                <div class="reindeer__spots"></div>
                </div>
            </div>
            <div class="lead reindeerThird">
                <div class="lead-inner"></div>
            </div>
            <div class="lead lead--back reindeerThird">
                <div class="lead-inner"></div>
            </div>
            <div class="particles"></div>
        </div>
    `;
    bodyElement.appendChild(santaAndDears)

    const navMenuElement = document.querySelector('nav.menu')
    const navContactsElement = document.querySelector('nav.contacts')
    const navEvryButton = navMenuElement.querySelectorAll('button')
    const navEvryLink = navMenuElement.querySelectorAll('a')
    const navEvryButtonContacts = navContactsElement.querySelectorAll('button')
    const navEvryLinkContacts = navContactsElement.querySelectorAll('a')

    navEvryButton.forEach(btn => {
        const holidayVenok = document.createElement('div')
        holidayVenok.classList.add("holidayVenok")
        btn.appendChild(holidayVenok)
    });
    navEvryLink.forEach(link => {
        const holidayVenok = document.createElement('div')
        holidayVenok.classList.add("holidayVenok")
        link.appendChild(holidayVenok)
    });

    navEvryButtonContacts.forEach(btn => {
        const holidayVenok = document.createElement('div')
        holidayVenok.classList.add("holidayVenok")
        btn.appendChild(holidayVenok)
    });
    navEvryLinkContacts.forEach(link => {
        const holidayVenok = document.createElement('div')
        holidayVenok.classList.add("holidayVenok")
        link.appendChild(holidayVenok)
    });
    navContactsElement.querySelectorAll('label').forEach(link => {
        const holidayVenok = document.createElement('div')
        holidayVenok.classList.add("holidayVenok")
        link.appendChild(holidayVenok)
    });
    
    const qrHolidayVenok = document.createElement('div')
    qrHolidayVenok.classList.add("holidayVenok", "qrHolidayVenok")
    document.getElementById('qr-code').before(qrHolidayVenok)
}