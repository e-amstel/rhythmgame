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
//collide in enemies
//ritme in array?
//enemy.props.direction om te meten wat voor enemy het is

var _player = __webpack_require__(1);

var _player2 = _interopRequireDefault(_player);

var _enemies = __webpack_require__(2);

var _enemies2 = _interopRequireDefault(_enemies);

var _sendscore = __webpack_require__(3);

var _sendscore2 = _interopRequireDefault(_sendscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);

        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");

        this.player = new _player2.default();

        this.enemyController = new _enemies2.default();

        this.songstart = true; //is het nummer al begonnen? op het moment nog niks mee gedaan maar geeft mogelijkheid tot het inbouwen van een start knop

        this.score = 0;

        this.refresh();
    }

    _createClass(Controller, [{
        key: "refresh",
        value: function refresh() {
            var _this = this;

            if (songstart == true) {

                this.player.draw(this.context); //tekenen speler op canvas

                this.enemyController.collide(this.player, this.score); //parameters voor PLAYER en SCORE
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
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: C:/Users/Esther/Documents/CMD/J3/Creative Programming/eindopdracht/src/enemies.es6: Unexpected token (70:12)\n\n\u001b[0m \u001b[90m 68 | \u001b[39m        }\n \u001b[90m 69 | \u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 70 | \u001b[39m        \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mcontext\u001b[33m.\u001b[39mclearRect(\u001b[35m0\u001b[39m\u001b[33m,\u001b[39m\u001b[35m0\u001b[39m\u001b[33m,\u001b[39m\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mcanvas\u001b[33m.\u001b[39mwidth\u001b[33m,\u001b[39m\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mcanvas\u001b[33m.\u001b[39mheight)\u001b[33m;\u001b[39m\n \u001b[90m    | \u001b[39m            \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 71 | \u001b[39m        \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39menemies\u001b[33m.\u001b[39mforEach(enemy \u001b[33m=>\u001b[39m {\n \u001b[90m 72 | \u001b[39m            enemy\u001b[33m.\u001b[39mmove()\u001b[33m;\u001b[39m\n \u001b[90m 73 | \u001b[39m            \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mdraw(\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mcontext\u001b[33m,\u001b[39m enemy)\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: C:\\Users\\Esther\\Documents\\CMD\\J3\\Creative Programming\\eindopdracht\\src\\sendscore.js Binding arguments in strict mode (4:34)\nYou may need an appropriate loader to handle this file type.\n| export default class AjaxHandler{    \r\n| \r\n|     CallAjaxFunction(serverScript,arguments) \r\n| { \r\n|     // maak een XMLHttpRequest object aan \r");

/***/ })
/******/ ]);