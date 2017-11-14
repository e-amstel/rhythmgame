<?php

include "../db_connection-json.php";


$query = $db->prepare("select id, name, score, ts from highscores order by score desc");
// Uitvoeren van de query
$query->execute();

$num_rows=0;

while($row = $query->fetch(PDO::FETCH_ASSOC)) { //totdat de rijen opzijn
    
    $username = $row["name"];
    echo $username + "<br>";

		// We hebben weer een rij gevonden dus teller 1 omhoog
		$num_rows++;
}
    
    // Klaar! Hebben we rijen gevonden?
if ($num_rows==0) {
        echo "0 results"; //als er niks wordt gevonden
}


?>