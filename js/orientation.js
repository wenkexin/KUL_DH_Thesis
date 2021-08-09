var H = window.innerHeight;
var W = window.innerWidth;
var margin = {top: 80, right: 50, bottom: 30, left: 65};
var width = window.innerWidth - margin.left - margin.right;
var height = window.innerHeight - margin.top - margin.bottom;




var svgLeft = d3.select("#left")
    .append("svg")
    .attr("width", W)
    .attr("height", 1200)
    .append("g")

d3.json("./data/dataLeft.json").then(function(data) {
    //Data Sorting Section
    var orientationData = [];
    var nodes = data;


    var nestedOrientation = d3.nest()
        .key(function (d){
            return d.orientation;
        })
        .entries(data)
    for (let i = 0; i < data.length; i++){
        let orientation = data[i].orientation;
        orientationData.push(orientation);
    }


// Console.log Just for checking
console.log(nestedOrientation)
    console.log(orientationData)


//X-axis
//     var x = d3.scaleBand()
//         .domain(classificationData)
//         .range([0, width])
//         .padding(0.15);
//tooltip
    var tooltip = d3.select("#left")
        .append("div")
        .attr("class", "tooltip")
        .style("background-color", "#194F39")
        .style("position", "absolute")
        .style("display", "inline")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "6px")
        .style("opacity", 1)

    var mouseover;
    mouseover = function (data) {
        tooltip
            .transition()
            .duration(100)
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "#194F39")
            .attr("width", 200)
            .style("stroke-width", "2px")
            .style("opacity", 1)
            .style("fill-opacity", 1)
            .transition()
            .duration(750)
    };


    var mousemove;
    mousemove = function (data) {
        if (data.date == null) {tooltip.html("This self-portrait was created by " + data.artist + ".")
        }else{tooltip
            .html("This self-portrait was created by " + (data.artist) + " in the year " + (data.date) + ".")}
        tooltip
            .style("color", "white")
            .style("opacity", 1)
            // .attr("xlink:href", function(d) { return d.img;})
            .style("left", (d3.mouse(this)[0] + 60) + "px")
            .style("top", (d3.mouse(this)[1] + 1400) + "px")//+150 reduce the distance between tooltip and mouse
        d3.select(this)
            .transition()
            .ease(d3.easeElastic)
            .attr("width", 120)
            .attr("height", 120)
        //  .attr("z-index", 173)
    };

    var mouseleave;
    mouseleave = function (data) {
        tooltip
            .transition()
            .duration(100)
            .style("opacity", 0)

        d3.select(this)
            .transition()
            .ease(d3.easeElastic)
            .attr("width", 80)
            .attr("height", 80)
            .style("fill-opacity", 1)
            .attr("posotion", "relative")
        //  .attr("z-index", 0)

    };


    // Show Images
    var left = svgLeft.selectAll("img")
        .data(data)
        .enter()
        .append('image')
        .attr('class', 'image')
        .attr('href', data => {
            return 'images/' + data.filename;
        })
        .style("fill-opacity", 1)
        .attr("width", 80)
        .attr("height", 80)
        .style("opacity", 1)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on('click', function (d, i) {
            window.open(d.museumURL);
            const el = d3.select(this);
            el.transition()
                .duration(750)
        });

    function orientationLeft() {
        left.transition()
            .duration(1000)
            .ease(d3.easeElastic)
            .attr("x", function (d, i) {
                if (i < 13) {
                    return i * 100
                } else if (i < 26) {
                    return (i - 13) * 100 +50
                } else if (i < 39) {
                    return (i - 26) * 100
                } else if (i < 52) {
                    return (i - 39) * 100 + 50
                } else if (i < 65) {
                    return (i - 52) * 100
                } else if (i < 78) {
                    return (i - 65) * 100 + 50
                } else if (i < 91) {
                    return (i - 78) * 100
                } else if (i < 104) {
                    return (i - 91) * 100 + 50
                } else if (i < 117) {
                    return (i - 104) * 100
                } else if (i < 130) {
                    return (i - 117) * 100 + 50
                } else if (i < 143) {
                    return (i - 130) * 100
                } else if (i < 156) {
                    return (i - 143) * 100 + 50
                } else if (i < 169) {
                    return (i - 156) * 100
                } else if (i < 182) {
                    return (i - 169) * 100 + 50
                }
            })
            .attr("y", function (d, i) {
                if (i < 13) {
                    return 100
                } else if (i < 26) {
                    return 200
                } else if (i < 39) {
                    return 300
                } else if (i < 52) {
                    return 400
                } else if (i < 65) {
                    return 500
                } else if (i < 78) {
                    return 600
                } else if (i < 91) {
                    return 700
                } else if (i < 104) {
                    return 800
                } else if (i < 117) {
                    return 900
                } else if (i < 130) {
                    return 1000
                } else if (i < 143) {
                    return 1100
                } else if (i < 156) {
                    return 1200
                } else if (i < 169) {
                    return 1300
                } else if (i < 182) {
                    return 1400
                }
            })
    }

    orientationLeft();

})


