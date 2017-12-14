
export default class Player{
    constructor(){
        this.props = {
          x: 100, //default startwaardes voor x en y
          y: 100,
        //   width: 100,
        //   height: 100,
          r: 60, //radius van de playercirkel, deze kan vergroot en verkleind gaan worden om het spel moeilijker te maken
          color:this.randomColor(),
          linewidth: 3,
          keydown: 0,  
          img: new Image(),
          
        };
        this.props.img.src = "../img/blue-ninja.png";
        
        window.addEventListener("keydown", (e) => {
            if (e.keyCode == 87){ //w key
                this.props.keydown = 1;
            }
            if (e.keyCode == 68){ //d key
                this.props.keydown = 2;
            }
            if (e.keyCode == 83) { //s key
                this.props.keydown = 3;
            }
            if (e.keyCode == 65){ //a key
                this.props.keydown = 4;
            }
            window.addEventListener("keyup", (e) => {
                this.props.keydown = 0;
            });    
        });    

      }
      draw(context){
          //rekensommetje om de x en y op het midden van het speelveld te krijgen, deel de afmetingen van het canvas door 2 
          this.props.x = (context.canvas.width/2) ;
          this.props.y = (context.canvas.height/2) ;
           context.clearRect(this.props.x,this.props.y,this.props.width,this.props.height);        
          // context.fillStyle = this.props.color;
           context.beginPath(); //beginnen van path bij het tekenen van een cirkel, anders houdt ie niet op met path tekenen
           context.arc(
               this.props.x,
               this.props.y,
               this.props.r,
               0, 2 * Math.PI, false
           );
           context.lineWidth = this.props.linewidth;
           context.strokeStyle = this.props.color;
           context.stroke();
           context.drawImage(this.props.img, this.props.x, this.props.y);
           
          // context.fill();
       }
       
       randomColor() {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    }


        refresh(){

            // this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.draw(this.context);
            
            window.requestAnimationFrame(() => { //animationframe is ong 60 fps
                    this.refresh();
            })
        }
}