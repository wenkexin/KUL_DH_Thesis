// Find all of the objects that are paintings and have the word "rabbit" in the title
var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
var queryString = $.param({
    apikey: "6cf1487e-7015-428a-9603-4615707aebe0",
    title: "self-portrait",
    // classification: "Paintings"
});

$.getJSON(apiEndpointBaseURL + "?" + queryString, function(data) {
    console.log(data);
});
