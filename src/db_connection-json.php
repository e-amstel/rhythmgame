<?php
header("Access-Control-Allow-Origin: *");
try {
	$db = new PDO('mysql:host=localhost;dbname=emamstel;charset=utf8','emamstel','esther11');
	// Set PDO to throw exceptions when Exceptions occur
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	// Prevent PDO from adding single quites around integer values. This gives problems with limit parameters in queries
	$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false );
}
catch(PDOException $e) {
	// Vul een array met informatie over de error
	$error_info["error"]=true;
	$error_info["error-type"]="Database error";
	$error_info["error-details"]=$e->getMessage();
	// Stuur de error in JSON formaat naar de browser en stop het script
	die(json_encode($error_info));
}


?>