
export default class Enemy{
    constructor(){
        this.props = {
          type: Math.floor(Math.random() * 4 ),
          x: 0,
          y: 0,
          width: 10,
          height: 10,
          color:this.randomColor()
          
        }
       this.startLocation = this.startLocation();
       
       this.props.x =this.startLocation.x; 
       this.props.y =this.startLocation.y; 
       console.log("type:" + this.props.type);

       

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
       startLocation(){
            //noord 
        if (this.props.type == 0){
            this.props.x = 200;
            this.props.y = 10;
        }
            //oost
        if (this.props.type == 1){
            this.props.x = 390;
            this.props.y = 200;
        }
            //zuid
        if (this.props.type == 2){
            this.props.x = 200;
            this.props.y = 390;
        }
            //west
        if (this.props.type == 3){
            this.props.x = 10;
            this.props.y = 200;
        }
        
        return {x:this.props.x, y:this.props.y  } ;
        
       } 
       move(){
        this.props.x += this.props.vel.x;        
        this.props.y += this.props.vel.y;
       }
}