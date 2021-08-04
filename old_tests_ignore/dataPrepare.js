/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 */

// load a default library that lets us read/write to the file system
let fs = require('fs');
// load a default library that lets us make HTTP requests (like calls to an API)
let request = require('request');

// let https = require('https');

// endpoint URL
const url = 'https://www.rijksmuseum.nl/api/en/collection';

// objectNumbers I want to download
const myObjectNumbers = ['SK-A-3262', 'SK-A-4691', 'BK-2000-17', 'SK-A-4050', 'BK-15117', 'SK-A-4225', 'SK-A-4857', 'SK-A-42', 'BK-15116', 'SK-A-383', 'RP-P-OB-20', 'RP-P-1962-9', 'RP-T-1961-75', 'RP-P-OB-697', 'RP-P-1907-2834', 'SK-A-190', 'SK-A-2396', 'SK-A-1406', 'SK-A-4274', 'SK-A-1041', 'SK-A-2157', 'SK-A-1126', 'SK-A-115', 'SK-A-1933', 'SK-A-2084', 'SK-A-2186', 'SK-A-2818', 'SK-A-2241', 'SK-A-1780', 'SK-A-1746', 'SK-A-1597', 'SK-A-3109', 'SK-A-2199', 'SK-A-4835', 'SK-A-1423', 'SK-A-418', 'SK-A-1172', 'SK-A-2059', 'SK-A-3897', 'SK-A-4675', 'SK-A-768', 'SK-A-2106', 'SK-A-2155', 'SK-A-2666', 'SK-A-4232', 'SK-A-181', 'SK-A-1291', 'SK-A-1303', 'SK-A-1607', 'SK-A-1632', 'SK-A-1622', 'SK-A-1047', 'SK-A-3288', 'SK-A-3263', 'SK-A-1489', 'BI-1887-1463-12', 'SK-C-1767', 'RP-P-1932-903', 'RP-T-1988-115', 'RP-F-2019-270', 'RP-F-2005-107-374', 'RP-F-F17700', 'SK-A-5029', 'RP-P-2018-537', 'RP-P-1961-1182', 'RP-P-OB-723', 'RP-P-OB-688', 'RP-P-1961-1188', 'RP-P-OB-12.398', 'RP-P-1961-1181', 'RP-P-OB-12.399', 'RP-P-OB-714', 'RP-P-OB-12.397', 'RP-P-OB-687', 'SK-A-4748', 'RP-T-1900-A-4482', 'RP-T-1902-A-4624', 'RP-F-1995-206-6', 'RP-F-1995-206-3', 'RP-P-OB-35', 'RP-P-1961-988', 'RP-P-OB-40', 'RP-P-OB-32', 'RP-P-OB-283', 'RP-P-OB-6', 'RP-P-OB-1', 'RP-P-1987-158', 'RP-P-OB-51', 'RP-P-OB-12.290', 'RP-P-OB-21', 'RP-P-OB-45', 'RP-P-OB-19', 'RP-P-OB-34', 'RP-P-OB-42', 'RP-P-OB-5', 'RP-P-1961-990A', 'RP-P-OB-12.288', 'RP-P-1907-524', 'RP-P-1961-970', 'RP-P-1972-46', 'RP-P-OB-23', 'RP-P-OB-44', 'RP-P-OB-12.289', 'RP-P-OB-33', 'RP-P-OB-284', 'RP-P-OB-43', 'RP-P-1961-978', 'RP-P-OB-39', 'RP-P-1961-987', 'RP-P-OB-41', 'RP-P-OB-287', 'RP-P-OB-12.400', 'RP-P-OB-721', 'RP-P-OB-689', 'RP-P-1907-523', 'SK-A-4074', 'BK-NM-5166', 'SK-A-4950', 'RP-P-1957-265-F', 'RP-P-1957-265-G', 'RP-P-1957-265-D', 'RP-P-1957-265-B', 'RP-P-1957-329-B', 'RP-P-1957-265-E', 'RP-P-1957-265-C', 'RP-T-1887-A-1062', 'RP-P-2015-53-8-27', 'RP-F-2006-37', 'RP-F-2003-101', 'RP-P-1957-262', 'RP-P-1957-329-A', 'RP-P-1957-263', 'RP-P-1957-264', 'RP-P-1957-265-A', 'RP-P-1965-1022', 'RP-F-2018-38-47-1', 'RP-T-2004-196-8(V)', 'RP-T-2004-199-5(R)', 'RP-T-2004-196-6(V)', 'RP-T-2004-197-12(R)', 'RP-T-2004-197-12(V)', 'RP-P-2003-453-34', 'RP-F-2018-38-47-2', 'RP-P-OB-49', 'RP-P-OB-695', 'RP-P-OB-715', 'RP-P-1961-1184.jpg', 'RP-P-OB-12.416', 'RP-P-1961-1183', 'RP-P-OB-12.401', 'SK-A-1460', 'SK-A-1470', 'RP-P-OB-46', 'RP-P-OB-7', 'RP-P-1907-531', 'RP-P-1907-525', 'RP-P-OB-285', 'RP-P-OB-24', 'RP-P-OB-12.292', 'RP-P-OB-38', 'RP-P-OB-36', 'RP-P-1961-990', 'RP-P-OB-286', 'RP-P-1961-991', 'RP-P-OB-37', 'RP-P-1907-526', 'RP-P-1961-989', 'RP-P-OB-47', 'RP-P-1882-A-6189', 'RP-P-1953-878', 'RP-P-OB-15', 'RP-P-OB-30', 'RP-P-1962-10', 'RP-P-1961-973', 'RP-P-OB-48', 'RP-P-1961-1185', 'RP-P-OB-50', 'RP-P-OB-694', 'RP-P-OB-12.415', 'RP-P-OB-693', 'RP-P-OB-696', 'SK-A-775', 'SK-A-4991', 'RP-P-2009-777', 'RP-T-1887-A-1063', 'RP-T-1887-A-1048(R)', 'RP-T-1887-A-1051', 'RP-P-1957-232', 'RP-P-1957-244', 'RP-P-1957-233', 'RP-P-1957-459-A', 'RP-P-1957-245', 'BK-2015-56', 'RP-P-2006-927', 'RP-P-1907-527', 'RP-P-1957-459-E', 'RP-P-1957-459-B', 'RP-P-1957-459-C', 'RP-P-1957-459-D', 'RP-F-2018-38-30-9', 'RP-F-2018-38-68-1', 'RP-P-OB-12.282', 'RP-P-1961-974', 'RP-P-OB-12.283', 'RP-P-1961-982', 'RP-P-OB-8', 'RP-P-1961-981', 'RP-P-OB-9', 'RP-P-OB-26', 'RP-P-1961-980', 'SK-A-2118', 'SK-A-2694', 'RP-F-1995-206-1', 'RP-P-OB-280', 'RP-P-OB-11', 'RP-P-1882-A-6190', 'RP-P-OB-12.291', 'RP-P-1962-5', 'RP-P-OB-12', 'RP-P-1962-8', 'RP-P-1961-984', 'RP-P-OB-288', 'RP-P-OB-29', 'RP-P-OB-281', 'RP-P-OB-10', 'RP-P-1907-530', 'RP-P-OB-2', 'RP-P-OB-16', 'RP-P-1961-986', 'RP-P-1907-528', 'RP-P-1962-6', 'RP-P-1961-985', 'RP-P-1907-529', 'RP-P-OB-31', 'RP-P-1961-977', 'RP-P-OB-14', 'RP-P-1961-975', 'RP-P-OB-18', 'RP-P-1961-983', 'RP-P-1961-976', 'RP-P-OB-12.285', 'RP-P-1962-4', 'RP-P-1962-7', 'RP-P-OB-289', 'RP-P-OB-28', 'RP-P-1961-979', 'RP-P-OB-13', 'RP-P-OB-25', 'RP-P-OB-282', 'RP-P-OB-17', 'RP-P-OB-776', 'RP-P-OB-27', 'RP-P-2004-385', 'RP-P-1957-299-B', 'RP-P-1957-299-C', 'RP-P-1957-300', 'RP-P-1957-352', 'RP-P-1957-243', 'RP-P-1957-378', 'RP-P-1957-296', 'RP-P-1957-371', 'RP-P-1957-248', 'RP-P-1957-372', 'RP-P-1957-370', 'RP-P-1957-299-A', 'RP-P-1957-353', 'RP-P-1957-297', 'RP-P-1957-242', 'RP-P-2006-88', 'RP-P-2006-929', 'RP-P-OB-12.284', 'SK-A-1583', 'RP-F-1995-206-2', 'SK-A-465', 'RP-P-OB-3', 'RP-P-1961-971', 'RP-P-OB-279', 'RP-P-1957-375', 'RP-P-1957-373', 'RP-P-1957-374', 'RP-P-1957-377', 'RP-P-1957-376', 'RP-F-2017-217', 'SK-A-1063', 'SK-A-1197', 'SK-A-324', 'RP-P-OB-12.287', 'RP-P-OB-764'];


