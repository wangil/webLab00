"use strict"
window.onload = function () {
    var stack = [];
    var displayVal = "0";
	var exp ="0";
    for (var i in $$('button')) {
        $$('button')[i].onclick = function () {
            var value = this.innerHTML;
			if(value == "AC"){
				stack = [];
				displayVal = "0";
				exp = "0";
			}
			else if(!isNaN(value)){
				if(displayVal==0 && value==0){
					displayVal = "0";
				}
				else{
					var st = stack[stack.length-1];
					var ret = "0";
					if(displayVal == "0")
						displayVal = "";
					if(st=="*"||st=="/"||st=="^"){
						displayVal = value;
						ret = highPriorityCalculator(stack,value);
						stack.push(ret);
					}
					else{
						displayVal += value;
					}
				}
			}
			else if(value == "="){
				stack.push(parseFloat(displayVal));
				exp = stack.join("");
				displayVal = stack;
			}
			else{
				if(value == "."){
					if(displayVal.indexOf(".") == -1)
						displayVal += value;
					else
						return false;
				}
				else{
					stack.push(parseFloat(displayVal));
					stack.push(value);
					displayVal="0";
					exp = stack.join("");
				}
			}
			document.getElementById('expression').innerHTML = exp;
			document.getElementById('result').innerHTML = displayVal;
        };
    }
};

function factorial (x) {
	if(x==1)
		return 1;
	else
		return x*factorial(x-1);
}
function highPriorityCalculator(s, val) {
	var b = val;
	var op = stack.pop();
	var a = stack.pop();
	if(op=="*")
		b = a*b;
	else if(op == "/")
		b = a/b;
	else if(op== "^")
		b = a^b;
	return b;
}
function calculator(s) {
    var result = 0;
    var operator = "+";
    for (var i=0; i< s.length; i++) {
        
    }
    return result;
}
