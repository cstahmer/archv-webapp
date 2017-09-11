<?php

  $data = array(
    '-i1' => $_POST["input1"],
    '-i2' => $_POST["input2"],
    '-o' => $_POST["output"],
    '-p' => $_POST["param"]
  );

  $query = http_build_query($data);
  $baseurl = "localhost:8888/draw/draw?";

  $url = $baseurl.$query;

  $curl = curl_init($url);  


  $result=curl_exec($curl);
  echo $result[0];

  curl_close($curl);
 
?>
