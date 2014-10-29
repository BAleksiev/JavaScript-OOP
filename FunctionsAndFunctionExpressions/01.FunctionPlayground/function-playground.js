
function example() {
    console.log("Number of arguments: " + arguments.length);

    for (var i = 0; i < arguments.length; i++) {
        console.log("Argument: " + (i + 1) + " - (" + typeof (arguments[i]) + ") " + arguments[i]);
    }
    
    console.log("this.test: " + this.test);
}

console.log("The function should print the number of its arguments and each of the arguments' type.\n\
 - Call the function with different number and type of arguments.");
example('pesho', 43, 54, 'gosho');
example(false, '43.5', 43.5, true);

console.log("The function should print the this object.\n\
 - Use call and apply to call the function with parameters and without parameters");
example.call({test: 'this is the function scope of this'}, 1234, "Goshoooo");
test = 'this is global scope of this';
example.apply(null, [1234, "Goshooooo"]);