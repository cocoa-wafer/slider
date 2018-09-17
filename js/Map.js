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
            var signerElt = document.createElement('input');
            signerElt.id="signer";
            signerElt.type="button";
            signerElt.value="signer";
            
            formElt.appendChild(prenomElt);
            formElt.appendChild(nomElt);
            formElt.appendChild(signerElt);
            
            document.getElementById('resa').appendChild(formElt);
            
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
                    
 
                
                
                var canvaElt = document.createElement("canvas");
                canvaElt.id="canva";
                document.getElementById('resa').appendChild(canvaElt);
                var reserverElt = document.createElement('input');
                reserverElt.id="reserver";
                reserverElt.type="submit";
                reserverElt.value = " réserver";
                document.getElementById('formulaire').removeChild(signerElt);
                document.getElementById('formulaire').appendChild(reserverElt);



   
                  //canva   
                var el = document.getElementById('canva');
                var ctx = el.getContext('2d');
                var isDrawing;
                                    
          
                
                $('#canva').on('mousedown',function(e){
                        isDrawing = true;
                        ctx.moveTo(e.clientX, e.clientY);
                });
                
                $('#canva').on('mousemove',function(e){
                        if (isDrawing) {
                        ctx.lineTo(e.clientX, e.clientY);
                        ctx.stroke();
                    }
                });
                
                $('#canva').on('mouseup',function(){
                     isDrawing = false;
                });
                
                

                
                //reservation
                $('#reserver').on('click',function(e){
                    //ajouter condition de formulaire rempli plus canva rempli
                    e.preventDefault();
                    document.getElementById('timer').textContent="";
                    
                    //stocke dans le storage
                    prenom = $('#prenom').val();
                    nom = $('#nom').val();
                    localStorage.setItem('prenom',prenom);
                    localStorage.setItem('nom',nom);
                    var annulerElt = document.createElement('button');
                        var attentionElt = document.createElement('p');
                        attentionElt.textContent ="station deja reservee en attente";
                        annulerElt.id="annuler";
                        attentionElt.id="attention";
                        annulerElt.textContent="annuler la reservation";
                //si les elements sont rassembles 
                    
                    if (sessionStorage.getItem('station')) {

                        document.getElementById('formulaire').removeChild(reserverElt);
                        document.getElementById('resa').removeChild(canvaElt);
                        
                        document.getElementById('resa').appendChild(attentionElt);
                        document.getElementById('resa').appendChild(annulerElt);
                        
                        
                        
                         document.getElementById('timer').textContent = "Station deja reservee en attente";
                    
                    
                        $('#annuler').on('click',function(){
                            sessionStorage.removeItem('station');
                        sessionStorage.removeItem('velo');
     
                           document.getElementById('resa').removeChild(attentionElt);
                            document.getElementById('resa').removeChild(annulerElt); 
                            
                            document.getElementById('formulaire').appendChild(reserverElt);
                        document.getElementById('resa').appendChild(canvaElt);
                            
                            document.getElementById('timer').textContent = "Reservation annulée";

                        });
                    
                    
                    } else {

                        velo= velo-1;
                        document.getElementById('velos').textContent = "velos dispos: " + velo;
                        //stocke dans le storage
                        sessionStorage.setItem('station',station);
                        sessionStorage.setItem('velo',velo);

                        var stationResa = sessionStorage.getItem('station');
                        var veloRestant = sessionStorage.getItem('velo');
                        var prenomResa = localStorage.getItem('prenom');
                        var nomResa = localStorage.getItem('nom');

                        
                        document.getElementById('formulaire').removeChild(reserverElt);
                        document.getElementById('resa').removeChild(canvaElt);
                        
                        document.getElementById('resa').appendChild(annulerElt); 
                
                        var recapElt = document.createElement('p');
                        recapElt.id="recap";
                        recapElt.textContent += " Vélo réservé à la station " + stationResa + " par " + prenom + " " + nom ; 
                        document.getElementById('timer').appendChild(recapElt);
                        

                        //decompte 
                        
                        
                        
                        //affiche le texte 
                        var tempsRestant = document.createElement('p');
                        tempsRestant.id="timeLeft";
                        tempsRestant.textContent = "Temps restant: " ;
                        document.getElementById('timer').appendChild(tempsRestant);
                        
                        var compteurElt = document.createElement('span');
                        compteurElt.id = "compteur";
                        document.getElementById('timeLeft').appendChild(compteurElt);
                        
                        
                        var d = new Date();
                        //timestamp en millisecondes t1 stocké
                        var timestamp = d.getTime();
                        sessionStorage.setItem('time',timestamp);
                        
                        var difference = 0;
                        
                            var min = 20 ;
                            var sec = "0"+0 ;
                            var time = min + " : " + sec;
                  
                        // Diminue le compteur jusqu'à 0
                        function diminuerCompteur() {
                            //recup premiere date
                            var resaTimestamp = sessionStorage.getItem('time');
                            //cree date de comparaison timestamp qui se renouvelle a chaque seconde
                            var e = new Date();
                            var f= e.getTime();
                            
                            // part de 0 puis augmente. millisecondes de difference par seconde.
                            difference = f - resaTimestamp;

                                    if (sec == 0) {
                                        
                                        if (min != 0) {
                                            min--;
                                            sec = 59;
                                            if (min < 10) {
                                                min = "0" + min;
                                            }
                                        }
                                         compteurElt.innerHTML = min + ":" + sec + " minutes." ;
                                    } else {
                                        
                                        sec--;
                                        if (sec < 10) { 
                                            sec = "0" + sec;
                                        }
                                         compteurElt.innerHTML = min + ":" + sec + " minutes" ;
                                    } 

                            
                            
                            
                            if (difference >= 1200000) {
                                 document.getElementById('timer').innerHTML = "réservation expirée";
                                
                                  sessionStorage.removeItem('station');
                        sessionStorage.removeItem('velo');
                                 document.getElementById('resa').removeChild(annulerElt);                
                                document.getElementById('formulaire').appendChild(reserverElt);
                                document.getElementById('resa').appendChild(canvaElt);
    
                            }
                        }
                        
                        var myVar = setInterval(diminuerCompteur,1000);

                        
                        $('#annuler').on('click',function(){
                            velo = velo+1;
                            document.getElementById('velos').textContent = "velos dispos: " + velo;
                             sessionStorage.removeItem('station');
                        sessionStorage.removeItem('velo');
                                
                            document.getElementById('resa').removeChild(annulerElt); 
                            
                            document.getElementById('formulaire').appendChild(reserverElt);
                        document.getElementById('resa').appendChild(canvaElt);
                            
                            document.getElementById('timer').textContent = "Reservation annulée";
                             document.getElementById('velos').textContent = "vélos dispos: " + velo;
                            clearInterval(myVar);
                            
                        });
                        
                    }
            
                
                });

             
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

    
   initMap: function() {
      
     var lyon = {lat:45.764043, lng:4.835658999999964};
     map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: lyon});

    }

};
