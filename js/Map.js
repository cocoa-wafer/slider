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
                icon:"",
                map:map
            });

             
        marker.addListener('click', function() {
            var velo = this.velodispo;
            var station = this.title;
            var prenom = $('#prenom').val();
            var nom = $('#nom').val();
            
            document.getElementById('status').innerHTML = " ";
            document.getElementById('resa').innerHTML = " ";
            
            // affiche le statut                  
            
            var titreElt = document.createElement('h2');
            titreElt.textContent = 'détails de la station';
            var adresseElt = document.createElement('p');
            adresseElt.textContent = "adresse: " + this.title;
            var placeElt = document.createElement('p');
            placeElt.textContent= "place dispo: " + this.placedispo;
            var veloElt = document.createElement('p');
            veloElt.id="velos"
            veloElt.textContent = "velos dispos: " + this.velodispo;
            
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
            var reserverElt = document.createElement('input');
            reserverElt.id="reserver";
            reserverElt.type="submit";
            reserverElt.value="reserver";
            
            formElt.appendChild(prenomElt);
            formElt.appendChild(nomElt);
            formElt.appendChild(reserverElt);
            
            document.getElementById('resa').appendChild(formElt);
            
            
            //gere les resa
            $('#reserver').on('click',function(e) {
                document.getElementById('timer').textContent="";
                
                if (sessionStorage.getItem('station')) {
                    e.preventDefault();
                    console.log('if marche');
                    var annulerElt = document.createElement('button');
                    annulerElt.id="annuler";
                    annulerElt.textContent="annuler la reservation";
                    document.getElementById('resa').appendChild(annulerElt);
                    
                    
                    $('#annuler').on('click',function(){
                        window.sessionStorage.clear();
   
                    document.getElementById('timer').textContent = "Reservation annulée";
                                            velo = velo+1;
                          document.getElementById('velos').textContent = "velos dispos: " + velo;
            });
                    
                    
                } else {
                    
                    e.preventDefault();
                    console.log('else marche');
                    velo= velo-1;
                    //affiche le canva
                    var canvaElt = document.createElement("canva");
                    document.getElementById('status').appendChild(canvaElt);

                    //stocke dans le storage
                    sessionStorage.setItem('station',station);
                    sessionStorage.setItem('velo',velo);
                    localStorage.setItem('prenom',prenom);
                    localStorage.setItem('nom',nom);

                    var stationResa = sessionStorage.getItem('station');
                    var veloRestant = sessionStorage.getItem('velo');
                    var prenomResa = localStorage.getItem('prenom');
                    var nomResa = localStorage.getItem('nom');

                
                    var recapElt = document.createElement('p');
                    recapElt.id="recap";
                    recapElt.textContent += " Vélo réservé à la station " + stationResa + " par " + prenom + " " + nom ; 
                
                    var tempsRestant = document.createElement('p');
                    tempsRestant.textContent = "Temps restant: ";
                    document.getElementById('timer').appendChild(recapElt);
                    document.getElementById('timer').appendChild(tempsRestant);
                    
                      document.getElementById('velos').textContent = "velos dispos: " + velo;
                }
                
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

    
   initMap: function() {
      
     var lyon = {lat:45.764043, lng:4.835658999999964};
     map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: lyon});

    }

};
