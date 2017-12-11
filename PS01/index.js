var width = d3.select('#svg1').attr('width');
var height = d3.select('#svg1').attr('height');

var marginLeft = 100;
var marginTop = 20;

var nestedData = [];

var svg2 = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

//these are the size that the axes will be on the screen; set the domain values after the data loads.
var scaleX = d3.scaleBand().rangeRound([0, 800]).padding(0.3);
var scaleY = d3.scaleLinear().range([150, 0]);

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


//import the data from the .csv file
d3.csv('./shotdistteam.csv', function(dataIn){

    nestedData = d3.nest()
        .key(function(d){return d.year})
        .entries(dataIn);

    var loadData = nestedData.filter(function(d){return d.key == '2016'})[0].values;

    scaleX.domain(loadData.map(function(d){return d.teamCode;}));
    scaleY.domain([0, d3.max(loadData.map(function(d){return +d.three}))]);

    // Add the x Axis
    svg2.append("g")
        .attr('transform','translate(0,150)')
        .attr('class', 'xAxis')  //move the x axis from the top of the y axis to the bottom
        .call(d3.axisBottom(scaleX));

    svg2.append("g")
        .attr('class','yAxis')
        .call(d3.axisLeft(scaleY));


/*
    svg.append('text')
        .text('Weekly income by age and gender')
        .attr('transform','translate(300, -20)')
        .style('text-anchor','middle');

    svg.append('text')
        .text('age group')
        .attr('transform','translate(260, 440)');

    svg.append('text')
        .text('weekly income')
        .attr('transform', 'translate(-50,250)rotate(270)');

        */

    //bind the data to the d3 selection, but don't draw it yet
  bar =  svg2.selectAll('rect')
        .data(loadData)
        .enter()
        .append('rect')
        .attr('class','bars')
        .attr('fill', "blue")
        .attr('fill-opacity', 0.5)
        .on ('mouseover', function(d){
          d3.select(this)
          .attr("fill-opacity", 1)
        }
        )

        .on ('mouseout', function (d){

          d3.select(this)

          .attr("fill-opacity", 0.5)

        })

        .on("click", function(d){
          var selection = d3.select(this).attr("id")
          var newData = updateData(selection)
          var newData2 = updateData5(selection)
          console.log(newData2)
          console.log(selection)
          drawPoints2(newData);
          drawPoints4(newData2)
          d3.select(this)
          .attr("fill", "#00ff00")
        })

          $('#testRect').tooltip();

    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    drawPoints(loadData);

     bar.exit()
     .attr('fill', 'blue')

});

//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    scaleY.domain([0, d3.max(pointData.map(function(d){return +d.three}))]);

    svg2.selectAll('.yaxis')
        .call(d3.axisLeft(scaleY));

    svg2.selectAll('rect')
        .data(pointData)
        .attr("id", function(d){
          return d.team
        })
        .attr('x',function(d){
            return scaleX(d.teamCode);
        })
        .attr('y',function(d){
            return scaleY(d.three);
        })
        .attr('width',function(d){
            return scaleX.bandwidth() - 5;
        })
        .attr('height',function(d){
            return 150 - scaleY(d.three);  //400 is the beginning domain value of the y axis, set above
          })
          .attr('data-toggle', 'tooltip')
          .attr('title', function(d) {
            return d.team + "    " + "win  rate:" + "     " + d.win
              ;
          });
            $('[data-toggle="tooltip"]').tooltip();

}


          svg2.append("text")
               .attr("x", 350)
               .attr("y", 0)
               .attr("font-size", 15)
               .attr("fill", "white")
               .text("% of shots taken from beyond the 3pt line");

               svg3.append("text")
                    .attr("x", -500)
                    .attr("y", 390)
                    .attr('transform', 'rotate(-90)')
                    .attr("font-size", 15)
                    .attr("fill", "white")
                    .text("1. Click on a team");

                    svg3.append("text")
                         .attr("x", -500)
                         .attr("y", 410)
                         .attr('transform', 'rotate(-90)')
                         .attr("font-size", 15)
                         .attr("fill", "white")
                         .text("2. Click on a player in scatter plot");

                         svg3.append("text")
                              .attr("x", -500)
                              .attr("y", 430)
                              .attr('transform', 'rotate(-90)')
                              .attr("font-size", 15)
                              .attr("fill", "white")
                              .text("3. Hover over shot-chart for more information");

                              svg3.append("text")
                                   .attr("x", -500)
                                   .attr("y", 450)
                                   .attr('transform', 'rotate(-90)')
                                   .attr("font-size", 15)
                                   .attr("fill", "white")
                                   .text("4. Green: SCORED, White: MISSED");







          svg2.append("text")
               .attr("transform", "rotate(270)")
               .attr("x", -100)
               .attr("y", -60)
               .attr("font-size", 13)
                .attr("fill", "white")
               .attr("text-anchor", "middle")
               .text("3pt FG%");



function updateData(selectedYear){
    return nestedData.filter(function(d){return d.key == selectedYear})[0].values;
}


//this function runs when the HTML slider is moved
function sliderMoved(value){

    newData = updateData2(value);
    drawPoints(newData);

}
