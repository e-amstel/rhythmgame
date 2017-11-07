import EnemyNorth from "./enemyNorth.es6";
import EnemyEast from "./enemyEast.es6";
import EnemySouth from "./enemySouth.es6";
import EnemyWest from "./enemyWest.es6";


export default class Enemies {
    constructor(){
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
    newEnemy(){
        if (this.songstart == true){
            window.requestAnimationFrame(() => { //animationframe is ong 60 fps
                this.counter++; //een counter die elk frame 1 omhoog gaat
            })
            //wanneer de counter gelijk is aan de opgegeven intervalwaardes komt er een nieuwe enemy bij
            //de intervalwaarde verhoogd ook om de counter bij te houden
            if (this.counter == this.snare){
                this.enemies.push(new EnemyNorth(this.canvas.width));  
                this.snare = this.snare+this.snareVel;
            }
            if (this.counter == this.clap){
                this.enemies.push(new EnemyEast(this.canvas.height));  
                this.clap = this.clap+this.clapVel;
            }            
            if (this.counter == this.beat){
                this.enemies.push(new EnemySouth(this.canvas.width));  
                this.beat = this.beat+this.beatVel;
            }            
            if (this.counter == this.kick){
                this.enemies.push(new EnemyWest(this.canvas.height));  
                this.kick = this.kick+this.kickVel;
            }
            if (this.counter == 4000){ 
                this.counter = 0; //de counter reset naar 0
                this.snare = this.snareStart; //zet elke 4 secondes (maat) de waardes terug naar de beginwaardes
                this.clap = this.clapStart;
                this.beat = this.beatStart;
                this.kick = this.kickStart;
            }

        }

        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.enemies.forEach(enemy => {
            enemy.move();
            this.draw(this.context, enemy);
        })
    }

    draw(context, enemy){
           //context.clearRect(0,0,context.canvas.width,context.canvas.height);
           context.fillStyle = enemy.props.color;
           context.fillRect(
               enemy.props.x, 
               enemy.props.y, 
               enemy.props.width, 
               enemy.props.height);
       }

    
    refresh(){
        this.newEnemy();
        this.enemies = this.enemies.filter(enemy => {
            return !enemy.props.isDead;
        })   ; 
        
        window.requestAnimationFrame(() => {
            this.refresh();
        })

    }

}

var c = new Enemies();