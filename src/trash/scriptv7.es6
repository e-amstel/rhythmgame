//txt bestandjes van server mag ook
//highscore wegschrijven
//ritme in array?

import Player from "./player.es6";
import Enemies from "./enemies.es6";
import AjaxHandler from "./ajax.es6";


class Controller {
    constructor(){
        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");
        this.startButton = document.getElementById("StartButton");
        this.scoreButton = document.getElementById("ScoreButton");
        
        this.score = 0;
        this.level = 1;
        this.maxLevel = 4; //het maximaal aantal levels. Hier nog gehardcode, maar zou kunnen veranderen op basis van het aantal rows in de leveltabel
        this.levelData = 0;
        this.player = new Player();   
        this.ajaxHandler = new AjaxHandler();
        this.enemyController = new Enemies();
        
        this.songstart = false; //is het nummer al begonnen? op het moment nog niks mee gedaan maar geeft mogelijkheid tot het inbouwen van een start knop
        
        this.bgmusic = new Audio('../sound/chineseorcestra.mp3');
        
        this.refresh();
        
    }


    start(){
        this.bgmusic.play(); //achtergrondmuziek
        this.songstart = true; //start het liedje
        //this.enemyController.resetCounter();
      //  console.log(this.level);     
        this.loadSong();
        this.level++; //een level hoger
            if (this.level > this.maxLevel){ //reset level naar 1 als hij hoger wordt dan het aantal levels komt
                this.level = 1;
            }
    }
    
    loadSong(){
        this.ajaxHandler.loadSong(this.level); //laad level data
        this.levelData = this.ajaxHandler.songData(); //de leveldata wordt gereturned naar levelData
       // console.log(this.levelData);             
        this.enemyController.songData( //stuur de leveldata naar de enemycontroller om daar de functie songdata te vullen
            this.levelData.north, this.levelData.northvel,
            this.levelData.east, this.levelData.eastvel,
            this.levelData.south, this.levelData.southvel,
            this.levelData.west, this.levelData.westvel,
            this.levelData.songduration);            
    }

    writescore(){ //schrijf de score rechtsbovenin
        this.context.font = "14px Arial";
        this.context.textAlign = "right";
        this.context.fillText("Score: "+ this.score,this.canvas.width, 50);
    }
    
    refresh(){
       this.startButton.onclick = ()=> { //als er op de startbutton wordt geklikt, activeer startfunctie
           this.start();
       }
       this.scoreButton.onclick = ()=> { //als er op de scorebutton wordt geklikt, 
        this.ajaxHandler.CallAjaxFunction(this.score) ; //activeer de functie om score naar database te sturen
        location.reload(); //en herlaad de pagina
        
        }
     
       // console.log(this.songstart);
       if (this.songstart == true){
            this.enemyController.newEnemy();
        
            this.player.draw(this.context); //tekenen speler op canvas
        
            this.enemyController.collide(this.player); //parameters voor PLAYER en SCORE
            this.score = this.enemyController.showScore(); //showscore returnt de score als gegenereerd in enemies
            this.writescore();
            this.enemyController.writeTimeLeft(this.context); //writetimeleft schrijft de tijd die over is in het level
        }    

        // if (this.songstart == false){
        //     this.ajaxHandler.CallAjaxFunction(this.score) ;
        // }        

        window.requestAnimationFrame(() => { //elke animation frame de functie opnieuw uitvoeren
            this.refresh();
        })

    }

}
var c = new Controller();

