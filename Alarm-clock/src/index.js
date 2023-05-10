const Elements = {
    time_element: document.querySelector(".time"),
    hours_element: document.querySelector(".hours"),
    minutes_element: document.querySelector(".minutes"),
    set_alarm_button: document.querySelector(".set-alarm"),
    alarm_sound_element: document.querySelector(".alarm-sound")
}





//generate data  by type 
const dataGenerator = (type = "") => {
    switch (type) {

        case "clock":
            const currentTime = new Date();
            const Time_data = {
                hours: currentTime.getHours(),
                minutes: currentTime.getMinutes(),
                seconds: currentTime.getSeconds(),
                type: "clock"
            };
            return Time_data;

        case "hours":
            const Hours_data = {
                range: "24",
                type: "hours"
            };
            return Hours_data;

        case "minutes":
            const Minutes_data = {
                range: "60",
                type: "minutes"
            };
            return Minutes_data;

        default:
            throw Error("Wrong type");

    }
}


const documentChanger = (element, data) => {
    if (data.type === "clock") {
        ///shows the current time
        element.textContent = `${("0" + data.hours).slice(-2)}:${("0" + data.minutes).slice(-2)}:${("0" + data.seconds).slice(-2)}`;
    } else {
        ///appends options of hours and minutes elements
        for (let i = 0; i < data.range; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = ("0" + i).slice(-2);
            element.appendChild(option);
        }
    }

}


const clickHandler = (event) => {
    if (event.target.textContent === "Set alarm") {
        if (Elements.hours_element.value && Elements.minutes_element.value) {
            Elements.hours_element.disabled = true;
            Elements.minutes_element.disabled = true;
            event.target.textContent = "Clear alarm";
        }
    } else {
        Elements.hours_element.disabled = false;
        Elements.minutes_element.disabled = false;
        Elements.hours_element.value = "";
        Elements.minutes_element.value = "";
        event.target.textContent = "Set alarm";
    }
}

const alarmChecker = () => {
    const alarmHours = Elements.hours_element.value;
    const alarmMinutes = Elements.minutes_element.value;
    const currentHours = dataGenerator("clock").hours;
    const currentMinutes = dataGenerator("clock").minutes;
    if (alarmHours == currentHours && alarmMinutes == currentMinutes) {
        Elements.alarm_sound_element.play();
    }
}


















Elements.set_alarm_button.addEventListener("click", clickHandler)

documentChanger(Elements.hours_element, dataGenerator("hours"));
documentChanger(Elements.minutes_element, dataGenerator("minutes"));

setInterval(() => {
    if (Elements.set_alarm_button.textContent === "Clear alarm") {
        alarmChecker();
    }
    documentChanger(Elements.time_element, dataGenerator("clock"))
}, 1000);
