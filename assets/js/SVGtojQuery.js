(function($){

    
    var addClass = $.fn.addClass;
    $.fn.addClass = function(value){
        var o = addClass.apply(this, arguments);
        console.log(o);
        console.log(arguments);
        
        var el,
            i = 0,
            len = this.length;
        
        for(; i<len; i++){
            el = this[i];
            /*console.log(el); questo è svg <path...>*/
            /*console.log(this instanceof jQuery); questo è incapsulato in jq [<path....]*/
            if(el instanceof SVGElement) {
                var classes = $(el).attr('class');
                if(classes){
                    var index = classes.indexOf(value);
                    if(index === -1){
                        classes = classes+ " "+value;
                        this.attr('class', classes);
                    }
                }
                else
                    this.attr('class', value);
            }
        }
        return o;
    };
    
    
    
    var removeClass = $.fn.removeClass;
    $.fn.removeClass = function(value){
        var o = removeClass.apply(this, arguments);
        
        var el,
            i = 0,
            len = this.length;
        
        for(; i<len; i++){
            el = this[i];
            if(el instanceof SVGElement){
                var classes = $(el).attr('class');
                if(classes){
                    var index = classes.indexOf(value);
                    if(index !== -1){
                        classes = classes.substring(0, index) + classes.substring((index+value.length), classes.length);
                        this.attr('class', classes);
                    }
                }
            }
        }
        return o;
    };
    
    
    
    var hasClass = $.fn.hasClass;
    $.fn.hasClass = function(value) {
        var orig = hasClass.apply(this, arguments);
 
        console.log("hasclass....");

        var el,
            i = 0,
            len = this.length;
        
        for (; i < len; i++ ) {
            el = this[ i ];
            if ( el instanceof SVGElement ) {
                var classes = $(el).attr('class');
                console.log(classes);
                if ( classes ) {
                    if ( classes.indexOf(value) === -1 ) {
                        return false;
                    } else 
                        return true;
          
                } else 
                    return false;
        
            }
        }
        return orig;
    };
    
    
    




})(jQuery);