// September 4, 2017                      Arthur Koehl
// [1] UPLOAD AJAX

function postUpload () {
  document.getElementById("uploadDesc").innerHTML = "";
  document.getElementById("uploadDiv").innerHTML= "";
  var http = new XMLHttpRequest();
  var form = new FormData();
  var url = "upload.php";
  var file = document.getElementById("fileToUpload").files[0];
  form.append("fileToUpload", file);

  http.open("POST", url, true);

  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200)
    {
      var data = http.responseText;

      if (!(data.includes("error")) && !(data.includes("Sorry")))  
      {
         var upload = document.createElement("img");
         upload.id = "result";
         upload.style.height = "300px";
         upload.src = http.responseText + "?" + Date.now();
         document.getElementById("uploadDiv").appendChild(upload);
         document.getElementById("uploadDesc").innerHTML = "success: " + http.responseText;
      }
      else 
      {
         document.getElementById("uploadDesc").innerHTML = "fail: " + data ;
      }
    }
  }
  http.send(form);
}


// [2] ARCHV AJAX
// Eventually make this one function with two callback functions
// Callback function 1 processes result when it is an image
// Callback function 2 processes result when it is a text/json file
// need to pass in the 'url': showkeypoints.php ...
// need to pass in the 'params': input=...
// need to pass in the outputdiv
//
//
// For the php, ultimatley can all be in one file, call function based on values 
// passed in on the PUSH request to php file
// maybe pass in hidden value, 0 for show, 1 for draw ...
// 
//


function postShowRequest () 
{
  var http = new XMLHttpRequest();
  var url = "showkeypoints.php";
  var params = "input=seed.jpg&output=output.jpg&param=flickr_param";
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200) 
    {
        var data = JSON.parse(http.responseText);
        var file = data["file"];
        var result = document.createElement("img");
        result.id = "result";
        result.src = "../jetty/" + file + "?" + Date.now();
        document.getElementById("output").appendChild(result);
    }
  }

  http.send(params);
}

function postDrawRequest () 
{
  var http = new XMLHttpRequest();
  var url = "drawkeypoints.php";
  var params = "input1=seed.jpg&input2=seed.jpg&output=output.jpg&param=flickr_param";
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200) 
    {
        var data = JSON.parse(http.responseText);
        var file = data["file"];
        var result = document.createElement("img");
        result.id = "result";
        result.src = "../jetty/" + file + "?" + Date.now();
        document.getElementById("output").appendChild(result);
    }
  }

  http.send(params);
}

function postScanRequest () 
{
  var http = new XMLHttpRequest();
  var url = "scandatabase.php";
  var params = "input=seed.jpg&imagesets=~/BL-flickr/Smaller/&keypoints=~/keypoints/&ouput=output.txt&param=flickr_param";
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200) 
    {
        var data = JSON.parse(http.responseText);
        var file = data["file"];
        var result = document.createElement("img");
        result.id = "result";
        result.src = "../jetty/" + file + "?" + Date.now();
        document.getElementById("output").appendChild(result);
    }
  }

  http.send(params);
}