var svgRight = d3.select("#right")
    .append("svg")
    .attr("width", W)
    .attr("height", 1200)
    .append("g")

d3.json("./data/dataRight.json").then(function(data) {
    //Data Sorting Section
    var orientationData = [];
    var nodes = data;


    var nestedOrientation = d3.nest()
        .key(function (d){
            return d.orientation;
        })
        .entries(data)
    for (let i = 0; i < data.length; i++){
        let orientation = data[i].orientation;
        orientationData.push(orientation);
    }


    var tooltip = d3.select("#right")
        .append("div")
        .attr("class", "tooltip")
        .style("background-color", "#194F39")
        .style("position", "absolute")
        .style("display", "inline")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "6px")
        .style("opacity", 1)

    var mouseover;
    mouseover = function (data) {
        tooltip
            .transition()
            .duration(100)
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "#194F39")
            .attr("width", 200)
            .style("stroke-width", "2px")
            .style("opacity", 1)
            .style("fill-opacity", 1)
            .transition()
            .duration(750)
    };


    var mousemove;
    mousemove = function (data) {
        if (data.date == null) {tooltip.html("This self-portrait was created by " + data.artist + ".")
        }else{tooltip
            .html("This self-portrait was created by " + (data.artist) + " in the year " + (data.date) + ".")}
        tooltip
            .style("color", "white")
            .style("opacity", 1)
            // .attr("xlink:href", function(d) { return d.img;})
            .style("left", (d3.mouse(this)[0] + 60) + "px")
            .style("top", (d3.mouse(this)[1] + 1400) + "px")//+150 reduce the distance between tooltip and mouse
        d3.select(this)
            .transition()
            .ease(d3.easeElastic)
            .attr("width", 120)
            .attr("height", 120)
        //  .attr("z-index", 173)
    };

    var mouseleave;
    mouseleave = function (data) {
        tooltip
            .transition()
            .duration(100)
            .style("opacity", 0)

        d3.select(this)
            .transition()
            .ease(d3.easeElastic)
            .attr("width", 80)
            .attr("height", 80)
            .style("fill-opacity", 1)
            .attr("posotion", "relative")
        //  .attr("z-index", 0)

    };


    // Show Images
    var right = svgRight.selectAll("img")
        .data(data)
        .enter()
        .append('image')
        .attr('class', 'image')
        .attr('href', data => {
            return 'images/' + data.filename;
        })
        .style("fill-opacity", 1)
        .attr("width", 80)
        .attr("height", 80)
        .style("opacity", 1)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on('click', function (d, i) {
            window.open(d.museumURL);
            const el = d3.select(this);
            el.transition()
                .duration(750)
        });

    function orientationRight() {
        right.transition()
            .duration(1000)
            .ease(d3.easeElastic)
            .attr("x", function (d, i) {
                if (i < 13) {
                    return i * 100
                } else if (i < 26) {
                    return (i - 13) * 100 +50
                } else if (i < 39) {
                    return (i - 26) * 100
                } else if (i < 52) {
                    return (i - 39) * 100 + 50
                } else if (i < 65) {
                    return (i - 52) * 100
                } else if (i < 78) {
                    return (i - 65) * 100 + 50
                } else if (i < 91) {
                    return (i - 78) * 100
                } else if (i < 104) {
                    return (i - 91) * 100 + 50
                } else if (i < 117) {
                    return (i - 104) * 100
                } else if (i < 130) {
                    return (i - 117) * 100 + 50
                } else if (i < 143) {
                    return (i - 130) * 100
                } else if (i < 156) {
                    return (i - 143) * 100 + 50
                } else if (i < 169) {
                    return (i - 156) * 100
                } else if (i < 182) {
                    return (i - 169) * 100 + 50
                }
            })
            .attr("y", function (d, i) {
                if (i < 13) {
                    return 100
                } else if (i < 26) {
                    return 200
                } else if (i < 39) {
                    return 300
                } else if (i < 52) {
                    return 400
                } else if (i < 65) {
                    return 500
                } else if (i < 78) {
                    return 600
                } else if (i < 91) {
                    return 700
                } else if (i < 104) {
                    return 800
                } else if (i < 117) {
                    return 900
                } else if (i < 130) {
                    return 1000
                } else if (i < 143) {
                    return 1100
                } else if (i < 156) {
                    return 1200
                } else if (i < 169) {
                    return 1300
                } else if (i < 182) {
                    return 1400
                }
            })
    }

    orientationRight();

})




