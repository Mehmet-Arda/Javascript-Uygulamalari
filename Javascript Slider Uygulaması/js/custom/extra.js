var models = [

    {
        name: "BMW 418d",
        image: "img/bmw.jpg",
        link: "#"
    },


    {
        name: "Mazda CX-3",
        image: "img/mazda.jpg",
        link: "#"
    },


    {
        name: "Volvo S60",
        image: "img/volvo.jpg",
        link: "#"
    },



    {
        name: "Skoda Superb",
        image: "img/skoda.jpg",
        link: "#"
    },


    {
        name: "Honda Civic",
        image: "img/honda.jpg",
        link: "#"
    },




];


var settings = {

    duration: "2000",
    random: false
};



let index = 0;
let slideCount = models.length;
let interval;

showSlide(index);
init(settings);


const leftArrow = document.querySelector(".card-footer").children[0];
const rightArrow = document.querySelector(".card-footer").children[1];
const cardFooter = document.querySelector(".card-footer");

leftArrow.addEventListener("click", function (e) {
    index--;
    showSlide(index);


});


rightArrow.addEventListener("click", function (e) {

    index++;
    showSlide(index);
});

cardFooter.addEventListener("mouseenter", function (e) {


    if (e.target.className.indexOf("arrow")) {
        clearInterval(interval);
    }

    e.stopPropagation();

});

cardFooter.addEventListener("mouseleave", function (e) {


    if (e.target.className.indexOf("arrow")) {
        init(settings);
    }




});






function init(settings) {

    var prev;

    interval = setInterval(function () {
        if (settings.random) {

            do {
                index = Math.floor(Math.random() * slideCount);
            } while (index == prev)
            prev = index;

        } else {

            if (slideCount == index + 1) {
                index = 0;
            }
            showSlide(index);
            index++;
        }


        showSlide(index);

    }, settings.duration);
}

function showSlide(i) {

    index = i;

    if (index < 0) {

        index = slideCount - 1;

    }
    if (index >= slideCount) {
        index = 0;
    }

    const carImage = document.querySelector(".card-img-top");

    const carName = document.querySelector(".card-title");

    const carLink = document.querySelector(".card-link");

    carName.textContent = models[index].name;
    carImage.setAttribute("src", models[index].image);

    carLink.setAttribute("href", models[index].link);
}


