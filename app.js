const createButton = document.querySelector("#create");
const guessButton = document.querySelector("#guess");
const inputContent = document.querySelector("#input");
const col = document.querySelector("#col");
const div = document.querySelector("#result");
const ul = document.querySelector(".list-group");

let number;
let sayac = 0;
runEvents();

function runEvents() {
    createButton.addEventListener("click", toCreate);
    guessButton.addEventListener("click", guessNumber);
}
function toCreate() {
    number = Math.floor(Math.random() * 100);
    createButton.disabled = true;
    showAlert("success", "Yeni sayı oluşturuldu.");
    document.getElementById("input").value = "";
    guessButton.disabled = false;
}
function guessNumber() {
    let input = inputContent.value;
    if (input == null || input == "") {
        showAlert("danger", "Sayıyı giriniz alanı boş olamaz!");
    } else {
        if (number == input) {
            sayac++;
            showAlert("success", sayac + " defada buldunuz, Sayı: " + input);
            createButton.disabled = false;
            guessButton.disabled = true;
            const sonucListesi = document.querySelectorAll(".list-group-item");
            sonucListesi.forEach(function (sonuc) {
                sonuc.remove();
            });
            sayac = 0;
            document.getElementById("input").value = "";
        } else if (number > input) {
            elementOlustur(input, "büyük");
            sayac++;
        } else if (number < input) {
            elementOlustur(input, "küçük");
            sayac++;
        }
    }
}
function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = "mt-4 alert alert-" + type;
    div.textContent = message;
    col.prepend(div);
    setTimeout(() => {
        div.remove();
    }, 2500);
}
function elementOlustur(input, deger) {
    const ul = document.createElement("ul");
    ul.className = "list-group mt-4";
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-warning";
    li.textContent = input + " 'den " + deger;
    ul.appendChild(li);
    div.prepend(ul);
    createButton.disabled = true;
    document.getElementById("input").value = "";
}