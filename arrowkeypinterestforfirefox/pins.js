
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

(() => {
    let oldPushState = history.pushState;
    history.pushState = function pushState() {
        let ret = oldPushState.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    };

    let oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
        let ret = oldReplaceState.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
    };

    window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event('locationchange'));
    });
})();

window.addEventListener('locationchange', () => {
    console.log("i work")
    setTimeout(function () {
        index = Number(localStorage.getItem("index"))
        if (window.location.pathname === "/") {
            localStorage.SetItem("index", "0")
            index = Number(localStorage.getItem("index"));
            window.location.reload();
        }
        else if (index == 0) {
            window.location.reload();
        }
    }, 500);
});


document.addEventListener('keydown', function (event) {



    let pins = JSON.parse(localStorage.pins);
    if (event.key === "ArrowRight") {
        index++;
        localStorage.setItem("index", index)
        window.open(pins[index], "_self")

        let generatedpins = Array.from(
            new Set(
                Array.from(document.querySelectorAll('a[href*="/pin/"]')).map(a => a.href)
            )
        );

        let randomPins = [];
        for (let i = 0; i < 2 && (generatedpins.length - 1) > 0; i++) {
            let randIndex = Math.floor(Math.random() * generatedpins.length);
            randomPins.push(generatedpins.splice(randIndex, 1)[0]);
            pins.push(randomPins[i]);
        }

        localStorage.setItem("pins", JSON.stringify(pins))



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



