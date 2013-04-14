function(doc) {
    long2tile = function (lon,zoom) { 
        return (Math.floor((lon+180)/360*Math.pow(2,zoom))); 
    }
    lat2tile = function (lat,zoom) { 
        return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); 
    }
    if (doc.type=='node' && doc.longitude && doc.latitude) {
        for (var zoom=0; zoom<18; zoom++) {
            var x = long2tile(doc.longitude, zoom),
                y = lat2tile(doc.latitude, zoom);
            emit(zoom+'_'+x+'_'+y, 1);
        }
    }
}
