function Timer() {
  const hour = document.getElementById("hour");
  const minute = document.getElementById("minute");
  const hourTime = new Date().getHours();
  const minTime = new Date().getMinutes();
  hour.innerHTML = hourTime;
  minute.innerHTML = minTime;
}
const timer = setInterval(Timer, 1000);

module.exports = timer;
