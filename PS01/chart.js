var svg3 = d3.select('svg2');

/* Your code goes here */

var svg3 = d3.select('#svg2');

var selectedPlayer

var nestedData2;
var nestedData4;
var nestedData5;


var color;

var opa;

var rad;

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// function selectedTeam(value){
//     reloadData(value);
// }
//
// console.log(selectedTeam)

// function reloadData(inputName){
//
//         d3.csv('shot_' + inputName + '.csv', function(error, newData){
//             console.log(newData);
//
//             //call your update function from here!!
//             //updateData(newData);
//         });
d3.csv('./toro2.csv', function (dataIn5){

var  nestData = d3.nest()
      .key(function(d){return d.Team})
      .entries(dataIn5);

      nestedData5 = nestData








  });



d3.csv('./toro2.csv', function (dataIn4){

var  nestedData = d3.nest()
      .key(function(d){return d.Player})
      .entries(dataIn4);

      nestedData4 = nestedData

// drawPoints4(dataIn4)

color = function color(d) { if (d.shotoutcome == "SCORED") {
                                        return "#00ff00"

                            } else if (d.shotoutcome == "MISSED") {
                                        return "#FFFFFF"
                                      }
                              else {
                                        return "#FFFFFF"
                              }
                           };

opa = function opa(d) { if (d.shotoutcome == "SCORED") {
                                        return "0.4"

                            } else if (d.shotoutcome == "MISSED") {
                                        return "0.4"
                                      }
                              else {
                                        return "0.6"
                              }
                           };


rad = function rad(d) { if (d.shotoutcome == "SCORED") {
                                        return "3"

                            } else if (d.shotoutcome == "MISSED") {
                                        return "1.8"
                                      }
                              else {
                                        return "1"
                              }
                           };




console.log(updateData4("Kyle Lowry"))


  });
  function updateData4(selectedPlayer){
      return nestedData4.filter(function(d){ return d.key == selectedPlayer })[0].values
  }

  function updateData5(selectedTeam){
      return nestedData5.filter(function(d){ return d.key == selectedTeam})[0].values
  }

  function drawPoints4(dataPoints) {
  var shotchart = svg3.selectAll('circle')
     .data(dataPoints);


     shotchart.transition()
              .duration(500)
              .ease(d3.easeSin)
              .attr("cx", function(d) {
                return d.locx
              })
              .attr("cy", function(d) {
                return d.locy;
              })

              // svg3.append("text")
              //  .attr("transform", "rotate(-90)")
              //      .attr("x", -400)
              //      .attr("y", 15)
              //      .attr("font-size", 15)
              //      .attr("fill", "white")
              //      .text("2015-2016 Regular Season Shot Chart: Team and Player");


     shotchart.enter()
     .append('circle')


     .on("mouseover", function(d) {
       div.transition()
     .duration(200)
     .style("opacity", .9)


     div	.html("Player: <strong>" + d.Player+"</strong>" + "</span>" + "<br/>"+"<br/>"  + "Shot Type: <strong>" + d.shottype+"</strong><br/>"  )
     .style("left",(d3.event.pageX) + 10 + "px")
     .style("top",(d3.event.pageY - 28) + "px")

     })
     .on("mouseout", function(d) {
     div.transition()
     .duration(10)
     .style("opacity", 0)

     div.html("")
     })


     .attr("cx", function(d){

     return d.locx;
     })
     .attr("cy", function(d){
       return d.locy;

     })

     .attr('r', rad)

     .attr("fill", color)
     .attr("opacity", opa)

     shotchart
     .attr("cx", function(d){

     return d.locx;
     })
     .attr("cy", function(d){
       return d.locy;

     })

     .attr('r', rad)

     .attr("fill", color)

     shotchart
     .exit()
     .remove()

  }



//       .attr('fill', function(d){
//         return randomColor();
// })
// })
