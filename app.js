const cloud = document.querySelector("#cloud");
const desc = document.querySelector("#desc");
const titre = document.querySelector("#titre");
const change = document.querySelector("#change");
const popup = document.querySelector("#popup");
const annuler = document.querySelector("#annuler");
const valider = document.querySelector("#valider");
const input = document.querySelector("#in");
let inville = "";
city = "dakar";
appid = "032899e1b2abf241e6a799bb29b9195d";

let url =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&lang=fr&appid=" +
  appid +
  "&units=metric";

// *************** PREMIERE REQUETTE API OPENWEATHER  *******************

console.log(city);
fetch(url).then((response) =>
  response.json().then((data) => {
    console.log(data);
    titre.innerHTML = data.name;
    cloud.src =
      "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    desc.innerHTML = data.weather[0].description;
    document.querySelector("#temp").innerHTML = data.main.temp + " °C";
  })
);

// *************** POPUP POUR CHANGER DE VILLE *******************

change.addEventListener("click", () => {
  popup.style.top = 0;
});

// *************** ANNULER LE CHANGEMENT DE VILLE *******************
annuler.addEventListener("click", () => {
  popup.style.top = "-100%";
  input.value = "";
  inville = "";
});
// *************** RECUPERER LE NOM DE LA VILLE *******************

input.addEventListener("input", (e) => {
  inville += e.data;
});

// *************** VALIDER LE CHANGEMENT DE VILLE *******************
valider.addEventListener("click", () => {
  city = inville;
  popup.style.top = "-100%";
  input.value = "";
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      inville +
      "&lang=fr&appid=" +
      appid +
      "&units=metric"
  )
    .then((response) =>
      response.json().then((data) => {
        console.log(data);
        titre.innerHTML = data.name;
        cloud.src =
          "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        desc.innerHTML = data.weather[0].description;
        document.querySelector("#temp").innerHTML = data.main.temp + " °C";
      })
    )
    .catch((err) => {
      titre.innerHTML = "Erreur: ville inconnue";
      cloud.src = "";
      desc.innerHTML = "";
      document.querySelector("#temp").innerHTML = "";
    });
  inville = "";
});
