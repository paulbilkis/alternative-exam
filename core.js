var inter1_light=null,inter2_light=null, brackets1=[], brackets2=[], el_change=null;
var showAnswerIm = false; // показывать ли правильность выбора в тренажёре

/*
Пара слов о внутреннем представлении.
Все интерпретации строятся на основе скобочного представления. Моя программа знает лишь связи между скобками и различными интерпретациями.
Скобки представляются в моей программе массивом единиц и нулей, где единица это открывающая скобка, нуль закрывающая.
Например, [1,0,1,1,0,0] <==> ()(())
*/


/*
Массив имеющихся интерпретаций, с названием для меню
draw(brackets, el, id) - для отрисовки одной интепретации по скобкам brackets в блок с id=el, присваивает отрисовке id=id
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

/* Очищает блок с id=el от содержимого */
function clear_block (el){
    var t = document.getElementById(el);
    t.innerHTML = '';
}

/* показывает-скрывает элемент с id=el, использовал для старого меню*/
function toggle(el) {
	  el = document.getElementById(el);
  el.style.display = (el.style.display == 'none') ? 'block' : 'none'
}

/* Старая функция генерации меню, не работает */
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

/* Обертка для вызова и размещения соответствующих демонстраций */
function demo (inter1, inter2){
    ;
}

function checkAnswers(){
    var table = document.getElementById("trainer");
    var result = document.getElementById("result");
    for (var i = 0; i<table.childNodes.length; i++){
	if (compare_brackets(brackets1[table.childNodes[i].cells[0].firstChild.id], brackets2[table.childNodes[i].cells[2].firstChild.id-100])){
	    if (showAnswerIm){
		table.childNodes[i].style.backgroundColor="green";
	    }else{
		continue;
	    }
	}else{
	    if (showAnswerIm){
		table.childNodes[i].style.backgroundColor="red";
	    }else{
		result.innerHTML='<p>В одной или нескольких парах не было использовано предложенное взаимно-однозначного соотношение. Пожалуйста, если вы придумали собственное верное однозначное правило (т.е. однозначно работающее в обе стороны), напишите мне на <a href="mailto:p.bilkis@gmail.com">почту</a></p>';
		return;
	    }
	}
    }
    result.innerHTML='<p>Все взаимно-однозначные соотношения указаны верно!</p>';
}

/* Функция, отвечающая за выбор элементов мышкой. Выбрать можно лишь один элемент в столбце, когда выбирается двое, соответственно, в inter1_light и inter2_light помещаются id выбранных интерпретаций (второй id для однозначности индетификатора в структуре html больше нужного на 100), выбранные интерпретации сравниваются, затем действие варьируется взависимости от showAnswerIm (тренажёр или контроль). Если контроль, то результат сохраняется в массив, затем по кнопке проверяется и сообщается результат.*/
function setOn (el){ // по onlick происходит
    if (el_change == null){
	el_change = el.id;
	el.parentNode.style.border="2px solid navy";
    }else if (el.id == el_change){
	el_change = null;
	el.parentNode.style.border="2px solid navy";
    }else if (el_change != null && document.getElementById(el_change).parentNode.className == el.parentNode.className){
	var tmp1 = document.getElementById(el_change).parentNode;
	el.parentNode.appendChild(document.getElementById(el_change));
	tmp1.appendChild(el);
	el_change = null;
	tmp1.style.border="";
	el.style.border="";
	if (showAnswerIm){
	    checkAnswers();
	}
    }
}

/*
Обёртка для тренажёра и для контроля, в зависимости от значения showAnswerIm и значения n.
inter1, inter2 - id интерпертаций в массиве скобочных представлений
n - номер числа каталана
*/

function trainer (inter1, inter2, n){
    clear_block("content");
    var table = document.createElement("table");
    document.getElementById("content").appendChild(table);
    table.border = "1px";
    table.className = "trainer";
    table.id="trainer";
    brackets1 = gen(n); // получаем скобочные представления
    shuffle(brackets1); // перемешиваем
    brackets2 = copy_brackets(brackets1); // копируем во второй массив
    shuffle(brackets2); // его тоже перемешиваем

    // отрисовка двух колонок двумя разными интерпретациями
    for (var i=0; i<brackets1.length; i++){
	var td1 = document.createElement("td");
	var td2 = document.createElement("td");
	td2.className = "bijection";
	td1.className = "layer1";
	
	var td3 = document.createElement("td");
	td3.className = "layer2";
	td2.innerHTML = "<=>";
	var tr = document.createElement("tr");
	table.appendChild(tr);
//	td1.id=i;
//	td3.id=i+100;
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	interpretations[inter1].draw(brackets1[i], td1, i);
	interpretations[inter2].draw(brackets2[i], td3, i+100);
    }

    // задаём действие по клику на интерпретации
    var elements = document.getElementsByTagName("canvas");
    for (var i=0; i<elements.length; i++)
	elements[i].onclick = function (){setOn(this);};
}

/* Обёртка для режима "контроль" */
function control (inter1, inter2){
    showAnswerIm=false;
    trainer(inter1, inter2, 5);
}

/* Обработка меню */
function handler (form){
    
    var inter1 = form.inter1.options[form.inter1.selectedIndex].value;
    var inter2 = form.inter2.options[form.inter2.selectedIndex].value;
    var mode = form.mode.options[form.mode.selectedIndex].value;
    if (mode == "demo"){
	demo(inter1, inter2);
    }else if (mode == "trainer"){
	showAnswerIm=true;
	trainer(inter1, inter2, 3);
    }else{
	control(inter1, inter2);
    }
}
