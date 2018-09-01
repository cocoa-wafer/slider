/* slider */    

    var Slider = {
        
        
        img = $("#carrousel img");
        
        
        avancer : function() {  
        
        var indexImg = img.length-1;
        var currentImg = img.eq(i);
        var i=0;
        var document = $(document); 
            
            
            
            i++; 
            if (i<=indexImg) {
                img.hide();
                currentImg = img.eq(i);
                currentImg.fadeIn();
            }
            else {
                i=indexImg;
            } 
        },
        
        reculer : function() {
                    var indexImg = img.length-1;
        var currentImg = img.eq(i);
        var i=0;
        var document = $(document); 
      
            i--;
            if (i>= 0) {
                img.hide();
                currentImg = img.eq(i);
                currentImg.fadeIn();
            }
            else {
                i=0;
            }
            
        },
        
        defiler: function() {
            
                    var indexImg = img.length-1;
        var currentImg = img.eq(i);
        var i=0;
        var document = $(document); 
             
            
            setTimeout(function(){

        
                if (i<indexImg) {
                    i++;
                    img.hide();
                    currentImg = img.eq(i);
                    currentImg.fadeIn();
                     
                }
                else {
                    i=0;
                    img.hide();
                    currentImg = img.eq(i);
                    currentImg.fadeIn();
                    
                }    
                this.defiler();  
            }, 3000);
        },
        
        init : function() {
            
            
    
            this.defiler();
            
            $('#next').on('click',function(){
                this.avancer();
            });
            
            $('#prev').on('click',function() {
                this.reculer();
            });
            
            $document.on('keydown',function(e) {
                if (e.keyCode ==39) {
                    this.avancer();
                }
                else if (e.keyCode ==37) {
                    this.reculer();
                }
            });
        }

    };
