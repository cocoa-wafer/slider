var Canva = {
    myVar : "",
    timer:function() {
        
                        var recapElt = document.createElement('p');
                        recapElt.id="recap";
                        recapElt.textContent += " Vélo réservé à la station " + localStorage.getItem('station') + " par " + localStorage.getItem('prenom') + " " + localStorage.getItem('nom') ; 
                        document.getElementById('timer').appendChild(recapElt);
        
                        //affiche le texte 
                        var tempsRestant = document.createElement('p');
                        tempsRestant.id="timeLeft";
                        tempsRestant.textContent = "Temps écoulé: " ;
                        document.getElementById('timer').appendChild(tempsRestant);
                        
                        var compteurElt = document.createElement('span');
                        compteurElt.id = "compteur";
                        document.getElementById('timeLeft').appendChild(compteurElt);
                  
                        // Diminue le compteur jusqu'à 0
                      function diminuerCompteur() {
                         
                        var e = new Date();
                        var resaTimestamp = localStorage.getItem('time');
                        var f= e.getTime();
                           
                           
                        // difference en ms entre resa et maintenant
                        var difference = f - resaTimestamp;
                            //un temps en millisecondes
                        var t = (difference);
                          //secondes
                        var s = Math.floor(t / 1000) % 60;
                        //minutes
                        var m = Math.floor(t / 60000) % 60;
                        //affichage
                        var chaine = m+":"+s+ "minutes";
                        compteurElt.innerHTML = chaine;
                            
                            
                          if (difference >= 1200000) {
                                document.getElementById('timer').innerHTML = "réservation expirée";
                                Canva.Stop();
                                localStorage.removeItem('station');
                                localStorage.removeItem('velo');
                                localStorage.removeItem('time');
                                localStorage.removeItem('difference');
                                

                              
                            // $('#annuler').hide();
                                //document.getElementById('formulaire').appendChild(reserverElt);
                            //  document.getElementById('resa').appendChild(canvaElt); 
                                
                            
    
                            } 
                            
                          localStorage.setItem('difference',difference);
                        }
                        
                Canva.myVar = setInterval(diminuerCompteur,1000); 




    },
    
Stop: function() {
      clearInterval(Canva.myVar);  
    },
    


    
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
            
    
    //effacer
            //declare le canva
    
                
                //recup infos station et velo
                var velo = Map.velo;
                var station = Map.station;
    
    
               
    
            //local sotrage nom prenom 
    
            if (localStorage.getItem('prenom')) {
                document.getElementById('prenom').value = localStorage.getItem('prenom');
                document.getElementById('nom').value= localStorage.getItem('nom');
                
                
                
            }; 
    


    
            $('#signer').on('click',function(e) {
                e.preventDefault();
                var canvaElt = document.createElement("canvas");
                canvaElt.id="canva";
                var reserverElt = document.createElement('input');
                reserverElt.id="reserver";
                reserverElt.type="submit";
                reserverElt.value = " réserver";
                 document.getElementById('resa').appendChild(canvaElt);
                document.getElementById('formulaire').removeChild(signerElt);

                document.getElementById('formulaire').appendChild(reserverElt);
        

                //canva   
               var el = document.getElementById('canva');
                el.width  = $(window).width();
                el.height=1000;
                var ctx = el.getContext('2d');
                var isDrawing;
                ctx.lineWidth = 10 ;
    
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
                

               function clearArea() {
                ctx.setTransform(1, 0, 0, 1, 0, 0);
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
                
                var effacerElt = document.createElement('button');
                effacerElt.textContent = "effacer";
                effacerElt.id="effacer";
                document.getElementById('resa').appendChild(effacerElt);
                $('#effacer').on('click',function(e){
                    e.preventDefault();
                    clearArea(); 
                }); 
                

                    

    
               $('#reserver').on('click',function(e){
                    e.preventDefault();
                   document.getElementById('resa').removeChild(effacerElt);
                 //   document.getElementById('timer').textContent="";
                    //stocke dans le storage
                    prenom = $('#prenom').val();
                    nom = $('#nom').val();
                    localStorage.setItem('prenom',prenom);
                    localStorage.setItem('nom',nom);
                    
                   //effacer
                     var annulerElt = document.createElement('button');
                        var attentionElt = document.createElement('p');
                        attentionElt.textContent ="station déjà réservée en attente";
                        annulerElt.id="annuler";
                        attentionElt.id="attention";
                        annulerElt.textContent="annuler la reservation";

                   
                   
                //si les elements sont rassembles 
                    
                    if (localStorage.getItem('station')) {
   
                        //affiche annuler plus mesqage deja reserve en plus 
                        document.getElementById('formulaire').removeChild(reserverElt);
                        document.getElementById('resa').removeChild(canvaElt);
                        
                        document.getElementById('resa').appendChild(attentionElt);
                        document.getElementById('resa').appendChild(annulerElt);
                        document.getElementById('attention').style.color = "red";
                        
                        
                    
                    
                        $('#annuler').on('click',function(){
                            
                            //affiche fonction reserver plus message annule plus un velo en plus
                                       velo = velo+1;
                            document.getElementById('velos').textContent = "velos dispos: " + velo;
                            Canva.Stop();
                            localStorage.removeItem('station');
                            localStorage.removeItem('velo'); 
                            localStorage.removeItem('time');
                                
                            document.getElementById('resa').removeChild(annulerElt); 
                            document.getElementById('resa').removeChild(attentionElt);
                            document.getElementById('resa').appendChild(effacerElt);
              
                            document.getElementById('formulaire').appendChild(reserverElt);
                        document.getElementById('resa').appendChild(canvaElt);
                            
                            document.getElementById('timer').textContent = "Reservation annulée";


                        });
                    
                    
                    } else {
                        
                        //affiche fonction annuler
                        document.getElementById('timer').innerHTML="";

                        //stocke dans le storage
                        localStorage.setItem('velo',velo);
                        localStorage.setItem('station',station);
                        var resa = new Date();
                        var timestamp = resa.getTime();
                        localStorage.setItem('time', timestamp);

                        velo= velo-1;
                        document.getElementById('velos').textContent = "velos disponibles: " + velo;

              
                        document.getElementById('formulaire').removeChild(reserverElt);
                        document.getElementById('resa').removeChild(canvaElt);
                        
                        document.getElementById('resa').appendChild(annulerElt); 
                
                        
                        Canva.timer();

                          $('#annuler').on('click',function(){
                              //affiche fonction reserver
                            velo = velo+1;
                            document.getElementById('velos').textContent = "velos dispos: " + velo;
                            Canva.Stop();
                            localStorage.removeItem('station');
                            localStorage.removeItem('velo'); 
                            localStorage.removeItem('time');
 
                            document.getElementById('resa').removeChild(annulerElt); 
              
                            document.getElementById('formulaire').appendChild(reserverElt);
                        document.getElementById('resa').appendChild(canvaElt);
                        document.getElementById('resa').appendChild(effacerElt);
                            
                            document.getElementById('timer').textContent = "Reservation annulée";

                              
                           
                            
                        });
                    }
            
                
                   
                   
                }); 
                
                
            });


    }
    
};