
//noordelijke enemy
export default class EnemyWest{
    constructor(canvasWidth){
        this.props = {
         // type: Math.floor(Math.random() * 4 ),
          x: 10,
          y: canvasWidth/2 -15,
          width: 10,
          height: 10,
          color:this.randomColor(),
          vel: 2,
          direction: 4,
          sound: new Audio('../sound/sumyungguy.mp3'),
          img: new Image(),
          
        }
        this.props.y = this.props.y - this.props.height/2 ;
        this.props.img.src = "../img/ninja-west.png";
        

      }

       randomColor() {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        }
        move(){
            if (this.props.x > 200){
                this.props.isDead = true;
             }
            this.props.x += this.props.vel;
        }

}