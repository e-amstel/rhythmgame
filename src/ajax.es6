
export default class AjaxHandler{
    constructor(){
        this.xhttpSong = new XMLHttpRequest();
        this.levelData = 0;
    }    

    CallAjaxFunction(score) 
    { 
    // maak een XMLHttpRequest object aan 
    var xmlHttp = new XMLHttpRequest(); 
     
    // Specificeer welke functie wordt uitgevoerd als de call naar de server klaar is  
    // (readyState 4 (klaar) en correct uitgevoerd (status 200)). Vaak is dit het tonen  
    // van de output van het PHP script in een DIV-sectie) 
    xmlHttp.onreadystatechange = ()=>{ 
        if (xmlHttp.readyState == 4 && xmlHttp.status==200)  
        { 
            this.handleResult(score); 
            
        } 
    } 
     
    // Ajax call (Request naar de server met eventuele parameters (arguments)) 
    xmlHttp.open("POST", "http://emamstel.acue.webpages.avans.nl/cp/src/verwerkscore.php" , true); 
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");         
    xmlHttp.send("score="+score); 
    } 

//  callServer() 
// { 
//     CallAjaxFunction(score); 
// } 
//afhandelen tonen van de output 
    handleResult(score) { 
        // Plaats de output van de AJAXcall binnen een DIV-tag 
        console.log("hoi");
        console.log(score);
        
    }   

    loadSong(level){
        this.xhttpSong.onreadystatechange = ()=> {
            if (this.xhttpSong.readyState == 4 && this.xhttpSong.status == 200) {
                // Typical action to be performed when the document is ready:
               // console.log(JSON.parse(this.xhttpSong.responseText));
               this.levelData = JSON.parse(this.xhttpSong.responseText);
               this.songData();
            }
        };
        this.xhttpSong.open("GET",
            "http://emamstel.acue.webpages.avans.nl/cp/src/loadSongs.php/?level=" + level, true);
        this.xhttpSong.send();
        }

    songData(){
       // console.log(JSON.parse(this.levelData));
        return (this.levelData); 
        
    }    
}
