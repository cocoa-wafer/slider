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
            this.ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=8a21045d07375cf3ca1a9fbd663ca141df365f16", function(reponse) {

                var reponses = JSON.parse(reponse);

                return reponses;
            });
        },
};