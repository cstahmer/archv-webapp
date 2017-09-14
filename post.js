// September 4, 2017                      Arthur Koehl
// [0] RESET FUNCTION

// something that needs to be called whenever you upload an image
// deletes all the objects that are created in the functions below
function resetFull()
{
  resetUpload();
  resetShow();
  resetScan();
  resetDraw();
}

function resetUpload() 
{
  //upload result
  document.getElementById("uploadDesc").innerHTML = "";
  document.getElementById("uploadDiv").innerHTML= "";
}

function resetShow ()
{
  //showkeypoints result
  if (document.getElementById('showResult'))
  {
    var temp = document.getElementById('showResult');
    document.getElementById('showOutput').removeChild(temp);
  }
}

function resetDraw()
{
  //drawmatch result
  if (document.getElementById('drawResult'))
  {
    var temp = document.getElementById('drawResult');
    document.getElementById('drawOutput').removeChild(temp);
  }
}

function resetScan()
{
 //scanDatabase result
  if (document.getElementById('scanResult'))
  {
    var temp = document.getElementById('scanResult');
    document.getElementById('scanOutput').removeChild(temp);
  }
}


// [1] UPLOAD AJAX
function postUpload ()
{
  resetFull();
  var http = new XMLHttpRequest();
  var form = new FormData();
  var url = "upload.php";
  var file = document.getElementById("fileToUpload").files[0];
  form.append("fileToUpload", file);

  http.open("POST", url, true);
  http.send(form);

  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200)
    {
      var data = http.responseText;

      if (!(data.includes("error")) && !(data.includes("Sorry")))  
      {
         var upload = document.createElement("img");
         var name = document.createElement("div");
         name.id = "uploadName";
         upload.id = "upload";
         upload.style.height = "300px";
         upload.src = http.responseText + "?" + Date.now();
         document.getElementById("uploadDiv").appendChild(upload);
         document.getElementById("uploadDesc").innerHTML = "success!";
         document.getElementById("uploadDiv").appendChild(name);
         name.innerHTML = http.responseText;
      }
      else 
      {
         document.getElementById("uploadDesc").innerHTML = "fail: " + data ;
      }
    }
  }
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
  resetShow();


  // Parameters
  var paramFile = "";
  var imgFile = "";
  var outputFile = "";

  if (document.getElementById('ebba').checked) {
    paramFile = "/var/www/vhost/ds.lib.ucdavis.edu/htdocs/archv/jetty/ballad_param";
  }
  if (document.getElementById('flickr').checked) {
    paramFile = "/var/www/vhost/ds.lib.ucdavis.edu/htdocs/archv/jetty/flickr_param";
  }

  imgFile = '.' + document.getElementById('uploadName').innerHTML;
  outputFile = "/var/www/vhost/ds.lib.ucdavis.edu/htdocs/archv/outputs/output.jpg"; 

  var params = "input=" + imgFile + "&output=" + outputFile + "&param=" + paramFile;
  var http = new XMLHttpRequest();
  var url = "showkeypoints.php";
  console.log(imgFile);
  console.log(outputFile);
  console.log(paramFile);

  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200) 
    {
	console.log(http.responseText);
        /*var data = JSON.parse(http.responseText);
        if ( http.responseText.includes("file")) 
        {
          console.log(data);
          var file = "";
          var file = data["file"];
	  var temp = file.split('/');
	  var fname = temp[2];
          var result = document.createElement("img");
          result.id = "showResult";
          result.style.height = "300px";
          result.src = outputFile + "?t=" + new Date().getTime();
          document.getElementById("showOutput").appendChild(result);
        }
        else 
        {
          console.log(data);
        }
	*/
    }
  }
  http.send(params);

}

function postScanRequest () 
{
  // Parameters
  var imgFile = "";
  var imageSet = "";
  var keypoints = "";
  var outputFile = "";
  var paramFile = "";
  outputFile = "../outputs/output.txt";

  imgFile = '.' + document.getElementById('uploadName').innerHTML;
  if (document.getElementById('ebba').checked) {
    paramFile = "ballad_param";
    imageSet = "/home/arthur/imagesets/ballads/";
    keypoints = "/home/arthur/keypoints/ballads/";
  }
  if (document.getElementById('flickr').checked) {
    paramFile = "flickr_param";
    imageSet = "/home/arthur/imagesets/BL-flickr/Smaller/";
    keypoints = "/home/arthur/keypoints/bl-flickr/";
  }



  var params = "input=" + imgFile + "&imageset=" + imageSet + "&keypoints=" + keypoints + "&output=" + outputFile + "&param=" + paramFile;


  var http = new XMLHttpRequest();
  var url = "scandatabase.php";
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200) 
    {
        console.log(http.responseText);
        var data = JSON.parse(http.responseText);
        loadresult(data["file"]);
    }
  }

  http.send(params);
}

function postDrawRequest () 
{
  resetDraw();
  var http = new XMLHttpRequest();
  var url = "drawkeypoints.php";
  var params = "input1=seed.jpg&input2=seed.jpg&output=../outputs/output.jpg&param=flickr_param";
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200) 
    {
        var data = JSON.parse(http.responseText);
        var file = data["file"];
        var result = document.createElement("img");
        result.id = "drawResult";
        result.src = "../jetty/" + file + "?" + Date.now();
        document.getElementById("drawOutput").appendChild(result);
    }
  }

  http.send(params);
}

function loadresult(path)
{
  var url = "../jetty/" + path;
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.send();

  oReq.onreadystatechange = function() {
    if (oReq.readyState == 4 && oReq.status == 200) {
      var data = JSON.parse(oReq.responseText);
      var path = data["path"];
      var files = data["files"];
      console.log(data);
      var table = document.getElementById("scanTable");
      for (var i in files)
      {
        row = table.rows[0];
        var x = row.insertCell(0);
        var temp = document.createElement("img");
        temp.src = path + files[i]["name"];
        x.appendChild(temp);
        x.style.height =  "150px";
        x.style.width =  "150px";
        x.style.border =  "1px solid #333";
      }

    }
  }
}
