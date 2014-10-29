
var domModule = function() {
    
    function appendChild() {
        
        var element = arguments[0];
        var appendTo = document.querySelector(arguments[1]);
        
        appendTo.appendChild(element);
    };
    
    function removeChild() {
        
        var from = document.querySelector(arguments[0]);
        var removeElement = from.querySelector(arguments[1]);
        
        from.removeChild(removeElement);
    };
    
    function addHandler() {
        
        var elements = document.querySelectorAll(arguments[0]);
        var event = arguments[1];
        var expression = arguments[2];
        
        for (i = 0; i < elements.length; i++) {
            elements[i].addEventListener(event, expression);
        }
    };
    
    function retrieveElements() {
        
        var elements = document.querySelectorAll(arguments[0]);
        
        return elements;
    }
    
    var self = {
        appendChild: appendChild,
        removeChild: removeChild,
        addHandler: addHandler,
        retrieveElements: retrieveElements
    };
    
    return self;
}();