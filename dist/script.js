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

var _ajax = __webpack_require__(7);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        var _this = this;

        _classCallCheck(this, Controller);

        //canvas inladen
        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");
        //buttons 
        this.startButton = document.getElementById("StartButton");
        this.scoreButton = document.getElementById("ScoreButton");
        this.nextLevel = document.getElementById("NextLevel");
        //level-relevante data
        this.score = 0;
        this.level = 1;
        this.maxLevel = 4; //het maximaal aantal levels. Hier nog gehardcode, maar zou kunnen veranderen op basis van het aantal rows in de leveltabel
        this.levelData = 0; //een leeg object om de leveldata in te laden
        this.levelUp = false;

        this.player = new _player2.default();
        this.ajaxHandler = new _ajax2.default();
        this.enemyController = new _enemies2.default();
        //is het nummer al begonnen? songstart staat standaard op false
        this.songstart = false;
        //gegevens voor achtergrondmuziek en achtergrondafbeelding
        this.bgmusic = new Audio('./sound/chineseorcestra.mp3');
        this.bgimg = new Image();
        this.bgimg.src = "./img/sakura.jpg";

        this.startButton.onclick = function () {
            //als er op de startbutton wordt geklikt, activeer startfunctie
            _this.start();
        };
        this.nextLevel.onclick = function () {
            //  this.level++; //een level hoger
            //  if (this.level > this.maxLevel){ //reset level naar 1 als hij hoger wordt dan het aantal levels komt
            //      this.level = 1;
            //      alert("You win! Please save your score");
            //  }
            //  this.start();
        };
        this.scoreButton.onclick = function () {
            //als er op de scorebutton wordt geklikt, 
            _this.ajaxHandler.CallAjaxFunction(_this.score); //activeer de functie om score naar database te sturen
            location.reload(); //en herlaad de pagina
        };

        this.refresh();
    }

    _createClass(Controller, [{
        key: "start",
        value: function start() {
            this.bgmusic.play(); //achtergrondmuziek
            this.songstart = true; //start het liedje 
            this.loadSong();
        }
    }, {
        key: "loadSong",
        value: function loadSong() {
            this.ajaxHandler.loadSong(this.level); //laad level data
            this.levelData = this.ajaxHandler.songData(); //de leveldata wordt gereturned naar levelData
            this.enemyController.songData( //stuur de leveldata naar de enemycontroller om daar de functie songdata te vullen
            this.levelData.north, this.levelData.northvel, this.levelData.east, this.levelData.eastvel, this.levelData.south, this.levelData.southvel, this.levelData.west, this.levelData.westvel, this.levelData.songduration);
        }
    }, {
        key: "writeScore",
        value: function writeScore() {
            //schrijf de score en level rechtsbovenin
            this.context.font = "14px Arial";
            this.context.textAlign = "right";
            this.context.fillText("Score: " + this.score, this.canvas.width, 50);
            this.context.fillText("Level: " + this.level, this.canvas.width, 30);
        }
    }, {
        key: "startScreen",
        value: function startScreen() {
            this.context.drawImage(this.bgimg, 10, 10); //teken de background
            this.context.font = "30px Arial";
            this.context.fillText("Defeat your enemies!", 50, 220);
            this.context.fillText("Tap W, A, S and D", 60, 320);
        }
    }, {
        key: "nextLevelCheck",
        value: function nextLevelCheck() {
            this.levelUp = this.enemyController.nextLevelCheck();
            console.log(this.levelUp);
            if (this.levelUp) {
                this.level++; //een level hoger
                if (this.level > this.maxLevel) {
                    //reset level naar 1 als hij hoger wordt dan het aantal levels komt
                    this.level = 1;
                    alert("You win! Please save your score");
                }
                this.start();
            }
        }
    }, {
        key: "refresh",
        value: function refresh() {
            var _this2 = this;

            this.startScreen(); //tekent de bg en schrijft de tekst


            if (this.songstart) {
                this.enemyController.newEnemy();

                this.player.draw(this.context); //tekenen speler op canvas

                this.enemyController.collide(this.player); //parameters voor PLAYER en SCORE
                this.score = this.enemyController.showScore(); //showscore returnt de score als gegenereerd in enemies
                this.writeScore(); //schrijf de score
                this.enemyController.writeTimeLeft(this.context); //writetimeleft schrijft de tijd die over is in het level
                this.nextLevelCheck(); //checkt of het nieuwe level geladen moet worden
            }

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
            color: " #000033",
            linewidth: 3,
            keydown: 0,
            img: new Image(),
            imgX: 50,
            imgY: 50
        };
        this.props.img.src = "../img/blue-ninja.png";

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
            context.drawImage(this.props.img, this.props.x - this.props.imgX / 2, this.props.y - this.props.imgY / 2);

            // context.fill();
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
        //de waardes zijn gevuld met standaardwaardes, maar worden later in de functie songdata gevuld met juiste waarden
        this.north = 100; //beginwaarde interval
        this.northStart = 100; //statische resetwaarde
        this.northVel = 100; //toenemende waarde 
        this.east = 120;
        this.eastStart = 120;
        this.eastVel = 120;
        this.south = 60;
        this.southStart = 60;
        this.southVel = 60;
        this.west = 90;
        this.westStart = 90;
        this.westVel = 90;

        //de counter is 60 fps

        this.counter = 0;
        this.songduration = 3000;

        //een variabele om te meten of het level geeindigd is
        this.levelEnd = false;

        this.score = 0;

        this.refresh();
    }

    _createClass(Enemies, [{
        key: "songData",
        value: function songData( //de functie songdata wijst de juiste data toe
        north, northvel, east, eastvel, south, southvel, west, westvel, songduration) {
            //omdat de output van de array als strings komt, parse de waarden naar int
            this.north = parseInt(north); //beginwaarde interval
            this.northVel = parseInt(northvel); //toenemende waarde 
            this.east = parseInt(east);
            this.eastVel = parseInt(eastvel);
            this.south = parseInt(south);
            this.southVel = parseInt(southvel);
            this.west = parseInt(west);
            this.westVel = parseInt(westvel);

            this.songduration = songduration;

            this.counter = 0;
        }
    }, {
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
            this.levelEnd = false; //reset de levelEnd variabele naar false

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear het canvas
            this.enemies.forEach(function (enemy) {
                //voor elke enemy
                enemy.move(); //verander de positie van de enemy
                _this.draw(_this.context, enemy); //teken de enemy
            });
        }
    }, {
        key: "nextLevelCheck",
        value: function nextLevelCheck() {
            if (this.counter == this.songduration) {
                this.counter = 0; //counter reset naar 0
                this.levelEnd = true; //is het level geeindigd?
                return this.levelEnd; //stuur de levelendwaarde naar script.js
            }
        }
    }, {
        key: "writeTimeLeft",
        value: function writeTimeLeft(context) {
            //schrijf de liedjesduur-counter=tijd die over is
            context.font = "14px Arial";
            context.fillText("Time Left: " + Math.floor((this.songduration - this.counter) / 60), this.canvas.width, 70);
        }
    }, {
        key: "draw",
        value: function draw(context, enemy) {
            context.drawImage(enemy.props.img, enemy.props.x, enemy.props.y); //teken het plaatje
        }
    }, {
        key: "collide",
        value: function collide(player) {
            var _this2 = this;

            //collide in enemies met parameter voor player en parameter voor de score  ((kan ook alleen player props))
            this.enemies.forEach(function (enemy) {
                //voor elke enemy meten 
                //als enemy x of y tussen player x of y en player x of y -radius: collision      
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
                    }
                }
                if (enemy.props.y < player.props.y + player.props.r && enemy.props.y > player.props.y && enemy.props.direction == 3) {
                    // collide down
                    //als juiste key ingedrukt
                    if (player.props.keydown == 3) {
                        enemy.props.sound.play();
                        enemy.props.isDead = true;
                        _this2.score++;
                    }
                }
                if (enemy.props.x < player.props.x + player.props.r && enemy.props.x > player.props.x && enemy.props.direction == 2) {
                    //collide right
                    //als juiste key ingedrukt
                    if (player.props.keydown == 2) {
                        enemy.props.sound.play();
                        enemy.props.isDead = true;
                        _this2.score++;
                    }
                }
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
            x: canvasWidth / 2 - 15,
            y: 10,
            width: 10,
            height: 10,
            color: this.randomColor(),
            vel: 2, //snelheid van de enemy, kan increased worden
            direction: 1,
            sound: new Audio('../sound/sword.mp3'),
            img: new Image()
        };
        this.props.x = this.props.x - this.props.width / 2;
        this.props.img.src = "../img/ninja-north.png";
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
            y: canvasWidth / 2 - 15,
            width: 10,
            height: 10,
            color: this.randomColor(),
            vel: 2,
            direction: 2,
            sound: new Audio('../sound/tambourinewithhit.mp3'), //sounds from http://www.freesfx.co.uk
            img: new Image()

        };
        this.props.y = this.props.y - this.props.height / 2;
        this.props.img.src = "../img/ninja-east.png";
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
            x: canvasWidth / 2 - 15,
            y: 390,
            width: 10,
            height: 10,
            color: this.randomColor(),
            vel: 2,
            direction: 3,
            sound: new Audio('../sound/chineseblocks.mp3'),
            img: new Image()

        };
        this.props.x = this.props.x - this.props.width / 2;
        this.props.img.src = "../img/ninja-south.png";
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
            y: canvasWidth / 2 - 15,
            width: 10,
            height: 10,
            color: this.randomColor(),
            vel: 2,
            direction: 4,
            sound: new Audio('../sound/sumyungguy.mp3'),
            img: new Image()

        };
        this.props.y = this.props.y - this.props.height / 2;
        this.props.img.src = "../img/ninja-west.png";
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

        this.xhttpSong = new XMLHttpRequest();
        this.levelData = 0;
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
    }, {
        key: "loadSong",
        value: function loadSong(level) {
            var _this2 = this;

            this.xhttpSong.onreadystatechange = function () {
                if (_this2.xhttpSong.readyState == 4 && _this2.xhttpSong.status == 200) {
                    // Typical action to be performed when the document is ready:
                    // console.log(JSON.parse(this.xhttpSong.responseText));
                    _this2.levelData = JSON.parse(_this2.xhttpSong.responseText);
                    _this2.songData();
                }
            };
            this.xhttpSong.open("GET", "http://emamstel.acue.webpages.avans.nl/cp/src/loadSongs.php/?level=" + level, true);
            this.xhttpSong.send();
        }
    }, {
        key: "songData",
        value: function songData() {
            // console.log(JSON.parse(this.levelData));
            return this.levelData;
        }
    }]);

    return AjaxHandler;
}();

exports.default = AjaxHandler;

/***/ })
/******/ ]);