/*var canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;
document.body.appendChild(canvas);*/

//gen_yung_table ([1,0,1,0,1,0, 1,1,1,0,0,0], document.body);

function clear_block (el){
    var t = document.getElementById(el);
    t.innerHTML = '';
}

function toggle(el) {
	  el = document.getElementById(el);
  el.style.display = (el.style.display == 'none') ? 'block' : 'none'
}
/*
Массив имеющихся интерпретаций, с названием для меню
draw(brackets, id) - для отрисовки одной интепретации по скобкам brackets в div с id
demo(id) - функция, выводит в div с id описание связи интерпретации со скобками со случайным примером
*/
var interpretations = [
    {s: "Монотонные пути обхода", demo: null, draw: null},
    {s: "Бинарное дерево", demo: null, draw: null},
    {s: "Таблицы Юнга", demo: null, draw: null}
];

function gen_menu (){
    var menu = document.getElementById("menu"), n=0;
    
    for (var i=0; i<interpretations.length-1; i++){
	var inter = interpretations.slice(i+1);
	for (var j=i+1; j<inter.length; j++){
	    var span = document.createElement("span");
	    var ul = document.createElement("ul");
	    ul.id = ++n;
	    span.onclick = "toggle("+(n-1)+");";   
	    span.innerHTML = interpretations[i].s+" и "+interpretations[j].s;
	    menu.appendChild(span);
	    menu.appendChild(ul);
	   // ul.appendChild(li);
	}
    }
}

function demo (inter1, inter2){
    ;
}

function trainer (inter1, inter2){
    var layer1 = document.createElement("div");
    var layer2 = document.createElement("div");
    layer1.className = "layer1";
    layer2.className = "layer2";
    document.getElementById("content").appendChild(layer1);
    document.getElementById("content").appendChild(layer2);;
}

function control (inter1, inter2){
    ;
}

function handler (form){
    var inter1 = form.inter1.options[form.inter1.selectedIndex].value;
    var inter2 = form.inter2.options[form.inter2.selectedIndex].value;
    var mode = form.mode.options[form.mode.selectedIndex].value;
    if (mode == "demo"){
	demo(inter1, inter2);
    }else if (mode == "trainer"){
	trainer(inter1, inter2);
    }else{
	control(inter1, inter2);
    }
}
