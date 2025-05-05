localStorage.clear();

setTimeout(function () {
    let newPins = Array.from(
        new Set(
            Array.from(document.querySelectorAll('a[href*="/pin/"]')).map(a => a.href)
        )
    );

    console.log(newPins)

}, 6000);