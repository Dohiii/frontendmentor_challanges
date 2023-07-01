const ipParagraph = document.querySelector("#ip")
const locationParagraph = document.querySelector("#location")
const timezoneParagraph = document.querySelector("#timezone")
const ispParagraph = document.querySelector("#isp")

const inputValue = document.querySelector("#input-value")
const submitForm = document.querySelector(".sibmit-ip-form")



const myIpURL = "http://ip-api.com/json"
const locationByIpURL = "https://geo.ipify.org/api/v2/country,city?apiKey=at_oQVTPkPvHUn3vs10kcpWVxgm18Ldp&ipAddress="


let lat = ""
let lon = ""

const svgIcon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`,
  className: "",
  iconSize: [24, 40],
  iconAnchor: [12, 40],
});
var map = L.map('map')


function isIPAddress(value) {
  const ipAddressRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return ipAddressRegex.test(value);
}

submitForm.addEventListener("submit", (e) => {
  e.preventDefault()

  if (inputValue.value.length == 0) {
    getMyIp()
  }

  if (isIPAddress(inputValue.value)) {
    console.log(`${inputValue.value} - is IP adress`)
    findLocationByIp()
  } else {
    console.log(`${inputValue.value} - is NOT IP adress`)

  }
})

const findLocationByIp = () => {
  console.log(locationByIpURL + inputValue.value)
  axios.get(locationByIpURL + inputValue.value)
    .then(function (response) {
      res = response.data
      console.log(res)
      // handle success
      ipParagraph.textContent = res.ip
      locationParagraph.textContent = `${res.location.city}, ${res.location.postalCode}`
      timezoneParagraph.textContent = res.location.timezone
      ispParagraph.textContent = res.isp

      updateMap(res.location.lat, res.location.lng)
      console.log(res);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

const getMyIp = () => {
  // Make a request for a user with a given ID
  axios.get('http://ip-api.com/json')
    .then(function (response) {
      res = response.data
      // handle success
      ipParagraph.textContent = res.query
      locationParagraph.textContent = `${res.city}, ${res.zip}`
      timezoneParagraph.textContent = res.timezone
      ispParagraph.textContent = res.isp

      updateMap(res.lat, res.lon)

      console.log(res);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
}

const updateMap = (lat, lon) => {
  map.setView([lat, lon], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  map.removeControl(map.zoomControl);

  var marker = L.marker([lat, lon], { icon: svgIcon }).addTo(map);
}












// var popup = L.popup();

// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(map);
// }

// map.on('click', onMapClick);