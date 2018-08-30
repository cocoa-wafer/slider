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



/* initialiser la map google */

var Map = {
    
    
  initMap: function() {
      
      var lyon = {lat:45.764043, lng:4.835658999999964};
      var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: lyon});
     /* var marker = new google.maps.Marker({position: lyon, map: map}); */
      
  }
    
};

Map.initMap();


/*  jcdecaux   */


var Stations = {
    
        ajaxGet : function(url,callback) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.addEventListener("load", function () {
                callback(req.responseText);
        });

        req.send(null);
        },
    
    
        init : function() {
            Stations.ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=8a21045d07375cf3ca1a9fbd663ca141df365f16", function(reponse) {
                var stations = []; 
                stations.push(JSON.parse(reponse));
                stations.forEach(function (station) {
                    var LatLng = new google.maps.LatLng(station.lat,station.lng),
                    marker = new.google.maps.Marker({
                        position: LatLng,
                        title : station.address;
                    });
                    marker.setMap(map);
                });
                          
            })
    
        }
}

Stations.init();
