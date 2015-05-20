$(document).ready(function() {
    
    
    
    //margine sinistro
    //var x = ($(window).width() / 10);
    var x = 0;
    var y = 0;
    var width = '100%';
    var height = '100%';
    
    var canvas = $('#canvas');
    canvas.css('position', 'absolute');
    canvas.css('left', x);
    canvas.css('top', y);
    canvas.css('right', x);
    canvas.css('height', height)
    canvas.css('width', width);
    
    
    var circles;
    var colors = ['#fff59b', '#ff6f69', '#88d8b0', '#ffcc5c'];
    var ids = ['about', 'resume', 'blog', 'contacts'];
    var totWidth = canvas.width();
    var numSections = ids.length;
    var radius = 50;
    var stroke = 2;
    //spanforcircle |-----|-----|
    var distance = 200;
    var margin = 50;
    var circlesheight = canvas.height()/1.5;


    
    
    var svg = d3.select("#canvas").append("svg")
            .attr("width",  width)
            .attr("height", height)
            .append("g")
                .attr("class", "circles")
                .attr('width', (distance*numSections)+'px')
                .attr("transform", 'translate('
                      +parseFloat((totWidth-distance*numSections)/2)+',0)');
                //.attr('left', ((totWidth-spanforcircle*numSections)/2)+'px');
//                .attr("transform", function(d,i){
//                    console.log(parseFloat(distance*i)+parseFloat(distance/2));
//                    console.log(parseFloat(canvas.height()/2));
//                    return "translate(" +(parseFloat(distance*i)+parseFloat(distance/2))
//                    + ","+parseFloat(canvas.height()/2)+")"});

    
    var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(radius)
            .startAngle(0)
            .endAngle(7);
   
    
    var menu = d3.svg.arc()
            .innerRadius(radius)
            .outerRadius(radius+30)
            .startAngle(0)
            .endAngle(7)

    
    circles = svg.selectAll(".circle")
            .data(ids)
  			.enter().append("g")
    		.attr("class", "circle")
            .attr("id", function(d){return d;})
            .attr('width', function(d){return distance})
            .attr("transform", function(d,i){
                    return "translate(" +(parseFloat(distance*i)+parseFloat(distance/2))
                    + ","+circlesheight+")"});
            //.attr('left', function(d, i){return distance*i})
            
        
        
    var paths = circles.append('path')
                .attr('d', arc)
                .attr('id', function(d, i){return i+d})
                .style('fill', function(d, i){return colors[i]})
                .on("click", function(d){openPage(d);});
                   /* .attr("cy", canvas.height()/2)
                    .attr("cx", function(d,i){return distance*i+distance/2;})
                    .attr('r', radius)
                    .attr('id', function(d, i){return i+d})
                    .style('fill', function(d, i){return colors[i]})
                    .on("click", function(d){openPage(d)});*/
                    
                    //.style("display", function(d, i){ if(i<2) return "inline"; else return "none";});

    
   /* var menus = svg.selectAll('.circle')
                .append('path')
                .attr('class', 'menupath')
                .attr('d', menu)
                .attr('id', function(d){return d+'path'})
                .attr("transform", function(d,i){
                        return "translate(" +(parseFloat(distance*i)+parseFloat(distance/2))
                        + ","+parseFloat(canvas.height()/2)+")"});
    */
    
            
    
    /* text */ 
    
    var paths_in_defs = svg.append("defs");
    
    paths_in_defs.selectAll('.clippath')
            .data(ids)
            .enter().append("path")
                .attr('id', function(d,i){return 'text-path'+i})
                .attr('class', 'clippath')
                .attr('d', function(d,i){return arc(i)})
           

    var text = paths.append("clipPath")
                        .attr('id', function(d,i){return 'text-clip'+i})
                        .append('use')
                        .attr("xlink:href", function(d, i){ return "#"+d+'path';})
   
    
    circles.append("text")
                .attr('clip-path', function(d, i){return "url(#text-clip"+i+')'})
                .attr('class', 'textmenu')
                .attr('x', 170)
                .attr('dy', -10)
                .style('stroke-width', 1)
                .append('textPath')
                    .attr("xlink:href", function(d, i){ return "#text-path"+i;})
                    .text(function(d){return d});
    
    
    var margin_right = (canvas.width()-(distance*numSections) ) / 2;
    var end_circles = distance*numSections;
    
    var points = [
        [distance/2, circlesheight],
        /*[distance+distance/2, circlesheight],
        [distance*2+distance/2, circlesheight],
        [distance*3+distance/2, circlesheight],*/
        [end_circles+margin, circlesheight-5],
        [end_circles+margin_right-(margin*2), canvas.height()/1.7],
        [end_circles+margin_right-margin, canvas.height()/3],  //4
        [end_circles+margin_right-(margin*1.3), margin+20],  //5
        [end_circles+margin_right-margin*2.8, margin-15],   //6
        [end_circles+margin_right-(margin*4), margin*1.4], //7
        [end_circles+margin_right-(margin*3.9), margin*2.6], //8
        [end_circles+margin_right-(margin*2.8), margin*3.3], //9
        [end_circles+margin_right-(margin*1.5), margin*3], //10
        [end_circles+margin_right-(margin*1.2), margin*2], //11
        [end_circles+margin_right-(margin*1.5), margin*1.2], //12
        [end_circles+margin_right-(margin*2.5), margin-10], //8
        [end_circles+margin_right-(margin*3.5), margin*1.2], //8
        [end_circles+margin_right-(margin*3.8), margin*2], //8
        [end_circles+margin_right-(margin*3.5), margin*2.5], //8
        [end_circles+margin_right-(margin*3.4), margin*2.6] //8
       
    ];
    
    
    

    
    var path = d3.select("svg").append("path")
        .datum(points)
        .attr('class', 'line')
        .attr('d', d3.svg.line().interpolate('cardinal'))
        .attr("transform", 'translate('
                      +parseFloat((totWidth-distance*numSections)/2)+',0)');
 
    
    
    
        var point = svg.selectAll("point")
            .data(points, function(d) { return d; });

        point.enter().append("circle")
            .attr("r", 1e-6)
            .attr('class', 'point')
            .transition()
            .duration(750)
            .ease("elastic")
            .attr("r", 6.5);

        point
            .attr("cx", function(d) { return d[0]; })
            .attr("cy", function(d) { return d[1]; });

        point.exit().remove();

        

 
                  
                  
    function openPage(page){
        if(page === 'contacts')
            $('.social_row').toggle();
        circles.transition()
                .duration(3000)
                .attrTween("transform", translateAlong(path.node()))
                //bell'effetto
                //.attr("transform", "translate(320, 0)")
                /*.attr("transform", function(d, i){ 
                        if(d === page){
                            console.log(d+' '+page);
                            return "translate("+(totWidth-(distance*numSections)-100)+
                                ", 200), rotate(-90), scale(0.7)";
                        }
                        else
                            return "translate("+(totWidth-(distance*numSections)+100)+
                                ", 400), rotate(-"+(90+2*i)+"), scale(0.5)";
                })*/
                 
        
        //if(page === 'resume')
            
            
    }
    
    
    function translateAlong(path) {
        var l = path.getTotalLength();
        return function(d, i, a) {
            return function(t) {
                var p = path.getPointAtLength(t * l);
                return "translate(" + p.x + "," + p.y + ")";
            };
        };
    }
/*          
    circles.append("path")
            .data(ids)
            .attr("class", function(d, i) { return i+d; })
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d, i) { return colors(i); })
            .style("stroke-width", "2px")
            .style("fill", "none")*/

    
    /*
    function drawCircles(circles, i){
        if(i < numSections){
            var margin = 5;
            var circle = paper.path('M'+(distance*i)+','+heightc);
            circles[i] = circle;
            //g.append(lines[i]);
            //circle.toBack();
            //var gg = $(document.createElement('g'));
            //gg.attr('class','page');
            //gg.attr('id', i+ids[i]);
            var gg = makeSVG('g', {class:page, id:i+ids[i]);
            console.log(circle);
            console.log($(circle.node)[0]);
            gg.append($(circle.node)[0]);
            g.append(gg);
            circle.attr(
                {
                    //'stroke-width': 2,
                }).click(function(){
                    /*$(this.node).attr('class', 'big page');*/
    /*                openPage(this, $(this));
            })
            //var incr = increasing*i;
            //var newheight = (height-101-incr);
            var newheight = (heightc-101);
            var end = (newheight.toString()).split(".")[0]+'.01';
            circle.animate(
                {
                    //path: 'M'+(1+i)+' '+newheight+','+ 
                          //  'A'+(xaxis+incr)+' '+(yaxis+incr)+' 0 1 0 '+(1+i)+' '+end
                    path: 'M'+((distance*i))+' '+newheight+','+ 
                            'A'+xaxis+' '+yaxis+' 0 1 0 '+((distance*i))+' '+end
                }, 800, 'linear',
                function(){
                    circle.attr({ 'fill': colours[i]});
                    drawCircles(circles,i+1);
                }
            );
            
            //var c = $(circle.node);
            //c.attr('class', 'page');
            //c.attr('id', i+ids[i]); 
            
            var hoverIn = function() {
                this.attr({"stroke": '#E3E3E3'});
            };
    
            var hoverOut = function() {
                this.attr({"stroke": "#000"});    
            }
    
            circle.hover(hoverIn, hoverOut, circle, circle);
            
        }
       
    };
*/
   
  /*  
    
    
    function openPage(r, e){
        var jq = $(r.node);
        if(jq.hasClass('big')){
            jq.removeClass('big');
            console.log("Ho rimosso big ");
            /*r.transform('s2,2');*/
/*            r.animate({ transform: 'S1,1' }, 1000)
        }
        else{
            jq.addClass('big');
            console.log("ho aggiunto big");
            /*r.transform('s2,2');*/
            /*r.animate({ transform: 't100,50r90,50,50' }, 5000)  
            */
/*            var i = jq.attr('id').substring(0,1);
            var incr = i*2+3+parseInt(i);
            var bb= r.getBBox();
            var getw = Math.ceil(bb.width);
            var geth = bb.height;
            var ratiow = $('svg').width()/(2+parseFloat(getw));
            //var ratioh = $('svg').height()/(parseFloat(geth));
            console.log("getw: "+getw );
            console.log('t'+(incr)+ " questo incr:"+ incr);
            r.animate({ transform: 't-'+(incr)+',0s'+ratiow+',1,0,400' }, 1000)        
        }
        
        
    */
    
    
    
});