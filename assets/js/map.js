                      
var width=$(".social_row").width();
var height = 500;
var country;

      
      
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
         g.append("g")
            .attr("id", "countries")
            .selectAll("path")
            .data(topojson.feature(europe, europe.objects.countries2).features)
            .enter()
            .append("path")
                .attr("id", function(d) { return d.properties.name; })
                .attr("d", path)
                .attr("class", "country");
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
            .style("stroke", '#000000' )
            .style("stroke-width", 0)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on('click', pointClicked);
    });
                  
               
  function get_xyz(d) {
  var bounds = path.bounds(d);
      console.log("data: ", d);
      console.log("bounds: ",bounds);
  var w_scale = (bounds[1][0] - bounds[0][0]) / width;
  var h_scale = (bounds[1][1] - bounds[0][1]) / height;
  var z = .96 / Math.max(w_scale, h_scale);
  var x = (bounds[1][0] + bounds[0][0]) / 2;
  var y = (bounds[1][1] + bounds[0][1]) / 2 + (height / z / 6);
      console.log(x, " ", y, " ", z);
  return [x, y, z];
}

/*
function zoom(map) {
			var bounds = new google.maps.LatLngBounds();
			map.data.forEach(function (feature) {
				processPoints(feature.getGeometry(), bounds.extend, bounds);
			});
			map.fitBounds(bounds);
		}*/

                  
function zoom(xyz) {
    console.log("ci sono");
  g.transition()
    .duration(750)
    .attr("transform", "translate(" + projection.translate() + ")scale(" + xyz[2] + ")translate(-" + xyz[0] + ",-" + xyz[1] + ")")
    .selectAll(["#countries", "#states", "#cities"])
    .style("stroke-width", 1.0 / xyz[2] + "px")
    .selectAll(".city")
    .attr("d", path.pointRadius(20.0 / xyz[2]));
}



function pointClicked(d) {
  g.selectAll([".city"]).remove();
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
          g.append("g")
          .attr("id", "region")
          .selectAll(".region")
          .data(topojson.feature(reg, reg.objects.regions).features)
          .enter()
          .append("path")
          .attr("id", function(d) { return d.properties.description; })
          .attr("class", "active")
          .attr("d", path)
          .style('stroke', '#fff59b')
        
          xyz = get_xyz(d3.select("#Campania"));
      });
      d3.json("/assets/data/extplaces.topo.json", function(error, campania) {
        g.append("g")
          .attr("id", "comuni")
          .selectAll("#cities")
          .data(topojson.feature(campania, campania.objects.places).features)
          .enter()
          .append("path")
          .attr("id", function(d) { return d.id; })
          .attr("class", "active")
          .attr("d", path.pointRadius(5))
          .style('fill', '#fff59b')
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)

        zoom(xyz);
        g.selectAll("#" + d.id).style('display', 'none');
      });      
    } else {
      zoom(xyz);
      console.log("Ho zoommato");
    }
  } else {
    var xyz = [width / 2, height / 1.5, 1];
    country = null;
    zoom(xyz);
  }
}

    
  
                    
                  
