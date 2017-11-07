import Enemy from "./enemy.es6";
import Player from "./player.es6";


class Controller {
    constructor(){
        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");
        
        this.player = new Player();   

        this.enemies = [];
        this.lastPush = 0;
        this.interval = 1000;
        

        this.refresh();
        
    }
    newEnemy(){

        if (Date.now() - this.lastPush > this.interval){
            this.enemies.push(new Enemy());
            this.lastPush = Date.now();
            this.interval = Math.random() * 2000;
        }
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.enemies.forEach(enemy => {
            enemy.move();
            enemy.draw(this.context);
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

var c = new Controller();