<!doctype html>
<html>
<head>
  <title> Gallery PHP: display images in text file </title>
</head>

<body>

<?php
// ============================================================================
// CONFIGURATION
// ============================================================================
$path2images = "";
$inputfile = "test.csv";
$all_lines = 1;
$score = 1; //if 0 there are no scores will only be tsv format
$format = "csvA"; //can be csvA, csvB, json, tsv
//examples of the formats:
//csvA: fname, fname 12, fname1 11, fname2 8 ...
//csvB: fname 12, fname1 11, fname2 8 ...
//tsv: fname 12 fname1 11 fname2 8 ...
//json: {"path":"../../../include/Ballads/Images/", "files":[{"name":"30182-30","distance":315},{"name":"30169-20","distance":7}]}



// ============================================================================
// PARSE FUNCTIONS
// ============================================================================

function process_line($line, $format, $score, $images, $scores)
{
  global $images;
  global $scores;

  if ($format =="csvA")
  {
    $exploded = explode(",", $line);

    for ($x = 0; $x < count($exploded); $x++)
    {
      if ($x == 0)
        continue; //itself no score
      else 
      {
        $exp = explode(" ", $exploded[$x]);
        array_push($images, $exp[0]);
        array_push($scores, $exp[1]);
      }// else x >= 1
    }//for
  }//if csvA

  else if ($format =="csvB")
  {
    $exploded = explode(",", $line);

    for ($x = 0; $x < count($exploded); $x++)
    {
      $exp = explode(" ", $exploded[$x]);
      array_push($images, $exp[0]);
      array_push($scores, $exp[1]);
    }//for
  }//if csvB

  else if ($format =="tsv")
  {
    if ($score == 0)
    {
      $exploded = explode(" ", $line);
      for ($x = 0; $x < count($exploded); $x++)
      {
        array_push($images,$exploded[$x]); 
      }//for each element
    }//no score
    else 
    {
      $exploded = explode(" ", $line);
      //names
      for ($x = 0; $x < count($exploded); $x+=2)
      {
        array_push($images,$exploded[$x]);
      }//for
      //scores
      for ($x=1; $x < count($exploded); $x+=2)
      {
        array_push($scores,$exploded[$x]);
      }//for
    }//score
  }//if tsv
      
  else if ($format =="json")
  {
    $json = json_decode($line, true);
    $num = (count($json["files"]));
    for ($x=0; $x<$num; $x++)
    {
      array_push($images, $json["files"][$x]["name"]);
      array_push($scores, $json["files"][$x]["distance"]);
    }

  }//if json
}//parse_line function

// ============================================================================
// OPEN FILE AND READ LINE(s)
// PARSE THE TEXT 
// STORE IN $images and $scores
// ============================================================================
$images = array();
$scores = array();

if ($all_lines == 0)
{
  $handle = fopen($inputfile, "r");
  $line = fgets($handle);
  process_line($line, $format, $score, $images, $scores);
}//one line
else 
{
  $lines = file($inputfile, FILE_IGNORE_NEW_LINES);
  foreach($lines as $line)
  {
    process_line($line, $format, $score, $images, $scores);
  }
}//many lines

// ============================================================================
// PRINT RESULTS
// ============================================================================

//only print images
if ($score == 0)
{
  foreach ($images as $img)
  {
    echo ("<p>".$img."</p>");
  }
}//no score

else 
{
  $count = count($images);
  for ( $x = 0; $x < $count; $x++)
  {
    echo ("<p>".$images[$x].":  ".$scores[$x]."</p>");
  }
}//else


?>
<body>




