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
   
    const markers = [
        [
            "Park 1",
            43.21996064206081, 
            -79.97880345765851
        ],
        [
            "Park 2",
            43.21226910984359, 
            -79.91965472788796
        ]
    ];

    for(let i=0; i<markers.length; i++) {
        const currentMarker = markers[i];

        const marker = new google.maps.Marker({
            map: map,
            // title: markers[0],
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(currentMarker[1], currentMarker[2]),
            icon: markerIcon
        });
    }
}