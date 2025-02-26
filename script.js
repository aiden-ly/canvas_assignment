window.addEventListener("load", function () {
    let c = document.getElementById("canvasbox");
    let ctx = c.getContext("2d");
    let undoButton = document.getElementById("undo");
    let clearButton = document.getElementById("clear");
    let square = document.getElementById("square");
    let triangle = document.getElementById("triangle");
    let circle = document.getElementById("circle");
    let sizeBox = document.getElementById("size");
    let colourBox = document.getElementById("colour");

    let onScreen = [];


    class Square {
        constructor(x, y, colour, size = 4) {
            this.colour = colour;
            this.size = size;
            this.x = x;
            this.y = y;
        }

        draw(ctx) {
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    class Triangle {

    }

    class Circle {

    }

    let currentObject = new Square(0, 0, colourBox.value, 10);

    sizeBox.addEventListener("input", function (event) {
        if (this.value <= 0) {
            this.value = 1;
        }

        currentObject.size = this.value;
    });

    colourBox.addEventListener("input", function (event) {
        currentObject.colour = this.value;
    });

    function loadShapes() {
        for (object of onScreen) {
            object.draw(ctx);
        }
    }

    c.addEventListener("mousemove", function (event) {
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;

        ctx.clearRect(0, 0, c.width, c.height);

        loadShapes();

        currentObject.x = x;
        currentObject.y = y;
        currentObject.draw(ctx);

    });

    c.addEventListener("mousedown", function (event) {

        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;

        let newObject = new Square(x, y, currentObject.colour, currentObject.size);
        onScreen.push(newObject);
        newObject.draw(ctx);


    });








});