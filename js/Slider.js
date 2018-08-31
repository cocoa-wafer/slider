/* slider */    


var $img = $('#carrousel img'),
    $indexImg = $img.length-1,
    $currentImg = $img.eq(i);
    var i=0;
    var $document = $(document); 


    var Slider = {

        avancer : function() {         
            
            i++; 
            if (i<=$indexImg) {
                $img.hide();
                $currentImg = $img.eq(i);
                $currentImg.fadeIn();
            }
            else {
                i=$indexImg;
            } 
        },
        
        reculer : function() {
      
            i--;
            if (i>= 0) {
                $img.hide();
                $currentImg = $img.eq(i);
                $currentImg.fadeIn();
            }
            else {
                i=0;
            }
            
        },
        
        defiler: function() {
            
            setTimeout(function(){
        
                if (i<$indexImg) {
                    i++;
                    $img.hide();
                    $currentImg = $img.eq(i);
                    $currentImg.fadeIn();
                }
                else {
                    i=0;
                    $img.hide();
                    $currentImg = $img.eq(i);
                    $currentImg.fadeIn();
                }    
                Slider.defiler();  
            }, 3000);
        },
        
        init : function() {
            
            Slider.defiler();
            
            $('#next').on('click',function(){
                Slider.avancer();
            });
            
            $('#prev').on('click',function() {
                Slider.reculer();
            });
            
            $document.on('keydown',function(e) {
                if (e.keyCode ==39) {
                    Slider.avancer();
                }
                else if (e.keyCode ==37) {
                    Slider.reculer();
                }
            });
        }

    };
