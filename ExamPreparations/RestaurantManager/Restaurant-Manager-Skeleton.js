function processRestaurantManagerCommands(commands) {
    'use strict';

    var RestaurantEngine = (function () {
        var _restaurants, _recipes;

        function initialize() {
            _restaurants = [];
            _recipes = [];
        }

        Object.prototype.extends = function (parent) {
            this.prototype = Object.create(parent.prototype);
            this.prototype.constructor = this;
        };

        var Restaurant = (function () {
            function Restaurant(name, location) {
                this.setName(name);
                this.setLocation(location);
                this._recipes = [];
            }

            Restaurant.prototype.getName = function () {
                return this._name;
            };

            Restaurant.prototype.setName = function (name) {
                this.validateForEmptyString(name, 'name');
                this._name = name;
            };

            Restaurant.prototype.getLocation = function () {
                return this._location;
            };

            Restaurant.prototype.setLocation = function (location) {
                this.validateForEmptyString(location, 'location');
                this._location = location;
            };

            Restaurant.prototype.addRecipe = function (recipe) {
                if(!(recipe instanceof Recipe)) {
                    throw new Error("Invalid recipe");
                }
                this._recipes.push(recipe);
            };

            Restaurant.prototype.removeRecipe = function (recipe) {
                if(!(recipe instanceof Recipe)) {
                    throw new Error("Invalid recipe");
                }
                var index = this._recipes.indexOf(recipe);
                this._recipes.splice(index, 1);
            };

            Restaurant.prototype.printRestaurantMenu = function () {
                var menu = "***** " + this.getName() + " - " + this.getLocation() + " *****\n";

                if (this._recipes.length > 0) {

                    var drinks = getRecipesByType.call(this, Drink);
                    var salads = getRecipesByType.call(this, Salad);
                    var mainCourses = getRecipesByType.call(this, MainCourse);
                    var desserts = getRecipesByType.call(this, Dessert);
                    
                    if(drinks.length > 0) {
                        menu += "~~~~~ DRINKS ~~~~~\n";
                        drinks.forEach(function(drink) {
                            menu += drink.toString();
                        });
                    }
                    if(salads.length > 0) {
                        menu += "~~~~~ SALADS ~~~~~\n";
                        salads.forEach(function(salad) {
                            menu += salad.toString();
                        });
                    }
                    if(mainCourses.length > 0) {
                        menu += "~~~~~ MAIN COURSES ~~~~~\n";
                        mainCourses.forEach(function(mainCourse) {
                            menu += mainCourse.toString();
                        });
                    }
                    if(desserts.length > 0) {
                        menu += "~~~~~ DESSERTS ~~~~~\n";
                        desserts.forEach(function(dessert) {
                            menu += dessert.toString();
                        });
                    }
                } else {
                    menu += "No recipes... yet\n";
                }

                return menu;
            };
            
            var getRecipesByType = function(type) {
                return this._recipes.filter(function(recipe) {
                    return recipe instanceof type;
                }).sort(function(a, b) {
                    return a.getName().localeCompare(b.getName());
                });
            };

            return Restaurant;
        })();

        var Recipe = (function () {
            function Recipe(name, price, calories, quantity, unit, timeToPrepare) {
                if (this.constructor === Recipe) {
                    throw new Error("Can't instance abstract class Recipe.");
                }

                this.setName(name);
                this.setPrice(price);
                this.setCalories(calories);
                this.setQuantity(quantity);
                this.setUnit(unit);
                this.setTimeToPrepare(timeToPrepare);
            }

            Recipe.prototype.getName = function () {
                return this._name;
            };

            Recipe.prototype.setName = function (name) {
                this.validateForEmptyString(name, 'name');
                this._name = name;
            };

            Recipe.prototype.getPrice = function () {
                return this._price;
            };

            Recipe.prototype.setPrice = function (price) {
                this.validateIntegerRange(price, 'price', 0, Number.MAX_VALUE);
                this._price = price;
            };

            Recipe.prototype.getCalories = function () {
                return this._calories;
            };

            Recipe.prototype.setCalories = function (calories) {
                this.validateIntegerRange(calories, 'calories', 0, Number.MAX_VALUE);
                this._calories = calories;
            };

            Recipe.prototype.getQuantity = function () {
                return this._quantity;
            };

            Recipe.prototype.setQuantity = function (quantity) {
                this.validateIntegerRange(quantity, 'quantity', 0, Number.MAX_VALUE);
                this._quantity = quantity;
            };

            Recipe.prototype.getUnit = function () {
                return this._unit;
            };

            Recipe.prototype.setUnit = function (unit) {
                this.validateForEmptyString(unit, 'unit');
                this._unit = unit;
            };

            Recipe.prototype.getTimeToPrepare = function () {
                return this._timeToPrepare;
            };

            Recipe.prototype.setTimeToPrepare = function (timeToPrepare) {
                this.validateIntegerRange(timeToPrepare, 'timeToPrepare', 0, Number.MAX_VALUE);
                this._timeToPrepare = timeToPrepare;
            };

            Recipe.prototype.toString = function () {
                var recipe = "==  " + this.getName() + " == $" + this.getPrice().toFixed(2) + "\n"
                    + "Per serving: " + this.getQuantity() + " " + this.getUnit()
                    + ", " + this.getCalories() + " kcal\n"
                    + "Ready in " + this.getTimeToPrepare() + " minutes\n";
                
                return recipe;
            };

            return Recipe;
        })();

        var Drink = (function () {
            function Drink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
                if (calories > 100) {
                    calories = 100;
                }
                if (timeToPrepare > 20) {
                    timeToPrepare = 20;
                }
                Recipe.call(this, name, price, calories, quantity, 'ml', timeToPrepare);

                this.setIsCarbonated(isCarbonated);
            }

            Drink.extends(Recipe);

            Drink.prototype.getIsCarbonated = function () {
                return this._isCarbonated;
            };

            Drink.prototype.setIsCarbonated = function (isCarbonated) {
                this.validateBoolean(isCarbonated, 'isCarbonated');
                this._isCarbonated = isCarbonated;
            };

            Drink.prototype.toString = function () {
                var carbonated = this.getIsCarbonated() ? "yes" : "no";
                
                return Recipe.prototype.toString.call(this)
                    + "Carbonated: " + carbonated + "\n";
            };

            return Drink;
        })();

        var Meal = (function () {
            function Meal(name, price, calories, quantity, timeToPrepare, isVegan) {
                Recipe.call(this, name, price, calories, quantity, 'g', timeToPrepare);
                if (this.constructor === Meal) {
                    throw new Error("Can't instance abstract class Meal.");
                }

                this.setIsVegan(isVegan);
            }

            Meal.extends(Recipe);

            Meal.prototype.getIsVegan = function () {
                return this._isVegan;
            };

            Meal.prototype.setIsVegan = function (isVegan) {
                this.validateBoolean(isVegan, 'isVegan');
                this._isVegan = isVegan;
            };

            Meal.prototype.toggleVegan = function () {
                if(this.getIsVegan() === true) {
                    this.setIsVegan(false);
                } else {
                    this.setIsVegan(true);
                }
            };

            Meal.prototype.toString = function () {
                var vegan = this.getIsVegan() ? "[VEGAN] " : "";
                
                return vegan + Recipe.prototype.toString.call(this);
            };

            return Meal;
        })();

        var Dessert = (function () {
            function Dessert(name, price, calories, quantity, timeToPrepare, isVegan, withSugar) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);

                this.setWithSugar(withSugar);
            }

            Dessert.extends(Meal);

            Dessert.prototype.getWithSugar = function () {
                return this._withSugar;
            };

            Dessert.prototype.setWithSugar = function (withSugar) {
                if (typeof (withSugar) != 'boolean') {
                    withSugar = true;
                }
                this._withSugar = withSugar;
            };

            Dessert.prototype.toggleSugar = function () {
                if(this.getWithSugar() === true) {
                    this.setWithSugar(false);
                } else {
                    this.setWithSugar(true);
                }
            };

            Dessert.prototype.toString = function () {
                var sugar = this.getWithSugar() ? "" : "[NO SUGAR] ";
                
                return sugar + Meal.prototype.toString.call(this);
            };

            return Dessert;
        })();

        var MainCourse = (function () {
            function MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, isVegan);

                this.setType(type);
            }

            MainCourse.extends(Meal);

            MainCourse.prototype.getType = function () {
                return this._type;
            };

            MainCourse.prototype.setType = function (type) {
                this.validateForEmptyString(type, 'type');
                this._type = type;
            };

            MainCourse.prototype.toString = function () {
                return Meal.prototype.toString.call(this)
                    + "Type: " + this.getType() + "\n";
            };

            return MainCourse;
        })();

        var Salad = (function () {
            function Salad(name, price, calories, quantity, timeToPrepare, withPasta) {
                Meal.call(this, name, price, calories, quantity, timeToPrepare, true);

                this.setWithPasta(withPasta);
            }

            Salad.extends(Meal);

            Salad.prototype.getWithPasta = function () {
                return this._withPasta;
            };

            Salad.prototype.setWithPasta = function (withPasta) {
                this.validateBoolean(withPasta, 'withPasta');
                this._withPasta = withPasta;
            };

            Salad.prototype.toString = function () {
                var pasta = this.getWithPasta() ? "yes" : "no";
                
                return Meal.prototype.toString.call(this)
                    + "Contains pasta: " + pasta + "\n";
            };

            return Salad;
        })();

        var Command = (function () {

            function Command(commandLine) {
                this._params = new Array();
                this.translateCommand(commandLine);
            }

            Command.prototype.translateCommand = function (commandLine) {
                var self, paramsBeginning, name, parametersKeysAndValues;
                self = this;
                paramsBeginning = commandLine.indexOf("(");

                this._name = commandLine.substring(0, paramsBeginning);
                name = commandLine.substring(0, paramsBeginning);
                parametersKeysAndValues = commandLine
                        .substring(paramsBeginning + 1, commandLine.length - 1)
                        .split(";")
                        .filter(function (e) {
                            return true;
                        });

                parametersKeysAndValues.forEach(function (p) {
                    var split = p
                            .split("=")
                            .filter(function (e) {
                                return true;
                            });
                    self._params[split[0]] = split[1];
                });
            };

            return Command;
        }());

        function createRestaurant(name, location) {
            _restaurants[name] = new Restaurant(name, location);
            return "Restaurant " + name + " created\n";
        }

        function createDrink(name, price, calories, quantity, timeToPrepare, isCarbonated) {
            _recipes[name] = new Drink(name, price, calories, quantity, timeToPrepare, isCarbonated);
            return "Recipe " + name + " created\n";
        }

        function createSalad(name, price, calories, quantity, timeToPrepare, containsPasta) {
            _recipes[name] = new Salad(name, price, calories, quantity, timeToPrepare, containsPasta);
            return "Recipe " + name + " created\n";
        }

        function createMainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type) {
            _recipes[name] = new MainCourse(name, price, calories, quantity, timeToPrepare, isVegan, type);
            return "Recipe " + name + " created\n";
        }

        function createDessert(name, price, calories, quantity, timeToPrepare, isVegan) {
            _recipes[name] = new Dessert(name, price, calories, quantity, timeToPrepare, isVegan);
            return "Recipe " + name + " created\n";
        }

        function toggleSugar(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }
            recipe = _recipes[name];

            if (recipe instanceof Dessert) {
                recipe.toggleSugar();
                return "Command ToggleSugar executed successfully. New value: " + recipe._withSugar.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleSugar is not applicable to recipe " + name + "\n";
            }
        }

        function toggleVegan(name) {
            var recipe;

            if (!_recipes.hasOwnProperty(name)) {
                throw new Error("The recipe " + name + " does not exist");
            }

            recipe = _recipes[name];
            if (recipe instanceof Meal) {
                recipe.toggleVegan();
                return "Command ToggleVegan executed successfully. New value: " +
                        recipe._isVegan.toString().toLowerCase() + "\n";
            } else {
                return "The command ToggleVegan is not applicable to recipe " + name + "\n";
            }
        }

        function printRestaurantMenu(name) {
            var restaurant;

            if (!_restaurants.hasOwnProperty(name)) {
                throw new Error("The restaurant " + name + " does not exist");
            }

            restaurant = _restaurants[name];
            return restaurant.printRestaurantMenu();
        }

        function addRecipeToRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }
            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.addRecipe(recipe);
            return "Recipe " + recipeName + " successfully added to restaurant " + restaurantName + "\n";
        }

        function removeRecipeFromRestaurant(restaurantName, recipeName) {
            var restaurant, recipe;

            if (!_recipes.hasOwnProperty(recipeName)) {
                throw new Error("The recipe " + recipeName + " does not exist");
            }
            if (!_restaurants.hasOwnProperty(restaurantName)) {
                throw new Error("The restaurant " + restaurantName + " does not exist");
            }

            restaurant = _restaurants[restaurantName];
            recipe = _recipes[recipeName];
            restaurant.removeRecipe(recipe);
            return "Recipe " + recipeName + " successfully removed from restaurant " + restaurantName + "\n";
        }

        function executeCommand(commandLine) {
            var cmd, params, result;
            cmd = new Command(commandLine);
            params = cmd._params;

            switch (cmd._name) {
                case 'CreateRestaurant':
                    result = createRestaurant(params["name"], params["location"]);
                    break;
                case 'CreateDrink':
                    result = createDrink(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                            parseInt(params["quantity"]), parseInt(params["time"]), parseBoolean(params["carbonated"]));
                    break;
                case 'CreateSalad':
                    result = createSalad(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                            parseInt(params["quantity"]), parseInt(params["time"]), parseBoolean(params["pasta"]));
                    break;
                case "CreateMainCourse":
                    result = createMainCourse(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                            parseInt(params["quantity"]), parseInt(params["time"]), parseBoolean(params["vegan"]), params["type"]);
                    break;
                case "CreateDessert":
                    result = createDessert(params["name"], parseFloat(params["price"]), parseInt(params["calories"]),
                            parseInt(params["quantity"]), parseInt(params["time"]), parseBoolean(params["vegan"]));
                    break;
                case "ToggleSugar":
                    result = toggleSugar(params["name"]);
                    break;
                case "ToggleVegan":
                    result = toggleVegan(params["name"]);
                    break;
                case "AddRecipeToRestaurant":
                    result = addRecipeToRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "RemoveRecipeFromRestaurant":
                    result = removeRecipeFromRestaurant(params["restaurant"], params["recipe"]);
                    break;
                case "PrintRestaurantMenu":
                    result = printRestaurantMenu(params["name"]);
                    break;
                default:
                    throw new Error('Invalid command name: ' + cmdName);
            }

            return result;
        }

        function parseBoolean(value) {
            switch (value) {
                case "yes":
                    return true;
                case "no":
                    return false;
                default:
                    throw new Error("Invalid boolean value: " + value);
            }
        }

        Object.prototype.validateForEmptyString = function (string, name) {
            if (typeof (string) != 'string' || !string) {
                throw new Error('The ' + name + ' is required.');
            }
        };

        Object.prototype.validateIntegerRange = function (value, name, minNum, maxNum) {
            if (isNaN(value) || typeof (value) != 'number') {
                throw new Error(value + ' is not a number.');
            }
//            if (value !== parseInt(value, 10)) {
//                throw new Error(name + ' should be intger.');
//            }
            if (value < minNum || value > maxNum) {
                throw new Error('The ' + name + ' must be positive.');
            }
        };

        Object.prototype.validateBoolean = function (value, name) {
            if (typeof (value) != 'boolean') {
                throw new Error(name + ' is not booelan.');
            }
        };

        return {
            initialize: initialize,
            executeCommand: executeCommand
        };
    }());


    // Process the input commands and return the results
    var results = '';
    RestaurantEngine.initialize();
    commands.forEach(function (cmd) {
        if (cmd != "") {
            try {
                var cmdResult = RestaurantEngine.executeCommand(cmd);
                results += cmdResult;
            } catch (err) {
                results += err.message + "\n";
            }
        }
    });

    return results.trim();
}