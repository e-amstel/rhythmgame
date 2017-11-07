
import Player from "./player.es6";
import Enemies from "./enemies.es6";


class Controller {
    constructor(){
        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");
        
        this.player = new Player();   

        this.enemyController = new Enemies();
        

        this.refresh();
        
    }

    
    refresh(){

     //   this.enemyController.draw(this.context);

        window.requestAnimationFrame(() => {
            this.refresh();
        })

    }

}

var c = new Controller();