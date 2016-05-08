var len = 30; // длинна одной грани
var radius = 100;



function draw_polygon (ctx, x, y, sides, startAngle, anticlockwise){
    if (sides < 3) return;
    if (sides == 3)
	var radius_text = 0.75*radius;
    else if (sides == 4)
	var radius_text = 0.9*radius;
    else
	var radius_text = radius;
    var a = (Math.PI * 2)/sides;
    a = anticlockwise?-a:a;
    ctx.beginPath();
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(startAngle);
  ctx.moveTo(radius,0);
  for (var i = 0; i < sides; i++) {
      ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
      ctx.font = "12px serif";   
      var x1 = (radius_text)*Math.cos(a*(i-0.5));
      var y1 = (radius_text)*Math.sin(a*(i-0.5));
      ctx.fillText(i,x1, y1);
  }
  ctx.closePath();
  ctx.restore();
    ctx.stroke();
}

function draw_a_line_inside (from, to){
    	ctx.beginPath();
	ctx.moveTo (from.x, from.y);
	ctx.lineTo (dest.x, dest.y);
	ctx.stroke();
}

function draw_triangulated_ntangle (){

}
