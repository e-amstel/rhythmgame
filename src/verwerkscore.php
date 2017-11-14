<?php
include "db_connection-json.php";

$query = $db->prepare("INSERT INTO highscores (name, score) VALUES ('loser', ?)"); 
$params=array($_POST["score"]); 

if ($query->execute($params)) { 
    echo "<div class=\"reacties\">Toevoegen gelukt</div>\n" ; 
} else { 
    // Feedback dat het opslaan is mislukt 
    echo "<div class=\"reacties\">Toevoegen mislukt!</div>\n";         
} 

?>