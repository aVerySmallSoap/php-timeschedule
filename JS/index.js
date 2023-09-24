let form = document.querySelector("#form");
form.addEventListener("submit", calculate);

function calculate(e){
    e.preventDefault();
    let dateIn = document.querySelector("#date-input1").value;
    let dateOut = document.querySelector("#date-input2").value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/Operations/calculate-time.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        if(xhr.getResponseHeader("content-type") === "application/json"){
            if(document.querySelector(".error") != null){
                document.querySelector(".error").style.animation = "1s error-out";
                document.querySelector(".error").remove();
            }
            if(document.querySelector(".out-container") != null){
                fillOutput(JSON.parse(xhr.response));
            }else{
                expand(JSON.parse(xhr.response));
            }
        }else{
            if(document.querySelector(".out-container") != null){
                close();
                throwError();
            }else{
                throwError();
            }
        }
    }
    xhr.send(`dateIn=${dateIn}&dateOut=${dateOut}`);
}

function expand(json){
    let container = document.querySelector(".container");
    container.style.transition = "2s ease-out";
    container.style.animation = "2s extend";
    if(document.querySelector(".break") != null){
        document.querySelector(".break").remove();
        document.querySelector(".out-container").remove();
    }
    setTimeout(() => {
        container.style.animation = "";
        container.style.height = "55vh";

    }, 1999);
    setTimeout(expandLine, 500);
    setTimeout(() => show(json), 750);
}

function expandLine(){
    let hr;
    if(document.querySelector(".break") == null){
        hr = document.createElement("hr");
    }
    hr.className = "break";
    hr.style.width = "0";
    hr.style.transition = "2s ease-out";
    hr.style.animation = "2s slide-in";
    setTimeout(() => {
        hr.style.animation = "";
        hr.style.width = "90%";
    }, 1999);
    document.querySelector(".inner-container").appendChild(hr);
}

function show(json){
    let temp = document.querySelector("#output-temp");
    setTimeout(() => {
        document.querySelector(".inner-container").appendChild(temp.content.cloneNode(true));
        document.querySelector("#close-out").addEventListener("click", close);
        let content = document.querySelector(".out-container");
        content.style.transition = "2s ease-out";
        content.style.animation = "2s drop-in";
        setTimeout(() =>{
            content.style.animation = "";
            setTimeout(() => fillOutput(json), 500);
        }, 2000);
    }, 750);
}

function close(){
    animateOut(document.querySelector(".out-container"), "push-up");
    setTimeout(() => {
        animateOut(document.querySelector(".break"), "slide-out");
    }, 250);
    setTimeout(() => {
        animateOut(document.querySelector(".container"), "retract", true);
        document.querySelector(".container").style.height = "25vh";
    }, 1000);
}

function fillOutput(json){
    document.querySelectorAll(".output").forEach(elem => {
        elem.style.animation = "500ms delay";
    });
    document.querySelector("#in").innerText = document.querySelector("#date-input1").value;
    document.querySelector("#in-f").innerText = json.first;
    document.querySelector("#in2").innerText = document.querySelector("#date-input2").value;
    document.querySelector("#in2-f").innerText = json.second;
    document.querySelector("#hours").innerText = json.hour;
    document.querySelector("#minutes").innerText = json.minute;
}

function throwError(){
    let message = document.createElement("span");
    message.className = "error";
    message.style.color = "Red";
    message.style.marginRight = "25px";
    message.style.animation = "2s error";
    message.innerText = "Please fill out the required fields!";
    document.querySelector(".control-flow").prepend(message);
}

function animateOut(elem, animation, remain){
    let target = elem;
    target.style.transition = "2s ease-in";
    target.style.animation = "2s "+animation;
    if(!remain){
        setTimeout(() => target.remove(), 1800);
    }
}