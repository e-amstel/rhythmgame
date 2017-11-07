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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(1);

var _player2 = _interopRequireDefault(_player);

var _enemies = __webpack_require__(2);

var _enemies2 = _interopRequireDefault(_enemies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);

        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");

        this.player = new _player2.default();

        this.enemyController = new _enemies2.default();

        this.score = 0;

        this.refresh();
    }

    _createClass(Controller, [{
        key: "collide",
        value: function collide() {
            var _this = this;

            this.enemyController.enemies.forEach(function (enemy) {
                //voor elke enemy meten 
                //als enemy x of y tussen player x of y en player x of y -radius: collision      
                //elke collision bij een radius van 40 wordt gemeten als 16 of 19 collisions, 
                //een exacte score zou dus berekend kunnen worden door het aantal collisions door 16 te delen    
                //een eerlijke score (die in verhouding staat met de moeilijkheidsgraad) kan bereikt worden 
                //door het delen van de collisions door de radius en dit af te ronden of te vermenigvuldigen met een standaard getal 
                if (enemy.props.y > _this.player.props.y - _this.player.props.r && enemy.props.y < _this.player.props.y) {
                    //  console.log("collide top"); 
                    //als juiste key ingedrukt
                    if (_this.player.props.keydown == 1) {
                        console.log("hit");
                        //up score
                        //if score up, veld groter maken
                        //speel geluidje
                    } else {
                        console.log("miss");
                        //levens down
                    }
                }
                if (enemy.props.x > _this.player.props.x - _this.player.props.r && enemy.props.x < _this.player.props.x) {
                    // console.log("collide left"); 
                    //als juiste key ingedrukt
                    if (_this.player.props.keydown == 2) {
                        console.log("hit");
                        //up score
                        //speel geluidje
                    } else {
                        console.log("miss");
                        //levens down
                    }
                }
                if (enemy.props.y < _this.player.props.y + _this.player.props.r && enemy.props.y > _this.player.props.y) {
                    // console.log("collide down");
                    //als juiste key ingedrukt
                    if (_this.player.props.keydown == 3) {
                        console.log("hit");
                        //up score
                        //speel geluidje
                    } else {
                        console.log("miss");
                        //levens down
                    }
                }
                if (enemy.props.x < _this.player.props.x + _this.player.props.r && enemy.props.x > _this.player.props.x) {
                    // console.log("collide right");
                    //als juiste key ingedrukt
                    if (_this.player.props.keydown == 4) {
                        console.log("hit");
                        //up score
                        //speel geluidje
                    } else {
                        console.log("miss");
                        //levens down
                    }
                }
            });
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.player.draw(this.context);

            this.collide();

            window.requestAnimationFrame(function () {
                //elke animation frame de functie opnieuw uitvoeren
                _this2.refresh();
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
        //hier zou een derde variabele aan toegevoegd kunnen worden 
        //om een veranderende afstand tussen de blokjes te bepalen
        this.snare = 30; //beginwaarde interval
        this.snareStart = 30;
        this.snareVel = 30; //toenemende waarde 
        this.clap = 1200;
        this.clapStart = 120;
        this.clapVel = 120;
        this.beat = 1000;
        this.beatStart = 100;
        this.beatVel = 100;
        this.kick = 400;
        this.kickStart = 90;
        this.kickVel = 90;

        this.counter = 0;

        this.songstart = true; //is het nummer al begonnen? op het moment nog niks mee gedaan maar geeft mogelijkheid tot het inbouwen van een start knop

        this.refresh();
    }

    _createClass(Enemies, [{
        key: "newEnemy",
        value: function newEnemy() {
            var _this = this;

            if (this.songstart == true) {
                window.requestAnimationFrame(function () {
                    //animationframe is ong 60 fps
                    _this.counter++; //een counter die elk frame 1 omhoog gaat
                });
                //wanneer de counter gelijk is aan de opgegeven intervalwaardes komt er een nieuwe enemy bij
                //de intervalwaarde verhoogd ook om de counter bij te houden
                if (this.counter == this.snare) {
                    this.enemies.push(new _enemyNorth2.default(this.canvas.width));
                    this.snare = this.snare + this.snareVel;
                }
                if (this.counter == this.clap) {
                    this.enemies.push(new _enemyEast2.default(this.canvas.height));
                    this.clap = this.clap + this.clapVel;
                }
                if (this.counter == this.beat) {
                    this.enemies.push(new _enemySouth2.default(this.canvas.width));
                    this.beat = this.beat + this.beatVel;
                }
                if (this.counter == this.kick) {
                    this.enemies.push(new _enemyWest2.default(this.canvas.height));
                    this.kick = this.kick + this.kickVel;
                }
                if (this.counter == 4000) {
                    this.counter = 0; //de counter reset naar 0
                    this.snare = this.snareStart; //zet elke 4 secondes (maat) de waardes terug naar de beginwaardes
                    this.clap = this.clapStart;
                    this.beat = this.beatStart;
                    this.kick = this.kickStart;
                }
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
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.newEnemy();
            this.enemies = this.enemies.filter(function (enemy) {
                return !enemy.props.isDead;
            });

            window.requestAnimationFrame(function () {
                _this2.refresh();
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
            vel: 2,
            interval: 2000

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
            interval: 2000

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
            interval: 2000

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
            interval: 2000

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

/***/ })
/******/ ]);