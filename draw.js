function draw_a_node (node, data, ctx){
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI*2,true);
    ctx.stroke();
    ctx.closePath();
    ctx.font = "12px sans";
    ctx.fillText(data, node.x-radius*0.5, node.y+radius*0.5);
}

function coordinates_left_child (x, y){
    return {x: (x-3*radius), y: (y+3*radius)};
 }

function coordinates_right_child (x, y){
    return {x: (x+3*radius), y: (y+3*radius)};
}

function draw_a_connection (parent, child){
    if (child.x < parent.x){
	// left
	var x_from = child.x + radius*Math.cos(Math.PI/4);
	var y_from = child.y - radius*Math.sin(Math.PI/4);
	var x_dest = parent.x - radius*Math.cos(Math.PI/4);
	var y_dest = parent.y + radius*Math.sin(Math.PI/4);

    }else{
	//right
	var x_from = child.x - radius*Math.cos(Math.PI/4);
	var y_from = child.y - radius*Math.sin(Math.PI/4);
	var x_dest = parent.x + radius*Math.cos(Math.PI/4);
	var y_dest = parent.y + radius*Math.sin(Math.PI/4);
    }
    	ctx.beginPath();
	ctx.moveTo (x_from, y_from);
	ctx.lineTo (x_dest, y_dest);
	ctx.stroke();
}
      
function draw_a_child(x, y, side, data, ctx){
    if (side == "left"){
	draw_a_node (coordinates_left_child (x, y), data, ctx);
	draw_a_connection ({x: x, y: y}, coordinates_left_child (x, y));
    }else{
	draw_a_node (coordinates_right_child (x, y), data, ctx);
	draw_a_connection ({x: x, y: y}, coordinates_right_child (x, y));
    }
}

  var example = document.getElementById("canvas");
      ctx = example.getContext("2d");
radius = 10;
draw_bin_tree ([1,1,1,0,0,0]);
/*
draw_a_node ({x: 50, y: 50}, 0, ctx);
draw_a_child (50, 50, "left", 1, ctx);
draw_a_child (50, 50, "right", 2, ctx);
draw_a_child (80, 80, "left", 3, ctx);
draw_a_child (80, 80, "right", 4, ctx);
/*

/*
Рисует бинарное дерево из скобочного представления
*/
function draw_bin_tree (br){
    var levels = [], x=150,y=150; // хранение статуса занятости уровней и их координаты
    levels[0] = {x: 150, y: 150, right:0};
    draw_a_node ({x: 150, y: 150}, 0, ctx);
    lvl = 0;
    for (var i = 0; i < br.length; i++){
	if (br[i] == 1){
	    // рисуем ветвь влево, нумеруем i+1
	    var c = coordinates_left_child (x, y);
	    draw_a_child (x, y, "left", i+1, ctx);
	    //console.log(x, y, i+1);
	    levels[lvl+1] = {x: c.x, y: c.y, right: 0};
	    x = c.x;
	    y = c.y;
	    lvl++;
	}else{
	    for (var j=lvl-1;j>=0; j--){ // j по итогу - номер ближайшего свободного уровня
		// рисуем на этом уровне ветвь вправо
		if (levels[j].right == 0){
		    var c = coordinates_right_child (levels[j].x, levels[j].y);
		    draw_a_child (levels[j].x, levels[j].y, "right", i+1, ctx);
		    levels[j].right = 1;
		        console.log(x, y, i+1, c.x, c.y);
		    x = c.x;
		    y = c.y;
		
		   
		    if (br[i+1] == 1){
			levels[j+1]= {x:x, y:y, right:0};
			lvl = j+1;
		    }
		    break;
		}
	    }
	}
    }
}
