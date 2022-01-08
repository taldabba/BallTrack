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
    
    const parkIcon = "../images/balltrack_mapmarker.png";

    const icons = { 
        park: {
            icon: parkIcon
        }
    };

    const features = [
        {
            position: new google.maps.LatLng(43.22001133661375, -79.94849177318447),
            type: "park"
        }];

    for (let i = 0; i < features.length; i++) {
        const marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            map: map
        });
    }
}