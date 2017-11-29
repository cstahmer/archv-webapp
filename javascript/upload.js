// September 4, 2017                      Arthur Koehl
// Upload an image through upload.php
function postUpload ()
{
  // ========================================================
  // request 
  // ========================================================
  var http = new XMLHttpRequest();
  var form = new FormData();
  var url = "./php/upload.php";

  // parameters
  var file = document.getElementById("fileToUpload").files[0];
  form.append("fileToUpload", file);

  // open and send request
  http.open("POST", url, true);
  http.send(form);

  // ========================================================
  // callback 
  // ========================================================
  http.onreadystatechange = function uploadCallback ()
  {
    if (http.readyState == 4 && http.status == 200)
    {
      var data = http.responseText;

      if (!(data.includes("error")) && !(data.includes("Sorry")))  
      {
         var upload = document.createElement("img");
         var name = document.createElement("p");
         name.id = "uploadName";
         upload.id = "upload";
         upload.style.width = "300px";
         upload.src = "./uploads/" + http.responseText + "?" + Date.now();
         name.innerHTML = http.responseText;

         document.getElementById("uploadDiv").innerHTML = "";
         document.getElementById("showOutput").innerHTML = "";
         document.getElementById("uploadDiv").appendChild(upload);
         postIndexShowRequest();
      } // if

      else 
      {
         document.getElementById("uploadDesc").innerHTML = "fail: " + data ;
      } // else

    } // if call okay
  }//callback
} //upload


// POSTINDEXSHOWREQUEST()

function postIndexShowRequest () 
{
// ====================================================================================
// Parameters
// ====================================================================================
  var paramFile = "ballad_param";
  imgfile = document.getElementById("upload").src;
  full = imgfile.split('?')[0];
  temp = full.split('/');
  var imgFile = "../uploads/" + temp[temp.length - 1];
  var outputFile = "../outputs/output.jpg"; 


  if ( document.querySelector('input[name=imageset]:checked').value == "BL-flickr")
  {
    imageSet = "../images/flickr/";
    keypoints = "../../../include/BL-flickr/Keypoints_10_2017/";
    paramFile = "flickr_param";
   }// if flickr
  var params = "input=" + imgFile + "&output=" + outputFile + "&param=" + paramFile;

// ====================================================================================
// Generate and Send Request
// ====================================================================================
  var http = new XMLHttpRequest();
  var url = "./php/showkeypoints.php";

  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.send(params);

// ====================================================================================
// CallBack Function
// ====================================================================================
  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200) 
    {
        console.log(http.responseText);
        var data = JSON.parse(http.responseText);
        if ( http.responseText.includes("file")) 
        {
          var file = data["file"];
      	  var temp = file.split('/');
      	  var fname = temp[2];
          var result = document.createElement("img");
          result.id = "showResult";
          result.style.width = "300px";
          result.src = "./outputs/output.jpg"+ "?t=" + new Date().getTime();
          document.getElementById("showOutput").innerHTML = "";
          document.getElementById("showOutput").appendChild(result);
        }
        else 
        {
          console.log(data);
        }
    } // if response code and status are correct
  }// callback function on response
}
