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
    
    
    var cell =  ($(window).width() / parseFloat($("body").css("font-size"))) < 40 ? 1 : 0;

    var circles;
    var colors = ['#fff59b', '#ff6f69', '#88d8b0', '#ffcc5c'];
    var ids = ['about', 'resume', 'blog', 'contacts'];
    var totWidth = canvas.width();
    var numSections = cell? 2 : ids.length;
    var radius = 50;
    var stroke = 2;
    //spanforcircle |-----|-----|
    var distance = ($(window).width() < 900 ) ? 150 : 200;
//    var circlesheight = ($(window).width() < 900 ) ? 65 : canvas.height()/1.5;
    var circles4 = $(window).width()/2;
    var circlesheight = cell ? circles4 : canvas.height()/1.5;
    var margin_right = (totWidth-(distance*numSections)) / 2;


    //alert($(window).width() / parseFloat($("body").css("font-size")));

    
        
    var svg = d3.select("#canvas").append("svg")
            .attr("width",  width)
            .attr("height", height);
    
            
    var cerchi = svg.append("g")
                .attr("class", "circles")
                .attr('width', (distance*numSections)+'px')
                .attr("transform", 'translate('+margin_right+',0)');
                //.attr('left', ((totWidth-spanforcircle*numSections)/2)+'px');
