const TIME = document.querySelector("#time");
const TEMPERATURE = document.querySelector("#temperature");
const VILLE = document.querySelector("#ville");

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

setInterval(functionTime, 1000);

function functionTime() {
  let time = new Date().toLocaleTimeString();
  TIME.innerHTML -= `
  <p>${time}</p>
  `;
  TIME.innerHTML += `
  <p>${time}</p>
  `;
}

function Geo(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  fetch(
    `https://api-adresse.data.gouv.fr/search/?q=1&lat=${latitude}&lon=${longitude}`
  )
    .then((response) => {
      return response.json();
    })
    .then((dataPosition) => {
      console.log(dataPosition);
      console.log(dataPosition.features[0].properties.city);
      VILLE.innerHTML = `
      <p>${dataPosition.features[0].properties.city}</p>
`;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${dataPosition.features[0].properties.city}, France&APPID=6954cc39e1615bfa3d85718a62577874`
      )
        .then((response) => {
          return response.json();
        })
        .then((dataMeteo) => {
          console.log(dataMeteo);
          console.log(dataMeteo.main.temp);
          let kelvinToCelsius = dataMeteo.main.temp - 273.15;
          console.log("Température " + kelvinToCelsius + "°");
          TEMPERATURE.innerHTML = `
          <p>${parseInt(kelvinToCelsius)}°</p>
          `;
        });
    });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(Geo);
}
