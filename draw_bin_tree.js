radius = 10;
lvl=0;
/* Рисует сам узёл */
function draw_a_node (node, data, ctx){
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI*2,true);
    ctx.stroke();
    ctx.closePath();
    ctx.font = "12px sans";
    ctx.fillText(data, node.x-radius*0.5, node.y+radius*0.5);
}

function coordinates_left_child (x, y){
    return {x: (x-15*radius/(2*lvl+1)), y: (y+1*radius*(lvl+0.5))};
 }

function coordinates_right_child (x, y){
    return {x: (x+15*radius/(2*lvl+1)), y: (y+radius*(lvl+0.5))};
}

/* Рисует связку  */
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

/* Рисует наследника */
function draw_a_child(x, y, side, data, ctx){
    if (side == "left"){
	draw_a_node (coordinates_left_child (x, y), data, ctx);
	draw_a_connection ({x: x, y: y}, coordinates_left_child (x, y));
    }else{
	draw_a_node (coordinates_right_child (x, y), data, ctx);
	draw_a_connection ({x: x, y: y}, coordinates_right_child (x, y));
    }
}


/*
Рисует бинарное дерево из скобочного представления
*/
function draw_bin_tree (br, w, h){
    var radius = 10;
    var levels = [], x=150,y=15; // хранение статуса занятости уровней и их координаты
    levels[0] = {x: x, y: y, right:0};
    draw_a_node ({x: x, y: y}, 0, ctx);
    lvl = 0;
    for (var i = 0; i < br.length; i++){
	if (br[i] == 1){
	    lvl++;
	    // рисуем ветвь влево, нумеруем i+1
	    var c = coordinates_left_child (x, y);
	    
	    draw_a_child (x, y, "left", i+1, ctx);

	    //console.log(x, y, i+1);
	    levels[lvl] = {x: c.x, y: c.y, right: 0};
	    x = c.x;
	    y = c.y;
	    
	}else{
	    for (var j=lvl-1;j>=0; j--){ // j по итогу - номер ближайшего свободного уровня
		// рисуем на этом уровне ветвь вправо
		if (levels[j].right == 0){
		    lvl = j+1;
		    var c = coordinates_right_child (levels[j].x, levels[j].y);

		    draw_a_child (levels[j].x, levels[j].y, "right", i+1, ctx);

		    levels[j].right = 1;
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

/* Отрисовка интерпретации по скобкам br, в элемент element, канвас будет иметь id=id*/
function draw_bin_tree_canvas(br, element, id){
    var canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
   /* canvas.width = 70*(br.length/2);*/
    canvas.height = 70*(br.length/2);
    canvas.id = id;
    element.appendChild(canvas);
    draw_bin_tree (br);
}
