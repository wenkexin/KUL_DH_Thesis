var svg3 = d3.select("#dataviz2")
    .append("svg")
    .attr("width", W)
    .attr("height", 850)
    .append("g")


d3.json("./data/dataAll.json").then(function(data){

    var nodes = data;



    var myColor = d3.scaleOrdinal()
        .domain(["no","yes"])
        .range("#8fbc8f","#fffafa");

    var tooltip = d3.select("#dataviz")
        .append("div")
        .attr("class", "tooltip")
        .style("background-color", "#8fbc8f")
        .style("position", "absolute")
        .style("display","inline")
        .style("border-width", "1px")
        .style("border-radius", "3px")
        .style("padding", "3px")
        .style("opacity", 1)


    var portraitsTitle = svg3.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("r",5)
        // .attr("y",5)
        // .attr("width",5)
        // .attr("height",5)
        .style("stroke","black")
        .style("stroke-width", 1)
        .style("fill","none")
        .attr("transform", "translate(55, 110)")
        .style("opacity",0)
        .on('click', function(d, i) {
            window.open(d.museumURL);
            const el = d3.select(this);
            el.transition()
                .duration(750)
        });

//     }
    function f3() {
        portraitsTitle.transition()
            .duration(1000)
            .ease(d3.easeElastic)
            .style("opacity",1)
            .attr("cx", function(d,i){
                if (i<18){
                    return i*40
                } else if (i<36){
                    return (i-18)*40
                } else if (i<54){
                    return (i-36)*40
                } else if (i<72){
                    return (i-54)*40
                }else if (i<90){
                    return (i-72)*40
                }else if (i<108){
                    return (i-90)*40
                }else if (i<126){
                    return (i-108)*40
                }else if (i<144){
                    return (i-126)*40
                }else if (i<162){
                    return (i-144)*40
                }else if (i<180){
                    return (i-162)*40
                }else if (i<198){
                    return (i-180)*40
                }else if (i<216){
                    return (i-198)*40
                }else if (i<234){
                    return (i-216)*40
                }else if (i<252){
                    return (i-234)*40
                }else if (i<270){
                    return (i-252)*40
                }else if (i<288){
                    return (i-270)*40
                }else if (i<306){
                    return (i-288)*40
                }else if (i<324){
                    return (i-306)*40
                }else if (i<333){
                    return (i-324)*40
                }
            })
            .attr("cy", function(d,i){
                if (i<18){
                    return 40
                } else if (i<36){
                    return 80
                } else if (i<54){
                    return 120
                } else if (i<72){
                    return 160
                }else if (i<90){
                    return 200
                }else if (i<108){
                    return 240
                }else if (i<126){
                    return 280
                }else if (i<144){
                    return 320
                }else if (i<162){
                    return 360
                }else if (i<180){
                    return 400
                }else if (i<198){
                    return 440
                }else if (i<216){
                    return 480
                }else if (i<234){
                    return 520
                }else if (i<252){
                    return 560
                }else if (i<270){
                    return 600
                }else if (i<288){
                    return 640
                }else if (i<306){
                    return 680
                }else if (i<324){
                    return 720
                }else if (i<333){
                    return 760
                }
            })


    }

    function f4() {
        portraitsTitle.transition()
            .duration(1000)
            .ease(d3.easeElastic)
            .style("stroke", "none")
            .style("fill", function (d, i) {
                if (d.gender === "female") {
                    return "#e9967a"
                } else {
                    return "#8fbc8f"
                }
            })
    }


    let menuRadius = (height*0.9)/36;
    function f6() {
        // smaller circles on right hand side
        if (data.gender === "female") {
            portraitsTitle.transition()
        //     svg3.selectAll("#e9967a","circle")
                .transition()
                .ease(d3.easeQuadInOut)
                .duration(1500)
                .attr("height", menuRadius * 2)
                .style("left", (width * 0.975) - menuRadius + "px")
                .style("top", function (d, i) {
                    return ((i) * (2 * menuRadius) + (height * 0.08)) + "px";
                })
                .style("cursor", "pointer")

            d3.select('body')
                .transition()
                .ease(d3.easeQuadInOut)
                .duration(500)
                .style("background-color", "#f0f0f0")
        }
    }
// f6();
// f3();

    var legendTitle= d3.select("#legend6")
        .append("circle")
        .attr("r",5)
        // .attr("y",5)
        // .attr("width",5)
        // .attr("height",5)
        .attr("cx",10)
        .attr("cy",14)
        .style("fill","#e9967a")

    var legendNoTitle= d3.select("#legend7")
        .append("circle")
        .attr("r",5)
        // .attr("y",5)
        // .attr("width",5)
        // .attr("height",5)
        .attr("cx",10)
        .attr("cy",14)
        .style("fill","#8fbc8f")

    function scroll(n, offset, func1, func2){
        return new Waypoint({
            element: document.getElementById(n),
            handler: function(direction) {
                direction == 'down' ? func1() : func2();
            },
            //start 75% from the top of the div
            offset: offset
        });
    };


    new scroll('step1', '75%', f3, f4);
    // new scroll('step2', '75%', f4, f5);
    // f6();
    new scroll('step2', '75%', f4, f3);
    // new scroll('step3', '75%', f3, f6);

});