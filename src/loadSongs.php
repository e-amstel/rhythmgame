<?php
include "db_connection-json.php";

$query = $db->prepare("SELECT north, northvel, east, eastvel, south, southvel, west, westvel, songduration FROM songs WHERE level=?");
// Uitvoeren van de query
$params=array($_GET["level"]);
$query->execute($params);

// while($row = $query->fetch(PDO::FETCH_ASSOC)) { //totdat de rijen opzijn
    
// 		// Voor debugging, tonen wat er in $row zit (wat komt er uit de database)
// 		echo "<pre>"; // makt het beter leesbaar
// 		print_r($row);
//         echo "</pre>";
//         echo $row["north"];
//     }
    if ($song = $query->fetch(PDO::FETCH_ASSOC)) { 
        // Out de gegevens van het geselecteerde bericht als JSON
        echo json_encode($song);
    } else {
        $feedback["error"]=true;
        $feedback["error-type"]="Niet gevonden";
        $feedback["error-details"]="Er is een fout opgetreden (bericht niet gevonden).";
        echo json_encode($feedback);
    }    
?>