//txt bestandjes van server mag ook
//highscore wegschrijven
//collide in enemies
//ritme in array?
//enemy.props.direction om te meten wat voor enemy het is

import Player from "./player.es6";
import Enemies from "./enemies.es6";
import AjaxHandler from "./sendscore.js";

class Controller {
    constructor(){
        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");
        
        this.player = new Player();   

        this.enemyController = new Enemies();
        
        this.songstart = true; //is het nummer al begonnen? op het moment nog niks mee gedaan maar geeft mogelijkheid tot het inbouwen van een start knop
        
        this.score = 0;

        this.refresh();
        
    }

    
    
    refresh(){
        if (songstart == true){
            
        this.player.draw(this.context); //tekenen speler op canvas
        
        this.enemyController.collide(this.player, this.score); //parameters voor PLAYER en SCORE
        }    

        window.requestAnimationFrame(() => { //elke animation frame de functie opnieuw uitvoeren
            this.refresh();
        })

    }

}
var c = new Controller();

