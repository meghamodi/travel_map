var map;
function initMap() {

  var styleArray = [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 }
      ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ];

  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(42.34, -71.05),
    styles: styleArray
  };

  var map = new google.maps.Map(document.getElementById('map'),
    mapOptions);


  // Load GeoJSON.
  map.data.loadGeoJson('/map.geojson', null, function (features) {

    var markers = features.map(function (feature) {
        var g = feature.getGeometry();
        var marker = new google.maps.Marker({ 'position': g.get(0) });
        return marker;
    });

    var markerCluster = new MarkerClusterer(map, markers,{ imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m' });
});

  map.data.setStyle(function(feature) {
    return {icon:feature.getProperty('icon')};
  });

 
  var infoWindow = new google.maps.InfoWindow({
        content: "",
        pixelOffset: new google.maps.Size(0, -40),
        maxWidth: 250
  });

  map.data.addListener('mouseover', function(event) {
    var desc = event.feature.getProperty("description");
    var titl = event.feature.getProperty("address");
    var myadd = event.feature.getProperty("status");
    var myimage = event.feature.getProperty("image");
    var myland = event.feature.getProperty("land");
    var mysize = event.feature.getProperty("size");
    var myunits = event.feature.getProperty("units");
    var myphaze = event.feature.getProperty("permit");
    var contentString = '<div style="width: 94.2%; padding-left:10px; height: 25px;float: left;color: #FFF;background: #0b3061;font-size: 16px;line-height: 25px;border-radius:5px 5px 0px 0px;"><strong><b>' + titl + '</b></strong><br></div><br><div><img src=' + myimage + 'width="100" height="100" hspace="4" vspace="1" align="left"><p align="left"><b>Address: </b>' + myadd + '<br><b>Land Sq. Feet: </b>' + myland + '<br><b>Building Size: </b>' + mysize + '<br><b>Residential Units: </b>' + myunits + '<br><b>Project Phase: </b>' + myphaze + '</p><p align="justify"><b>Project Description: </b>' + desc + '</p></div>';
    infoWindow.setContent(contentString);
 
    var anchor = new google.maps.MVCObject();
    anchor.setValues({ //position of the point
            position: event.latLng,
            anchorPoint: new google.maps.Point(0, -10)
    });

    infoWindow.open(map, anchor);


  });

  var markerCluster = new MarkerClusterer(map, markers);
  

}