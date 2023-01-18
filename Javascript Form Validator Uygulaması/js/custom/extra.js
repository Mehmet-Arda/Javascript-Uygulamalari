
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");


function error(input, message) {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    const messageDiv = input.nextElementSibling;
    messageDiv.innerText = message;
    messageDiv.className = "invalid-feedback";
}

function success(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    
    
    if (re.test(email.value)) {
        success(email);
        
    } else {
        error(email, "Hatalı bir mail adresi");

    }
}


function checkRequired(inputs) {

    inputs.forEach(function (input) {
        if (input.value === "") {
            error(input, `${input.getAttribute("name")} is required`)

        } else {
            success(input);
        }
    });

}


function checkLength(input,min,max){
    if(input.value.length < min){
        error(input,`${input.name} en az ${min} karakter olmalıdır`);
    }else if(input.value.length > max){
        error(input,`${input.name} en fazla ${max} karakter olmalıdır`);
    }else{
        success(input);
    }
}


function checkPasswords(input1,input2){
    if(input1.value !== input2.value){
        error(input1,"");
        error(input2,"Parolalar eşleşmiyor")
    }else{

    }
}

form.addEventListener("submit", function (e) {


    checkRequired([username, email, password, repassword]);

    validateEmail(email);

    checkLength(username,7,15);
    checkLength(password,7,12);
    checkPasswords(password,repassword);

    /*
     if(username.value===""){
         error(username,"Username gerekli");
     }else{
        success(username);
     }
 
     if(email.value===""){
         error(email,"Email gerekli");
     }else if(!validateEmail(email)){
         error(email,"Düzgün Email girer misin ne yapmaya çalışıyorsun...")
     }
     else{
         success(email);
      }
 
 
     if(password.value===""){
         error(password,"Password gerekli");
     }
     else{
         success(password);
      }
 
 
 
     if(repassword.value===""){
         error(repassword,"Repassword gerekli");
     }
     else{
         success(repassword);
      }
 
     */


    e.stopPropagation();
    e.preventDefault();
});