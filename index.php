<!doctype HTML>
<html>
<body style = "text-align: center">
  <div id="target" style="display:none">
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
      echo htmlspecialchars($result[0]);
      curl_close($curl);
    ?>
  </div>

  <br>

    <hr>
    <h2> SHOWKEYPOINTS </h2>
    <hr>

<!--
  <form action="upload.php" method="post" enctype="multipart/form-data">
    Select Image to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload Image" name= "submit">
  </form>
-->

  <br>

  <form name="showkeypoints" method="post">
    inputfile: <input type="text" name="input"><br>
    outputfile: <input type="text" name="output"><br>
    param: <input type="text" name="param"><br><br>
    <input type="submit">
  </form>
  <br>

  <button id="loadresults" onclick="loadResult()"> RESULT</button><br><br>

  <div id="output"> </div>
  


  <script>
    function loadResult() {
      var div = document.getElementById("target");
      var myData = div.innerHTML;
      var data = JSON.parse(myData);
      var file = data["file"];

      var result = document.createElement("img");
      result.id = "result";
      result.src = "../jetty/" + file + "?" + Date.now();
      document.getElementById("output").appendChild(result);
    }
  </script>
</body>
</html>
