const toggleTemp = document.querySelector("#degree-info");
let thermo = '<i class="fa fa-thermometer-half"></i>';

let lat;
let lon;
let endpoint;
let weather;
let degree;

function geoFind() {
  if(!navigator.geolocation){
    $("#load").css("display", "none");
    $("#location").html("Geolocation is not supported in your browser.");
    return;
  }

  function success(position){
    $("#load").css("display", "none");
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    // for user location
    weatherCall();
  }

  function error() {
    $("#load").css("display", "none");
    lat = 0;
    lon = 0;

    // for Null Island
    weatherCall();
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

// get data and display weather
function weatherCall() {
  endpoint = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;

  $("#location").html(`Loading weather for</br>lat: ${Math.round(lat)}, lon: ${Math.round(lon)}`);

  // get weather at current location
  $.getJSON(endpoint, function(data) {

    let day = dayOrNight(data.dt, data.sys.sunrise, data.sys.sunset);
    let weatherId = data.weather[0].id;
    let iconUrl = getWeatherIcon(weatherId);

    $("#location").html(`<i class="fa fa-map-marker"></i> ${data.name}`);
    degree = data.main.temp;
    $("#degree-info").html(
      `${thermo} <span id="degree">${Math.floor(degree)}</span> <span id="format">°C</span>`);
    $("#weather-info").html(data.weather[0].description);
    $("#icon").attr({
      src: `${iconUrl}`,
      alt: `Icon for ${data.weather[0].description}`
    });

    setStyle(day);
  });
}

// determine day or night?
function dayOrNight(ct, sunrise, sunset) {
  if(ct < sunrise || ct > sunset) return false;
  else return true;
}

// icon for weather info
function getWeatherIcon(id) {
  let url = "assets/png/"
  if(id >= 200 && id <= 232){
    url = url + "200.png";
  } else if (id >= 300 && id <= 321) {
    url = url + "300.png";
  } else if (id === 500) {
    url = (day ? url + "501d.png" : url + "501n.png");
  } else if (id >= 501 && id <= 531) {
    url = url + "300.png";
  } else if (id >= 600 && id <= 622) {
    url = url + "600.png";
  } else if (id >= 701 && id <= 781) {
    url = url + "700.png";
  } else if (id === 800 || id >= 900) {
    url = (day ? url + "800d.png" : url + "800n.png");
  } else if (id === 801 || id === 802) {
    url = (day ? url + "801d.png" : url + "801n.png");
  } else if (id === 803 || id === 804) {
    url = url + "803.png";
  } else {
    url = url + "intro.png"
  }
  return url;
}

// styling background according to daytime
function setStyle(day){
  if(day){
    $("body").addClass("day");
    $(".display-container").addClass("display-day");
  } else {
    $("body").addClass("night");
    $(".display-container").addClass("display-night");
  }
}

// button toggles Celsius & Fahrenheit
function toggleTempFormat(){
  let format = $("#format").html();
  degree = $("#degree").html();
  if(format === "°C"){
    format = "°F";
    degree = degree * 1.8 + 32;
    $("#degree-info").html(`${thermo} <span id="degree">${Math.round(degree)}</span> <span id="format">${format}</span>`);
  } else {
    format = "°C";
    degree = (degree-32)*5/9;
    $("#degree-info").html(`${thermo} <span id="degree">${Math.round(degree)}</span> <span id="format">${format}</span>`);
  }
}

window.addEventListener('load', geoFind);
toggleTemp.addEventListener('click', toggleTempFormat);
