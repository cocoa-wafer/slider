var Canva = {
    
    
signature: function() {
    
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
            
    
    
                //declare le canva
            var canvaElt = document.createElement("canvas");
                canvaElt.id="canva";
                var reserverElt = document.createElement('input');
                reserverElt.id="reserver";
                reserverElt.type="submit";
                reserverElt.value = " réserver";
    
                
                //recup infos station et velo
                var velo = Map.velo;
                var station = Map.station;
    
    
               
    
            //local sotrage nom prenom 
          /* if (localStorage.getItem('prenom')) {
                document.getElementById('prenom').value = prenom;
            };
            if (localStorage.getItem('nom')) {
                document.getElementById('nom').value=nom;
            };   */ 

    
            $('#signer').on('click',function(e) {
                e.preventDefault();
                
    
                //affiche canva plus bton reserver et sup bton signer

                document.getElementById('resa').appendChild(canvaElt);
                document.getElementById('formulaire').removeChild(signerElt);
                document.getElementById('formulaire').appendChild(reserverElt);

                  //canva   
               /* var el = document.getElementById('canva');
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
                }); */
                    

    
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
                        attentionElt.textContent ="station déjà réservée en attente";
                        annulerElt.id="annuler";
                        attentionElt.id="attention";
                        annulerElt.textContent="annuler la reservation";
                   
                   
                //si les elements sont rassembles 
                    
                    if (sessionStorage.getItem('station')) {

                        document.getElementById('formulaire').removeChild(reserverElt);
                        document.getElementById('resa').removeChild(canvaElt);
                        
                        document.getElementById('resa').appendChild(attentionElt);
                        document.getElementById('resa').appendChild(annulerElt);
                        document.getElementById('attention').style.color = "red";
                        
                        
                        
                         document.getElementById('timer').textContent = "Station déjà réservée en attente";
                    
                    
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
                        document.getElementById('velos').textContent = "velos disponibles: " + velo;
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
                             document.getElementById('velos').textContent = "vélos disponibles: " + velo;
                            clearInterval(myVar);
                            
                        });
                        
                    }
            
                
                }); 
                
                
                
            });


    }
    
};