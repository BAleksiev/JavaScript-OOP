(function () {
    require.config({
        paths: {
            'container': 'container',
            'section': 'section',
            'item': 'item'
        }
    });
    
    require(['container'], function(Container) {
        var mainContainer = new Container('TODO List');
        mainContainer.addToDOM(document.body);
    });
})();

