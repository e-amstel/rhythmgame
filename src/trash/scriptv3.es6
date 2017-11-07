
import Player from "./player.es6";
import Enemies from "./enemies.es6";


class Controller {
    constructor(){
        this.canvas = document.querySelector("#myCanvas");
        this.context = this.canvas.getContext("2d");
        
        this.player = new Player();   

        this.enemyController = new Enemies();
        
        this.score = 0;

        this.refresh();
        
    }

    collide(){
        this.enemyController.enemies.forEach(enemy => { //voor elke enemy meten 
            //als enemy x of y tussen player x of y en player x of y -radius: collision      
            //elke collision bij een radius van 40 wordt gemeten als 16 of 19 collisions, 
            //een exacte score zou dus berekend kunnen worden door het aantal collisions door 16 te delen    
            //een eerlijke score (die in verhouding staat met de moeilijkheidsgraad) kan bereikt worden 
            //door het delen van de collisions door de radius en dit af te ronden of te vermenigvuldigen met een standaard getal 
             if (enemy.props.y > (this.player.props.y - this.player.props.r) && enemy.props.y < this.player.props.y ){
               //  console.log("collide top"); 
                 //als juiste key ingedrukt
                 if (this.player.props.keydown == 1){
                     console.log("hit"); 
                     //up score
                     //if score up, veld groter maken
                     //speel geluidje
                 }
                 else {
                     console.log("miss");
                     //levens down
                 }    
             }
             if (enemy.props.x > (this.player.props.x - this.player.props.r) && enemy.props.x < this.player.props.x ){
                // console.log("collide left"); 
                 //als juiste key ingedrukt
                 if (this.player.props.keydown == 2){
                     console.log("hit"); 
                     //up score
                     //speel geluidje
                 }
                 else {
                     console.log("miss");
                     //levens down
                 }   
             }
             if (enemy.props.y < (this.player.props.y + this.player.props.r) && enemy.props.y > this.player.props.y ){
                // console.log("collide down");
                 //als juiste key ingedrukt
                 if (this.player.props.keydown == 3){
                     console.log("hit"); 
                     //up score
                     //speel geluidje
                 }
                 else {
                     console.log("miss");
                     //levens down
                 }   
             }
             if (enemy.props.x < (this.player.props.x + this.player.props.r) && enemy.props.x > this.player.props.x ){
                // console.log("collide right");
                 //als juiste key ingedrukt
                 if (this.player.props.keydown == 4){
                     console.log("hit"); 
                     //up score
                     //speel geluidje
                 }
                 else {
                     console.log("miss");
                     //levens down
                 }   
             }
         })
    }
    
    refresh(){

        this.player.draw(this.context);
        
        this.collide();


        window.requestAnimationFrame(() => { //elke animation frame de functie opnieuw uitvoeren
            this.refresh();
        })

    }

}

var c = new Controller();