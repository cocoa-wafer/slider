var Map = {
    
    map: "", 
    markers: [],
    setMarker: function() {

         for (var i =0 ; i < Stations.latitude.length; i++) {
            var myLatlng = new google.maps.LatLng(Stations.latitude[i],Stations.longitude[i]);
            var marker = new google.maps.Marker({
                position: myLatlng,
                title:Stations.adresse[i],
                status:Stations.status[i],
                placedispo:Stations.placeDispo[i],
                velodispo:Stations.veloDispo[i],

                map:map
            });
            this.markers.push(marker);
            marker.addListener('click', function() {
                document.getElementById('status').textContent = " statut : " + marker.status;
                document.getElementById('status').textContent += " places disponibles : " + marker.placedispo;
                document.getElementById('status').textContent += " velos disponibles : " + marker.velodispo;
            });
        }; 

        
        var options = {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        // ajouter conditions pour differents marqueurs
        };

        var markerCluster = new MarkerClusterer(map, this.markers, options);

    },
    
    
    
  initMap: function() {
      
     var lyon = {lat:45.764043, lng:4.835658999999964};
     map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: lyon});

    }
    // nouvelle fonction pour gérer les réservations 
};



