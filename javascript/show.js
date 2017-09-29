// September 21, 2017                      Arthur Koehl

function resetShow ()
{
  if (document.getElementById('showResult'))
  {
    var temp = document.getElementById('showResult');
    document.getElementById('showOutput').removeChild(temp);
  }
}

function postShowRequest () 
{
  resetShow();

// ====================================================================================
// Parameters
// ====================================================================================
  var paramFile = "ballad_param";
  var imgFile = "../sample/21889-30.jpg";
  var outputFile = "../outputs/output.jpg"; 
  var params = "input=" + imgFile + "&output=" + outputFile + "&param=" + paramFile;

// ====================================================================================
// Generate and Send Request
// ====================================================================================
  var http = new XMLHttpRequest();
  var url = "../php/showkeypoints.php";

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
        /*var data = JSON.parse(http.responseText);
        if ( http.responseText.includes("file")) 
        {
          console.log(data);
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
    } // if response code and status are correct
  }// callback function on response
}
