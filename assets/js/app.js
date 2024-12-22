


var map
var drawcontrol_status=false
var territories_data 
var VA_electric_flyr
var google_sunroof=0
var loca_report_btn_status=false
var dark  = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
// var dark  = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png');

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3']
        });
var plain =L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/light-v9',
            tileSize: 512,
            zoomOffset: -1
        })  
var openstreet   = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

var topographic =L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)',
  maxZoom: 17
})


  map = L.map('map', {
  center: [22.846775078691643, 45.05832791680345],
  zoom: 6,
  attributionControl: false
});

var googlestreet   = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(map)

    map.zoomControl.setPosition('bottomright');


    var geocoder=L.Control.geocoder({
      // defaultMarkGeocode: false,
        collapsed:false,
        position:"topright", 
        placeholder:"Search in 1stech map...",
        // queryParams: {"countrycodes": "US"},
        // geocoder: new L.Control.Geocoder.Nominatim({
        // geocodingQueryParams: {
        //     "countrycodes": "US"
        //     }
        // })
      })
      geocoder.addTo(map);



    // L.control.fullscreen({
    //   position: 'bottomright', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
    //   // title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
    //   // titleCancel: 'Exit fullscreen mode', // change the title of the button when fullscreen is on, default Exit Full Screen
    //   // content: null, // change the content of the button, can be HTML, default null
    //   // forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
    //   // forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
    //   // fullscreenElement: false // Dom element to render in full screen, false by default, fallback to map._container
    // }).addTo(map);


var Esri_WorldImagery = L.esri.basemapLayer('Imagery')
var img_labels= L.esri.basemapLayer('ImageryLabels')
var road_networks= L.esri.basemapLayer('ImageryTransportation')




     




        var geochemical_url = 'https://ngdgis.sgs.gov.sa/ngdgis/rest/services/Geochemistry/Geochemistry_Samples/MapServer';
        var geochemical_feature_layer = L.esri.dynamicMapLayer({
            url: geochemical_url,
            layers: [1],
            useCors: false
        }).addTo(map)

        geochemical_feature_layer.bindPopup(function (error, featureCollection) {

            if (error || featureCollection.features.length === 0) {
                return false;
            } else {
                var featureScripts = '<b>Quadrangle: </b>' + featureCollection.features[0].properties.Geologic_Quadrangle+ '<br/><b>Project:</b> ' + featureCollection.features[0].properties.Project_Code+ '<br/><b>Sample Code:</b> ' + featureCollection.features[0].properties.Sample_Code+ '<br/><b>Sample Number:</b> ' + featureCollection.features[0].properties.Sample_Number+ '<br/><b>Sample Type:</b> ' + featureCollection.features[0].properties.Sample_Type;
                return featureScripts;
            }
        });


        var minrals_url = 'https://ngdgis.sgs.gov.sa/ngdgis/rest/services/Geosciences/MODS/MapServer';

        var minrals_feature_layer = L.esri.dynamicMapLayer({
            url: minrals_url,
            layers: [0],
            useCors: false
        })

        minrals_feature_layer.bindPopup(function (error, featureCollection) {

            if (error || featureCollection.features.length === 0) {
                return false;
            } else {
                var featureScripts = '<b>MODS No: </b>' + featureCollection.features[0].properties["MODS"] + '<br/><b>Name:</b> ' + featureCollection.features[0].properties["English Name"]  + ' <br/> ' + featureCollection.features[0].properties["Arabic Name"] +  '<br/><b>Major Commodity:</b> ' + featureCollection.features[0].properties["Major Commodities"] + '<br/><b>Minor Commodities:</b> ' + featureCollection.features[0].properties["Minor Commodities"] + '<br/><b>Occurrence Importance:</b> ' + featureCollection.features[0].properties["Occurrence Importance"]  + '<br/><b>Occurrence Status</b> ' + featureCollection.features[0].properties["Occurrence Status"] + '<br/><b>Regional Structure:</b> ' + featureCollection.features[0].properties["Regional Structure"];
                return featureScripts;
            }
        });


     




        var drilling_url = 'https://ngdgis.sgs.gov.sa/ngdgis/rest/services/Geosciences/Boreholes/MapServer';
        var drilling_feature_layer = L.esri.dynamicMapLayer({
            url: drilling_url,
            layers: [1],
            useCors: false
        }).addTo(map)

        drilling_feature_layer.bindPopup(function (error, featureCollection) {
            if (error || featureCollection.features.length === 0) {
                return false;
            } else {
                var featureScripts = '<b>Project / Borehole ID: </b>' + featureCollection.features[0].properties.Project_Borehole_ID + '<br/><b>Borehole Type: </b>' + featureCollection.features[0].properties.Borehole_Type + '<br/><b>Project Name: </b> ' + featureCollection.features[0].properties.Project_Name;
                return featureScripts;
            }
        });




        var geological_url = 'https://ngdgis.sgs.gov.sa/ngdgis/rest/services/Geology/Geology_250K/MapServer';

        var geological_feature_layer = L.esri.dynamicMapLayer({
            url: geological_url,
            layers: [0],
            useCors: false
        })

        geological_feature_layer.bindPopup(function (error, featureCollection) {
            if (error || featureCollection.features.length === 0) {
                return false;
            } else {
                var featureScripts = '<b>Name: </b>' + featureCollection.features[0].properties.Label+ '<br/><b>Symbol:</b> ' + featureCollection.features[0].properties.Symbol+ '<br/><b>Map Name:</b> ' + featureCollection.features[0].properties.Map_Name + '<br/><b>Family Sub-Division:</b> ' + featureCollection.features[0].properties.Family_SDV + '<br/><b>Main Lithology:</b> ' + featureCollection.features[0].properties.Main_Litho + '<br/><b>Genesis:</b> ' + featureCollection.features[0].properties.Genesis+ '<br/><b>Report No:</b> ' + featureCollection.features[0].properties.Report_No;
                return featureScripts;
            }
        });


    













   
