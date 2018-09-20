var Map = {
    
    map: "", 
    markers: [],

    
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
            var velo = this.velodispo;
            var station = this.title;
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
            //affiche le form
            var formElt = document.createElement('form');
            formElt.id="formulaire";
            var prenomElt = document.createElement('p');
            var prenomInput = document.createElement('input');
            prenomInput.id="prenom";
            prenomElt.textContent = "Prénom: " ; 
            prenomElt.appendChild(prenomInput);
            
            var nomElt = document.createElement('p');
            var nomInput = document.createElement('input');
            nomInput.id="nom";
            nomElt.textContent = "Nom: ";
            nomElt.appendChild(nomInput);
            var signerElt = document.createElement('input');
            signerElt.id="signer";
            signerElt.type="button";
            signerElt.value="signer";
            
            formElt.appendChild(prenomElt);
            formElt.appendChild(nomElt);
            formElt.appendChild(signerElt);
            
            document.getElementById('resa').appendChild(formElt);
            
            //local sotrage nom prenom 
            if (localStorage.getItem('prenom')) {
                document.getElementById('prenom').value = prenom;
            };
            if (localStorage.getItem('nom')) {
                document.getElementById('nom').value=nom;
            };
            
            
            //affiche canva plus confirmation
            $('#signer').on('click',function(e) {
                e.preventDefault();
                
                if (velo >0) {
                    

                    Map.signature();
             
                    } else {
                        document.getElementById('velos').style.fontWeight = "bold";
                        document.getElementById('velos').style.color = "red";
                        
                    };
                
                
            });
            
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
    

    
    reserver: function() {
        
    },

    
   initMap: function() {
      
     var lyon = {lat:45.764043, lng:4.835658999999964};
     map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: lyon});

    }

};
