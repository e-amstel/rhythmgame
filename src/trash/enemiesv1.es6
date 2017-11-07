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
        this.beat = 500;
        this.kick = 300;

        this.counter = 0; 
        

        this.refresh();
        
    }
    newEnemy(){
        if (Date.now() - this.lastPush > this.interval){
        if (this.counter < 4){
           // this.enemies.push(new EnemyNorth());
           // this.enemies.push(new EnemyEast());
            this.enemies.push(new EnemySouth());
           // this.enemies.push(new EnemyWest());
          //  this.lastPush = Date.now();
           // this.interval = this.beat;
           this.counter++;
        }
        if (Date.now() - this.lastPush > this.kick){
             this.enemies.push(new EnemyNorth());
            // this.enemies.push(new EnemyEast());
           //  this.enemies.push(new EnemySouth());
            // this.enemies.push(new EnemyWest());
           //  this.lastPush = Date.now();
             this.kick = Math.random()*40;
         }
         console.log(this.counter);
        this.counter = 0; 
        this.lastPush = Date.now();
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