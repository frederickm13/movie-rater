"use strict";


function showAlert(type, message) {
    let alertDiv = document.querySelector('#alertDiv');
    alertDiv.innerText = message;
    alertDiv.classList.add(type); 
    alertDiv.classList.remove("d-none");
    alertDiv.classList.add("d-block");
  
    setTimeout(() => {
      alertDiv.innerText = "";
      alertDiv.classList.remove(type); 
      alertDiv.classList.add("d-none");
      alertDiv.classList.remove("d-block");
    }, 3000);
}


// Export statements
export { showAlert };