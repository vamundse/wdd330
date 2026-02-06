const cd = document.getElementById("countdown");
const start = document.getElementById("start");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const changetime = document.getElementById("changetime");

let time = 10;
let isPaused = false;

cd.textContent = time;

changetime.addEventListener("click", () => {setTime()});
start.addEventListener("click", () => {countdown();});
pause.addEventListener("click", () => isPaused = true);
play.addEventListener("click", () => isPaused = false);

function countdown() {
    setInterval(() => {
        if (time > 0  && isPaused == false) {
            time--;
            cd.textContent = time;
            if (time == 0) {
                setTimeout(() => {
                cd.innerHTML = `Time is up`
                })
            };
        }
    }, 1000);
}

function setTime() {
    let userTime = document.getElementById("usertime").value;
    time = userTime;
    cd.textContent = time;
}