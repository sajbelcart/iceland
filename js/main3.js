function createMap(){
//create the map
var map = L.map('mapid', {
center: [64.7, -18.123906],
zoom: 7,
maxZoom: 7,
minZoom: 7
});

//add OSM base tilelayer
L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
}).addTo(map);

getCountryShapeData(map);

//call getData function
getData(map);
};
//function to retrieve the data and place it on the map
function getData(map){
//load the data
$.ajax("data/volc.geojson",{
dataType: "json",
success: function(response){
//create a Leaflet GeoJSON layer and add it to the map

L.geoJson(response).addTo(map);

map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
}
});
};

$(document).ready(createMap);