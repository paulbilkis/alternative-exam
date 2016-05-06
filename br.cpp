#include <string.h>
#include <iostream>
using namespace std;
int main (void){
string s;
cin >> s;
int n = (int) s.length();
string ans = "No solution";
for (int i=n-1, depth=0; i>=0; --i) {
	if (s[i] == '(')
		--depth;
	else
		++depth;
	if (s[i] == '(' && depth > 0) {
		--depth;
		int open = (n-i-1 - depth) / 2;
		int close = n-i-1 - open;
		cout << s.substr(0,i);
		ans = s.substr(0,i) + ')' + string (open, '(') + string (close, ')');
		break;
	}
}
cout << ans;
}