var baseLayers = {
"Topographic Map": topographic,
"Street Map": googlestreet,
"Sattellite": googleSat,
"OpenStreetMap": openstreet,
"Carto Dark Map": dark

};
var overLays = {
  "<img src='../assets/img/geochemical.png' width='28' height='28'>&nbsp; Geochemical Surveys": geochemical_feature_layer, 
  "<img src='../assets/img/minerals.png' width='28' height='28'>&nbsp; Mineral Occurrences": minrals_feature_layer, 
  "<img src='../assets/img/drillingwells.png' width='35' height='25'>&nbsp; Drilling And Wells": drilling_feature_layer,
  "<img src='../assets/img/geology.png' width='28' height='28'>&nbsp; Geological Surveys": geological_feature_layer,
  "<img src='../assets/img/roads_network.png' width='28' height='28'>&nbsp; Roads Network": road_networks,
  "<img src='../assets/img/places.png' width='28' height='28'>&nbsp; Places Names": img_labels
};


  var mylayercontrol= L.control.layers(baseLayers,overLays).addTo(map);

  // Add custom CSS
const style = document.createElement('style');
style.innerHTML = `
  .leaflet-control-layers-overlays label {
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;
document.head.appendChild(style);







function updateLayerControl() {
  if (mylayercontrol) {
    map.removeControl(mylayercontrol);
  }
  const isMobile = window.innerWidth <= 768;
  mylayercontrol = L.control.layers(baseLayers, overLays, { collapsed: true }).addTo(map);
  if(isMobile==true){
    animateSidebar();
  }
}

// Initial setup
updateLayerControl();

// Update on window resize
window.addEventListener('resize', updateLayerControl);





























map.on('overlayadd', function(e) {
  console.log(e)
  // if(e.name=="VA Electric Territories"){
  //     // $('#legenddiv').show();
  //     setTimeout(function(){
  //     $('#legenddiv').css('visibility','visible');
  //     console.log('Changed to ' + e.name);
  //     }, 2000);  
  // }
  // if(e.name=="ROOFS SOLAR MAP"){
  //   // map.getPane("tilePane").style.zIndex = 800;
  //   map.addLayer(co2lyr)
  //   // map.setView([38.88714129486354, -77.07550227642061], 18);
  //   var cuurent_zoom=map.getZoom()
  //   if(cuurent_zoom<17){
  //     map.setView([38.84534810596939, -77.3061454296112], 17);
  //   }

  //   setTimeout(function(){
  //     if(map.hasLayer(territories_lyr)){ //the old DistrictLayer
  //       map.removeLayer(territories_lyr)
  //     }
  //   }, 500); 
    
  // }
  
});
map.on('overlayremove', function(e) {
  console.log(e)
  // if(e.name=="VA Electric Territories"){
  //     $('#legenddiv').css('visibility','hidden');
  //     console.log('Changed to ' + e.name);
  // }
  // if(e.name=="ROOFS SOLAR MAP"){
  //   map.removeLayer(co2lyr)
  //   // map.setView([38.57389610087847,-77.81616160646082], 9); 
  // }
});



   //  ......................Gradiant OR Heat MAP of NVRC................. 


   

    // Add Print Control
    L.control.browserPrint({
      position: 'bottomright',
      title: 'Print Map',
    }).addTo(map);



    map.pm.addControls({
      position: 'topleft', // Position of controls
      drawMarker: false,
      drawPolyline: false,
      drawPolygon: false,
      drawRectangle: false,
      drawCircle: false,
      editMode: false,
      dragMode: false,
      cutPolygon: false,
      removalMode: false,
      rotateLayers: false,
      rotateMode: false

    });
  

  

    // Add Edit Layer Controls First
    // map.pm.addControls({
    //   position: 'bottomright',
    //   editMode: true,
    //   dragMode: true,
    //   cutPolygon: true,
    //   removalMode: true,
    // });


       // Add Draw Controls After
       map.pm.addControls({
        position: 'bottomright',
        drawMarker: true,
        drawPolygon: true,
        drawPolyline: true,
        drawRectangle: true,
        drawCircle: true,
        drawCircleMarker: false,
        removalMode: true
      });
  
  
   
        // Listen for Geoman button click events
        map.on('pm:buttonclick', function(e) {
          console.log('Button clicked:', e.button.name);
        });

        // Listen for specific draw start events
        map.on('pm:drawstart', function(e) {
          drawcontrol_status=true
          console.log('Draw started for:', e.shape);
        });

        // Listen for draw end events
        map.on('pm:drawend', function(e) {
          drawcontrol_status=false
          console.log('Draw ended for:', e.shape);
        });

        // Listen for 'pm:drawend' - Triggered when drawing finishes
        map.on('pm:drawend', function (e) {
          console.log('Drawing finished:', e.shape);
        });

        // Listen for 'pm:actionclick' - Triggered when a control action ends
        map.on('pm:actionclick', function (e) {
          console.log('Action clicked:', e.text);
          if (e.text === 'Cancel') {
            // alert('Drawing cancelled!');
          }
        });



    // Debugging: Listen for Geoman events
    map.on('pm:create', (e) => {
      console.log('Layer created:', e.layer);
    });

    // Optional: Set snapping globally
    map.pm.setGlobalOptions({
      snapDistance: 20,
    });

    // Optional: Set default path styles
    map.pm.setPathOptions({
      color: 'blue',
      weight: 2,
    });





// L.DomEvent.on(document.getElementById('btnGetLoc'), 'click', function(){
//   // map.locate({setView: true, maxZoom: 16});
//   // $('.leaflet-control-locate-location-arrow')[0].click()
//       map.locate({setView: true, maxZoom: 15});
//       map.on('locationfound', onLocationFound);
//       function onLocationFound(e) {
//           console.log(e); 
//           // e.heading will contain the user's heading (in degrees) if it's available, and if not it will be NaN. This would allow you to point a marker in the same direction the user is pointed. 
//           var lmarker=L.marker(e.latlng).addTo(map);
//           lmarker._icon.classList.add("huechange");
//       }
// })


var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

let locationButton = document.getElementById("btnGetLoc");
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          console.log(pos);
          map.setView([pos.lat, pos.lng], 15);
          // var lmarker=L.marker([pos.lat, pos.lng]).addTo(map);
          var lmarker=L.marker([pos.lat, pos.lng], {icon: redIcon}).addTo(map);
        },
        () => {
          console.log("handleLocationError");
        }
      );
    } else {
      // Browser doesn't support Geolocation
      console.log("Browser doesn't support Geolocation");
    }
  });





  






// function onLocationFound(e) {
//   var radius = e.accuracy;

//   // L.marker(e.latlng).addTo(map)
     

//   L.circle(e.latlng, radius).addTo(map)
//   .bindPopup("You are within " + radius + " meters from this point").openPopup();
// }

// map.on('locationfound', onLocationFound);



// var lc = L.control
//   .locate({
//     position: "topright",
//     strings: {
//       title: "Show me where I am, yo!"
//     }
//   })
//   .addTo(map);


  
var circlemarker
// map.on('zoomend',function(e){
//   var currZoom = map.getZoom();
//   console.log(currZoom)
// });

map.on('click', function(e) {


  
  console.log(e.latlng.lat + ", " + e.latlng.lng)
  if(drawcontrol_status == false){
    // if(loca_report_btn_status == true){
    //   $('#reportModal').modal('show');
    // }
    var currZoom = map.getZoom();
    if(currZoom >= 17){
      circlemarker=L.circle([e.latlng.lat, e.latlng.lng], 0).addTo(map)
      .bindPopup("<img src='../assets/img/address.png' width='28' height='28'>&nbsp; <b>Location Name:</b> <br> <img src='../assets/img/location.png' width='40' height='25'>&nbsp; <b>Latitude:</b> "+e.latlng.lat+"<br>"+" <img src='../assets/img/location.png' width='40' height='25'>&nbsp; <b>Longitude:</b> "+e.latlng.lng).openPopup();
      circlemarker.setStyle({color: 'red'});
      console.log(currZoom)
      fetch("https://nominatim.openstreetmap.org/search.php?q="+e.latlng.lat+","+e.latlng.lng+"&polygon_geojson=1&format=json")
      .then(response => response.json())
      .then(j => {
        var address=j[0].display_name
        console.log(address)
        if(map.hasLayer(circlemarker)){
          map.removeLayer(circlemarker)
        }
        circlemarker=L.circle([e.latlng.lat, e.latlng.lng], 0).addTo(map)
        .bindPopup("<img src='../assets/img/address.png' width='28' height='28'>&nbsp; <b>Location Name:</b> "+address+"<br> <img src='../assets/img/location.png' width='40' height='25'>&nbsp; <b>Latitude:</b> "+e.latlng.lat+"<br>"+" <img src='../assets/img/location.png' width='40' height='25'>&nbsp; <b>Longitude:</b> "+e.latlng.lng).openPopup();
          circlemarker.setStyle({color: 'red'});
      })
    }    
  }
  
});







setTimeout(() => {
  L.Measure = {
    position: 'bottomright',
    linearMeasurement: "Distance measurement",
    areaMeasurement: "Area measurement",
    start: "Start",
    meter: "m",
    kilometer: "km",
    squareMeter: "m²",
    squareKilometers: "km²",
    };
  
    var measure = L.control.measure({}).addTo(map);
}, 100);


























 



var drawnItems = new L.FeatureGroup();


var drawControl =new L.Control.Draw({
  draw: {
    marker: true,
    circle: false,
    circlemarker: false,
    rectangle: false,
    polyline:false,
    polygon: false
    // {
    //   allowIntersection: true,
    //   showArea: true
    // }
  }
});


map.addLayer(drawnItems);
map.addControl(drawControl);



map.on(L.Draw.Event.CREATED, function (event) {

  var getdrawnlayerType = event.layerType
  var layer = event.layer; // The created layer
  
  if(layer instanceof L.Circle){
    var cradius = layer.getRadius(); 
    const radius = layer.getRadius(); // Retrieve the radius
    const center = layer.getLatLng(); // Retrieve the center
    console.log(`Circle created with radius: ${radius} meters at center: ${center}`);
  }

  if (getdrawnlayerType == 'marker') {

    console.log("marker draw completed")
    console.log(layer._latlng.lat)


    fetch("https://nominatim.openstreetmap.org/search.php?q="+layer._latlng.lat+","+layer._latlng.lng+"&polygon_geojson=1&format=json")
      .then(response => response.json())
      .then(j => {
        var address=j[0].display_name
        console.log(address)
        var schemeName=$("#schemeName").val()
        $("#loc_name").text(schemeName);
        $("#loc_address").text(address);
        $("#loc_lat").text(layer._latlng.lat);
        $("#loc_lng").text(layer._latlng.lng);

   


        $('#reportModal').modal('show');
      })

   
  }
})




function printReport() {
  var content = document.getElementById("modalContent").innerHTML; // Get modal content
  var printWindow = window.open('', '', 'height=700,width=900'); // Open a new print window
  printWindow.document.write('<html><head><title>Print Report</title>');
  printWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">');
  printWindow.document.write('</head><body>');
  printWindow.document.write(content); // Insert modal content
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print(); // Trigger print
}






$("#reportModal").on("hide.bs.modal", function(){
  console.log("reportModal closed!");
  loca_report_btn_status=false
  // map.pm.Draw.disable();
  // your function after closing modal goes here
})


$("#loc_report_drawmarker").click(function(){
  loca_report_btn_status=true
  $('.leaflet-popup-pane .leaflet-draw-tooltip').show();
  drawnItems.clearLayers();
  $('.leaflet-draw-draw-marker')[0].click()
  // $('.leaflet-pm-icon-marker').click()
  $("#schemeInfoModal").modal("hide");
});


$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});


$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#login-btn").click(function() {
  $("#loginModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  animateSidebar();
  return false;
});

function animateSidebar() {
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    map.invalidateSize();
  }
}






    // Style for the highlighted province
    const highlightStyle_prov = {
      // fillColor: '#1E90FF',
      // opacity: 1,
      // weight: 2,
      // color: 'white',
      dashArray: '3',
      // fillOpacity: 0.6
      weight: 2,
      color: 'black',
      // dashArray: '',
      fillOpacity: 0.3
  };

  // Dropdown reference
  const prov_dropdown = document.getElementById("provinceDropdown");

  // Populate dropdown dynamically
  provinces_geojson.features.forEach((feature, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.text = feature.properties.name;
      prov_dropdown.appendChild(option);
  });

  let currentLayer; // To hold the selected province layer

  // Function to clear previously selected province
  function clearPreviousSelection() {
      if (currentLayer) {
          map.removeLayer(currentLayer);
      }
  }

  // Highlight selected province when dropdown changes
  prov_dropdown.addEventListener("change", function () {
      const selectedIndex = parseInt(this.value);
      const selectedFeature = provinces_geojson.features[selectedIndex];

      clearPreviousSelection(); // Remove any previously added layer

      // Add only the selected province
      currentLayer = L.geoJSON(selectedFeature, {
          style: highlightStyle_prov
      }).addTo(map);

      // Zoom to the selected feature
      const bounds = currentLayer.getBounds();
      map.fitBounds(bounds);
  });
























