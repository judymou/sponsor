require(["esri/map", "esri/dijit/Search", "esri/symbols/SimpleMarkerSymbol", "esri/SpatialReference", "esri/graphic", "esri/geometry/Point", "esri/Color", "dojo/domReady!"],
  function(Map, Search, SimpleMarkerSymbol, SpatialReference, Graphic, Point, Color) {

  var map = new Map("map", {
    center: [-118, 34.5],
    zoom: 5,
    basemap: "topo"
  });

  var address = $("#address").text() || "2 Marina Blvd, San Francisco, CA";
  $.get('//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=' + address + '&f=json&outSR=4326&outFields=Addr_type%2CMatch_addr%2CStAddr%2CCity&maxLocations=1', function (data) {
    if (typeof data !== 'object') {
      data = JSON.parse(data);
    }

    if (data.candidates.length) {
      var geo = data.candidates[0].location;
      var markerSymbol = new SimpleMarkerSymbol();
        markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
        markerSymbol.setColor(new Color("#00FFFF"));

      var pt = new Point(geo.x, geo.y, new SpatialReference({ wkid: 4326 }));
      map.graphics.add(new Graphic(pt, markerSymbol));
      map.centerAndZoom(pt, 14);
    }
  });

  /*
  var search = new Search({
    map: map
  }, "search");
  search.startup();
  */
});
