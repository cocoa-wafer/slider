var Canva = {
    myVar : "",
    signerElt:"",
    velo:"",
    station:"",
    
    getMousePos:function(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    },
    
    clearArea:function(ctx,canvas) {
        
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        document.getElementById('canva').removeAttribute('class');
    },
    
    canva: function() { 

        var canvas = document.getElementById('canva');
        var ctx = canvas.getContext('2d');
        var isDrawing;
        ctx.lineWidth = 4 ;

        
        $('#canva').on('mousedown',function(e){
            isDrawing = true;
            ctx.beginPath();
            var mousePos = Canva.getMousePos(canvas, e);
            ctx.moveTo(mousePos.x, mousePos.y);
            document.getElementById('canva').setAttribute('class','active');

        });
                
        $('#canva').on('mousemove',function(e){
            if (isDrawing) {
                var mousePos = Canva.getMousePos(canvas, e);
                ctx.lineTo(mousePos.x, mousePos.y);
                ctx.stroke();
            }
            
        });
                
        $('#canva').on('mouseup',function(){
            isDrawing = false;
        }); 
                
        $('#effacer').on('click',function(e){
            e.preventDefault();
            Canva.clearArea(ctx,canvas); 
         });


    },
    
    initResa:function() {
        
        document.getElementById('current').innerHTML = "";
        var canvaElt = document.createElement("canvas");
        canvaElt.id="canva";
        canvaElt.width = 200;
        canvaElt.height = 200;
        document.getElementById('current').appendChild(canvaElt);
        
        var boutonsElt = document.createElement('div');
        boutonsElt.id="boutons";
        
        var effacerElt = document.createElement('button');
        effacerElt.textContent = "effacer";
        effacerElt.id="effacer";
        
        var reserverElt = document.createElement('input');
        reserverElt.id="reserver";
        reserverElt.type="submit";
        reserverElt.value = " réserver";
        document.getElementById('current').appendChild(boutonsElt);
        document.getElementById('boutons').appendChild(effacerElt);
        document.getElementById('boutons').appendChild(reserverElt);
  
       Canva.canva(); 
    },
    
    initAnnulation:function() {
        
        document.getElementById('current').innerHTML = "";
        var annulerElt = document.createElement('button');
        annulerElt.id="annuler";
        annulerElt.textContent="annuler la reservation";
        document.getElementById('current').appendChild(annulerElt);
        
    },
    
    diminuerCompteur:function() {
                         
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
        document.getElementById('compteur').innerHTML = chaine;
        localStorage.setItem('difference',difference);   
                            
        if (difference >= 1200000) {
            document.getElementById('timer').innerHTML = "réservation expirée";
            Canva.Stop();
            localStorage.removeItem('station');
            localStorage.removeItem('velo');
            localStorage.removeItem('time');
            localStorage.removeItem('difference');
            document.getElementById('current').innerHTML="";
            document.getElementById('formulaire').appendChild(Canva.signerElt);

        }            
        
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

        
        Canva.myVar = setInterval(Canva.diminuerCompteur,1000); 
    },
    
    Stop: function() {
      clearInterval(Canva.myVar);  
    },
    
    formulaire:function() {
        
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
    
    },


    
    signature: function() {
    
        Canva.formulaire();
        document.getElementById('current').innerHTML="";
    
        $('#signer').on('click',function(e) {
            e.preventDefault();
            document.getElementById('formulaire').removeChild(Canva.signerElt);
            Canva.initResa();    
            Canva.resa();
        });

    },
    
    resa:function() {
    
        $('#reserver').on('click',function(e){
            e.preventDefault();
            prenom = $('#prenom').val();
            nom = $('#nom').val();
            localStorage.setItem('prenom',prenom);
            localStorage.setItem('nom',nom);

            if (localStorage.getItem('station')) {

                Canva.initAnnulation();
                var attentionElt = document.createElement('p');
                attentionElt.textContent ="station déjà réservée en attente";
                attentionElt.id="attention";
                document.getElementById('current').appendChild(attentionElt);
                document.getElementById('attention').style.color = "red";
                
                $('#annuler').on('click',function(){
                    Canva.annulResa();
                });
                
                    
                    
            } else {
                        
                if ($('#canva').hasClass('active')) {
                    if ((localStorage.getItem('prenom').length >=1) && (localStorage.getItem('nom').length>=1) ){
                        
                        document.getElementById('erreur').innerHTML="";
                        Canva.velo = Map.velo;
                        Canva.station = Map.station;
                        document.getElementById('timer').innerHTML="";
                        Canva.initAnnulation();
                        localStorage.setItem('velo',Canva.velo);
                        localStorage.setItem('station',Canva.station);
                        var resa = new Date();
                        var timestamp = resa.getTime();
                        localStorage.setItem('time', timestamp);
                        Canva.velo= Canva.velo-1;
                        document.getElementById('velos').textContent = "velos disponibles: " + Canva.velo;    
                        Canva.timer();

                        $('#annuler').on('click',function(){
                            Canva.annulResa();
                            document.getElementById('velos').textContent = "velos disponibles: " + Canva.velo;
                   
                        });
                        
                    } else {
                        
                        document.getElementById('erreur').textContent = "Renseignez votre nom et prénom";
                    }
                            
                } else {

                    document.getElementById('erreur').textContent = "Vous devez signer";
                            
                }
     
            }
  
        });   
    },

    annulResa:function() {
        
        Canva.Stop();
        Canva.velo = Canva.velo+1;
        localStorage.removeItem('station');
        localStorage.removeItem('velo'); 
        localStorage.removeItem('difference'); 
        localStorage.removeItem('time');
        document.getElementById('timer').textContent = "Reservation annulée";
        document.getElementById('formulaire').appendChild(Canva.signerElt);
        document.getElementById('current').innerHTML="";

    }
    
};