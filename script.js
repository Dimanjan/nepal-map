
var provinceMap, provinceGeoJson;
/**
 **  Initialize map
 **/
provinceMap = L.map("map", {
  scrollWheelZoom: true,
  touchZoom: false,
  doubleClickZoom: false,
  zoomControl: true,
  dragging: true
}).setView([28.3949, 84.124], 8);

/**
 **  GeoJSON data
 **/
provinceGeoJson = L.geoJson(provinceData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(provinceMap);

var bound = provinceGeoJson.getBounds();
provinceMap.fitBounds(bound);

/**
 *  Functions for map
 **/
function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: "#FFF",
    dashArray: "1",
    fillOpacity: 0.7,
    fillColor:'blue',
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 2,
    color: "black",
    dashArray: "",
    fillOpacity: 0.7,
    fillColor: "#fff"
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}


function resetHighlight(e) {
  provinceGeoJson.resetStyle(e.target);
  // info.update();
}

function zoomToProvince(e) {

  provinceMap.fitBounds(e.target.getBounds());

}

function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToProvince
  });
}
