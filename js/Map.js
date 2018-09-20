var Map = {
    
    map: "", 
    markers: [],
    velo: "",
    station: "",

    
    setMarker: function() {
        
        
        //creation de la boucle avdec les infos de station
         for (var i =0 ; i < Stations.latitude.length; i++) {
            var myLatlng = new google.maps.LatLng(Stations.latitude[i],Stations.longitude[i]);
             //creation des markers
            var marker = new google.maps.Marker({
                position: myLatlng,
                title:Stations.adresse[i],
                status:Stations.status[i],
                placedispo:Stations.placeDispo[i],
                velodispo:Stations.veloDispo[i],
                icon:"",
                map:map
            });
             
             //event specialise pour chaque marker
        marker.addListener('click', function() {
            Map.station = this.title;
            Map.velo = this.velodispo;
            
            document.getElementById('status').innerHTML = " ";
            document.getElementById('resa').innerHTML = " ";
            
            // affiche le statut                  
            
            var titreElt = document.createElement('h2');
            titreElt.textContent = 'DETAILS DE LA STATION';
            var adresseElt = document.createElement('p');
            adresseElt.textContent = "Adresse: " + this.title;
            var placeElt = document.createElement('p');
            placeElt.textContent= "Places disponibles: " + this.placedispo;
            var veloElt = document.createElement('p');
            veloElt.id="velos"
            veloElt.textContent = "Vélos disponibles: " + this.velodispo;
            
            document.getElementById('status').appendChild(titreElt);
            document.getElementById('status').appendChild(adresseElt);
            document.getElementById('status').appendChild(placeElt);
            document.getElementById('status').appendChild(veloElt); 
            

                //affiche form plus signature si velo dispos
                if (this.velodispo >0) {
                    
                    // affiche le bouton signer et le formulaire
                    Canva.signature();

                       

                    
                    
                   // Map.reserver();
             
                    } else if (this.velodispo === 0) {
                        document.getElementById('velos').style.fontWeight = "bold";
                        document.getElementById('velos').style.color = "red";
                        
                    };

        }); 
            
             
             
            if (marker.status === "OPEN") {
                if (marker.velodispo > 0) {
                    if (marker.placedispo >0) {
                      marker.icon = 'file:///C:/Users/phebi/Desktop/DWJ/projet3/images/velo.png';

                    } else {
                      marker.icon = 'file:///C:/Users/phebi/Desktop/DWJ/projet3/images/out.png';

                    }

                } else {
                   marker.icon ='file:///C:/Users/phebi/Desktop/DWJ/projet3/images/parking.png';

                } 
                
            
            } else  {
              marker.icon = "file:///C:/Users/phebi/Desktop/DWJ/projet3/images/ferme.png";

            }
             
            this.markers.push(marker);

             
        }; 
        
        var options = {
            imagePath:   'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' 
        };

       var markerCluster = new MarkerClusterer(map, this.markers, options);

    },

    
   initMap: function() {
      
     var lyon = {lat:45.764043, lng:4.835658999999964};
     map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: lyon});

    }

};
