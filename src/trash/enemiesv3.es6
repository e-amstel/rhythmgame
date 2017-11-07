import EnemyNorth from "./enemyNorth.es6";
import EnemyEast from "./enemyEast.es6";
import EnemySouth from "./enemySouth.es6";
import EnemyWest from "./enemyWest.es6";


class Enemies {
    constructor(){
        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");
        
        this.enemies = [];
        this.lastPush = 0;
        this.interval = 1000;
        this.snare = 25;
        this.snareVel = 25;
        this.clap = 120;
        this.clapVel = 120;
        this.beat = 100;
        this.beatVel = 100;
        this.kick = 40;
        this.kickVel = 40;

        this.counter = 0; 
        
        this.songstart = true;

        this.refresh();
        
    }
    newEnemy(){
        if (this.songstart == true){
            window.requestAnimationFrame(() => { //animationframe is ong 60 fps
                this.counter++;
                console.log(this.counter);
            })

            if (this.counter == this.snare){
                this.enemies.push(new EnemyNorth());  
                this.snare = this.snare+this.snareVel;
            }
            if (this.counter == this.clap){
                this.enemies.push(new EnemyEast());  
                this.clap = this.clap+this.clapVel;
            }            
            if (this.counter == this.beat){
                this.enemies.push(new EnemySouth());  
                this.beat = this.beat+this.beatVel;
            }            
            if (this.counter == this.kick){
                this.enemies.push(new EnemyWest());  
                this.kick = this.kick+this.kickVel;
            }
            if (this.counter == 1000){
                this.counter = 0;
                this.snare = this.snareVel;
                this.clap = this.clapVel;
                this.beat = this.beatVel;
                this.kick = this.kickVel;
            }
        //     if (Date.now() - this.lastPush > this.interval){
        //         for (var i = 0; i < this.songlength; i++){
        //             beatsArray[i];
        //             console.log("boem");
        //         if (this.beat == 1){
        //             this.enemies.push(new EnemySouth());  
        //             console.log("beat");                  
        //         }
        //         if (this.kick == 1){
        //             this.enemies.push(new EnemyNorth());
        //         }
        //         }   
        //         this.enemies.push(new EnemyWest());
                
        //         this.lastPush = Date.now();
                
        // }
        }

        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.enemies.forEach(enemy => {
            enemy.move();
            this.draw(this.context, enemy);
        })
    }

    draw(context, enemy){
        //   context.clearRect(this.props.x,this.props.y,this.props.width,this.props.height);        
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