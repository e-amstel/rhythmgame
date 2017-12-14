
//noordelijke enemy
export default class EnemySouth{
    constructor(canvasWidth){
        this.props = {
         // type: Math.floor(Math.random() * 4 ),
         x: canvasWidth/2 -15 ,
         y: 390,
          width: 10,
          height: 10,
          color:this.randomColor(),
          vel: 2,
          direction: 3,
          sound: new Audio('../sound/chineseblocks.mp3'),
          img: new Image(),
          
          
        }
        this.props.x = this.props.x - this.props.width/2 ;
        this.props.img.src = "../img/ninja-south.png";
        

      }

       randomColor() {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        }
        move(){
            if (this.props.y < 200){
                this.props.isDead = true;
             }
            this.props.y -= this.props.vel;
        }

}