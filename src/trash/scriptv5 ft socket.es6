//txt bestandjes van server mag ook
//highscore wegschrijven
//collide in enemies
//ritme in array?
//enemy.props.direction om te meten wat voor enemy het is

import Player from "./player.es6";
import Enemies from "./enemies.es6";


class Controller {
    constructor(){
        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");
        
        this.player = new Player();   

        this.enemyController = new Enemies();
        
        this.score = 0;

        this.refresh();
        
    }

    
    
    refresh(){

        this.player.draw(this.context); //tekenen speler op canvas
        
        this.enemyController.collide(this.player, this.score); //parameters voor PLAYER en SCORE


        window.requestAnimationFrame(() => { //elke animation frame de functie opnieuw uitvoeren
            this.refresh();
        })

    }

}
var c = new Controller();

var socket = io('http://localhost/');
socket.on('connect', function () {
  socket.send('hi');

  socket.on('message', function (msg) {
    // my msg
  });
});

//start met node app.js