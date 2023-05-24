function adicionar(){
  var divbutton = document.getElementById("button")
  var divform = document.getElementById("formValues")

  divbutton.style.display = "none";
  divform.style.display = "flex";
}
function cancel() {
  var divbutton = document.getElementById("button")
  var divform = document.getElementById("formValues")

  divform.style.display = "none"; 
  divbutton.style.display = "flex";
}

function fechar(){
  var valuePos = document.getElementById("valuePos")
  var showValue = document.getElementById("showValue")
  console.log(valuePos.innerHTML)
 
  if(valuePos == ''){
    showValue.style.display = "none";
  }
}