// set up empty Array for us to save results to
let myArray = [];

function fetchUrl(objectNumber){
    request(url + '/' + objectNumber + '?key=V7C5QI8S', function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log(body);
        let obj;
        obj = JSON.parse(body);
        // obj = JSON.stringify(body);

        // console.log(obj.artObject.webImage.url);
        let index = myArray.length;
        myArray[index] = {};
        // myArray[index]["id"] = obj.artObject['objectNumber'];
        myArray[index]["ID"] = obj.artObject.objectNumber;
        // myArray[index]["objectNumber"] = obj.artObject.links.search;
        // myArray[index]["title"] = obj.artObject.title;
        // myArray[index]["artistName"] = obj.artObject.principalMaker;
        // myArray[index]["birthPlace"] = obj.artObject.principalMakers[0].placeOfBirth;
        // myArray[index]["presentingDate"] = obj.artObject.dating.sortingDate;
        // myArray[index]["medium"] = obj.artObject.objectTypes[0];
        // myArray[index]["imageURL"] = obj.artObject.webImage['url'];
        // myArray[index]["filename"] = obj.artObject.objectNumber + ".JPEG";
    });
};

// call the function for each element in the myObjectNumbers array
myObjectNumbers.forEach(objectNumber => {
    fetchUrl(objectNumber);
});



// the function inside the setTimeout saves myResults to a JSON
// it will automatically run after 2000 ms
setTimeout(() => {
    // fs.writeFileSync('./portraitsData_test.json', JSON.stringify(myArray), 'utf8')
    fs.writeFile('./portraitsData_test.json', JSON.stringify(myArray), 'utf8', function(err){
        if (err){
            throw err;
        }
    })
}, 2000)

