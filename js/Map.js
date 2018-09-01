var Map = {
    
    setMarker : function() {
        var reponses = Stations.init();
        
        var stations = [];
        reponses.forEach(function(reponse) {
            stations.push(reponse);
        });

        for (var i =0 ; i < stations.length; i++) {
            var LatLng = new google.maps.LatLng(stations[i].position.lat,stations[i].position.lng);
            var marker = new.google.maps.Marker({
            position: LatLng,
            title : stations[i].address;
        });
            marker.setMap(this.initMap()); 
        }

        
        

    }, 
    
  initMap: function() {
      
      var lyon = {lat:45.764043, lng:4.835658999999964};
      var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: lyon});
      
  }
    
};
