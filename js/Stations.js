var Stations = {
    
        latitude : [] ,
        longitude : [],
        adresse : [],
        status : [],
        veloDispo : [],
        placeDispo : [] ,
        
        ajaxGet : function(url,callback) {
            var req = new XMLHttpRequest();
            req.open("GET", url);
            req.addEventListener("load", function () {

                callback(req.responseText);
                Map.setMarker();
            });

            req.send(null);
        },

    
    
        init : function() {

            this.ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=5f4c43782f8af735195c2adbf714965642d1aca3", function(reponse) {

                var reponses = JSON.parse(reponse);

                reponses.forEach(function(reponse){
                    
                    Stations.latitude.push(reponse.position.lat);
                    Stations.longitude.push(reponse.position.lng);
                    Stations.adresse.push(reponse.address);
                    Stations.status.push(reponse.status);
                    Stations.veloDispo.push(reponse.available_bikes);
                    Stations.placeDispo.push(reponse.available_bike_stands);
                

                });
                
            }); 
        }
};
