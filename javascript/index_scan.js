// October 10, 2017                      Arthur Koehl
// The scan code that is used by the call from index.html. Since the relative paths will be different 
// between index.html and try.html
//

function resetScan()
{
 //scanDatabase result
  if (document.getElementById('scanTable'))
  {
    var temp = document.getElementById('scanTable');
    temp.innerHTML = "";
  }
}

function postScanRequest () 
{
  var Status = document.getElementById("status");
  Status.innerHTML = "started the search";
  // Parameters
  var imgFile = "";
  var imageSet = "";
  var keypoints = "";
  var outputFile = "";
  var paramFile = "";
  outputFile = "../outputs/outputScan.txt";

  imgfile = document.getElementById("upload").src;
  full = imgfile.split('?')[0];
  temp = full.split('/');
  imgFile = "../uploads/" + temp[temp.length - 1];
  imageSet = "../images/ballads/";
  keypoints = "../../../include/Ballads/Keypoints_10_2017/";
  paramFile = "ballad_param";

  if ( document.querySelector('input[name=imageset]:checked').value == "BL-flickr")
  {
    imageSet = "../images/flickr/";
    keypoints = "../../../include/BL-flickr/Keypoints_10_2017/";
    paramFile = "flickr_param";
  }//if flickr

  var params = "input=" + imgFile + "&imageset=" + imageSet + "&keypoints=" + keypoints + "&output=" + outputFile + "&param=" + paramFile;

  var http = new XMLHttpRequest();
  var url = "./php/scandatabase.php";
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200) 
    {
        var data = JSON.parse(http.responseText);
        loadresult(data.file);
        if ( !(document.querySelector('input[name=imageset]:checked').value == "BL-flickr"))
        {
          postTagsRequest(outputFile);
        }//if ebba
    }// if good response
  } // callback

  http.send(params);
}

function loadresult(path)
{
  var url = "http://ds.lib.ucdavis.edu/archv/" + path.slice(2);
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.send();
  Status = document.getElementById("status");

  oReq.onreadystatechange = function() {
    if (oReq.readyState == 4 && oReq.status == 200) {
      var data = JSON.parse(oReq.responseText);
      var path = data["path"];
      var files = data["files"];
      var table = document.getElementById("scanResult");

      for (var i in files)
      {
        var res = document.createElement("div");
        var img = document.createElement("img");
        var desc = document.createElement("div");

        res.style.width =  "300px";
        res.style.marginRight =  "10px";
        res.style.marginBottom =  "10px";
        res.style.marginTop =  "10px";
        res.style.marginLeft =  "0px";

        img.src = "/archv/" + path.slice(3) + files[i]["name"] + ".jpg";
        img.style.width =  "300px";

        desc.innerHTML = "<center>" + files[i]["name"] + "<br><i>matches: " +files[i]["distance"] + "</i></center>";
        desc.style.height =  "50px";
        desc.style.overflow= "hidden";
        desc.style.display= "block";
        desc.style.textOverflow =  "ellipsis";
        desc.style.whiteSpace =  "nowrap";

        res.appendChild(img);
        res.appendChild(desc);
        table.appendChild(res);
      }
    Status.innerHTML = "";
    if (files.length == 0) {
      e = document.getElementById("error");
      e.innerHTML = "no matches found for this image";
    }

    }
  }
}
