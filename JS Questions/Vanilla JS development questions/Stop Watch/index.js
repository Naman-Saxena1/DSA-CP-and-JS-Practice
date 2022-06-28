const hoursTimeOutput = document.querySelector(".stopwatch-hours");
const minutesTimeOutput = document.querySelector(".stopwatch-minutes");
const secondsTimeOutput = document.querySelector(".stopwatch-seconds");

const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const resetBtn = document.querySelector(".reset-btn");

let timerID;

startBtn.addEventListener("click", () => {
  if (timerID) {
    return;
  }
  timerID = setInterval(() => {
    if (Number(secondsTimeOutput.innerText) === 59) {
      if (Number(minutesTimeOutput.innerText) === 59) {
        hoursTimeOutput.innerText =
          Number(hoursTimeOutput.innerText) + 1 < 10
            ? `0${Number(hoursTimeOutput.innerText) + 1}`
            : Number(hoursTimeOutput.innerText) + 1;

        minutesTimeOutput.innerText = "00";
        secondsTimeOutput.innerText = "00";
      } else {
        minutesTimeOutput.innerText =
          Number(minutesTimeOutput.innerText) + 1 < 10
            ? `0${Number(minutesTimeOutput.innerText) + 1}`
            : Number(minutesTimeOutput.innerText) + 1;

        secondsTimeOutput.innerText = "00";
      }
    } else {
      secondsTimeOutput.innerText =
        Number(secondsTimeOutput.innerText) + 1 < 10
          ? `0${Number(secondsTimeOutput.innerText) + 1}`
          : Number(secondsTimeOutput.innerText) + 1;
    }
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerID);
  timerID = null;
});

resetBtn.addEventListener("click", () => {
  hoursTimeOutput.innerText = "00";
  minutesTimeOutput.innerText = "00";
  secondsTimeOutput.innerText = "00";
  clearInterval(timerID);
  timerID = null;
});
