
//noordelijke enemy
export default class EnemyEast{
    constructor(canvasWidth){
        this.props = {
         // type: Math.floor(Math.random() * 4 ),
          x: 390,
          y: canvasWidth/2,
          width: 10,
          height: 10,
          color:this.randomColor(),
          vel: 2,
          direction: 2,
        //  sound: new Audio('../sound/tambourinewithhit.mp3') //sounds from http://www.freesfx.co.uk
                    
          
          
        }
        this.props.y = this.props.y - this.props.height/2 ;
        

      }

       randomColor() {
        return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        }
        move(){
            if (this.props.x < 200){
                this.props.isDead = true;
             }
            this.props.x -= this.props.vel;
        }

}