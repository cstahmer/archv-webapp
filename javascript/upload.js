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
         upload.style.width = "500px";
         upload.src = "../../archvjetty/archv_webapp/uploads/" + http.responseText + "?" + Date.now();
         name.innerHTML = http.responseText;

         document.getElementById("uploadDiv").appendChild(upload);
         document.getElementById("uploadDesc").innerHTML = "success!";
         document.getElementById("uploadDesc").appendChild(name);
      } // if

      else 
      {
         document.getElementById("uploadDesc").innerHTML = "fail: " + data ;
      } // else

    } // if call okay
  }//callback
} //upload
