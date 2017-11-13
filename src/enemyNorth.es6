
//noordelijke enemy
export default class EnemyNorth{
    constructor(canvasWidth){
        this.props = {
         // type: Math.floor(Math.random() * 4 ),
          x: canvasWidth/2 ,
          y: 10,
          width: 10,
          height: 10,
          color:this.randomColor(),
          vel: 2, //snelheid van de enemy, kan increased worden
          direction: 1,
         // sound: new Audio('../sound/sword.mp3')
        }
        this.props.x = this.props.x - this.props.width/2 ;

      }

       randomColor() {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        }
        move(){
            if (this.props.y > 200){
                this.props.isDead = true;
             }
            this.props.y += this.props.vel;
        }

        
        

}