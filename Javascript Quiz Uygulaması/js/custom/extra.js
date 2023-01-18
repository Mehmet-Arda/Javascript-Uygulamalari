
//let soru1 = new Soru("Hangisi javascript paket yönetim uygulamasıdır?", { a: "Node.js", b: "Typescript", c: "Npm" }, "c");
//let soru2 = new Soru("Hangisi .net paket yönetim uygulamasıdır?", { a: "Node.js", b: "Nuget", c: "Npm" }, "c");


const quiz = new Quiz(sorular);
const ui = new UI();

let time = 10;
ui.btn_start.addEventListener("click", function () {

    if (quiz.sorular.length != quiz.soruIndex) {

        startTimer(time);

        startTimerLine();

        ui.quiz_box.classList.add("active");
        ui.soruGoster(quiz.soruGetir());
        ui.btn_next.classList.remove("show");
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);
    }


});


ui.btn_next.addEventListener("click", function () {
    if (quiz.sorular.length != quiz.soruIndex + 1) {
        quiz.soruIndex++;
        ui.soruGoster(quiz.soruGetir());
        ui.btn_next.classList.remove("show");
        ui.soruSayisiniGoster(quiz.soruIndex + 1, quiz.sorular.length);

        clearInterval(counter);

        clearInterval(counterLine);
        startTimerLine();
        startTimer(time);
    }
    else {
        clearInterval(counter);
        ui.quiz_box.classList.remove("active");
        ui.score_box.classList.add("active");
        ui.skoruGoster(quiz.sorular.length, quiz.dogruCevapSayisi);
    }
});


ui.btn_quit.addEventListener("click", function () {
    window.location.reload();
});



ui.btn_replay.addEventListener("click", function () {
    quiz.soruIndex = 0;
    quiz.dogruCevapSayisi = 0;

    ui.btn_start.click();
    ui.score_box.classList.remove("active");
});



function optionSelected(option) {

    clearInterval(counter);
    clearInterval(counterLine);

    let cevap = option.querySelector("span b").textContent;
    let soru = quiz.soruGetir();


    if (soru.cevabiKontrolEt(cevap)) {
        quiz.dogruCevapSayisi++;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", ui.correctIcon);
    }
    else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", ui.incorrectIcon);
    }

    for (let i = 0; i < ui.option_list.children.length; i++) {
        ui.option_list.children[i].classList.add("disabled");
    }

    ui.btn_next.classList.add("show");
}



let counter;

function startTimer(time) {

    counter = setInterval(timer, 1000);

    function timer() {
        ui.time_second.textContent = time;
        time--;

        if (time < 0) {
            clearInterval(counter);

            ui.time_text.textContent = "Süre Bitti";

            let cevap = quiz.soruGetir().dogruCevap;

            for (let option of ui.option_list.children) {
                if (option.querySelector("span b").textContent == cevap) {
                    option.classList.add("correct");
                    option.insertAdjacentHTML("beforeend", ui.correctIcon);
                } else {
                    option.classList.add("incorrect");

                }


            }

            ui.btn_next.classList.add("show");
        }
    }


}

let counterLine;

function startTimerLine() {
    let line_width = 0;

    counterLine = setInterval(timer, ((time * 1000) + 800) / 110);

    function timer() {
        line_width += 5;
        ui.time_line.style.width = line_width + "px";

        if (line_width > 549) {
            clearInterval(counterLine);
        }
    }


}

