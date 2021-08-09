// load a default library that lets us read/write to the file system
let fs;
fs = require('fs');
// load a default library that lets us make HTTP requests (like calls to an API)
let request;
request = require('request');

// the folder we will write into
let folder = "images";

// download the image by url, name the file by filename
function downloadImage(uri, filename, callback){
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream( folder + "/" + filename)).on('close', callback);
    });
}

// go through the json we created before
function downloadData() {
    fs.readFile("./data_Met.json", "utf8", (err, data) => {
        if (err) console.log(err);

        JSON.parse(data).forEach(e => {
            console.log('Downloading ' + e.filename);
            downloadImage(e.primaryImage, e.filename, function(){
                console.log('Finished Downloading ' + e.filename);
            });
        });

    });
}

downloadData();
