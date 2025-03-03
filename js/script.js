window.addEventListener("load", function (event) {
    let x;
    let y;
    let isDragging;
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
    sizeBox.value = 8;


    class Square {
        constructor(x, y, colour, size) {
            this.colour = colour;
            this.size = size;
            this.x = x;
            this.y = y;
            this.shape = "Square";
        }

        draw(ctx) {
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    class Triangle {
        constructor(x, y, colour, size) {
            this.colour = colour;
            this.size = size;
            this.x = x;
            this.y = y;
            this.shape = "Triangle";
        }

        draw(ctx) {
            ctx.fillStyle = this.colour;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.size / 2, this.y - this.size);
            ctx.lineTo(this.x - this.size / 2, this.y - this.size);
            ctx.closePath();
            ctx.fill();
        }


    }

    class Circle {
        constructor(x, y, colour, size) {
            this.colour = colour;
            this.size = size;
            this.x = x;
            this.y = y;
            this.shape = "Circle";
        }

        draw(ctx) {
            ctx.fillStyle = this.colour;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    let currentObject = new Square(0, 0, colourBox.value, sizeBox.value);

    function updateLocal() {
        localStorage.onScreen = JSON.stringify(onScreen);
    }

    function loadShapes() {
        ctx.clearRect(0, 0, c.width, c.height);
        for (object of onScreen) {
            object.draw(ctx);
        }
        updateLocal();
    }

    if (localStorage.onScreen) {
        let localOnScreen = JSON.parse(localStorage.onScreen);
        for (object of localOnScreen) {
            if (object.shape === "Square") {
                onScreen.push(new Square(object.x, object.y, object.colour, object.size));
            }
            else if (object.shape === "Triangle") {
                onScreen.push(new Triangle(object.x, object.y, object.colour, object.size));
            }
            else if (object.shape === "Circle") {
                onScreen.push(new Circle(object.x, object.y, object.colour, object.size));
            }
        }
    }


    sizeBox.addEventListener("input", function (event) {
        if (this.value <= 0) {
            this.value = 1;
        }

        currentObject.size = this.value;
    });

    colourBox.addEventListener("input", function (event) {
        currentObject.colour = this.value;
    });

    undoButton.addEventListener("click", function (event) {
        if (onScreen.length > 0) {
            onScreen.pop();
            loadShapes();
        }

    });

    clearButton.addEventListener("click", function (event) {
        onScreen = [];
        loadShapes();
    });

    square.addEventListener("click", function (event) {
        currentObject = new Square(0, 0, colourBox.value, sizeBox.value);
        loadShapes();
    });

    triangle.addEventListener("click", function (event) {
        currentObject = new Triangle(0, 0, colourBox.value, sizeBox.value);
        loadShapes();
    });

    circle.addEventListener("click", function (event) {
        currentObject = new Circle(0, 0, colourBox.value, sizeBox.value);
        loadShapes();
    });

    c.addEventListener("mousemove", function (event) {
        x = event.pageX - this.offsetLeft;
        y = event.pageY - this.offsetTop;

        if (isDragging) {
            let newObject;
            if (currentObject.shape === "Square") {
                newObject = new Square(x, y, currentObject.colour, currentObject.size);
            } else if (currentObject.shape === "Triangle") {
                newObject = new Triangle(x, y, currentObject.colour, currentObject.size);
            } else if (currentObject.shape === "Circle") {
                newObject = new Circle(x, y, currentObject.colour, currentObject.size);
            }
            onScreen.push(newObject);
            newObject.draw(ctx);
        }


        loadShapes();

        currentObject.x = x;
        currentObject.y = y;
        currentObject.draw(ctx);

    });

    c.addEventListener("mousedown", function (event) {
        isDragging = true;
        let newObject;
        if (currentObject.shape === "Square") {
            newObject = new Square(x, y, currentObject.colour, currentObject.size);
        } else if (currentObject.shape === "Triangle") {
            newObject = new Triangle(x, y, currentObject.colour, currentObject.size);
        } else if (currentObject.shape === "Circle") {
            newObject = new Circle(x, y, currentObject.colour, currentObject.size);
        }
        onScreen.push(newObject);
        newObject.draw(ctx);
    });

    c.addEventListener("mouseup", function (event) {
        isDragging = false;
    })



});