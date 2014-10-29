function traverse(node) {

    var selector = node.substr(0, 1);
    var className = node.substr(1, node.length);
    var elements, element;

    if (selector === '.') {
        elements = document.getElementsByClassName(className);
    } else if (selector === '#') {
        var elementTemp = document.getElementById(className);
        if (elementTemp !== null) {
            elements = Array();
            elements = [ elementTemp ];
        }
    }

    if (elements !== undefined) {
        for (i = 0; i < elements.length; i++) {
            if (elements[i].childNodes.length > 1) {
                element = elements[i];
                break;
            }
        }
        
        if(element === undefined) {
            element = elements[0];
        }
    }

    if (element !== undefined && element !== null) {
        traverseNode(element, '');
    }

    function traverseNode(node, spacing) {

        spacing = spacing || '  ';
        
        var nodeId = node.getAttribute('id');
        var nodeClass = node.getAttribute('class');
        
        console.log(spacing + node.nodeName.toLowerCase() + ':'
                + (nodeId ? ' id="' + nodeId + '"' : '')
                + (nodeClass ? ' class="' + nodeClass + '"' : ''));

        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if (child.nodeType === document.ELEMENT_NODE) {
                traverseNode(child, spacing + '  ');
            }
        }
    }
}