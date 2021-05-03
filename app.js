
function getData() {
  
  let lat = document.getElementById("lat").value;
  let long = document.getElementById("long").value;
  let date = document.getElementById("date").value;


  fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&date=${date}&formatted=0`, {

  }).then(response => response.json())
    .then(showData)

}




var field = document.querySelector('#date');
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + (month) + "-" + (day);
console.log(today);
field.value = today;

function showData(data) {

  var riseText = "The sunrise is schedulded at ";
  var setText = "The sunset is scheduled at ";
  var lengthText = "The length of the day is ";
  dataitem = data['results'];
  var localSunrise = new Date(dataitem.sunrise).toLocaleTimeString();
  var localSunset = new Date(dataitem.sunset).toLocaleTimeString();
  var dayLength = new Date(dataitem.day_length * 1000).toISOString().substr(11, 8);
  var disclaimer = "Data supplied by https://sunrise-sunset.org/";

  console.log(dayLength);
  document.getElementById("sunrise").innerHTML = riseText + localSunrise;
  document.getElementById("sunset").innerHTML = setText + localSunset;
  document.getElementById("daylength").innerHTML = lengthText + dayLength;
  document.getElementById("disclaimer").innerHTML = disclaimer;
  console.log(data);

}

const myLocation = ol.proj.fromLonLat([22.50389, 58.24806]);
const myGeometry = new ol.geom.Point(myLocation);


const iconFeature = new ol.Feature({
    geometry: myGeometry,
    name: 'Kuressaare',
});

const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
        }),
        new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [iconFeature]
            }),
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: 'https://openlayers.org/en/latest/examples/data/icon.png'
                })
            })
        })
    ],
    view: new ol.View({
        center: myLocation,
        zoom: 14
    })
});


map.on('singleclick', function(evt) {

    // convert coordinate to EPSG-4326
    var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
    var lon = lonlat[0];
    var lat = lonlat[1];
    var lonField = document.querySelector("#long");
    var latField = document.querySelector("#lat");
    lonField.value = lon;
    latField.value = lat;

    myGeometry.setCoordinates(evt.coordinate);
});



var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  var lonField = document.querySelector("#long");
  var latField = document.querySelector("#lat");
  lonField.value = crd.longitude;
  latField.value = crd.latitude;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

