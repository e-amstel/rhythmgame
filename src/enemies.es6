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
        
        this.refresh();
        
    }
    newEnemy(){
            window.requestAnimationFrame(() => { //animationframe is ong 60 fps
                this.counter++; //een counter die elk frame 1 omhoog gaat
            })
            //wanneer de counter gelijk is aan de opgegeven intervalwaardes komt er een nieuwe enemy bij
            //de intervalwaarde verhoogd ook om de counter bij te houden
            if (this.counter == this.north){
                this.enemies.push(new EnemyNorth(this.canvas.width));  
                this.north = this.north+this.northVel;
            }
            if (this.counter == this.east){
                this.enemies.push(new EnemyEast(this.canvas.height));  
                this.east = this.east+this.eastVel;
            }            
            if (this.counter == this.south){
                this.enemies.push(new EnemySouth(this.canvas.width));  
                this.south = this.south+this.southVel;
            }            
            if (this.counter == this.west){
                this.enemies.push(new EnemyWest(this.canvas.height));  
                this.west = this.west+this.westVel;
            }
            if (this.counter == 4000){ 
                this.counter = 0; //de counter reset naar 0
                this.north = this.northStart; //zet elke 4 secondes (maat) de waardes terug naar de beginwaardes
                this.east = this.eastStart;
                this.south = this.southStart;
                this.west = this.westStart;
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
    
    collide(player, score){ //collide in enemies met parameter voor player en parameter voor de score
        this.enemies.forEach(enemy => { //voor elke enemy meten 
            //als enemy x of y tussen player x of y en player x of y -radius: collision      
            //elke collisionwordt gemeten als meerdere collisions, 
            //een exacte score zou dus berekend kunnen worden door het aantal collisions door 16 te delen    
            //een eerlijke score (die in verhouding staat met de moeilijkheidsgraad) kan bereikt worden 
            //door het delen van de collisions door de radius en dit af te ronden of te vermenigvuldigen met een standaard getal 
            if (enemy.props.y > (player.props.y - player.props.r) && enemy.props.y < player.props.y && enemy.props.direction == 1){
               //collide top
                 //als juiste key ingedrukt
                 if (player.props.keydown == 1){
                     enemy.props.sound.play();
                     enemy.props.isDead = true; //de enemy verdwijnt
                     score++; //de score gaat omhoog
                     //veld groter maken?
                     //speel geluidje
                 }
                 else {
                     //levens down?? geen levens omdat er een tijdsduur/maximale score op het nummer zit. 
                 }    
             }
            if (enemy.props.x > (player.props.x - player.props.r) && enemy.props.x < player.props.x && enemy.props.direction == 4){
                //collide left
                 //als juiste key ingedrukt
                 if (player.props.keydown == 4){
                     enemy.props.sound.play();                     
                     enemy.props.isDead = true;
                     score++;
                     
                     //speel geluidje
                 }
             }
            if (enemy.props.y < (player.props.y + player.props.r) && enemy.props.y > player.props.y && enemy.props.direction == 3){
                // collide down
                 //als juiste key ingedrukt
                 if (player.props.keydown == 3){
                     enemy.props.sound.play();                     
                     enemy.props.isDead = true;
                     score++;
                     
                     //speel geluidje
                 }
             }
            if (enemy.props.x < (player.props.x + player.props.r) && enemy.props.x > player.props.x && enemy.props.direction == 2){
                //collide right
                 //als juiste key ingedrukt
                 if (player.props.keydown == 2){
                     enemy.props.sound.play();                    
                     enemy.props.isDead = true;
                     score++;
                     
                     //speel geluidje
                 }
             }
         })
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