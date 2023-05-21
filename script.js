$(document).ready(function () {
  var contents = $(".spreadsheetname").html();
  let cellContainer = $(".input-cell-container");
  for (let i = 1; i <= 100; i++) {
    let ans = "";

    let n = i;

    while (n > 0) {
      let rem = n % 26;
      if (rem == 0) {
        ans = "Z" + ans;
        n = Math.floor(n / 26) - 1;
      } else {
        ans = String.fromCharCode(rem - 1 + 65) + ans;
        n = Math.floor(n / 26);
      }
    }

    let column = $(`<div class="column-name colId-${i}" id="colCod-${ans}">${ans}</div>`);
    $(".column-name-container").append(column);
    let row = $(`<div class="row-name" id="rowid-${i}">${i}</div>`);
    $(".row-name-container").append(row);
  }

  for (let i = 1; i <= 100; i++) {
    let myrow = $(`<div class="cell-row"></div>`);
    for (let j = 1; j <= 100; j++) {
      let colCode = $(`.colId-${j}`).attr("id").split("-")[1];
      let mycol = $(
        `<div class="input-cell" id="row-${i}-col-${j}" data="code-${colCode}" contenteditable="false" spellcheck="false"></div>`
      );
      myrow.append(mycol);
    }
    $(".input-cell-container").append(myrow);
  }

  $(".alignment-icon").click(function () {
    $(".alignment-icon.selected").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".style-icons").click(function () {
    $(this).toggleClass("selected");
  });

  $(".input-cell").click(function () {
    $(".input-cell.selected").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".input-cell").dblclick(function () {
    $(".input-cell.selected").removeClass("selected");
    $(this).addClass("selected");
    $(this).attr("contenteditable", "true");
    $(this).focus();
  });

  $(".input-cell-container").scroll(function () {
    $(".column-name-container").scrollLeft(this.scrollLeft);
    $(".row-name-container").scrollTop(this.scrollTop);
  });

  $(".input-cell").click(function () {
    var rowNum = $(this).attr("id").split("-")[1];
    var colNum = $(this).attr("data").split("-")[1];
    $(".selected-cell-text").html(colNum + "" + rowNum);
  });

  $(".spreadsheetname").blur(function () {
    if (contents != $(this).html()) {
      $(document).prop("title", $(this).html() + " - Google Sheets");
      contents = $(this).html();
    }
  });
});
