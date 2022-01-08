let map;
function initMap() {
    map = new google.maps.Map(
        document.getElementById("map"), 
        {
            center: {lat: 43.25472411693157, lng: -79.85625161100032},
            zoom: 8,
            mapId: '6a6625a538e03514',
            disableDefaultUI: true
        });
    
    const markerIcon = "https://cdn.discordapp.com/attachments/696724423733936212/929449261802852453/balltrack_mapmarker_icon.png";

    const marker = new google.maps.Marker({
        map: map,
        title: "Park 1",
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(43.21993287575519, -79.94853876072719),
        icon: markerIcon
    });

}