//txt bestandjes van server mag ook
//highscore wegschrijven
//ritme in array?

import Player from "./player.es6";
import Enemies from "./enemies.es6";
import AjaxHandler from "./sendscore.es6";


class Controller {
    constructor(){
        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");
        
        this.score = 0;
        
        this.player = new Player();   
        this.ajaxHandler = new AjaxHandler();
        this.enemyController = new Enemies();
        
        this.songstart = true; //is het nummer al begonnen? op het moment nog niks mee gedaan maar geeft mogelijkheid tot het inbouwen van een start knop
        
        this.bgmusic = new Audio('../sound/chineseorcestra.mp3')

        this.refresh();
        
    }

    start(){
        this.bgmusic.play();
        this.songstart = true;
    }
    
    writescore(){
        this.context.font = "14px Arial";
        this.context.textAlign = "right";
        this.context.fillText("Score: "+ this.score,this.canvas.width, 50);
    }
    
    refresh(){
        if (this.songstart == true){
            
            this.player.draw(this.context); //tekenen speler op canvas
        
            this.enemyController.collide(this.player, this.score); //parameters voor PLAYER en SCORE
            
            this.writescore();
        }    

        if (this.songstart == false){
            this.ajaxHandler.CallAjaxFunction(this.score) ;
            
        }

        window.requestAnimationFrame(() => { //elke animation frame de functie opnieuw uitvoeren
            this.refresh();
        })

    }

}
var c = new Controller();

