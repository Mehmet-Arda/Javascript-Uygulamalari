const fromLang = document.querySelector("#from-lang");

const toLang = document.querySelector("#to-lang");

const btnTranslate = document.getElementById("btn-translate");
const fromText = document.getElementById("from-text");
const toText = document.getElementById("to-text");

const exchange = document.getElementById("exchange");
const icons = document.querySelectorAll("i");

for (let lang in languages) {

    let option = `<option value="${lang}"> ${languages[lang]} </option>`;
    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);

    fromLang.value = "tr-TR";
    toLang.value = "en-GB";
}

btnTranslate.addEventListener("click", () => {
    let text = fromText.value;

    let from = fromLang.value;
    let to = toLang.value;

    const url = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        });
});

exchange.addEventListener("click", () => {
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
});


console.log(icons);

for (let icon of icons) {
    icon.addEventListener("click", (event) => {
        if (event.target.classList.contains("fa-clipboard")) {
            if (event.target.getAttribute("data-id") == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }

        } else if (event.target.classList.contains("fa-volume-high")) {
            let utterance;
            if (event.target.getAttribute("data-id") == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = fromLang.value;
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = toLang.value;
            }
            speechSynthesis.speak(utterance);
        }


    });
}

