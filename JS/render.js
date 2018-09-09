var COL = 8
var SIZE_CELL = 50;
var SIZE_BOARD = COL * SIZE_CELL;
var COLOR_LINE = "#f0f0f0";
var COLOR_BOARD = "#00710b";
var COLOR_WHITE = "#ffffff"
var COLOR_BLACK = "#000000"
var canvas = document.getElementById("board");
var ctx = canvas.getContext('2d');


onload = function() {
  st = objCopy(init_state);
  render();
};

var txt_turn = {
  1:"●",
  0:"○"
};

var init_state = {
  map: [[9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, -1, 1, 0, 0, 0, 9],
  [9, 0, 0, 0, 1, -1, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]],
  turn: 1, //黒
  putmap: [[9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 0, 0, 0, 0, 0, 0, 0, 0, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9]],
  black: 2,
  white: 2,
  canput: 0,
};

function render(){
  drawBoard();
  drawAllCircle();
  CanPutPlace();
  drawCanPut();
  st.canput = HowManyCanPut();
  st.black = HowMany(1);
  st.white = HowMany(-1);
  document.getElementById("turn").innerText = "次: " + txt_turn[(st.turn+1)/2];
  document.getElementById("black").innerText = "●: " + st.black;
  document.getElementById("white").innerText = "○: " + st.white;
  document.getElementById("end").innerText = ""
}

function drawBoard(){

  ctx.fillStyle = COLOR_BOARD;
  ctx.beginPath();
  ctx.fillRect(0, 0, SIZE_BOARD, SIZE_BOARD);

  for (var x = 0; x < COL; x++) {
    ctx.strokeStyle = COLOR_LINE;
    ctx.beginPath();
    ctx.strokeRect(x * SIZE_CELL, 0, SIZE_CELL, SIZE_BOARD);
  }
  for (var y = 0; y < COL; y++) {
    ctx.strokeRect(0, y * SIZE_CELL, SIZE_BOARD, SIZE_CELL);
  }
}

function drawAllCircle(){

  for (var y = 1; y <= COL; y++) {
    for (var x = 1; x <= COL; x++) {
      if (st.map[y][x]!=0){
        drawCircle(x, y, st.map[y][x])
      }
    }
  }
}

function drawCircle(x, y, bw){

  if (bw==-1){
    ctx.fillStyle = COLOR_WHITE;
  }else if(bw==1){
    ctx.fillStyle = COLOR_BLACK;
  }
  ctx.beginPath();
  ctx.arc((x-1/2)*SIZE_CELL, (y-1/2)*SIZE_CELL, SIZE_CELL/2-5, 0, 2*Math.PI, true);
  ctx.fill();
}

function drawCanPut(){

  for (var y = 1; y <= COL; y++) {
    for (var x = 1; x <= COL; x++) {
      if (st.putmap[y][x]==1){
        ctx.fillStyle = "#fff500";
        ctx.beginPath();
        ctx.arc((x-1/2)*SIZE_CELL, (y-1/2)*SIZE_CELL, SIZE_CELL/2-20, 0, 2*Math.PI, true);
        ctx.fill();
      }
    }
  }
}

function objCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}
