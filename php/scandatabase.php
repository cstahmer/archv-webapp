<?php

  $data = array(
    '-i' => $_POST["input"],
    '-d' => $_POST["imageset"],
    '-k' => $_POST["keypoints"],
    '-o' => $_POST["output"],
    '-p' => $_POST["param"]
  );

  $query = http_build_query($data);
  $baseurl = "localhost:8888/scan/scan?";

  $url = $baseurl.$query;

  $curl = curl_init($url);  


  $result=curl_exec($curl);
  echo $result[0];

  curl_close($curl);
 
?>
