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

  $(".input-cell").click(function (event) {
    if (event.ctrlKey) {
      let [rowId, colId] = getRowCol(this);
      if (rowId > 1) {
        let topCellSelected = $(`#row-${rowId - 1}-col-${colId}`).hasClass("selected");
        if (topCellSelected) {
          $(this).addClass("top-cell-selected");
          $(`#row-${rowId - 1}-col-${colId}`).addClass("bottom-cell-selected");
        }
      }
      if (rowId < 100) {
        let bottomCellSelected = $(`#row-${rowId + 1}-col-${colId}`).hasClass("selected");
        if (bottomCellSelected) {
          $(this).addClass("bottom-cell-selected");
          $(`#row-${rowId + 1}-col-${colId}`).addClass("top-cell-selected");
        }
      }
      if (colId > 1) {
        let leftCellSelected = $(`#row-${rowId}-col-${colId - 1}`).hasClass("selected");
        if (leftCellSelected) {
          $(this).addClass("left-cell-selected");
          $(`#row-${rowId}-col-${colId - 1}`).addClass("right-cell-selected");
        }
      }
      if (colId < 100) {
        let rightCellSelected = $(`#row-${rowId}-col-${colId + 1}`).hasClass("selected");
        if (rightCellSelected) {
          $(this).addClass("right-cell-selected");
          $(`#row-${rowId}-col-${colId + 1}`).addClass("left-cell-selected");
        }
      }
      $(this).addClass("selected");
    } else {
      $(".input-cell.selected").removeClass([
        "selected",
        "top-cell-selected",
        "left-cell-selected",
        "right-cell-selected",
        "bottom-cell-selected",
      ]);
      $(this).addClass("selected");
    }
    // bold class add remove
    if ($(this).hasClass("bold-selected")) {
      $(".icon-bold").addClass("selected");
    } else {
      $(".icon-bold").removeClass("selected");
    }

    // italic class add remove
    if ($(this).hasClass("italic-selected")) {
      $(".icon-italic").addClass("selected");
    } else {
      $(".icon-italic").removeClass("selected");
    }

    // underline class add remove
    if ($(this).hasClass("underline-selected")) {
      $(".icon-underline").addClass("selected");
    } else {
      $(".icon-underline").removeClass("selected");
    }

    // strike through class add remove
    if ($(this).hasClass("strike-selected")) {
      $(".icon-strike").addClass("selected");
    } else {
      $(".icon-strike").removeClass("selected");
    }
  });

  $(".input-cell").dblclick(function () {
    $(".input-cell.selected").removeClass("selected");
    $(this).addClass("selected");
    $(this).attr("contenteditable", "true");
    $(this).focus();
  });

  $(".input-cell").blur(function () {
    $(".input-cell.selected").attr("contenteditable", false);
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

function getRowCol(thisElement) {
  let idArray = $(thisElement).attr("id").split("-");
  let rowId = parseInt(idArray[1]);
  let colId = parseInt(idArray[3]);
  return [rowId, colId];
}

function updateCell(property, value) {
  $(".input-cell.selected").each(function () {
    $(this).css(property, value);
  });
}

// bold class add remove
$(".icon-bold").click(function () {
  if ($(this).hasClass("selected")) {
    $(".input-cell.selected").removeClass("bold-selected");
    updateCell("font-weight", "");
  } else {
    $(".input-cell.selected").addClass("bold-selected");
    updateCell("font-weight", "bold");
  }
});

// italics class add remove
$(".icon-italic").click(function () {
  if ($(this).hasClass("selected")) {
    $(".input-cell.selected").removeClass("italic-selected");
    updateCell("font-style", "");
  } else {
    $(".input-cell.selected").addClass("italic-selected");
    updateCell("font-style", "italic");
  }
});

// underline class add remove
$(".icon-underline").click(function () {
  if ($(this).hasClass("selected")) {
    $(".input-cell.selected").removeClass("underline-selected");
    updateCell("text-decoration", "");
  } else {
    $(".input-cell.selected").addClass("underline-selected");
    updateCell("text-decoration", "underline");
    if ($(".input-cell.selected").hasClass("strike-selected")) {
      $(".input-cell.selected").removeClass("strike-selected");
      $(".icon-strike").removeClass("selected");
    }
  }
});

// strike through class add remove
$(".icon-strike").click(function () {
  if ($(this).hasClass("selected")) {
    $(".input-cell.selected").removeClass("strike-selected");
    updateCell("text-decoration", "");
  } else {
    $(".input-cell.selected").addClass("strike-selected");
    updateCell("text-decoration", "line-through");
    if ($(".input-cell.selected").hasClass("underline-selected")) {
      $(".input-cell.selected").removeClass("underline-selected");
      $(".icon-underline").removeClass("selected");
    }
  }
});
