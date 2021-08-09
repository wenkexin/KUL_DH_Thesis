/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 */

// load a default library that lets us read/write to the file system
var fs = require('fs')
// load a default library that lets us make HTTP requests (like calls to an API)
var request = require('request')

// endpoint URL
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'

// object Ids I want to download
const myObjectIds = [
    //This line was abandoned: 436258,437397,459254,483438,436210,207591,437504,11366,13105,488109,441115,436297,19524,436158,15026,436532,698749,436222,436840,437874,271813,334312,363671,435994,459319,436631,435895,485521,485551,426019,336324,337883,423003,373813,399904,821857,745970,382550,384605,730800,773290,435856,376109,238889,639556,384560,765749,15134,15078,15307,10606,10948,13393,438722,340905,11408,393509,334135,341453,359324,17804,16859,286022,428637,392912,821858,667471,437508,340285,334004,460858,390242,459777,391625,416895,428772,428775,342463,360121,359917,700405,420955,384575,428861,700404,336269,358786,436367,772815,390098,390104,390105,390106,390101,390090,369807,459963,839267,391676,391675,364147,368058,423005,764794,11786,397203,377808,391677,42651,764795,436289,318363,398746,343223,420539,391480
    459254, 363671, 698749, 438722, 436158, 437874, 336324, 821857, 207591, 428861, 19524, 11366, 435856, 459777, 398746, 390242, 286022, 397203, 10606, 745970, 700404, 340285, 700405, 15307, 390105, 459319, 390104, 15026, 13393, 377808, 426019, 420955, 392912, 839267, 423005, 391677,
    373813, 667471, 428637, 390098, 435994, 343223, 384560, 391480, 11786, 773290, 391676, 16859, 764795, 15078, 238889, 639556, 423003, 334135, 390101, 271813, 15134, 390106, 10948, 13105, 772815, 376109, 390090, 420539, 765749, 821858, 460858, 382550, 384575, 436297, 342463, 391625, 364147, 428775, 340905, 730800, 368058, 42651, 399904, 393509, 359917, 428772, 384605, 336269, 416895, 359324, 358786, 318363, 436631, 341453, 360121, 391675, 369807, 17804, 436289, 436367, 337883, 435895, 441115, 488109, 437504, 485521, 334312, 334004, 483438, 459963, 436222, 764794, 485551, 436210, 436532, 436258, 437397, 437508, 436840
]

// set up empty Array for us to save results to
const myArray = [];

function fetchUrl(objectId){
    request(url + objectId, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let obj = JSON.parse(body);
        console.log(obj.primaryImage);
        let index = myArray.length;
        if (obj.artistGender.toLowerCase() === "female"){
        myArray[index] = {};
        myArray[index]["objectID"] = obj.objectID;
        myArray[index]["title"] = obj.title;
        myArray[index]["artist"] = obj.artistDisplayName;
        // myArray[index]["gender"] = obj.artistGender;
        if (obj.artistGender === ""){
            myArray[index]["gender"] = "male";
        }else{
            myArray[index]["gender"] = obj.artistGender.toLowerCase();
        }
        myArray[index]["culture"] = obj.artistNationality;
        myArray[index]["date"] = obj.objectBeginDate;
        myArray[index]["primaryImage"] = obj.primaryImage;
        myArray[index]["classification"] = obj.objectName;
        myArray[index]["technique"] = obj.medium;
        myArray[index]["museumURL"] = obj.objectURL;
        myArray[index]["filename"] = obj.primaryImage.split('/').pop();
        myArray[index]["from"] = "Metropolitan Museum of Art";
        if (obj.measurements == null){
            myArray[index]["wall_description"] = null
        }else {
            myArray[index]["wall_description"] = obj.measurements[0].elementDescription;
        }}
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
    fs.writeFileSync('./portraitsData_3.json', JSON.stringify(myArray), 'utf8')
}, 10000)
