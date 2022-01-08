let map;
function initMap() {
    map = new google.maps.Map(
        document.getElementById("map"), 
        {
            center: {lat: 43.25472411693157, lng: -79.85625161100032},
            zoom: 8,
            mapId: '6a6625a538e03514' 
        });
}