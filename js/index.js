var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.getAttribute("width");
var height = canvas.getAttribute("height");

var fSelected = 0;

var tbody = document.querySelector("tbody");

tbody.addEventListener("click", function(event) {
  var target = event.target;
  var prevSel = event.currentTarget.getElementsByClassName("info");
  if (prevSel[0]) prevSel[0].setAttribute("class", "");

  target.setAttribute("class", "info");
  fSelected = Number(target.getAttribute("jsdata"));
  main();
});

function main() {
  var scale = 50; // 1 unit = 50 pixels
  var center = [width / 2, height / 2]; // center of the XY-plane
  var step = 0.25;
  var ds = 0.08;
  var domain = [-6, 6];
  var range = [-4, 6];

  ctx.clearRect(0, 0, width, height);
  // draw the segments for every point (x,y)
  for (var x = domain[0]; x <= domain[1]; x += step)
    for (var y = range[0]; y <= range[1]; y += step) {
      var xp1 = scale * neighbors([x, y], deriv(x, y), ds)[0][0] + center[0];
      var yp1 = -scale * neighbors([x, y], deriv(x, y), ds)[0][1] + center[1];
      var xp2 = scale * neighbors([x, y], deriv(x, y), ds)[1][0] + center[0];
      var yp2 = -scale * neighbors([x, y], deriv(x, y), ds)[1][1] + center[1];
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.moveTo(xp1, yp1);
      ctx.lineTo(xp2, yp2);
      ctx.stroke();
    }

  // draw the X and Y axis
  ctx.beginPath();
  ctx.strokeStyle = "black";
  ctx.moveTo(0, center[1]);
  ctx.lineTo(width, center[1]);
  ctx.stroke();
  ctx.moveTo(center[0], 0);
  ctx.lineTo(center[0], height);
  ctx.stroke();
}

function neighbors(point, slope, ds) {
  // returns two points close to the given point following a line of given slope
  var dx, dy;
  if (slope == Infinity) {
    dy = ds;
    dx = 0;
  } else {
    dx = ds / Math.sqrt(1 + slope * slope);
    dy = slope * dx;
  }
  return [[point[0] + dx, point[1] + dy], [point[0] - dx, point[1] - dy]];
}

function deriv(x, y) {
  if (fSelected == 1) return x;
  if (fSelected == 2) return y;
  if (fSelected == 3) return x + y;
  if (fSelected == 4) return 2 * x + y;
  if (fSelected == 5) return y - x;
  if (fSelected == 6) return 1 / x;
  if (fSelected == 7) return 2 * x / y;
  if (fSelected == 8) return Math.sin(2 * x);
  if (fSelected == 9) return 1 / 2 * Math.cos(x);
  if (fSelected == 10) return Math.tan(Math.PI * y / 6);
  if (fSelected == 11) return Math.exp(-2 * x);
  if (fSelected == 12) return Math.exp(-0.5 * x);
  if (fSelected == 13) return x * (6 - y);
  if (fSelected == 14) return x * y;
  if (fSelected == 15) return x * Math.sqrt(4-x*x);
}