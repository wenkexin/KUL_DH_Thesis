let fs;
fs = require('fs');
let request;
request = require('request');
let folder = "imageRijks";
var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        // console.log('content-type:', res.headers['content-type']);
        // console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(folder + "/" + filename)).on('close', callback);
    });
};

download('https://ids.lib.harvard.edu/ids/view/17917055', 'google.jpg', function(){
    console.log('done');
});