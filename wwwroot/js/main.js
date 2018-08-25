$(document).ready(function() {
  $("#data").DataTable({
    "iDisplayLength": 500
  });
  //.on('change','.backlink-update',(function (e) {
  $(".datatable").on("click", ".remove", function(e) {
    if (!confirm("Are You Sure You Want To Remove This Player?")) {
      e.preventDefault();
      return;
    }
    let row = $(this)
      .parent()
      .parent();
    let playerName = getPlayerName(row);
    row.addClass("hide hidden");
    addToDrafted(playerName);
    incrementCurrentPick();
  });
  $(".datatable").on("click", ".add", function(e) {
    if (!confirm("Are You Sure You Want To Add This Player?")) {
      e.preventDefault();
      return;
    }
    let row = $(this)
      .parent()
      .parent();
    let playerName = getPlayerName(row);
    let position = row[0].cells[2].innerText;

    let success = ProcessPlayer(position, playerName);
    if (success) {
      addToDrafted(playerName);
      row.addClass("hide hidden");
      incrementCurrentPick();
    }
  });

  function getPlayerName(elem) {
    // select row
    let row = elem;
    // select a element with player-name
    let playerName = row[0].cells[1].innerText;
    // figure out what position it is
    let position = row[0].cells[2].innerText;
    // get current pick
    let pickNumber = getCurrentPickNumber();
    playerName =
      playerName +
      `<span class="label label-danger">#${pickNumber} overall</span>`;
      return playerName; 
  }

  function ProcessPlayer(position, playerName) {
    let qbType = "QB";
    let rbType = "RB";
    let dstType = "DST";
    let wrType = "WR";
    let teType = "TE";
    if (position.includes(qbType)) AddToRoster(playerName, qbType);
    if (position.includes(rbType)) AddToRoster(playerName, rbType);
    if (position.includes(dstType)) AddToRoster(playerName, dstType);
    if (position.includes(wrType)) AddToRoster(playerName, wrType);
    if (position.includes(teType)) AddToRoster(playerName, teType);
    return true;
  }

  function AddToRoster(playerName, playerType) {
    let playerList = $(`#${playerType}-list`);
    playerList.append(`<li>${playerName}</li>`);
    let playerCountElem = $(`#${playerType}-count`);
    playerCountElem[0].innerText = playerList[0].children.length;
  }

  function getCurrentPickNumber() {
    let currPickElem = $("#current-pick")[0];
    let currPick = +currPickElem.innerText;
    return currPick;
  }
  function incrementCurrentPick() {
    let currPickElem = $("#current-pick")[0];
    let currPick = getCurrentPickNumber();
    currPick = currPick + 1;
    currPickElem.innerText = currPick;
    setPlayerValues();
  }
  function addToDrafted(playerName) {
    let draftOrder = $("#drafted-order");
    draftOrder.append(`<li>${playerName}</li>`);
  }

  function setPlayerValues(){
    var rows = $('#data > tbody > tr')
    let currPick = getCurrentPickNumber();
    for(let i = 0; i < rows.length; i++){
      let elem= rows[i];
      let td = elem.children[9];
      let val = +td.innerText;
      if(val > currPick) $(td).html(`<span class="label label-danger">${val}</span>`);
      if(val < currPick) $(td).html(`<span class="label label-success">${val}</span>`);
    }
  }


});



$(window).bind("beforeunload", function() {
  return ">>>>>Before You Go<<<<<<<< \n Your custom message go here";
});
