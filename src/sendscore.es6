
export default class AjaxHandler{
    constructor(){
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


}
