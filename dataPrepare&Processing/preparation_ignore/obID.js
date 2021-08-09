
// load a default library that lets us read/write to the file system
let fs;
fs = require('fs');
// load a default library that lets us make HTTP requests (like calls to an API)
let request;
request = require('request');

// endpoint URL
const url = 'https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&title='

const myTitles = ['self+portrait'];

// set up empty string for us to save results to
objectNo = "";
function fetchUrl(myTitle){
    request(url + myTitle + '&cc0', function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        let obj;
        obj = JSON.parse(body);

        let index;
        index = obj.data.length;
        for (let i=0; i<index; i++) {
            objectNo += obj.data[i].id + ", ";
        }

    });
}

myTitles.forEach(myTitle => {
    fetchUrl(myTitle);
});

// the function inside the setTimeout saves myResults to a JSON
// it will automatically run after 2000 ms
setTimeout(() => {
    fs.writeFileSync('./objectNo.json', JSON.stringify(objectNo), 'utf8')
}, 2000)

