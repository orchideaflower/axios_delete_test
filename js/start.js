let $init = true;
let $win_width = $(window).width();
let $delayInMilliseconds = 500;
let $status_ongoing = "folyamatban";
let $status_waiting = "várakozik ";
let $status_aborted = "megszakított";

// document.getElementById("meres1").aktiv = true;
// document.getElementById("meres2").aktiv = false;
// document.getElementById("meres3").aktiv = false;

$(document).ready(function () {
  $.ajax({
    type: 'GET',
    url: "http://localhost:3000/testedPorts",
    dataType: 'json',
    success: function (data) {
      let $theportCells = new Array();
      $theportCells.push("<tr>");
      gData = data;
      $.each(data, function (key, portValue) {
        if (($win_width < 960) && (key == 9)) {
          $theportCells.push(
            '<td align="center" style="width:4%" bgcolor="#b3d0e2">' + portValue.portNumber + "</td>"
          );
          $theportCells.push('</tr><tr>');
        } else {
          $theportCells.push(
            '<td align="center" style="width:4%" bgcolor="#b3d0e2">' + portValue.portNumber + "</td>"
          );
        }
      });
      $theportCells.push("</tr>");
      $("#theBody").html($theportCells);
    },
    error: onerror,
  });

  // document.addEventListener("DOMContentLoaded", function () {
  if ($init) {
    $("#meress1").html($status_ongoing);
    $("#meress2").html($status_waiting);
    $("#meress3").html($status_waiting);
    $("#meress4").html($status_waiting);
    // document.getElementById("meress1").innerHTML = $status_ongoing;
    // document.getElementById("meress2").innerHTML = $status_waiting;
    // document.getElementById("meress3").innerHTML = $status_waiting;
    // document.getElementById("meress4").innerHTML = $status_waiting;
    $init = false;
  }
});

$(function run_meres(start_id) {
  // start_id mérés elindítása
});

// $(function stop_meres(stop_id) {  local function
function stop_meres(stop_id) {

  if (stop_id == "stop1") {
    $("#meress1").html($status_aborted);
    $("#stop1").prop("disabled", true);
    $("#meress2").html($status_ongoing);
  } else if (stop_id == "stop2") {
    $("#meress2").html($status_aborted);
    $("#stop2").prop("disabled", true);
    $("#meress3").html($status_ongoing);
  } else if (stop_id == "stop3") {
    $("#meress3").html($status_aborted);
    $("#stop3").prop("disabled", true);
    $("#meress4").html($status_ongoing);
  } else if (stop_id == "stop4") {
    $("#meress4").html($status_aborted);
    $("#stop4").prop("disabled", true);
  }
};
// setTimeout(stop_meres, $delayInMilliseconds);

// document.addEventListener('DOMContentLoaded', function () {
//   document.getElementById("#meres1").outerText("status: " + $running);
// document.getElementById("#meres1").innerHTML("status: " + $running);
// });

$(function () {
  // elemek összegyűjtése
  let $progressBar = $(".progress-bar");
  let $input = $('input[type="number"]');

  // input változásra kell a progressBar értéknek változnia
  $input.change(function () {
    // kérjük le a %-ot
    let percent = $input.val(); //  visszadja az értéket

    // állítsuk be a progress bart
    $progressBar.text(percent + "%");
    $progressBar.css("width", percent + "%");
    $progressBar.attr("aria-valuenow", percent);
  });
});