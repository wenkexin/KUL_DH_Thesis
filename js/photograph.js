var photograph = d3.select("#image")
    .append("svg")
    .attr("width", W)
    .attr("height", H)
    .append("g")

    d3.json("./data/dataMedium.json").then(function(data){



        photograph.selectAll("img")
            .data(data)
            .enter()
            .append('image')
            .attr('class', 'image')
            .attr('href', data => {
                return 'images/imageMedium/' + data.filename;
            })
            .attr("x", function(d,i){
                if (i<9){
                    return 130*i
                }else{
                    return 130*(i-9)

                }
            })
            .attr("y", function(d,i){
                if (i<9){
                    return 0
                }else{
                    return 150
                }

            })
            .style("fill-opacity", 1)
            .attr("width", 150)
            .attr("height", 150)
            .attr("transform", "translate(0, 200)")
            .style("opacity", 1)

    })

// })