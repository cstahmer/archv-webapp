<?php

// SUBMIT TO PHP FILE, LOCATION OF OUTPUT FILE WITH JSON
$path = $_POST["path"];

// ========================================================
// SQL CREDENTIALS
// ========================================================

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "ebbasite";

// ========================================================
// CONNECT TO THE DATABASE: using credentials  
// ========================================================
$link = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

// ========================================================
// READ OUTPUT FILE FROM SCANDB AND GET ALL THE IMG NAMES 
// ========================================================
$file = file_get_contents($path);
$files = json_decode($file, true);
$images = [];

foreach ($files as $key => $row)
{
  foreach ($row as $key2 => $val)
  {
    array_push($images, $val["name"]);
  }
}

// ========================================================
// FOR ALL THE IMAGES: append all the tags in json, return
// ========================================================
$all_tags = array();
$all_cats = array();
$genre_terms = array();
$image_names = array();
foreach ($images as $name)
{
  $imgname = $name.".jpg";
  array_push($image_names, $imgname);

  $bid_result = $link->query("SELECT * FROM bia_impressions where BIA_IMP_File = '$imgname'");
  if ($bid_result)
  {
    while($row = $bid_result->fetch_assoc())
    { 
      $bid = $row["BIA_IMP_ID"];
    }
    //   use bid to get BIA_IGT_BGT_ID from bia_impGenreTerms
    $gtid_result = $link->query("SELECT * FROM bia_impGenreTerms where BIA_IGT_IMP_ID = '$bid'");
    if ($gtid_result) {
      while($row = $gtid_result->fetch_assoc())
      {
        $gtid = $row["BIA_IGT_BGT_ID"];
      }
    }//if gtid result

    // [3] for each genretermid get the term from bia_genreTerms
    $gt_result = $link->query("SELECT * FROM bia_genreTerms where BIA_BGT_ID = '$gtid'");
    if ($gt_result) {
      while($row = $gt_result->fetch_assoc())
      {
        $gt = $row["BIA_BGT_Term"];
      }
    }// if gt result


    //  get descid (BIA_IDT_DT_ID) from bia_impDescriptiveTags
    $descid_result = $link->query("SELECT * FROM bia_impDescriptiveTags where BIA_IDT_IMP_ID = '$bid'");
    if ($descid_result) {
      $descids = array();
      while($row = $descid_result->fetch_assoc())
      {
        $temp = $row['BIA_IDT_DT_ID'];
        array_push($descids, $temp);
      }
    }//if descid result

    //for each descid get the tag and CategoryID
    $tags = array();
    $cats = array();
    $catids = array();
    for ($x = 0; $x < count($descids); $x++) {
      $descid = $descids[$x];
      $tag_result = $link->query("SELECT * FROM bia_descriptiveTags where BIA_DT_ID = '$descid'");
      if ($tag_result) {
        while($row = $tag_result->fetch_assoc())
        {
          $temp = $row['BIA_DT_Tag'];
          array_push($tags, $temp);
        }//while
      }//if

      $catid_result = $link->query("SELECT * FROM bia_descriptiveTagsTagCats where BIA_DTTC_DT_ID = '$descid'");
      if ($catid_result) {
        while($row = $catid_result->fetch_assoc())
        {
          $temp = $row['BIA_DTTC_DTC_ID'];
          array_push($catids, $temp);
        }//while
      }//if
    }//for
    for ($x = 0; $x < count($catids); $x++) {
      $catid = $catids[$x];
      $cat_result = $link->query("SELECT * FROM bia_descriptiveTagCats where BIA_DTC_ID = '$catid'");
      if ($cat_result) {
        while($row = $cat_result->fetch_assoc())
        {
          $temp = $row['BIA_DTC_Cat'];
          array_push($cats, $temp);
        }//while
      }//if
    }//for

    //STORE RESULTS:
    // need Genre Term for image (1 per), then tags (many) and categories (as many)
    // $gt, array $tags, array $cats;

    array_push($genre_terms, $gt);
    array_push($all_tags, $tags);
    array_push($all_cats, $cats);

  }//if bid result
}//foreach

// PASS BACK AS JSON
$images = array();
for ($i = 0; $i < count($image_names); $i++)
{
  $images[$i]["name"] = $image_names[$i];
  $images[$i]["genre"] = $genre_terms[$i];
  $images[$i]["tags"] = $all_tags;
  $images[$i]["cats"] = $all_cats;
}//for each image

$output = json_encode($images);
echo ($output);

mysqli_close();
?>
