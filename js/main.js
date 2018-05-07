function createMap(){
//create the map
var map = L.map('mapid', {
center: [65, -18.123906],
zoom: 7,
maxZoom: 7,
minZoom: 7
});

//add base tilelayer
L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
}).addTo(map);

getData(map);

getShapeData(map);
};

function getData(map){
//load the data
$.ajax("data/sub.geojson",{
dataType: "json",
success: function(response){
//create a Leaflet GeoJSON layer and add it to the map

L.geoJson(response).addTo(map).bindPopup("subglacial volcano");

map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
}
});
};

function getShapeData(map){
    $.ajax("data/glacier.geojson", {
        dataType: "json",
        success: function(response){
            createPolygons(response, map);
        }
    });
};

function createPolygons(data,map){
    var polyLayer = L.geoJson(data,{
      style: function(feature){
        var options = {
          fillColor: "#ffffff",
          weight: 0,
          color: "#ffffff",
          opacity: 0.3,
          fillOpacity: 0.3
        }
        return options
      }
    });
polyLayer.addTo(map);
};

$(document).ready(createMap);