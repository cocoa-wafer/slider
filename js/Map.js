var Map = {
    
    
    setMarker: function() {



         for (var i =0 ; i < Stations.latitude.length; i++) {
            var myLatlng = new google.maps.LatLng(Stations.latitude[i],Stations.longitude[i]);
            var marker = new google.maps.Marker({
                position: myLatlng,
                title:Stations.adresse[i],
                setMap:document.getElementById('map')
            });

        }; 
    },
    
  initMap: function() {
      
     var lyon = {lat:45.764043, lng:4.835658999999964};
     var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: lyon});

      
  }
    
};



