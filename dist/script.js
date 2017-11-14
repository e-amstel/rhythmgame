/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //txt bestandjes van server mag ook
//highscore wegschrijven
//ritme in array?

var _player = __webpack_require__(1);

var _player2 = _interopRequireDefault(_player);

var _enemies = __webpack_require__(2);

var _enemies2 = _interopRequireDefault(_enemies);

var _sendscore = __webpack_require__(7);

var _sendscore2 = _interopRequireDefault(_sendscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);

        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");

        this.score = 0;

        this.player = new _player2.default();
        this.ajaxHandler = new _sendscore2.default();
        this.enemyController = new _enemies2.default();

        this.songstart = true; //is het nummer al begonnen? op het moment nog niks mee gedaan maar geeft mogelijkheid tot het inbouwen van een start knop

        this.bgmusic = new Audio('../sound/chineseorcestra.mp3');

        this.refresh();
    }

    _createClass(Controller, [{
        key: "start",
        value: function start() {
            this.bgmusic.play();
            this.songstart = true;
        }
    }, {
        key: "writescore",
        value: function writescore() {
            this.context.font = "14px Arial";
            this.context.textAlign = "right";
            this.context.fillText("Score: " + this.score, this.canvas.width, 50);
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this = this;

            if (this.songstart == true) {

                this.player.draw(this.context); //tekenen speler op canvas

                this.enemyController.collide(this.player); //parameters voor PLAYER en SCORE
                this.score = this.enemyController.showScore();
                this.writescore();
            }

            if (this.songstart == false) {
                this.ajaxHandler.CallAjaxFunction(this.score);
            }

            window.requestAnimationFrame(function () {
                //elke animation frame de functie opnieuw uitvoeren
                _this.refresh();
            });
        }
    }]);

    return Controller;
}();

var c = new Controller();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player() {
        var _this = this;

        _classCallCheck(this, Player);

        this.props = {
            x: 100, //default startwaardes voor x en y
            y: 100,
            //   width: 100,
            //   height: 100,
            r: 60, //radius van de playercirkel, deze kan vergroot en verkleind gaan worden om het spel moeilijker te maken
            color: this.randomColor(),
            linewidth: 3,
            keydown: 0
        };
        window.addEventListener("keydown", function (e) {
            if (e.keyCode == 87) {
                //w key
                _this.props.keydown = 1;
            }
            if (e.keyCode == 68) {
                //d key
                _this.props.keydown = 2;
            }
            if (e.keyCode == 83) {
                //s key
                _this.props.keydown = 3;
            }
            if (e.keyCode == 65) {
                //a key
                _this.props.keydown = 4;
            }
            window.addEventListener("keyup", function (e) {
                _this.props.keydown = 0;
            });
        });
    }

    _createClass(Player, [{
        key: "draw",
        value: function draw(context) {
            //rekensommetje om de x en y op het midden van het speelveld te krijgen, deel de afmetingen van het canvas door 2 
            this.props.x = context.canvas.width / 2;
            this.props.y = context.canvas.height / 2;
            context.clearRect(this.props.x, this.props.y, this.props.width, this.props.height);
            // context.fillStyle = this.props.color;
            context.beginPath(); //beginnen van path bij het tekenen van een cirkel, anders houdt ie niet op met path tekenen
            context.arc(this.props.x, this.props.y, this.props.r, 0, 2 * Math.PI, false);
            context.lineWidth = this.props.linewidth;
            context.strokeStyle = this.props.color;
            context.stroke();
            // context.fill();
        }
    }, {
        key: "randomColor",
        value: function randomColor() {
            return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            // this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.draw(this.context);

            window.requestAnimationFrame(function () {
                //animationframe is ong 60 fps
                _this2.refresh();
            });
        }
    }]);

    return Player;
}();

exports.default = Player;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _enemyNorth = __webpack_require__(3);

var _enemyNorth2 = _interopRequireDefault(_enemyNorth);

var _enemyEast = __webpack_require__(4);

var _enemyEast2 = _interopRequireDefault(_enemyEast);

var _enemySouth = __webpack_require__(5);

var _enemySouth2 = _interopRequireDefault(_enemySouth);

var _enemyWest = __webpack_require__(6);

