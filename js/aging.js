
var svg = d3.select("#rembrandt")
    .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top*3 + margin.bottom*3)
    .attr("width", W)
    .attr("height", 600)
    .append("g")


d3.json("./data/dataRembrandt.json").then(function(data){

//Data Sorting Section
    var yearData=[];
    var ageData = [];
    var ageingData = [];
    var nodes = data;


    var nestedAge = d3.nest()
        .key(function(d){ return d.date;})
        .entries(data);


    for (let i=0; i<data.length; i++) {
        let date = data[i].date;
        yearData.push(date);
    }

    for (let i=0; i<data.length; i++) {
        let age = (data[i].date)-1606;
        ageData.push(age);
    }
    for (let i = 0; i < data.length; i++) {
        let ageing = data[i].ageing;
        ageingData.push(ageing);
    }

// Console.log Just for checking
// console.log(nodes);
    console.log(yearData);
    console.log(nestedAge);
    console.log(ageData);
// console.log(mediumData);
// console.log(nestedClassification);
// console.log(nestedCountry);


//X-axis
    var x = d3.scaleBand()
        .domain(yearData)
        .range([ 0, width ])
        .padding(0.15);


//tooltip
    var tooltip = d3.select("#featurePortraits")
        .append("div")
        .attr("class", "tooltip")
        .style("background-color", "#194F39")
        .style("position", "absolute")
        .style("display","inline")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "6px")
        .style("opacity", 1)
        .style("max-width", "400px")



    var mousemove = function(data) {
        if (data.ageing == null) {tooltip.html("This self-portrait was created when Rembrandt was " + (data.date - 1606) + " years old.")
        }else{tooltip
            .html("This self-portrait was created when Rembrandt was " + (data.date - 1606) + " years old. From this self-portrait, we can see " + data.ageing + ".")}
        tooltip
            .style("color", "white")
            // .attr("xlink:href", function(d) { return d.img;})
            .style("left", (d3.mouse(this)[0]+40) + "px")
            .style("top", (d3.mouse(this)[1]+150) + "px")//+150 reduce the distance between tooltip and mouse
        d3.select(this)
            .transition()
            .ease(d3.easeElastic)
            .attr("width", 300)
            .attr("height", 300)
            .style("opacity", 1)
            .style("z-index", 100)

    }



    var mouseleave = function(data) {
//     tooltip
//       .style("opacity", 1)
// //     d3.select(this)
// //       .attr("r", 40 )
// //       .style("fill","#FBAAB8")
// //       .style("stroke", "none")
// //       .style("opacity", 0.8)

        rembrandt.transition()
            .attr("x", function(d) { return x(d.date)-30 })
            .attr("y", function(d,i) { return i*10})
            .attr("width", 80)
            .attr("height", 80)
            .attr("transform", "translate(37, 100)")
            .style("fill-opacity", 0.8)
            .duration(1500)

        var xaxis1=svg.append("g")
            .style("font-size", 15)
            .style("color","#194F39")
            .style("opacity",1)
            .attr("transform", "translate(0, 40)")
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove()
            .transition()
            .duration(1000)

        var xaxis2= svg.append("g")
            .style("font-size", 15)
            .style("color","#194F39")
            .style("opacity",1)
            .attr("transform", "translate(0, 400)")
            .call(d3.axisBottom(x).tickSize(0))
            .select(".domain").remove()

            .transition()
            .duration(1000)


    }




// Draw Circle Images




    var rembrandt = svg.selectAll("img")
        .data(data)
        .enter()

        .append('image')
        .attr('class', 'image')
        .attr('href', data => {
            return './images/' + data.filename;
        })
        .attr("x", d => rando(width))
        .attr("y", d => rando(height*2))
        .style("fill-opacity", 1)
        .attr("width", 80)
        .attr("height", 80)
        .style("opacity", 0.8)

        // .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on('click', function(d, i) {
            window.open(d.museumURL);
            const el = d3.select(this);
            el.transition()
                .duration(750)
        });




})












