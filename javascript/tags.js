// October 13, 2017                      Arthur Koehl
// function to take in a json file send to php
// gettags.php
// php decodes file connects with db, finds all the tags and returns them
// this puts all the tags into a result div
//


function postTagsRequest (path) 
{

  var http = new XMLHttpRequest();
  var url = "./php/gettags.php";
  http.open("POST", url, true);
  var param ="path=" + path;

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function ()
  {
    if (http.readyState == 4 && http.status == 200) 
    {
        data = JSON.parse(http.responseText);
        console.log(data);
        //for now just display the first element in the returned object, eventually can put in a check to see if there are any differences ...
        //can also put tags below each image ...
        if (data[0]) 
        {
          box = document.getElementById("tagDiv");
          title = document.createElement("h2");
          genre = document.createElement("div");
          tags = document.createElement("div");
          
          title.innerHTML = "Predicted Tags:";
          genre.innerHTML = "Genre: " + data[0]["genre"];
          tags.innerHTML = "Tags: " + data[0]["tags"][0];
          box.appendChild(title);
          box.appendChild(genre);
          box.appendChild(tags);
        }
        else
        {
          console.log("error in parsing json return of tags");
        }
    }
  }

  http.send(param);
}

