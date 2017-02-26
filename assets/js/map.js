                      
var width=$(".social_row").width();
var height = 500;
var country;
var scale = 1;

      
      
      var svg = d3.select("#map").append("svg")
            .attr("viewBox", "0 0 "+width+" "+height)
            .attr("preserveAspectRatio", "xMinYMid");
                  
    var projection = d3.geo.mercator()
        .scale(800)
        .translate([width / 5, height*2 ]);
                      
    var path = d3.geo.path()
          .projection(projection);
               
    
    var g = svg.append("g");
  
    


    var countries = d3.json("/assets/data/countries.topo.json", function(error, europe) {
        var euroMap = topojson.feature(europe, europe.objects.countries2);
        
        g.append("g")
            .attr("id", "countries")
            .selectAll("path")
            .data(euroMap.features)
            .enter()
            .append("path")
                .attr("id", function(d) { return d.properties.name; })
                .attr("d", path)
                .attr("class", "country zoomout")
                .on('click', function(d){ var xyz = [width/5, height*2, 1]; zoom(xyz);});

      });


    
    var time = {"London": "1", "Salerno": "6", "Innsbruck": "2", "Atripalda": "13", "Avellino": "1"};
    
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-5, -20])
      .html(function(d) {
        return " <span style='color:#fff59b'><strong>"+d.id+"</strong></span>";
      })
    
    svg.call(tip);

    d3.json("/assets/data/places.topo.json", function(error, cities) {
        g.append("g")
        .attr("id", "cities")
        .selectAll(".city")
        .data(topojson.feature(cities, cities.objects.places).features)
        .enter()
        .append("path")
            .attr("id", function(d) { return d.id; })
            .attr("class", "city")
            .attr("d", path.pointRadius(function(d){console.log(d); return 2.8*time[d.id];}))
            .style('fill', '#fff59b')
            .style("stroke", '#fffccb' )
            .style("stroke-width", 0)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on('click', pointClicked);
    });
                  
               
  function get_xyz(d) {
  var bounds = path.bounds(d);
  console.log(JSON.stringify(path.bounds(d)));
  var w_scale = (bounds[1][0] - bounds[0][0]) / width;
  var h_scale = (bounds[1][1] - bounds[0][1]) / height;
  var z = .96 / Math.max(w_scale, h_scale);
  var x = (bounds[1][0] + bounds[0][0]) / 2 - (width/4) / z;
  var y = (bounds[1][1] + bounds[0][1]) / 2 + (height*1.5 / z );
  return [x, y, z];
}

 
function zoom(xyz) {
  g.transition()
    .duration(750)
    .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
    .selectAll([".country", "#region", ".comune", ".city"])
    .style("stroke-width", 1.0 / xyz[2] + "px")
    .attr("d", path.pointRadius(function(d){console.log(d); return 0.2*time[d.id];}))

  
}



function pointClicked(d) {
  /*g.selectAll([".city"]).remove();*/
  state = null;

    var country = d.properties.state;

  if (country) {
    console.log(country);
    g.selectAll("#" + d.id).style('display', null);
  }

  if (d && country !== d) {
    /*var xyz = get_xyz(d);*/
    console.log("xyz = ",xyz);
    /*country = d;*/

    if (d.properties.state  == 'Italy') {
      var region = d3.json("/assets/data/regions.topo.json", function(error, reg){
          var campania = topojson.feature(reg, reg.objects.regions);
          /*g.append("g")
          .attr("id", "region")
          .selectAll("#region")
          .data(campania.features)
          .enter()
          .append("path")
          .attr("id", function(d) { return d.properties.description; })
          .attr("d", path)
          .style('stroke', '#fff59b')
          .on('mouseout', function(d){ var xyz = [width/5, height*2, 1]; zoom(xyz);})*/
          
          xyz = get_xyz(campania);
        
      });
    
      var c = d3.json("/assets/data/extplaces.topo.json", function(error, campania) {
        g.append("g")
          .attr("id", "comuni")
          .selectAll(".comune")
          .data(topojson.feature(campania, campania.objects.places).features)
          .enter()
          .append("path")
          .attr("id", function(d) { return d.id; })
          .attr("class", "comune")
          .attr("d", path.pointRadius(5))
          .style('fill', '#fff59b')
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)

        zoom(xyz);
        /*g.selectAll("#" + d.id).style('display', 'none');*/
      });      
    }
      else if (d.properties.state == "United Kingdom"){
          console.log("uk");
          var region = d3.json("/assets/data/london.topo.json", function(error, reg){
          var london = topojson.feature(reg, reg.objects.london);
              
          g.append("g")
          .attr("id", "london")
          .selectAll("#london")
          .data(london.features)
          .enter()
          .append("path")
          .attr("id", function(d) { return d.id; })
          .attr("d", path)
          .style('stroke', '#fff59b');
              
              
          xyz = get_xyz(london);
        });
          
          var c = d3.json("/assets/data/extplaces.topo.json", function(error, campania) {
        g.append("g")
          .attr("id", "comuni")
          .selectAll(".comune")
          .data(topojson.feature(campania, campania.objects.places).features)
          .enter()
          .append("path")
          .attr("id", function(d) { return d.id; })
          .attr("class", "comune")
          .attr("d", path.pointRadius(5))
          .style('fill', '#fff59b')
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)

        /*zoom(xyz);*/
                    });      

      }
      else {
      zoom(xyz);
      console.log("Ho zoommato");
    }
      
  } else {
    var xyz = [width/5, height*2, 1]; 
    country = null;
    g.selectAll([".country", "#region", ".city"])
    .style("stroke", "#999")
    .style("stroke-width", 0.5)
    .attr("d", path.pointRadius(function(d){console.log(d); return 2.8*time[d.id];}))

    zoom(xyz);
  }
}

    
  
                    
                  
