$('document').ready(function(){
    
    var $img = $('#carrousel img'),
    $indexImg = $img.length-1,
    $currentImg = $img.eq(i);
    var i=0;
    var $document = $(document);
    
    var Slider = {
        avancer : function() {         
            
            i++; 
            if (i<=$indexImg) {
                $img.css('display','none');
                $currentImg = $img.eq(i);
                $currentImg.css('display','block');
            }
            else {
                i=$indexImg;
            } 
        },
        
        reculer : function() {
      
            i--;
            if (i>= 0) {
                $img.css('display','none');
                $currentImg = $img.eq(i);
                $currentImg.css('display','block');
            }
            else {
                i=0;
            }
            
        },
        
        defiler: function() {
            
            setTimeout(function(){
        
                if (i<$indexImg) {
                    i++;
                    $img.css('display','none');
                    $currentImg = $img.eq(i);
                    $currentImg.css('display','block');
                }
                else {
                    i=0;
                    $img.css('display','none');
                    $currentImg = $img.eq(i);
                    $currentImg.css('display','block');
                }    
                Slider.defiler();  
            }, 3000);
        },
        
        init : function() {

            Slider.defiler();
            
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

    Slider.init();
    
    
});
