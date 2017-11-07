
//noordelijke enemy
export default class Enemy{
    constructor(){
        this.props = {
         // type: Math.floor(Math.random() * 4 ),
          x: 200,
          y: 10,
          width: 10,
          height: 10,
          color:this.randomColor(),
          vel: 2
          
        }
     

      }
      draw(context){
        //   context.clearRect(this.props.x,this.props.y,this.props.width,this.props.height);        
           context.fillStyle = this.props.color;
           context.fillRect(
               this.props.x, 
               this.props.y, 
               this.props.width, 
               this.props.height);
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