var _enemyWest2 = _interopRequireDefault(_enemyWest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Enemies = function () {
    function Enemies() {
        _classCallCheck(this, Enemies);

        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");

        this.enemies = [];
        this.lastPush = 0;
        this.interval = 1000;
        //de interval per richting wordt nu bepaald door de Vel variabele
        //dat betekent dat de interval constant blijft
        //hier is een derde variabele aan toegevoegd
        //om een veranderende afstand tussen de blokjes te bepalen
        //de counter is 60 fps
        this.north = 500; //beginwaarde interval
        this.northStart = 100; //statische resetwaarde
        this.northVel = 100; //toenemende waarde 
        this.east = 1000;
        this.eastStart = 120;
        this.eastVel = 120;
        this.south = 60;
        this.southStart = 60;
        this.southVel = 60;
        this.west = 120;
        this.westStart = 90;
        this.westVel = 90;

        this.counter = 0;
        this.songduration = 3000;

        this.score = 0;

        this.refresh();
    }

    _createClass(Enemies, [{
        key: "newEnemy",
        value: function newEnemy() {
            var _this = this;

            window.requestAnimationFrame(function () {
                //animationframe is ong 60 fps
                _this.counter++; //een counter die elk frame 1 omhoog gaat
            });
            //wanneer de counter gelijk is aan de opgegeven intervalwaardes komt er een nieuwe enemy bij
            //de intervalwaarde verhoogd ook om de counter bij te houden
            if (this.counter == this.north) {
                this.enemies.push(new _enemyNorth2.default(this.canvas.width));
                this.north = this.north + this.northVel;
            }
            if (this.counter == this.east) {
                this.enemies.push(new _enemyEast2.default(this.canvas.height));
                this.east = this.east + this.eastVel;
            }
            if (this.counter == this.south) {
                this.enemies.push(new _enemySouth2.default(this.canvas.width));
                this.south = this.south + this.southVel;
            }
            if (this.counter == this.west) {
                this.enemies.push(new _enemyWest2.default(this.canvas.height));
                this.west = this.west + this.westVel;
            }
            if (this.counter == 4000) {
                this.counter = 0; //de counter reset naar 0
                this.north = this.northStart; //zet elke 4 secondes (maat) de waardes terug naar de beginwaardes
                this.east = this.eastStart;
                this.south = this.southStart;
                this.west = this.westStart;
            }

            if (this.counter == this.songduration) {
                // alert("THE END!");
                document.location.reload();
            }

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.enemies.forEach(function (enemy) {
                enemy.move();
                _this.draw(_this.context, enemy);
            });
        }
    }, {
        key: "draw",
        value: function draw(context, enemy) {
            //context.clearRect(0,0,context.canvas.width,context.canvas.height);
            context.fillStyle = enemy.props.color;
            context.fillRect(enemy.props.x, enemy.props.y, enemy.props.width, enemy.props.height);
        }
    }, {
        key: "collide",
        value: function collide(player) {
            var _this2 = this;

            //collide in enemies met parameter voor player en parameter voor de score
            this.enemies.forEach(function (enemy) {
                //voor elke enemy meten 
                //als enemy x of y tussen player x of y en player x of y -radius: collision      
                //elke collisionwordt gemeten als meerdere collisions, 
                //een exacte score zou dus berekend kunnen worden door het aantal collisions door 16 te delen    
                //een eerlijke score (die in verhouding staat met de moeilijkheidsgraad) kan bereikt worden 
                //door het delen van de collisions door de radius en dit af te ronden of te vermenigvuldigen met een standaard getal 
                if (enemy.props.y > player.props.y - player.props.r && enemy.props.y < player.props.y && enemy.props.direction == 1) {
                    //collide top
                    //als juiste key ingedrukt
                    if (player.props.keydown == 1) {
                        enemy.props.sound.play(); //speel geluidje
                        enemy.props.isDead = true; //de enemy verdwijnt
                        _this2.score++; //de score gaat omhoog
                        //veld groter maken?
                    } else {
                            //levens down?? geen levens omdat er een tijdsduur/maximale score op het nummer zit. 
                        }
                }
                if (enemy.props.x > player.props.x - player.props.r && enemy.props.x < player.props.x && enemy.props.direction == 4) {
                    //collide left
                    //als juiste key ingedrukt
                    if (player.props.keydown == 4) {
                        enemy.props.sound.play();
                        enemy.props.isDead = true;
                        _this2.score++;

                        //speel geluidje
                    }
                }
                if (enemy.props.y < player.props.y + player.props.r && enemy.props.y > player.props.y && enemy.props.direction == 3) {
                    // collide down
                    //als juiste key ingedrukt
                    if (player.props.keydown == 3) {
                        enemy.props.sound.play();
                        enemy.props.isDead = true;
                        _this2.score++;

                        //speel geluidje
                    }
                }
                if (enemy.props.x < player.props.x + player.props.r && enemy.props.x > player.props.x && enemy.props.direction == 2) {
                    //collide right
                    //als juiste key ingedrukt
                    if (player.props.keydown == 2) {
                        enemy.props.sound.play();
                        enemy.props.isDead = true;
                        _this2.score++;

                        //speel geluidje
                    }
                }
                //  console.log(this.score);
            });
        }
    }, {
        key: "showScore",
        value: function showScore() {
            return this.score;
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this3 = this;

            this.newEnemy();
            this.enemies = this.enemies.filter(function (enemy) {
                return !enemy.props.isDead;
            });

            window.requestAnimationFrame(function () {
                _this3.refresh();
            });
        }
    }]);

    return Enemies;
}();

exports.default = Enemies;


var c = new Enemies();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//noordelijke enemy
var EnemyNorth = function () {
    function EnemyNorth(canvasWidth) {
        _classCallCheck(this, EnemyNorth);

        this.props = {
            // type: Math.floor(Math.random() * 4 ),
            x: canvasWidth / 2,
            y: 10,
            width: 10,
            height: 10,
            color: this.randomColor(),
            vel: 2, //snelheid van de enemy, kan increased worden
            direction: 1,
            sound: new Audio('../sound/sword.mp3')
        };
        this.props.x = this.props.x - this.props.width / 2;
    }

    _createClass(EnemyNorth, [{
        key: 'randomColor',
        value: function randomColor() {
            return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        }
    }, {
        key: 'move',
        value: function move() {
            if (this.props.y > 200) {
                this.props.isDead = true;
            }
            this.props.y += this.props.vel;
        }
    }]);

    return EnemyNorth;
}();

exports.default = EnemyNorth;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//noordelijke enemy
var EnemyEast = function () {
    function EnemyEast(canvasWidth) {
        _classCallCheck(this, EnemyEast);

        this.props = {
            // type: Math.floor(Math.random() * 4 ),
            x: 390,
            y: canvasWidth / 2,
            width: 10,
            height: 10,
            color: this.randomColor(),
            vel: 2,
            direction: 2,
            sound: new Audio('../sound/tambourinewithhit.mp3') //sounds from http://www.freesfx.co.uk


        };
        this.props.y = this.props.y - this.props.height / 2;
    }

    _createClass(EnemyEast, [{
        key: 'randomColor',
        value: function randomColor() {
            return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        }
    }, {
        key: 'move',
        value: function move() {
            if (this.props.x < 200) {
                this.props.isDead = true;
            }
            this.props.x -= this.props.vel;
        }
    }]);

    return EnemyEast;
}();

exports.default = EnemyEast;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//noordelijke enemy
var EnemySouth = function () {
    function EnemySouth(canvasWidth) {
        _classCallCheck(this, EnemySouth);

        this.props = {
            // type: Math.floor(Math.random() * 4 ),
            x: canvasWidth / 2,
            y: 390,
            width: 10,
            height: 10,
            color: this.randomColor(),
            vel: 2,
            direction: 3,
            sound: new Audio('../sound/chineseblocks.mp3')

        };
        this.props.x = this.props.x - this.props.width / 2;
    }

    _createClass(EnemySouth, [{
        key: 'randomColor',
        value: function randomColor() {
            return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        }
    }, {
        key: 'move',
        value: function move() {
            if (this.props.y < 200) {
                this.props.isDead = true;
            }
            this.props.y -= this.props.vel;
        }
    }]);

    return EnemySouth;
}();

exports.default = EnemySouth;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//noordelijke enemy
var EnemyWest = function () {
    function EnemyWest(canvasWidth) {
        _classCallCheck(this, EnemyWest);

        this.props = {
            // type: Math.floor(Math.random() * 4 ),
            x: 10,
            y: canvasWidth / 2,
            width: 10,
            height: 10,
            color: this.randomColor(),
            vel: 2,
            direction: 4,
            sound: new Audio('../sound/sumyungguy.mp3')

        };
        this.props.y = this.props.y - this.props.height / 2;
    }

    _createClass(EnemyWest, [{
        key: 'randomColor',
        value: function randomColor() {
            return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        }
    }, {
        key: 'move',
        value: function move() {
            if (this.props.x > 200) {
                this.props.isDead = true;
            }
            this.props.x += this.props.vel;
        }
    }]);

    return EnemyWest;
}();

exports.default = EnemyWest;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AjaxHandler = function () {
    function AjaxHandler() {
        _classCallCheck(this, AjaxHandler);
    }

    _createClass(AjaxHandler, [{
        key: "CallAjaxFunction",
        value: function CallAjaxFunction(score) {
            var _this = this;

            // maak een XMLHttpRequest object aan 
            var xmlHttp = new XMLHttpRequest();

            // Specificeer welke functie wordt uitgevoerd als de call naar de server klaar is  
            // (readyState 4 (klaar) en correct uitgevoerd (status 200)). Vaak is dit het tonen  
            // van de output van het PHP script in een DIV-sectie) 
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    _this.handleResult(score);
                }
            };

            // Ajax call (Request naar de server met eventuele parameters (arguments)) 
            xmlHttp.open("POST", "http://emamstel.acue.webpages.avans.nl/cp/src/verwerkscore.php", true);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send("score=" + score);
        }

        //  callServer() 
        // { 
        //     CallAjaxFunction(score); 
        // } 
        //afhandelen tonen van de output 

    }, {
        key: "handleResult",
        value: function handleResult(score) {
            // Plaats de output van de AJAXcall binnen een DIV-tag 
            console.log("hoi");
            console.log(score);
        }
    }]);

    return AjaxHandler;
}();

exports.default = AjaxHandler;

/***/ })
/******/ ]);