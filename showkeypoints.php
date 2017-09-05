<?php

  $data = array(
    '-i' => $_POST["input"],
    '-o' => $_POST["output"],
    '-p' => $_POST["param"]
  );

  $query = http_build_query($data);
  $baseurl = "localhost:8888/show/show?";

  $url = $baseurl.$query;

  $curl = curl_init($url);  


  $result=curl_exec($curl);

  curl_close($curl);

  echo $result[0];
 
?>
