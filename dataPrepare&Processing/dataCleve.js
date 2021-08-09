/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 */

// load a default library that lets us read/write to the file system
var fs;
fs = require('fs');
// load a default library that lets us make HTTP requests (like calls to an API)
var request;
request = require('request');

// endpoint URL
const url = 'https://openaccess-api.clevelandart.org/api/artworks'

// object Ids I want to download
const myObjectIds = [
    // This line was abandoned: 117030, 163350, 170082, 163547, 286185, 149029, 136844, 437876, 149429, 114751, 306960, 119016, 144706, 149565, 160339, 106601, 130330, 166687, 140475, 166887, 95064, 122473, 147443, 150116, 104063, 135477, 150014, 156313, 117927, 105709, 106415, 150055, 120097, 124925, 121144, 125557, 117087, 125489, 168496, 104070, 162324, 105710, 124918, 136247, 128851, 123881, 145666, 104776, 106998, 98392, 124920, 163905, 118952, 150073, 114746, 160879, 125559, 149948, 103132, 123895, 154641, 103133, 150836, 125558, 122624, 170724, 101932, 143844
    147525, 115534, 120761, 113311, //these four artworks were created by female artists
    // 160087, 165313, 117030, 437876, 163350, 149429, 150014, 95064, 140475, 149565, 286185, 136844, 105709, 117927, 150055, 125489, 156313, 168496, 119016, 123881, 106415, 166687, 124918, 160339, 120097, 163547, 306960, 144706, 170082, 114751, 145666, 122473,
    // 125557, 166887, 128851, 150073, 154641, 106601, 150836, 121144, 162324, 149029, 124925, 104063, 150116, 160879, 147443, 125558, 104776, 105710, 143844, 117087, 123895, 106998, 104070, 135477, 170724, 125559, 101932, 103133, 149948, 124920, 114746, 118952, 130330, 136247, 163905, 98392, 122624, 103132,

]

// set up empty Array for us to save results to
const myArray = [];

function fetchUrl(objectId){
    request(url + '/' + objectId, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

        let obj = JSON.parse(body);

        console.log(obj.data.images.web.url);
        let index = myArray.length;
        myArray[index] = {};
        myArray[index]["objectID"] = obj.data.id;
        myArray[index]["title"] = obj.data.title;
        myArray[index]["artist"] = obj.data.creators[0].description.split(" (").reverse().pop();
        myArray[index]["gender"] = "male";
        myArray[index]["culture"] = obj.data.culture[0].split(',').reverse().pop();
        if (obj.data.creation_date == null){
            myArray[index]["date"] = null;
        }else{myArray[index]["date"] = parseInt(obj.data.creation_date.split(' ').pop());
        }
        myArray[index]["primaryImage"] = obj.data.images.web.url;
        myArray[index]["classification"] = obj.data.type;
        myArray[index]["technique"] = obj.data.technique;
        myArray[index]["museumURL"] = obj.data.url;
        myArray[index]["filename"] = obj.data.images.web.filename;
        myArray[index]["from"] = "Cleveland Museum of Art"
        myArray[index]["wall_description"] = obj.data.wall_description;


    });
}

// call the function for each element in the myObjectIds array
myObjectIds.forEach(objectId => {
    fetchUrl(objectId);
});

// fetchUrl(myObjectIds[0]);


// the function inside the setTimeout saves myResults to a JSON
// it will automatically run after 2000 ms
setTimeout(() => {
    fs.writeFileSync('./portraitsData_1.json', JSON.stringify(myArray), 'utf8')
}, 10000)