var svgMidline = d3.select("#midline")
    .append("svg")
    .attr("width", W)
    .attr("height", 1200)
    .append("g")

d3.json("./data/dataMidline.json").then(function(data) {
    //Data Sorting Section
    var orientationData = [];
    var nodes = data;


    var nestedOrientation = d3.nest()
        .key(function (d){
            return d.orientation;
        })
        .entries(data)
    for (let i = 0; i < data.length; i++){
        let orientation = data[i].orientation;
        orientationData.push(orientation);
    }


    var tooltip = d3.select("#midline")
        .append("div")
        .attr("class", "tooltip")
        .style("background-color", "#194F39")
        .style("position", "absolute")
        .style("display", "inline")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "6px")
        .style("opacity", 1)

    var mouseover;
    mouseover = function (data) {
        tooltip
            .transition()
            .duration(100)
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "#194F39")
            .attr("width", 200)
            .style("stroke-width", "2px")
            .style("opacity", 1)
            .style("fill-opacity", 1)
            .transition()
            .duration(750)
    };


    var mousemove;
    mousemove = function (data) {
        if (data.date == null) {tooltip.html("This self-portrait was created by " + data.artist + ".")
        }else{tooltip
            .html("This self-portrait was created by " + (data.artist) + " in the year " + (data.date) + ".")}
        tooltip
            .style("color", "white")
            .style("opacity", 1)
            // .attr("xlink:href", function(d) { return d.img;})
            .style("left", (d3.mouse(this)[0] + 60) + "px")
            .style("top", (d3.mouse(this)[1] + 1400) + "px")//+150 reduce the distance between tooltip and mouse
        d3.select(this)
            .transition()
            .ease(d3.easeElastic)
            .attr("width", 120)
            .attr("height", 120)
        //  .attr("z-index", 173)
    };

    var mouseleave;
    mouseleave = function (data) {
        tooltip
            .transition()
            .duration(100)
            .style("opacity", 0)

        d3.select(this)
            .transition()
            .ease(d3.easeElastic)
            .attr("width", 80)
            .attr("height", 80)
            .style("fill-opacity", 1)
            .attr("posotion", "relative")
        //  .attr("z-index", 0)

    };


    // Show Images
    var midline = svgMidline.selectAll("img")
        .data(data)
        .enter()
        .append('image')
        .attr('class', 'image')
        .attr('href', data => {
            return 'images/' + data.filename;
        })
        .style("fill-opacity", 1)
        .attr("width", 80)
        .attr("height", 80)
        .style("opacity", 1)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on('click', function (d, i) {
            window.open(d.museumURL);
            const el = d3.select(this);
            el.transition()
                .duration(750)
        });

    function orientationMidline() {
        midline.transition()
            .duration(1000)
            .ease(d3.easeElastic)
            .attr("x", function (d, i) {
                if (i < 13) {
                    return i * 100
                } else if (i < 26) {
                    return (i - 13) * 100 +50
                } else if (i < 39) {
                    return (i - 26) * 100
                } else if (i < 52) {
                    return (i - 39) * 100 + 50
                } else if (i < 65) {
                    return (i - 52) * 100
                } else if (i < 78) {
                    return (i - 65) * 100 + 50
                }
            })
            .attr("y", function (d, i) {
                if (i < 13) {
                    return 100
                } else if (i < 26) {
                    return 200
                } else if (i < 39) {
                    return 300
                } else if (i < 52) {
                    return 400
                } else if (i < 65) {
                    return 500
                } else if (i < 78) {
                    return 600
                }
            })
    }

    orientationMidline();

})



