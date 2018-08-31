var Map = {
    
    setMarker : function() {

        /*var LatLng = new google.maps.LatLng(station.lat,station.lng);
        var marker = new.google.maps.Marker({
            position: LatLng,
            title : station.address;
        });
        marker.setMap(map); */
        
        var reponse = Stations.init();
        console.log(reponse);
    }, 
    
  initMap: function() {
      
      var lyon = {lat:45.764043, lng:4.835658999999964};
      var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: lyon});
      
  }
    
};
