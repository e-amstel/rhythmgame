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

        this.score = 0;
        
        this.refresh();
        
    }

    songData( //de functie songdata wijst de juiste data toe
        north, northvel,
        east, eastvel,
        south, southvel,
        west, westvel,
        songduration
        ){
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
             if (this.counter == this.songduration){ 
                alert("You win! Please save your score");
                this.counter = 0; //counter reset naar 0
                
             }
       this.context.clearRect(0,0,this.canvas.width,this.canvas.height); //clear het canvas
        this.enemies.forEach(enemy => { //voor elke enemy
            enemy.move(); //verander de positie van de enemy
            this.draw(this.context, enemy); //teken de enemy
        })
    }
    writeTimeLeft(context){ //schrijf de liedjesduur-counter=tijd die over is
        context.font = "14px Arial";
        context.fillText("Time Left: "+ Math.floor((this.songduration - this.counter)/60),this.canvas.width, 70);
    }

    draw(context, enemy){
            context.drawImage(enemy.props.img, enemy.props.x, enemy.props.y); //teken het plaatje
       }
    
       collide(player){ //collide in enemies met parameter voor player en parameter voor de score
        this.enemies.forEach(enemy => { //voor elke enemy meten 
            //als enemy x of y tussen player x of y en player x of y -radius: collision      
            if (enemy.props.y > (player.props.y - player.props.r) && enemy.props.y < player.props.y && enemy.props.direction == 1){
               //collide top
                 //als juiste key ingedrukt
                 if (player.props.keydown == 1){
                    enemy.props.sound.play(); //speel geluidje
                    enemy.props.isDead = true; //de enemy verdwijnt
                     this.score++; //de score gaat omhoog
                     //veld groter maken?
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
                     this.score++;
                 }
             }
            if (enemy.props.y < (player.props.y + player.props.r) && enemy.props.y > player.props.y && enemy.props.direction == 3){
                // collide down
                 //als juiste key ingedrukt
                 if (player.props.keydown == 3){
                    enemy.props.sound.play();                     
                    enemy.props.isDead = true;
                     this.score++;

                 }
             }
            if (enemy.props.x < (player.props.x + player.props.r) && enemy.props.x > player.props.x && enemy.props.direction == 2){
                //collide right
                 //als juiste key ingedrukt
                 if (player.props.keydown == 2){
                    enemy.props.sound.play();                     
                    enemy.props.isDead = true;
                     this.score++;

                 }
             }
         })
    }
    showScore(){
        return this.score;
        
    }

    refresh(){
        this.enemies = this.enemies.filter(enemy => {
            return !enemy.props.isDead;
        })   ; 
        
        window.requestAnimationFrame(() => {
            this.refresh();
        })

    }

}

var c = new Enemies();