const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secondsEl = document.getElementById('seconds');

const newYears = "07 Apr 2021";

function countDown() {
    
    const newYearDate = new Date(newYears);
    const currDate = new Date();

    const diff = new Date(newYearDate - currDate); // in miliSeconds

    const days = Math.floor(diff / 1000 / 3600 / 24);
    const hours = Math.floor(diff / 1000 / 3600) % 24;
    const mins = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.innerHTML = days;
    hoursEl.innerHTML = hours
    minsEl.innerHTML = mins;
    secondsEl.innerHTML = seconds;
}

countDown();
setInterval(countDown);