//
// var svg5 = d3.select("#rembrandt")
//     .append("svg")
//     .attr("width", W)
//     .attr("height", 400)
//     .append("g")
//
// d3.json("./data/dataRembrandt.json").then(function(data) {
//     //Data Sorting Section
//     var yearData = [];
//     var ageData = [];
//     var ageingData = [];
//     var nodes = data;
//
//
//     var nestedAge = d3.nest()
//         .key(function (d) {
//             return d.date;
//         })
//         .entries(data);
//
//
//     for (let i = 0; i < data.length; i++) {
//         let date = data[i].date;
//         yearData.push(date);
//     }
//
//     for (let i = 0; i < data.length; i++) {
//         let age = (data[i].date) - 1606;
//         ageData.push(age);
//     }
//
//     for (let i = 0; i < data.length; i++) {
//         let ageing = data[i].ageing;
//         ageingData.push(ageing);
//     }
//
//
// // Console.log Just for checking
//     console.log(yearData);
//     console.log(nestedAge);
//     console.log(ageData);
//
//
//     var tooltip = d3.select("#rembrandt")
//         .append("div")
//         .attr("class", "tooltip")
//         .style("background-color", "#194F39")
//         .style("position", "absolute")
//         .style("display", "inline")
//         .style("border-width", "1px")
//         .style("border-radius", "5px")
//         .style("padding", "6px")
//         .style("opacity", 1)
//
//     var mouseover5;
//     mouseover5 = function (data) {
//         tooltip
//             .transition()
//             .duration(100)
//             .style("opacity", 1)
//         d3.select(this)
//             .style("stroke", "#194F39")
//             .attr("width", 200)
//             .style("stroke-width", "2px")
//             .style("opacity", 1)
//             .style("fill-opacity", 1)
//             .transition()
//             .duration(750)
//     };
//
//
//     var mousemove5;
//     mousemove5 = function (data) {
//         if (data.ageing == null) {tooltip.html("This self-portrait was created when Rembrandt was " + (data.date - 1606) + " years old.")
//         }else{tooltip
//             .html("This self-portrait was created when Rembrandt was " + (data.date - 1606) + " years old. From this self-portrait, we can see " + data.ageing + ".")}
//         tooltip
//             .style("color", "white")
//             .style("opacity", 1)
//             // .attr("xlink:href", function(d) { return d.img;})
//             .style("left", (d3.mouse(this)[0] + 60) + "px")
//             .style("top", (d3.mouse(this)[2]) + "px")//+150 reduce the distance between tooltip and mouse
//         d3.select(this)
//             .transition()
//             .ease(d3.easeElastic)
//             .attr("width", 150)
//             .attr("height", 150)
//         //  .attr("z-index", 173)
//     };
//
//     let mouseleave5;
//     mouseleave5 = function (data) {
//         tooltip
//             .transition()
//             .duration(100)
//             .style("opacity", 0)
//
//         d3.select(this)
//             .transition()
//             .ease(d3.easeElastic)
//             .attr("width", 100)
//             .attr("height", 100)
//             .style("fill-opacity", 1)
//             .attr("posotion", "relative")
//         //  .attr("z-index", 0)
//
//     };
//
//
//     // Show Images
//     var rembrandt = svg5.selectAll("img")
//         .data(data)
//         .enter()
//         .append('image')
//         .attr('class', 'image')
//         .attr('href', data => {
//             return 'images/' + data.filename;
//         })
//         .style("fill-opacity", 1)
//         .attr("width", 100)
//         .attr("height", 100)
//         .style("opacity", 1)
//             .on("mouseover", mouseover5)
//             .on("mousemove", mousemove5)
//             .on("mouseleave", mouseleave5)
//             .on('click', function (d, i) {
//                 window.open(d.museumURL);
//                 const el = d3.select(this);
//                 el.transition()
//                     .duration(750)
//         });
//
//     function f10() {
//         rembrandt.transition()
//             .duration(1000)
//             .ease(d3.easeElastic)
//             .attr("x", function (d, i) {
//                 if (i < 10) {
//                     return i * 130
//                 } else if (i < 20) {
//                     return (i - 10) * 130 +50
//                 } else if (i < 30) {
//                     return (i - 20) * 130
//                 }
//             })
//             .attr("y", function (d, i) {
//                 if (i < 10) {
//                     return 130
//                 } else if (i < 20) {
//                     return 260
//                 } else if (i < 30) {
//                     return 390
//                 }
//             })
//     }
//         f10();
//
// })
//
//
