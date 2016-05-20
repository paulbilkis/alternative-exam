var len = 30; // длинна одной грани




function draw_polygon (ctx, x, y, sides, startAngle, anticlockwise, no_lines, radius){
    if (sides < 3) return;
    if (sides == 3)
	var radius_text = 0.75*radius;
    else if (sides == 4)
	var radius_text = 0.9*radius;
    else
	var radius_text = radius;
    var a = (Math.PI * 2)/sides;
    a = anticlockwise?-a:a;
    if (no_lines){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2,true);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
}
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(startAngle);
    ctx.moveTo(radius,0);
    if (no_lines){
	var coord_dotes = [];
	coord_dotes[0] = {x:radius,y:0};
	
    }
    for (var i = 0; i < sides; i++) {
	if(!no_lines){
      ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
      ctx.font = "12px serif";   
      var x1 = (radius_text)*Math.cos(a*(i-0.5));
      var y1 = (radius_text)*Math.sin(a*(i-0.5));
	    ctx.fillText(i,x1, y1);
	}else if(i!=0){
	    coord_dotes[i] = {x:radius*Math.cos(a*i), y:radius*Math.sin(a*i)};
	    
	}
  }
  ctx.closePath();
  ctx.restore();
    ctx.stroke();
    return coord_dotes;
}

function draw_a_line_inside (from, to){
    	ctx.beginPath();
	ctx.moveTo (from.x, from.y);
	ctx.lineTo (dest.x, dest.y);
	ctx.stroke();
}

var base = 0;
function num_pair_brackets(br){
    var n=0;
    for (var i=0; i<br.length;i++){
	if (br[i]==1)
	    n++;
    }
    return n;
}

ang = 5;
// возвращает i mod g
function mod_ar(i, g){
    if (i >= 0 && i < g)
	return i;
    else if (i == g){
	return 0;
    }else if(i<g){
	return g+i;
    }else if(i>g){
	return i-Math.floor(i/g)*g;
    }
}
var n;

function draw_triang(br){
    var vertex = [];
    for (var i=0; i<br.length/2 +2; i++){
	vertex[i] = i;
    }
    var n = br.length/2 -2;
    base=0;
    draw_triangulated_ntangle(br, vertex);
}
function draw_triangulated_ntangle (br, vertex){
    ang = vertex.length;
    if(br == null || br.length==0 || n==0){
	// треугольник, триангулировать нечего
	return;
    }
    if (closing_bracket(br, 0) == br.length-1){
	//закрывающая в конце
	//соединяем две вершины, соседние с базовой
	
	console.log(vertex[mod_ar(base-1, ang)], vertex[mod_ar(base+1,ang)], " vertexe connected");
	
	vertex1 = vertex.slice();
	vertex1.splice(base, 1);
	console.log(vertex1);
	n--;
	//base++;
	draw_triangulated_ntangle(br.slice(1, closing_bracket(br, 0)), vertex1);
    }else{
	// парная скобка не в конце
	// рисуем отрезок из базовой вершины в вершину базовая+q, где q=числов внутренних пар+2
	q = num_pair_brackets(br.slice(1, closing_bracket(br, 0)))+2;
	console.log(vertex[base], vertex[base+q], " vertexes connected");
	
	n--;
	/*if (mod_ar(base+q, ang) == 2){
	    console.log("удалена вершина", vertex[base+q-1]);
	    vertex.splice(base+q-1, 1);
	    

	}else if(base+q == vertex.length-2){
	    console.log("удалена вершина", vertex[base+q+1]);
	    vertex.splice(base+q+1,1);
	    }*/
	vertex1 = vertex.slice();
	vertex2 = vertex.slice();
	vertex1 = vertex1.slice(base, q+1);
	vertex2.splice(base+1,q-1);
	console.log(vertex1, base, q, vertex2);
	draw_triangulated_ntangle(br.slice(1, closing_bracket(br, 0)), vertex1);
	draw_triangulated_ntangle(br.slice(closing_bracket(br, 0)+1, br.length), vertex2);
    }
}
