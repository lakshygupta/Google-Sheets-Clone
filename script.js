$(document).ready(function () {
  let cellContainer = $(".input-cell-container");
  for (let i = 1; i <= 200; i++) {
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

  for (let i = 1; i <= 200; i++) {
    let myrow = $(`<div class="cell-row"></div>`);
    for (let j = 1; j <= 200; j++) {
      let colCode = $(`.colId-${j}`).attr("id").split("-")[1];
      let mycol = $(
        `<div class="input-cell" id="row-${i}-col-${j}" data="code-${colCode}" contenteditable="true" spellcheck="false"></div>`
      );
      myrow.append(mycol);
    }
    $(".input-cell-container").append(myrow);
  }
});
