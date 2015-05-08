$(document).ready(function() {
    
    
    Raphael.fn.arc = function(startX, startY, endX, endY, radius1, radius2, angle) {
        var arcSVG = [radius1, radius2, angle, 0, 1, endX, endY].join(' ');
        return this.path('M'+startX+' '+startY + " a " + arcSVG);
    };

    Raphael.fn.circularArc = function(centerX, centerY, radius, startAngle, endAngle) {
        var startX = centerX+radius*Math.cos(startAngle*Math.PI/180); 
        var startY = centerY+radius*Math.sin(startAngle*Math.PI/180);
        var endX = centerX+radius*Math.cos(endAngle*Math.PI/180); 
        var endY = centerY+radius*Math.sin(endAngle*Math.PI/180);
        alert(startX+' '+startY+' '+(endX-startX)+' '+(endY-startY)+' '+radius+' '+radius+' 0');
        return this.arc(startX, startY, endX-startX, endY-startY, radius, radius, 0);
    };
    
    var x = ($(window).width() / 10) -5;
    var y = 0;
    var height = $(window).height() / 1.4; 
    var width = '90%';
    
    var canvas = $('#canvas');
    canvas.css('position', 'absolute');
    canvas.css('left', x);
    canvas.css('top', y);
    canvas.css('width', width);
    canvas.css('height', height);

    

    var paper = new Raphael("canvas", width, height);
    var line = paper.path('M0 0');
    line.attr(
        {
            'stroke-width': 4
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
            var lines = new Array();
            drawCircles(lines, 0);
        }
    );
    
    function drawCircles(lines, i){
        if(i < 4){
            lines[i] = paper.path('M0 '+(height-100));
            lines[i].toBack();
            (lines[i]).attr(
                {
                    'stroke-width': 2
                });
            var incr = 20*i;
            var newheight = (height-101-incr);
            var end = (newheight.toString()).split(".")[0]+'.01';
            var colours = ['#fff59b', '#ff6f69', '#88d8b0', '#ffcc5c'];
            (lines[i]).animate(
                {
                    path: 'M'+(1+i)+' '+newheight+','+ 
                            'A'+(130+incr)+' '+(100+incr)+' 0 1 0 '+(1+i)+' '+end
                    //path: 'M0 '+height+', A200,200,0,0,1,300,150'
                }, 1500, 'linear',
                function(){
                    lines[i].attr({ 'fill': colours[i]});
                    drawCircles(lines,i+1);
                }
            );
        }
    };

    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = angleInDegrees * Math.PI / 180.0;
        var x = centerX + radius * Math.cos(angleInRadians);
        var y = centerY + radius * Math.sin(angleInRadians);
        return [x,y];
    };
    
    
    jQuery.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) )+"px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    }

});