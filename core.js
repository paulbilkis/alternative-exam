/*var canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 300;
document.body.appendChild(canvas);*/

//gen_yung_table ([1,0,1,0,1,0, 1,1,1,0,0,0], document.body);

var inter1_light=null,inter2_light=null, brackets1=[], brackets2=[];

/*
Генерация числа Каталана номер n
*/
function gen_catalan(n){
    var C = [];
    C[0] = 1;
    
    for (var i=1; i<=n; i++){
	C[i] = 0;
	for (var k=0; k<i; k++){
	    C[i] += C[k]*C[i-1-k]; 
	}
    }
    return C[n];
}

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

interpretations[0].draw = draw_a_monoway_canvas;
interpretations[1].draw = draw_bin_tree_canvas;
interpretations[2].draw = gen_yung_table;

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

function setOn (el){ // по onlick происходит
    if (el.parentNode.className == 'layer1'){
	if (inter1_light == null){
	    inter1_light = el.id; // включаем элемент
	    el.style.border = "dashed 5px navy";
	    if (inter2_light != null){ // проверяем правильность соответствия
		if (compare_brackets(brackets1[inter1_light], brackets2[inter2_light-100]))
		    alert("Верно!");
		else
		    alert("Ошибка!");
	    }
	}else if (inter1_light == el.id){
	    inter1_light = null; // выключаем элемент
	    el.style.border = "none";
	}
    }else if(el.parentNode.className == 'layer2'){
	if (inter2_light == null){
	    inter2_light = el.id; // включаем элемент
	    el.style.border = "dashed 5px navy";
	     if (inter1_light != null){ // проверяем правильность соответствия
		if (compare_brackets(brackets1[inter1_light], brackets2[inter2_light-100]))
		    el.className="moveit";
		else
		    alert("Ошибка!");
	    }
	}else if (inter2_light == el.id){
	    inter2_light = null; // выключаем элемент
	    el.style.border = "none";
	}
    }
}

function trainer (inter1, inter2, n){
    clear_block("content");
    var layer1 = document.createElement("div");
    var layer2 = document.createElement("div");
    layer1.className = "layer1";
    layer2.className = "layer2";
    document.getElementById("content").appendChild(layer1);
    document.getElementById("content").appendChild(layer2);
    

    brackets1 = gen(n);
    shuffle(brackets1);
    brackets2 = copy_brackets(brackets1);
    shuffle(brackets2);
   // var catalan = gen_catalan(3);

    for (var i=0; i<brackets1.length; i++){
	interpretations[inter1].draw(brackets1[i], layer1, i);
	interpretations[inter2].draw(brackets2[i], layer2, i+100);
    }

    var elements = document.getElementsByTagName("canvas");
    for (var i=0; i<elements.length; i++)
	elements[i].onclick = function (){setOn(this);};
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
	trainer(inter1, inter2, 3);
    }else{
	control(inter1, inter2);
    }
}
