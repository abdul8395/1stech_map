var map,territories_data,VA_electric_flyr,drawcontrol_status=!1,google_sunroof=0,dark=L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"),googleSat=L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",{maxZoom:20,subdomains:["mt0","mt1","mt2","mt3"]}),plain=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",{maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox/light-v9",tileSize:512,zoomOffset:-1}),openstreet=L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),topographic=L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{attribution:"Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)",maxZoom:17});map=L.map("map",{center:[24.749320987288364,46.64794921875001],zoom:10,attributionControl:!1});var googlestreet=L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",{maxZoom:20,subdomains:["mt0","mt1","mt2","mt3"]}).addTo(map);map.zoomControl.setPosition("bottomright");var geocoder=L.Control.geocoder({collapsed:!1,position:"topright",placeholder:"Search in 1stech map..."});geocoder.addTo(map);var Esri_WorldImagery=L.esri.basemapLayer("Imagery"),img_labels=L.esri.basemapLayer("ImageryLabels"),road_networks=L.esri.basemapLayer("ImageryTransportation"),baseLayers={"Topographic Map":topographic,"Google Street Map":googlestreet,"Google Sattellite":googleSat,"Esri Imagery":Esri_WorldImagery,OpenStreetMap:openstreet,"Dark Map":dark},overLays={"<img src='../img/roads_network.png' width='28' height='28'>&nbsp; Roads Network":road_networks,"<img src='../img/places.png' width='28' height='28'>&nbsp; Places Names":img_labels},mylayercontrol=L.control.layers(baseLayers,overLays).addTo(map);L.control.browserPrint({position:"bottomright",title:"Print Map"}).addTo(map),map.pm.addControls({position:"topleft",drawMarker:!1,drawPolyline:!1,drawPolygon:!1,drawRectangle:!1,drawCircle:!1,editMode:!1,dragMode:!1,cutPolygon:!1,removalMode:!1,rotateLayers:!1,rotateMode:!1}),map.pm.addControls({position:"bottomright",drawMarker:!0,drawPolygon:!0,drawPolyline:!0,drawRectangle:!0,drawCircle:!0}),map.on("pm:buttonclick",(function(t){})),map.on("pm:drawstart",(function(t){drawcontrol_status=!0})),map.on("pm:drawend",(function(t){drawcontrol_status=!1})),map.on("pm:drawend",(function(t){})),map.on("pm:actionclick",(function(t){t.text})),map.on("pm:create",(t=>{})),map.pm.setGlobalOptions({snapDistance:20}),map.pm.setPathOptions({color:"blue",weight:2});var redIcon=new L.Icon({iconUrl:"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});let locationButton=document.getElementById("btnGetLoc");var circlemarker;function animateSidebar(){$("#sidebar").animate({width:"toggle"},350,(function(){map.invalidateSize()}))}function sizeLayerControl(){$(".leaflet-control-layers").css("max-height",$("#map").height()-50)}function clearHighlight(){highlight.clearLayers()}function sidebarClick(t){var a=markerClusters.getLayer(t);map.setView([a.getLatLng().lat,a.getLatLng().lng],17),a.fire("click"),document.body.clientWidth<=767&&($("#sidebar").hide(),map.invalidateSize())}locationButton.addEventListener("click",(()=>{navigator.geolocation&&navigator.geolocation.getCurrentPosition((t=>{const a={lat:t.coords.latitude,lng:t.coords.longitude};map.setView([a.lat,a.lng],15);L.marker([a.lat,a.lng],{icon:redIcon}).addTo(map)}),(()=>{}))})),map.on("click",(function(t){0==drawcontrol_status&&(map.getZoom()>=7&&((circlemarker=L.circle([t.latlng.lat,t.latlng.lng],0).addTo(map).bindPopup("<img src='../img/address.png' width='28' height='28'>&nbsp; <b>Location Name:</b> <br> <img src='../img/location.png' width='40' height='25'>&nbsp; <b>Latitude:</b> "+t.latlng.lat+"<br> <img src='../img/location.png' width='40' height='25'>&nbsp; <b>Longitude:</b> "+t.latlng.lng).openPopup()).setStyle({color:"red"}),fetch("https://nominatim.openstreetmap.org/search.php?q="+t.latlng.lat+","+t.latlng.lng+"&polygon_geojson=1&format=json").then((t=>t.json())).then((a=>{var o=a[0].display_name;map.hasLayer(circlemarker)&&map.removeLayer(circlemarker),(circlemarker=L.circle([t.latlng.lat,t.latlng.lng],0).addTo(map).bindPopup("<img src='../img/address.png' width='28' height='28'>&nbsp; <b>Location Name:</b> "+o+"<br> <img src='../img/location.png' width='40' height='25'>&nbsp; <b>Latitude:</b> "+t.latlng.lat+"<br> <img src='../img/location.png' width='40' height='25'>&nbsp; <b>Longitude:</b> "+t.latlng.lng).openPopup()).setStyle({color:"red"})}))))})),$("#about-btn").click((function(){return $("#aboutModal").modal("show"),$(".navbar-collapse.in").collapse("hide"),!1})),$("#legend-btn").click((function(){return $("#legendModal").modal("show"),$(".navbar-collapse.in").collapse("hide"),!1})),$("#login-btn").click((function(){return $("#loginModal").modal("show"),$(".navbar-collapse.in").collapse("hide"),!1})),$("#list-btn").click((function(){return animateSidebar(),!1})),$("#nav-btn").click((function(){return $(".navbar-collapse").collapse("toggle"),!1})),$("#sidebar-toggle-btn").click((function(){return animateSidebar(),!1})),$("#sidebar-hide-btn").click((function(){return animateSidebar(),!1}));