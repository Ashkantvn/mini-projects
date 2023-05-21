const currentTime = new Date();

const secondHand = document.getElementsByClassName("clock__secondhand")[0];
let secondHandDegree = currentTime.getSeconds() * 6;

const minuteHand = document.getElementsByClassName("clock__minutehand")[0];
let minuteHandDegree = currentTime.getMinutes() * 6;

const hourHand = document.getElementsByClassName("clock__hourhand")[0];
let hourHandDegree =
  (currentTime.getHours() * 30) + (currentTime.getMinutes() * 0.5);

setInterval(() => {
  secondHand.style.transform = `rotate(${secondHandDegree}deg)`;
  minuteHand.style.transform = `scale(0.7) rotate(${minuteHandDegree}deg)`;
  hourHand.style.transform = `scale(0.5) rotate(${hourHandDegree}deg)`;

  secondHandDegree += 6;

  if (secondHandDegree / 6 == 61) {
    secondHandDegree = 6;
    minuteHandDegree += 6;
    hourHandDegree += 0.5;
  }

  if (minuteHandDegree / 6 == 61) {
    minuteHandDegree = 6;
  }
}, 1000);
