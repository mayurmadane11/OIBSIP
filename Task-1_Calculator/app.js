function dis(val) {
    document.getElementById("result").value += val
 }

 function clr() {
    document.getElementById("result").value = ""
}
function Calculate(val){
    let v = document.getElementById('result');
    v.value += val;

}

function Result() {
  let number1  = document.getElementById('result').value;
  let number2  = eval(number1);
  document.getElementById('result').value = number2;
}