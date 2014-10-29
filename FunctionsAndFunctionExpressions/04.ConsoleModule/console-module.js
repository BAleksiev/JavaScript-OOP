
var specialConsole = function () {

    function writeLine() {

        var message = arguments[0];

        if (arguments.length === 1) {
            consoleWrite(message);
        } else if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments); // convert object to array
            message = fillPlaceholders(message, args.slice(1, args.length));
            consoleWrite(message);
        }
    }
    
    function fillPlaceholders(str, args) {
        for (var i = 0; i < args.length; i++) {
            str = str.replace('{' + i + '}', args[i]);
        }
        
        return str;
    }
    
    function consoleWrite(str) {
        console.log(str.toString());
    }

    var self = {
        writeLine: writeLine,
        writeError: writeLine,
        writeWarning: writeLine
    };

    return self;
}();

specialConsole.writeLine("Message: hello");
specialConsole.writeLine("Message: {0}", "hello");
specialConsole.writeError("Error: {0}", "A fatal error has occurred.");
specialConsole.writeWarning("Warning: {0}", "You are not allowed to do that!");
specialConsole.writeLine("Testing placeholders: {0} {1} {2}", 'edno', 'dve', 'tri');
specialConsole.writeLine("Testing placeholders: {2} {0} {1}", 'edno', 'dve', 'tri');