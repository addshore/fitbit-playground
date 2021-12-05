import * as document from "document";
import { switchPage } from './navigation.js';



const mainMenuButton = document.getElementById("main-button");
mainMenuButton.addEventListener("click", (evt) => {
  switchPage("main", "menu")
})




let menuList = document.getElementById("menuList");
let menuListItems = menuList.getElementsByClassName("list-item");
menuListItems.forEach((element, index) => {
  let touch = element.getElementById("touch");
  touch.onclick = function(evt) {
    console.log(`menu list touched: ${index}`);
    switch(index) {
      case 0:
        switchPage("menu", "sensors")
        break;
      case 1:
        switchPage("menu", "vibrate")
        break;
      case 2:
        switchPage("menu", "user")
        break;
      default:
    }
  };
});




import { me as appbit } from "appbit";
import { user } from "user-profile";
document.getElementById("age-data").text = user.age;
document.getElementById("bmr-data").text = user.bmr;
document.getElementById("gender-data").text = user.gender;
document.getElementById("height-data").text = user.height;
document.getElementById("maxHeartRate-data").text = user.maxHeartRate;
document.getElementById("restingHeartRate-data").text = user.restingHeartRate;
document.getElementById("stride-data").text = JSON.stringify({walk:user.stride.walk,run:user.stride.run});
document.getElementById("weight-data").text = user.weight;




import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import * as document from "document";
import { Gyroscope } from "gyroscope";
import { HeartRateSensor } from "heart-rate";
import { OrientationSensor } from "orientation";

const accelLabel = document.getElementById("accel-label");
const accelData = document.getElementById("accel-data");

const barLabel = document.getElementById("bar-label");
const barData = document.getElementById("bar-data");

const bpsLabel = document.getElementById("bps-label");
const bpsData = document.getElementById("bps-data");

const gyroLabel = document.getElementById("gyro-label");
const gyroData = document.getElementById("gyro-data");

const hrmLabel = document.getElementById("hrm-label");
const hrmData = document.getElementById("hrm-data");

const orientationLabel = document.getElementById("orientation-label");
const orientationData = document.getElementById("orientation-data");

const sensors = [];

if (Accelerometer) {
  const accel = new Accelerometer({ frequency: 1 });
  accel.addEventListener("reading", () => {
    accelData.text = JSON.stringify({
      x: accel.x ? accel.x.toFixed(1) : 0,
      y: accel.y ? accel.y.toFixed(1) : 0,
      z: accel.z ? accel.z.toFixed(1) : 0
    });
  });
  sensors.push(accel);
} else {
  accelLabel.style.display = "none";
  accelData.style.display = "none";
}

if (Barometer) {
  const barometer = new Barometer({ frequency: 1 });
  barometer.addEventListener("reading", () => {
    barData.text = JSON.stringify({
      pressure: barometer.pressure ? parseInt(barometer.pressure) : 0
    });
  });
  sensors.push(barometer);
} else {
  barLabel.style.display = "none";
  barData.style.display = "none";
}

if (BodyPresenceSensor) {
  const bps = new BodyPresenceSensor();
  bps.addEventListener("reading", () => {
    bpsData.text = JSON.stringify({
      presence: bps.present
    })
  });
  sensors.push(bps);
} else {
  bpsLabel.style.display = "none";
  bpsData.style.display = "none";
}

if (Gyroscope) {
  const gyro = new Gyroscope({ frequency: 1 });
  gyro.addEventListener("reading", () => {
    gyroData.text = JSON.stringify({
      x: gyro.x ? gyro.x.toFixed(1) : 0,
      y: gyro.y ? gyro.y.toFixed(1) : 0,
      z: gyro.z ? gyro.z.toFixed(1) : 0,
    });
  });
  sensors.push(gyro);
} else {
  gyroLabel.style.display = "none";
  gyroData.style.display = "none";
}

if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    hrmData.text = JSON.stringify({
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    });
  });
  sensors.push(hrm);
} else {
  hrmLabel.style.display = "none";
  hrmData.style.display = "none";
}

if (OrientationSensor) {
  const orientation = new OrientationSensor({ frequency: 60 });
  orientation.addEventListener("reading", () => {
    orientationData.text = JSON.stringify({
      quaternion: orientation.quaternion ? orientation.quaternion.map(n => n.toFixed(1)) : null
    });
  });
  sensors.push(orientation);
} else {
  orientationLabel.style.display = "none";
  orientationData.style.display = "none";
}

// Automatically stop all sensors when the screen is off OR the page is not being viewed to conserve battery
display.addEventListener("change", () => {
  sensorsRunning(display.on);
});
document.addEventListener("page-switch", function (event) {
  event.to == "sensors" ? sensorsRunning(true) : undefined;
  event.from == "sensors" ? sensorsRunning(false) : undefined;
}, false);
function sensorsRunning(running) {
  running ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());
  console.log("Sensors running set to " + running)
}




import { vibration } from "haptics";
function vibrate(type) {
  vibration.start(type)
  setTimeout(function(){
    vibration.stop()
  }, 2000);// 2 seconds
}
let vibrateList = document.getElementById("vibrateList");
let vibrateListItems = vibrateList.getElementsByClassName("list-item");
vibrateListItems.forEach((element, index) => {
  let touch = element.getElementById("touch");
  touch.onclick = function(evt) {
    console.log(`vibrate list touched: ${index}`);
    switch(index) {
      case 0:
        vibrate("alert")
        break;
      case 1:
        vibrate("bump")
        break;
      case 2:
        vibrate("confirmation")
        break;
      case 3:
        vibrate("confirmation-max")
        break;
      case 4:
        vibrate("nudge")
        break;
      case 5:
        vibrate("nudge-max")
        break;
      case 6:
        vibrate("ping")
        break;
      case 7:
        vibrate("ring")
        break;
      default:
    }
  };
});