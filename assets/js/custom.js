$(document).ready(function() {
    
    var x = ($(window).width() / 10) -5;
    var y = 0;
    var height = $(window).height() / 1.2; 
    var width = '90%';
    
    var canvas = $('#canvas');
    canvas.css('position', 'absolute');
    canvas.css('left', x);
    canvas.css('top', y);
    canvas.css('width', width);
    canvas.css('height', height);

    

    var paper = Raphael("canvas", width, height);
    
    /*var g = $(document.createElement('g'));
    g.addClass('pages');
    $('svg').append(g);*/
    
    var line = paper.path('M0 0');
    
    var circles = new Array();
    
    //g.append(line);
    
    
    line.attr(
        {
            'stroke-width': 4,
            class: 'page'
        });
    
    line.animate(
        {
            path: 'M0 0, l 0 '+(height-100)
        }, 2000, 'linear', 
        function(){
            var name = $('#name');
            /*name.removeClass('hidden');*/
            name.css('position', 'absolute');
            name.css('left', x+20);
            name.css('top', ((height-60) - name.css('height').split("px")[0]));
            drawCircles(circles, 0);
        }
    );
    
    function drawCircles(circles, i){
        if(i < 4){
            var circle = paper.path('M0 '+(height-100));
            //g.append(lines[i]);
            circle.toBack();
            circle.attr(
                {
                    'stroke-width': 2,
                    'class': 'pagess'
                });
            var incr = 20*i;
            var newheight = (height-101-incr);
            var end = (newheight.toString()).split(".")[0]+'.01';
            var colours = ['#fff59b', '#ff6f69', '#88d8b0', '#ffcc5c'];
            circle.animate(
                {
                    path: 'M'+(1+i)+' '+newheight+','+ 
                            'A'+(130+incr)+' '+(100+incr)+' 0 1 0 '+(1+i)+' '+end
                    //path: 'M0 '+height+', A200,200,0,0,1,300,150'
                }, 1500, 'linear',
                function(){
                    circle.attr({ 'fill': colours[i]});
                    drawCircles(circles,i+1);
                }
            );
            
            $(circle.node).attr('class', 'page');
            
            var hoverIn = function() {
                this.attr({
                    "stroke": '#E3E3E3'
                });
            };
    
            var hoverOut = function() {
                this.attr({"stroke": "#000"});    
            }
    
            circle.hover(hoverIn, hoverOut, circle, circle);
        }
       
    };

   
  
    
   /* function svgEl(tagName){
        return document.createElementNS("http://www.w3.org/2000/svg", tagName);
    }*/
    
    
    
    jQuery.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) )+"px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    }

});