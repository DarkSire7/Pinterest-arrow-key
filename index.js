console.log("content script loaded")
console.log("HELLO");

document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight") {
        console.log("next pin")
    }
    else if (event.key === "ArrowLeft") {
        console.log("previous pin")
    }
})




