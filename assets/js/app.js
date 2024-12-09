var map,territories_data,VA_electric_flyr,drawcontrol_status=!1,google_sunroof=0,dark=L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"),googleSat=L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",{maxZoom:20,subdomains:["mt0","mt1","mt2","mt3"]}),plain=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",{maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox/light-v9",tileSize:512,zoomOffset:-1}),openstreet=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),topographic=L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:"Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)",maxZoom:17});map=L.map("map",{center:[23.98641129407727,46.02172851562501],zoom:7,attributionControl:!1});var googlestreet=L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",{maxZoom:20,subdomains:["mt0","mt1","mt2","mt3"]}).addTo(map);map.zoomControl.setPosition("bottomright");var geocoder=L.Control.geocoder({collapsed:!1,position:"topright",placeholder:"Search in 1stech map..."});geocoder.addTo(map);var Esri_WorldImagery=L.esri.basemapLayer("Imagery"),img_labels=L.esri.basemapLayer("ImageryLabels"),road_networks=L.esri.basemapLayer("ImageryTransportation"),geochemical_url="https://ngdgis.sgs.gov.sa/ngdgis/rest/services/Geochemistry/Geochemistry_Samples/MapServer",geochemical_feature_layer=L.esri.dynamicMapLayer({url:geochemical_url,layers:[1],useCors:!1});geochemical_feature_layer.bindPopup((function(e,r){return!e&&0!==r.features.length&&"<b>Quadrangle: </b>"+r.features[0].properties.Geologic_Quadrangle+"<br/><b>Project:</b> "+r.features[0].properties.Project_Code+"<br/><b>Sample Code:</b> "+r.features[0].properties.Sample_Code+"<br/><b>Sample Number:</b> "+r.features[0].properties.Sample_Number+"<br/><b>Sample Type:</b> "+r.features[0].properties.Sample_Type}));var minrals_url="https://ngdgis.sgs.gov.sa/ngdgis/rest/services/Geosciences/MODS/MapServer",minrals_feature_layer=L.esri.dynamicMapLayer({url:minrals_url,layers:[0],useCors:!1});minrals_feature_layer.bindPopup((function(e,r){return!e&&0!==r.features.length&&"<b>MODS No: </b>"+r.features[0].properties.MODS+"<br/><b>Name:</b> "+r.features[0].properties["English Name"]+" <br/> "+r.features[0].properties["Arabic Name"]+"<br/><b>Major Commodity:</b> "+r.features[0].properties["Major Commodities"]+"<br/><b>Minor Commodities:</b> "+r.features[0].properties["Minor Commodities"]+"<br/><b>Occurrence Importance:</b> "+r.features[0].properties["Occurrence Importance"]+"<br/><b>Occurrence Status</b> "+r.features[0].properties["Occurrence Status"]+"<br/><b>Regional Structure:</b> "+r.features[0].properties["Regional Structure"]}));var drilling_url="https://ngdgis.sgs.gov.sa/ngdgis/rest/services/Geosciences/Boreholes/MapServer",drilling_feature_layer=L.esri.dynamicMapLayer({url:drilling_url,layers:[1],useCors:!1}).addTo(map);drilling_feature_layer.bindPopup((function(e,r){return!e&&0!==r.features.length&&"<b>Project / Borehole ID: </b>"+r.features[0].properties.Project_Borehole_ID+"<br/><b>Borehole Type: </b>"+r.features[0].properties.Borehole_Type+"<br/><b>Project Name: </b> "+r.features[0].properties.Project_Name}));var geological_url="https://ngdgis.sgs.gov.sa/ngdgis/rest/services/Geology/Geology_250K/MapServer",geological_feature_layer=L.esri.dynamicMapLayer({url:geological_url,layers:[0],useCors:!1});geological_feature_layer.bindPopup((function(e,r){return!e&&0!==r.features.length&&"<b>Name: </b>"+r.features[0].properties.Label+"<br/><b>Symbol:</b> "+r.features[0].properties.Symbol+"<br/><b>Map Name:</b> "+r.features[0].properties.Map_Name+"<br/><b>Family Sub-Division:</b> "+r.features[0].properties.Family_SDV+"<br/><b>Main Lithology:</b> "+r.features[0].properties.Main_Litho+"<br/><b>Genesis:</b> "+r.features[0].properties.Genesis+"<br/><b>Report No:</b> "+r.features[0].properties.Report_No}));var baseLayers={"Topographic Map":topographic,"Street Map":googlestreet,Sattellite:googleSat,OpenStreetMap:openstreet,"Dark Map":dark},overLays={"<img src='../assets/img/geochemical.png' width='28' height='28'>&nbsp; Geochemical Surveys in KSA":geochemical_feature_layer,"<img src='../assets/img/minerals.png' width='28' height='28'>&nbsp; Mineral Occurrences in KSA":minrals_feature_layer,"<img src='../assets/img/drillingwells.png' width='35' height='25'>&nbsp; Drilling And Wells in KSA":drilling_feature_layer,"<img src='../assets/img/geology.png' width='28' height='28'>&nbsp; Geological Data in KSA":geological_feature_layer,"<img src='../assets/img/roads_network.png' width='28' height='28'>&nbsp; Roads Network":road_networks,"<img src='../assets/img/places.png' width='28' height='28'>&nbsp; Places Names":img_labels},mylayercontrol=L.control.layers(baseLayers,overLays,{collapsed:!1}).addTo(map);const style=document.createElement("style");style.innerHTML="\n  .leaflet-control-layers-overlays label {\n    display: block;\n    margin-top: 5px;\n    margin-bottom: 5px;\n  }\n",document.head.appendChild(style),L.control.browserPrint({position:"bottomright",title:"Print Map"}).addTo(map),map.pm.addControls({position:"topleft",drawMarker:!1,drawPolyline:!1,drawPolygon:!1,drawRectangle:!1,drawCircle:!1,editMode:!1,dragMode:!1,cutPolygon:!1,removalMode:!1,rotateLayers:!1,rotateMode:!1}),map.pm.addControls({position:"bottomright",drawMarker:!0,drawPolygon:!0,drawPolyline:!0,drawRectangle:!0,drawCircle:!0}),map.on("pm:buttonclick",(function(e){})),map.on("pm:drawstart",(function(e){drawcontrol_status=!0})),map.on("pm:drawend",(function(e){drawcontrol_status=!1})),map.on("pm:drawend",(function(e){})),map.on("pm:actionclick",(function(e){e.text})),map.on("pm:create",(e=>{})),map.pm.setGlobalOptions({snapDistance:20}),map.pm.setPathOptions({color:"blue",weight:2});var redIcon=new L.Icon({iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});let locationButton=document.getElementById("btnGetLoc");var circlemarker;function animateSidebar(){$("#sidebar").animate({width:"toggle"},350,(function(){map.invalidateSize()}))}function sizeLayerControl(){$(".leaflet-control-layers").css("max-height",$("#map").height()-50)}function clearHighlight(){highlight.clearLayers()}function sidebarClick(e){var r=markerClusters.getLayer(e);map.setView([r.getLatLng().lat,r.getLatLng().lng],17),r.fire("click"),document.body.clientWidth<=767&&($("#sidebar").hide(),map.invalidateSize())}locationButton.addEventListener("click",(()=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition((e=>{const r={lat:e.coords.latitude,lng:e.coords.longitude};map.setView([r.lat,r.lng],15);L.marker([r.lat,r.lng],{icon:redIcon}).addTo(map)}),(()=>{}))})),map.on("click",(function(e){0==drawcontrol_status&&(map.getZoom()>=17&&((circlemarker=L.circle([e.latlng.lat,e.latlng.lng],0).addTo(map).bindPopup("<img src='../assets/img/address.png' width='28' height='28'>&nbsp; <b>Location Name:</b> <br> <img src='../assets/img/location.png' width='40' height='25'>&nbsp; <b>Latitude:</b> "+e.latlng.lat+"<br> <img src='../assets/img/location.png' width='40' height='25'>&nbsp; <b>Longitude:</b> "+e.latlng.lng).openPopup()).setStyle({color:"red"}),fetch("https://nominatim.openstreetmap.org/search.php?q="+e.latlng.lat+","+e.latlng.lng+"&polygon_geojson=1&format=json").then((e=>e.json())).then((r=>{var a=r[0].display_name;map.hasLayer(circlemarker)&&map.removeLayer(circlemarker),(circlemarker=L.circle([e.latlng.lat,e.latlng.lng],0).addTo(map).bindPopup("<img src='../assets/img/address.png' width='28' height='28'>&nbsp; <b>Location Name:</b> "+a+"<br> <img src='../assets/img/location.png' width='40' height='25'>&nbsp; <b>Latitude:</b> "+e.latlng.lat+"<br> <img src='../assets/img/location.png' width='40' height='25'>&nbsp; <b>Longitude:</b> "+e.latlng.lng).openPopup()).setStyle({color:"red"})}))))})),$("#about-btn").click((function(){return $("#aboutModal").modal("show"),$(".navbar-collapse.in").collapse("hide"),!1})),$("#legend-btn").click((function(){return $("#legendModal").modal("show"),$(".navbar-collapse.in").collapse("hide"),!1})),$("#login-btn").click((function(){return $("#loginModal").modal("show"),$(".navbar-collapse.in").collapse("hide"),!1})),$("#list-btn").click((function(){return animateSidebar(),!1})),$("#nav-btn").click((function(){return $(".navbar-collapse").collapse("toggle"),!1})),$("#sidebar-toggle-btn").click((function(){return animateSidebar(),!1})),$("#sidebar-hide-btn").click((function(){return animateSidebar(),!1}));