var svgOther = d3.select("#other")
    .append("svg")
    .attr("width", W)
    .attr("height", 1200)
    .append("g")

d3.json("./data/dataOther.json").then(function(data) {
    //Data Sorting Section
    var orientationData = [];
    var nodes = data;


    var nestedOrientation = d3.nest()
        .key(function (d){
            return d.orientation;
        })
        .entries(data)
    for (let i = 0; i < data.length; i++){
        let orientation = data[i].orientation;
        orientationData.push(orientation);
    }


    var tooltip = d3.select("#other")
        .append("div")
        .attr("class", "tooltip")
        .style("background-color", "#194F39")
        .style("position", "absolute")
        .style("display", "inline")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "6px")
        .style("opacity", 1)

    var mouseover;
    mouseover = function (data) {
        tooltip
            .transition()
            .duration(100)
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "#194F39")
            .attr("width", 200)
            .style("stroke-width", "2px")
            .style("opacity", 1)
            .style("fill-opacity", 1)
            .transition()
            .duration(750)
    };


    var mousemove;
    mousemove = function (data) {
        if (data.date == null) {tooltip.html("This self-portrait was created by " + data.artist + ".")
        }else{tooltip
            .html("This self-portrait was created by " + (data.artist) + " in the year " + (data.date) + ".")}
        tooltip
            .style("color", "white")
            .style("opacity", 1)
            // .attr("xlink:href", function(d) { return d.img;})
            .style("left", (d3.mouse(this)[0] + 60) + "px")
            .style("top", (d3.mouse(this)[1] + 1400) + "px")//+150 reduce the distance between tooltip and mouse
        d3.select(this)
            .transition()
            .ease(d3.easeElastic)
            .attr("width", 120)
            .attr("height", 120)
        //  .attr("z-index", 173)
    };

    var mouseleave;
    mouseleave = function (data) {
        tooltip
            .transition()
            .duration(100)
            .style("opacity", 0)

        d3.select(this)
            .transition()
            .ease(d3.easeElastic)
            .attr("width", 80)
            .attr("height", 80)
            .style("fill-opacity", 1)
            .attr("posotion", "relative")
        //  .attr("z-index", 0)

    };


    // Show Images
    var other = svgOther.selectAll("img")
        .data(data)
        .enter()
        .append('image')
        .attr('class', 'image')
        .attr('href', data => {
            return 'images/' + data.filename;
        })
        .style("fill-opacity", 1)
        .attr("width", 80)
        .attr("height", 80)
        .style("opacity", 1)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on('click', function (d, i) {
            window.open(d.museumURL);
            const el = d3.select(this);
            el.transition()
                .duration(750)
        });

    function orientationOther() {
        other.transition()
            .duration(1000)
            .ease(d3.easeElastic)
            .attr("x", function (d, i) {
                if (i < 13) {
                    return i * 100
                } else if (i < 26) {
                    return (i - 13) * 100 +50
                }
            })
            .attr("y", function (d, i) {
                if (i < 13) {
                    return 100
                } else if (i < 26) {
                    return 200
                }
            })
    }

    orientationOther();

})
