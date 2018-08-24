
$(document).ready(function() {
   
 
var $carrousel = $('#carrousel'),
$img = $('#carrousel img'),
$indexImg = $img.length-1,
i=0,
$currentImg = $img.eq(i);

$img.css('display','none');
$currentImg.css('display','block');


$(document).keydown(function(e){
        if (e.keyCode == 39) {
            i++; 
            if (i<=$indexImg) {
                $img.css('display','none');
                $currentImg = $img.eq(i);
                $currentImg.css('display','block');
            }
            else {
                i=$indexImg;
            } 
        }       
});



$(document).keydown(function(e){
        if (e.keyCode == 37) {
            i--;
            if (i>= 0) {
            $img.css('display','none');
            $currentImg = $img.eq(i);
            $currentImg.css('display','block');
            }
            else {
            i=0;
            }
        }
});



function defiler(){

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
        defiler();  
    }, 3000);
}

defiler();
                 
                  
});

