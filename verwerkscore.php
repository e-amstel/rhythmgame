<?php
include "db-connection.php";

$query = $db->prepare("INSERT INTO reacties (afzender, reactie) VALUES(?,?)"); 
$params=array($_POST["afzender"],$_POST["reactie"]); 

if ($query->execute($params)) { 
    echo "<div class=\"reacties\">reactie toegevoegd.</div>\n"; 
} else { 
    // Feedback dat het opslaan is mislukt 
    echo "<div class=\"reacties\">Toevoegen mislukt!</div>\n";         
} 

?>