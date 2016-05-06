/*
Генерация числа Каталана номер n
*/
function catalan(n){
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
