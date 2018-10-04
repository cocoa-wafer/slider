/* slider */  


    var Slider = {
        
        
        img : $("#carrousel img"),
        i:0,
        
        avancer : function() {  
        
        var indexImg = this.img.length-1;
        var currentImg = this.img.eq(this.i);
            
            
            this.i++; 
            if (this.i<=indexImg) {
                this.img.hide();
                currentImg = this.img.eq(this.i);
                currentImg.fadeIn();
            }
            else {
                this.i=indexImg;
            } 
        },
        
        reculer : function() {
        var indexImg = this.img.length-1;
        var currentImg = this.img.eq(this.i);
      
            this.i--;
            if (this.i>= 0) {
                this.img.hide();
                currentImg = this.img.eq(this.i);
                currentImg.fadeIn();
            }
            else {
                this.i=0;
            }
            
        },
        
        defiler: function() {

            var indexImg = this.img.length-1;
            var currentImg = this.img.eq(this.i);
             
            
            setTimeout(function(){

        
                if (Slider.i<indexImg) {
                    Slider.i++;
                    Slider.img.hide();
                    currentImg = Slider.img.eq(Slider.i);
                    currentImg.fadeIn();
                     
                }
                else {
                    Slider.i=0;
                    Slider.img.hide();
                    currentImg = Slider.img.eq(Slider.i);
                    currentImg.fadeIn();
                    
                }    
                Slider.defiler();  
            }, 3000);
        },
        
        init : function() {
            
        var This = this;
 
    
            this.defiler();
            
            $('#next').on('click',function(){
                This.avancer();
            });
            
            $('#prev').on('click',function() {
                This.reculer();
            });
            
           $(document).on('keydown',function(e) {
                if (e.keyCode ==39) {
                    This.avancer();
                }
                else if (e.keyCode ==37) {
                    This.reculer();
                }
            });
        }

    };

//descriptif du concept dans slider avec les marqueurs