canvas.onclick = function(e) {
  // クリック位置の座標計算（canvasの左上を基準）
  var rect = e.target.getBoundingClientRect();
  mx = e.clientX - Math.floor(rect.left);
  my = e.clientY - Math.floor(rect.top);

  mapx = Math.ceil(mx/SIZE_CELL);
  mapy = Math.ceil(my/SIZE_CELL);
  //alert(mapx)
  Select(mapx, mapy);
  render();
  if (st.canput == 0){
    st.turn *= -1;
    render();
    if (st.canput == 0){
      document.getElementById("end").value = WhichWin();
    }else{
      document.getElementById("end").value = "Pass!";
    }
  }
}
function WhichWin(){
  var comment = ""
  if (st.black > st.white){
    comment = "Winner:Black";
  }else if (st.black < st.white){
    comment = "Winner:White";
  }else {
    comment = "Draw!";
  }
  return comment;
}

function HowManyCanPut(){
  var count = 0;
  for (var y = 1; y <= COL; y++) {
    for (var x = 1; x <= COL; x++) {
      if (st.putmap[y][x] == 1){
        count ++;
      }
    }
  }
  return count;
}

function HowMany(bw){
  var count = 0;
  for (var y = 1; y <= COL; y++) {
    for (var x = 1; x <= COL; x++) {
      if (st.map[y][x] == bw){
        count ++;
      }
    }
  }
  return count;
}

function Select(mapx, mapy){
  if (st.putmap[mapy][mapx]){
    reverse(mapx, mapy);
    st.turn *= -1;
  }
}

function reverse(mapx, mapy){
  st.map[mapy][mapx] = st.turn;
  for (var dy = -1; dy <= 1; dy++) {
    for (var dx = -1; dx <= 1; dx++) {
      if (dx == 0 && dy == 0) {
        continue;
      }
      //8近傍
      if (st.map[mapy+dy][mapx+dx] == st.turn*-1){
        if (StraightResearch(mapx, mapy, dx, dy) > 0){
          StraightReverse(mapx, mapy, dx, dy);
        }
      }
    }
  }
}

function StraightReverse(x, y, dx, dy){
  var i = 1;
  while (st.map[y+i*dy][x+i*dx] == st.turn*-1){
    st.map[y+i*dy][x+i*dx] *= -1;
    i ++;
  }
}

function CanPut(x, y){
  var count = 0;
  if (st.map[y][x]!=0){
    return 0;
  }else {
    for (var dy = -1; dy <= 1; dy++) {
      for (var dx = -1; dx <= 1; dx++) {
        if (dx == 0 && dy == 0) {
          continue;
        }
        //8近傍
        if (st.map[y+dy][x+dx] == st.turn*-1){
          count += StraightResearch(x, y, dx, dy);
        }
      }
    }
    if (count <= 0){
      return 0;
    }else{
      return 1;
    }
  }
}

function CanPutPlace(){
  for (var y = 1; y <= COL; y++) {
    for (var x = 1; x <= COL; x++) {
      st.putmap[y][x] = CanPut(x, y);
    }
  }
}

function StraightResearch(x, y, dx, dy){
  var num = 0;
  var i = 1;
  while (InBoard(x+i*dx, y+i*dy)){
    if (st.map[y+i*dy][x+i*dx] == st.turn*-1){
      num ++;
    }
    else if (st.map[y+i*dy][x+i*dx] == st.turn){
      break;
    }else { //0 or 9
      num = 0;
      break;
    }
    i ++;
  }
  return num;
}

function InBoard(x, y){ //9も含む
  if (x >=0 && x < (COL + 2) && y >= 0 && y < (COL + 2)){
    return true;
  }else{
    return false;
  }
}
