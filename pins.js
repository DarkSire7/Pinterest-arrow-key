
let index = Number(localStorage.getItem("index")) || 0;

if (window.location.href.includes("/pin/")) {
    //be silent

}
else {
    localStorage.clear();

    setTimeout(function () {
        let newPins = Array.from(
            new Set(
                Array.from(document.querySelectorAll('a[href*="/pin/"]')).map(a => a.href)
            )
        );

        localStorage.setItem("pins", JSON.stringify(newPins));



    }, 6000);


    localStorage.setItem("index", "0")

}

window.navigation.addEventListener("navigate", (event) => {
    setTimeout(function () {
        let index = Number(localStorage.getItem("index"))

        if (index == 0) {
            window.location.reload();

        }
    }, 2000)

});


document.addEventListener('keydown', function (event) {



    let pins = JSON.parse(localStorage.pins);
    if (event.key === "ArrowRight") {

        index++;

        localStorage.setItem("index", index)
        window.open(pins[index], "_self")
        if (index == pins.length) {
            alert("reached end of list, go back to home pages and refresh")
            index = 0;
            localStorage.setItem("index", "0")
        }
    }
    else if (event.key === "ArrowLeft") {

        index--;
        localStorage.setItem("index", index)
        window.open(pins[index], "_self")

        if (index < 0) {
            alert("Go forward, nothing to see back here")
        }
    }
})



