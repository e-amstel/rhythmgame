
export default class AjaxHandler{    

    CallAjaxFunction(serverScript,arguments) 
{ 
    // maak een XMLHttpRequest object aan 
    var xmlHttp = new XMLHttpRequest(); 
     
    // Specificeer welke functie wordt uitgevoerd als de call naar de server klaar is  
    // (readyState 4 (klaar) en correct uitgevoerd (status 200)). Vaak is dit het tonen  
    // van de output van het PHP script in een DIV-sectie) 
    xmlHttp.onreadystatechange = function() 
    { 
        if (xmlHttp.readyState == 4 && xmlHttp.status==200)  
        { 
            handleResult(); 
        } 
    } 
     
    // Ajax call (Request naar de server met eventuele parameters (arguments)) 
    xmlHttp.open("POST", serverScript, true); 
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
    xmlHttp.send(arguments); 
} 

 callServer(serverScript) 
{ 
    CallAjaxFunction(serverScript,score); 
} 
//afhandelen tonen van de output 
 handleResult() 
{ 
    // Plaats de output van de AJAXcall binnen een DIV-tag 
    console.log("hoi")
} 

}