//                .attr("transform", function(d,i){
//                    console.log(parseFloat(distance*i)+parseFloat(distance/2));
//                    console.log(parseFloat(canvas.height()/2));
//                    return "translate(" +(parseFloat(distance*i)+parseFloat(distance/2))
//                    + ","+parseFloat(canvas.height()/2)+")"});

    
    var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(50)
            .startAngle(0)
            .endAngle(7);
   
    
   

    
    d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
            this.parentNode.appendChild(this);
        });
    };
    
    
    
    d3.selection.prototype.moveToBack = function() {
        var node = $(this.node());
        var index;
        $.each(ids, function(i,val){
            if(val == node.attr('id'))
                index = i;
        });
        //console.log($(this.node()).attr('id')+" corrisponde a "+index);
        return this.each(function(){
            this.parentNode.insertBefore(this, this.parentNode.childNodes[index]);
        });
    };
    
    
    
    
    circles = cerchi.selectAll(".circle")
            .data(ids)
  			.enter().append("g")
    		.attr("class", "circle hidden")
            .attr("id", function(d){return d;})
            .attr('width', 80)
            .attr("transform", function(d,i){
                    if( cell ) {
                        return "translate(" +((distance*(i%2))+(distance/2)-10)
                            + ","+((circles4)*((i<2)?1.2:2))+") scale(0.2)";
                    }
                    else
                         return "translate(" +((distance*i)+(distance/2))
                            + ","+circlesheight+") scale(0.2)";
                    })
            .on("click", function(d, index){  
                                        var el = d3.select(this);
                                        console.log("ho cliccato "+el.attr('id'));
                                        el.moveToFront();
                                       //d3.select('#'+d).style('fill', colors[i]);
                                       /* circles.sort(function (a, b) { // select the parent and sort the path's
                                            if (a.id != d.id) return -1;    
                                            else return 1;  
                                        }); */
                                        for(var i=0; i<ids.length; i++){
                                                console.log("muovo il cerchio "+i);
                                                moveCircles(i, d, index);
                                             }
                                        createCircularSpline();
                            });
              
    
    d3.select('.home')
    .transition()
        .delay(1500)
        .each("end", function(){
            $('.home').fadeOut(1000, function(){
                cerchi.selectAll('.circle')
                .data(ids)
                .transition()
                    .delay(function(d, i){return 500+i*500})
                    .attr("transform" ,  function(d, i) {
                        if(cell)
                            return "translate("+((distance*(i%2))+(distance/2)-10)
                            +", "+((circles4)*((i<2)?1.2:2))+") scale(1)";
                        else
                            return "translate("+((distance*i)+(distance/2))
                            +", "+circlesheight+") scale(1)";
                    })
                    .duration(1000)
                    .ease("elastic")
                    .attr('class', 'circle'); 

            })
                 
        })

            
            //.attr('left', function(d, i){return distance*i})
            
        
    
    
    var paths = circles.append('path')
                .attr('d', arc) /*function(radius){
                    if ($(window).width() < 900 ) 
                         radius = 20; 
                    else radius = 50; 
                    return arc;

                })*/
                .attr('id', function(d, i){return i+d})
                .attr('class', 'circlepath')
                .style('fill', function(d, i){return colors[i]});
                //.style('fill', "#bbbbbb");
                
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
                //.attr('x', function(){return ($(window).width() < 900 ) ? 100 : 170;})
                .attr('x', 170 )
                .attr('dy', -10)
                .style('stroke-width', 1)
                .append('textPath')
                    .attr("xlink:href", function(d, i){ return "#text-path"+i;})
                    .text(function(d){return d});
    
    
    var end_circles = distance*numSections;
    var margin = 50;

    
    var points_large = [
        [distance/2, circlesheight],
        [distance+distance/2, circlesheight],
        [distance*2+distance/2, circlesheight],
        [distance*3+distance/2, circlesheight],
        [end_circles+margin, circlesheight-5],
        [end_circles+margin_right-(margin*2), canvas.height()/1.7],
        [end_circles+margin_right-margin, canvas.height()/3],  //4
        [end_circles+margin_right-(margin*1.3), margin+20+50],  //5
        [end_circles+margin_right-margin*2.8, margin-15+50],   //6
        [end_circles+margin_right-(margin*4), margin*1.4+50], //7
        [end_circles+margin_right-(margin*3.9), margin*2.6+50], //8
        [end_circles+margin_right-(margin*2.8), margin*3.3+50], //9
        [end_circles+margin_right-(margin*1.5), margin*3+50], //10
        [end_circles+margin_right-(margin*1.2), margin*2+50], //11
        [end_circles+margin_right-(margin*1.5), margin*1.2+50], //12
        [end_circles+margin_right-(margin*2.5), margin-10+50], //8
        [end_circles+margin_right-(margin*3.5), margin*1.2+50], //8
        [end_circles+margin_right-(margin*3.8), margin*2+50], //8
        [end_circles+margin_right-(margin*3.5), margin*2.7+50]
        //8
       // [end_circles+margin_right-(margin*3.4), margin*2.6] //8
    ];
    
    var points_small = [
        [(distance+distance/2)-10, circlesheight*1.2],
        [ distance/2 - 10, circlesheight*1.2 ],
        [ distance/2 - 10, circlesheight*2 ],
        [(distance+distance/2)-10, circlesheight*2],
        [totWidth-radius*2, circlesheight*1.5],
        [totWidth-radius-10, circlesheight],
        [totWidth-radius-10, circlesheight/4],
        [totWidth-radius-30, circlesheight/6],
        [totWidth-radius-50, circlesheight/4],
        [totWidth-radius-30, circlesheight/3]       
        
    ];
    
    
    var points = cell? points_small : points_large;
    
    
    var completeCircle_large = [
        [end_circles+margin_right-(margin*2.6), margin*3+50],
        [end_circles+margin_right-(margin*1.8), margin*2.7+50],        
        [end_circles+margin_right-(margin*1.5), margin*2+50],
        [end_circles+margin_right-(margin*1.8), margin*1.2+50],
        [end_circles+margin_right-(margin*2.5), margin-10+50]
    ];
    
    
    var completeCircle_small = [
        [totWidth-radius-10, circlesheight/4]
    ];
    
    var completeCircle = cell ? completeCircle_small : completeCircle_large;
    
    
    var spline = svg.append("g")
                    .attr("class", "splines")
                    .attr("transform", 'translate('+margin_right+',0)');
    
    
    var splines = spline.selectAll(".spline")
        .data(ids)
        .enter().append("path")
                .datum( function(d, i){
                    var i_spline = i;
                    if ( cell ) 
                        if( i == 0)
                            i_spline = 1;
                        if ( i == 1)
                            i_spline = 0;
                    return points.slice(i, points.length-i_spline); }) 
                .attr('class', 'spline')
                .attr('id', function(d, i){return 'spline'+i})
                .attr('d', d3.svg.line().interpolate('cardinal'));
 
    
    
    
        var point = spline.selectAll("point")
            .data(points, function(d) { return d; });
    
    

        point.enter().append("circle")
            .attr("r", 1e-6)
            .attr('class', 'point')
            .attr("r", 6.5)
            .attr("cx", function(d) { return d[0]; })
            .attr("cy", function(d) { return d[1]; });

        point.exit().remove();

        

 
    function createCircularSpline(){
        //points = points.slice(points.length-4, points.lenght).concat(completeCircle);
          //          console.log(points.length);
        
        spline
                .selectAll(".circularspline")
                .data(ids)
                .enter().append("path")
                    .datum( function(d, i){return points.slice(points.length-i-1, points.lenght).concat(completeCircle).concat(points.slice(points.length-3, points.length-i)); }) 
                    .attr('class', 'circular spline')
                    .attr('id', function(d, i){return 'circspline'+i})
                    .attr('d', d3.svg.line().interpolate('cardinal'));
    }
    
    
    
    function openPage(clicked_id){
        var page;
        var oldpage = $(".open");
        if(oldpage){
            oldpage.addClass("hidden");
            oldpage.removeClass("open");
        }
        if(clicked_id == 'contacts'){
            page = $(".contacts");
            page.removeClass("hidden");
        }
        
        else if(clicked_id == 'about'){
            page = $(".about");
            page.removeClass("hidden");
        }
        
        else if(clicked_id == 'resume'){
            page = $(".resume");
            page.removeClass("hidden");
        }
        
        else if(clicked_id == 'blog'){
            page = $(".blog");
            page.removeClass("hidden");
        }
        
        page.addClass("open");

    }
                  
                  
    function moveCircles(i, clicked_id, clicked_index){
        var elem = d3.select(circles[0][i]);
        
        var i_spline = i;
        if ( cell )
            if(i == 0)
                i_spline = 1;
            if (i == 1)
                i_spline = 0;
        
        console.log("sono "+i+" e mi muovo lungo la spline "+i_spline);
        if(elem.attr('class') == "circle"){
            elem
                .attr('class', function(d){ if(d == clicked_id) return elem.attr('class')+' menu selected';
                                                 else return elem.attr('class')+" menu"})
                .transition()
                .duration(3000)
                .attrTween("transform", translateAlong(d3.select('#spline'+i_spline).node(), i, 0, clicked_index))
                .each("end", function(){
                    openPage(clicked_id);
                    elem.
                        on("click", function(d){    
                                                    var previously_sel = d3.select(".selected");                 
                                                    $(previously_sel.node()).removeClass('selected');
                                                    previously_sel.moveToBack();
                                                    var cur = d3.select("#"+d);
                                                    $(cur.node()).addClass('selected');
                                                    var son = cur[0][0].childNodes[0];
                                                    var i = $(son).attr('id').substring(0,1);
                                                    cur.moveToFront();
                                                    for(var j=0; j<ids.length; j++){
                                                        moveMenu(j,d,i);
                                                    }
                                                });
                
            })
            
        }
            
    }
    
    
    function moveMenu(i, clicked_id, clicked_index){
        var p = d3.select('#circspline'+i).node();
        var elem = d3.select(circles[0][i]);
        

        elem
            .transition()
            .duration(2000)
            .attrTween("transform", translateAlong(p, i, 1, clicked_index))
            .each("end", function(){openPage(clicked_id);});
        
        
    }
    
   
    
    
    function translateAlong(path, index, flag, clicked_index) {
        var l = path.getTotalLength();
        return function(d, i, a) {
            return function(t) {
                var p = path.getPointAtLength(t * l);
                /*move along first path*/
                if(flag == 0){
                    var scaling_f = cell ? 1-t/1.43 : 1-t/3;
                    if( index == clicked_index )
                        scaling_f = cell ? 1-t/1.67 : 1-t/5;
                    if( index == 0 )
                        return "translate("+ p.x + "," + p.y + ") scale("+scaling_f+") rotate("+(-145*t)+")";
                    else if( index == 1 )
                        return "translate("+ p.x + "," + p.y + ") scale("+scaling_f+") rotate("+(-105*t)+")";
                    else
                        return "translate("+ p.x + "," + p.y + ") scale("+scaling_f+") rotate("+(-70*t)+")";
                }
                else{
                    var scaling_f = cell ? 0.3 : 0.665;
                    if( index == clicked_index )
                        scaling_f = cell ? 0.4 : 0.8;
                    if( index == 0 )
                        return "translate("+ p.x + "," + p.y + ") scale("+scaling_f+") rotate("+(-145)+")";
                    else if( index == 1 )
                        return "translate("+ p.x + "," + p.y + ") scale("+scaling_f+") rotate("+(-105)+")";
                    else
                        return "translate("+ p.x + "," + p.y + ") scale("+scaling_f+") rotate("+(-70)+")";
                }
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