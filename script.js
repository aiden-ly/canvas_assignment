window.addEventListener("load", function () {
    let c = document.getElementById("canvasbox");
    let ctx = c.getContext("2d");



    c.addEventListener("mousemove", function (event) {
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;
        console.log(x, y);

    })




});