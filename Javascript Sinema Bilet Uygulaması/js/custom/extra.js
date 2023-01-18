const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const movies = document.getElementById("movies");
const seats = document.querySelectorAll(".seat:not(.reserved)");


container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        e.target.classList.toggle("selected");

        calculateTotal();

    }
});

document.addEventListener("DOMContentLoaded", function () {
    getFromLocalStorage();
    calculateTotal();
});

movies.addEventListener("change", function () {
    calculateTotal();
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll(".seat.selected");

    const selectedSeatsArr = [];
    const seatsArr = [];

    //console.log(seats);
    //console.log(selectedSeats);
    // selectedSeatsArr=[...selectedSeatsArr,...selectedSeats];

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    });


    seats.forEach(function (seat) {
        seatsArr.push(seat);
    });


    let selectedSeatIndexes = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });

    saveToLocalStorage(selectedSeatIndexes);

    //console.log(selectedSeatIndexes);

    count.innerText = selectedSeats.length;

    let price = movies.value;

    amount.innerText = selectedSeats.length * price;
}

function saveToLocalStorage(indexes) {
    localStorage.setItem("selectedSeatsIndexes", JSON.stringify(indexes));
    localStorage.setItem("selectedMovieIndex", JSON.stringify(movies.selectedIndex))
}

function getFromLocalStorage() {
    const selectedSeatsIndexes = JSON.parse(localStorage.getItem("selectedSeatsIndexes"));
    const selectedMovieIndex = JSON.parse(localStorage.getItem("selectedMovieIndex"));

    if (selectedSeatsIndexes != null && selectedSeatsIndexes.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeatsIndexes.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    if (selectedMovieIndex != null) {
        movies.selectedIndex = selectedMovieIndex;
    }

}

