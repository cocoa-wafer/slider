var Canva = {
    myVar : "",
    signerElt:"",
    canva: function() { 
                  
             var el = document.getElementById('canva');

                var ctx = el.getContext('2d');
                ctx.width=200;
                ctx.height=200;
                var isDrawing;
                ctx.lineWidth = 6 ;
    
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
                
                
                $('#effacer').on('click',function(e){
                    e.preventDefault();
                    clearArea(); 
                }); 

    },
    initResa:function() {
        
        document.getElementById('current').innerHTML = "";
         var canvaElt = document.createElement("canvas");
            canvaElt.id="canva";
            canvaElt.width = 200;
            canvaElt.height = 200;
        document.getElementById('current').appendChild(canvaElt);
        
        
         var effacerElt = document.createElement('button');
                effacerElt.textContent = "effacer";
                effacerElt.id="effacer";
                document.getElementById('current').appendChild(effacerElt);
        Canva.canva();
        var reserverElt = document.createElement('input');
                reserverElt.id="reserver";
                reserverElt.type="submit";
                reserverElt.value = " réserver";
        document.getElementById('current').appendChild(reserverElt);
    },
    
    initAnnulation:function() {
        
        document.getElementById('current').innerHTML = "";
        var annulerElt = document.createElement('button');
                        annulerElt.id="annuler";
                        annulerElt.textContent="annuler la reservation";
        document.getElementById('current').appendChild(annulerElt);
        
    },
    
    formulaire:function() {
        
    },
    
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
                          
                            
                          if (difference >= 10000) {
                                document.getElementById('timer').innerHTML = "réservation expirée";
                                Canva.Stop();
                                localStorage.removeItem('station');
                                localStorage.removeItem('velo');
                                localStorage.removeItem('time');
                                localStorage.removeItem('difference');
                                document.getElementById('current').innerHTML="";
                              
                                 document.getElementById('formulaire').appendChild(Canva.signerElt);

    
                            } 
                            
                           localStorage.setItem('difference',difference); 
                        }
                        
                Canva.myVar = setInterval(diminuerCompteur,1200000); 




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
            Canva.signerElt = document.createElement('input');
            Canva.signerElt.id="signer";
            Canva.signerElt.type="button";
            Canva.signerElt.value="signer";
            
            formElt.appendChild(prenomElt);
            formElt.appendChild(nomElt);
            formElt.appendChild(Canva.signerElt);
            
            document.getElementById('resa').appendChild(formElt);

            //local sotrage nom prenom 
    
            if (localStorage.getItem('prenom')) {
                document.getElementById('prenom').value = localStorage.getItem('prenom');
                document.getElementById('nom').value= localStorage.getItem('nom');
    
            }; 
    document.getElementById('current').innerHTML="";
    
            $('#signer').on('click',function(e) {
                e.preventDefault();
                document.getElementById('formulaire').removeChild(Canva.signerElt);
                Canva.initResa();
                

               $('#reserver').on('click',function(e){
                    e.preventDefault();
                    //stocke dans le storage
                    prenom = $('#prenom').val();
                    nom = $('#nom').val();
                    localStorage.setItem('prenom',prenom);
                    localStorage.setItem('nom',nom);

                    if (localStorage.getItem('station')) {
   
                        //affiche annuler plus mesqage deja reserve en plus 
                        Canva.initAnnulation();
                        var attentionElt = document.createElement('p');
                        attentionElt.textContent ="station déjà réservée en attente";
                        attentionElt.id="attention";
                        document.getElementById('current').appendChild(attentionElt);
                        document.getElementById('attention').style.color = "red";
                        

                    
                        $('#annuler').on('click',function(){
                            
                            //affiche fonction reserver plus message annule plus un velo en plus
                            velo = velo+1;
                            document.getElementById('velos').textContent = "velos dispos: " + velo;
                            Canva.Stop();
                            localStorage.removeItem('station');
                            localStorage.removeItem('velo'); 
                            localStorage.removeItem('time');
                            document.getElementById('current').removeChild(attentionElt);
                            document.getElementById('timer').textContent = "Reservation annulée";
                            document.getElementById('formulaire').appendChild(Canva.signerElt);
                            document.getElementById('current').innerHTML="";

                        });
                    
                    
                    } else {
                                        //recup infos station et velo
                            var velo = Map.velo;
                            var station = Map.station;
                        //affiche fonction annuler
                        document.getElementById('timer').innerHTML="";
                        Canva.initAnnulation();
                        //stocke dans le storage
                        localStorage.setItem('velo',velo);
                        localStorage.setItem('station',station);
                        var resa = new Date();
                        var timestamp = resa.getTime();
                        localStorage.setItem('time', timestamp);

                        velo= velo-1;
                        document.getElementById('velos').textContent = "velos disponibles: " + velo;
                
                        
                        Canva.timer();

                          $('#annuler').on('click',function(){
                              //affiche fonction reserver
                            document.getElementById('formulaire').appendChild(Canva.signerElt);
                              document.getElementById('current').innerHTML="";
                            velo = velo+1;
                            document.getElementById('velos').textContent = "velos dispos: " + velo;
                            Canva.Stop();
                            localStorage.removeItem('station');
                            localStorage.removeItem('velo'); 
                            localStorage.removeItem('time');
                            
                            document.getElementById('timer').textContent = "Reservation annulée";

                              
                           
                            
                        });
                    }
            
                
                   
                   
                }); 
                
                
            });


    }
    
};