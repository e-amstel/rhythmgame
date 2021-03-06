//txt bestandjes van server mag ook
//highscore wegschrijven
//ritme in array?

import Player from "./player.es6";
import Enemies from "./enemies.es6";
import AjaxHandler from "./ajax.es6";


class Controller {
    constructor(){
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

        this.player = new Player();   
        this.ajaxHandler = new AjaxHandler();
        this.enemyController = new Enemies();
        //is het nummer al begonnen? songstart staat standaard op false
        this.songstart = false; 
        //gegevens voor achtergrondmuziek en achtergrondafbeelding
        this.bgmusic = new Audio('./sound/chineseorcestra.mp3');
        this.bgimg = new Image();
        this.bgimg.src = "./img/sakura.jpg";

        this.startButton.onclick = ()=> { //als er op de startbutton wordt geklikt, activeer startfunctie
            this.start();
        }
        this.nextLevel.onclick = ()=> {
            //  this.level++; //een level hoger
            //  if (this.level > this.maxLevel){ //reset level naar 1 als hij hoger wordt dan het aantal levels komt
            //      this.level = 1;
            //      alert("You win! Please save your score");
            //  }
            //  this.start();
        }
        this.scoreButton.onclick = ()=> { //als er op de scorebutton wordt geklikt, 
             this.ajaxHandler.CallAjaxFunction(this.score) ; //activeer de functie om score naar database te sturen
             location.reload(); //en herlaad de pagina
         }

        this.refresh();
    }

    start(){
        this.bgmusic.play(); //achtergrondmuziek
        this.songstart = true; //start het liedje 
        this.loadSong();

    }
    
    loadSong(){
        this.ajaxHandler.loadSong(this.level); //laad level data
        this.levelData = this.ajaxHandler.songData(); //de leveldata wordt gereturned naar levelData
        this.enemyController.songData( //stuur de leveldata naar de enemycontroller om daar de functie songdata te vullen
            this.levelData.north, this.levelData.northvel,
            this.levelData.east, this.levelData.eastvel,
            this.levelData.south, this.levelData.southvel,
            this.levelData.west, this.levelData.westvel,
            this.levelData.songduration);            
    }

    writeScore(){ //schrijf de score en level rechtsbovenin
        this.context.font = "14px Arial";
        this.context.textAlign = "right";
        this.context.fillText("Score: "+ this.score,this.canvas.width, 50);
        this.context.fillText("Level: "+ this.level,this.canvas.width, 30);
        
    }

    startScreen(){
        this.context.drawImage(this.bgimg,10,10); //teken de background
        this.context.font = "30px Arial";
        this.context.fillText("Defeat your enemies!",50, 220);
        this.context.fillText("Tap W, A, S and D",60, 320);
        
    }
    nextLevelCheck(){
        this.levelUp = this.enemyController.nextLevelCheck();
        console.log(this.levelUp);
        if (this.levelUp){
            this.level++; //een level hoger
            if (this.level > this.maxLevel){ //reset level naar 1 als hij hoger wordt dan het aantal levels komt
                this.level = 1;
                alert("You win! Please save your score");
            }
            this.start();
        }
    }
    
    refresh(){        
       this.startScreen(); //tekent de bg en schrijft de tekst

       
     
       if (this.songstart){
            this.enemyController.newEnemy();
            
            this.player.draw(this.context); //tekenen speler op canvas
        
            this.enemyController.collide(this.player); //parameters voor PLAYER en SCORE
            this.score = this.enemyController.showScore(); //showscore returnt de score als gegenereerd in enemies
            this.writeScore(); //schrijf de score
            this.enemyController.writeTimeLeft(this.context); //writetimeleft schrijft de tijd die over is in het level
            this.nextLevelCheck(); //checkt of het nieuwe level geladen moet worden
                
        }    

        window.requestAnimationFrame(() => { //elke animation frame de functie opnieuw uitvoeren
            this.refresh();
        })

    }

}
var c = new Controller();

