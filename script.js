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

    class Square {
        constructor(colour, size=4) {
            this.colour = colour;
            this.size = size;
        }

        draw(ctx, x, y) {
            ctx.fillStyle = this.colour;
            ctx.fillRect(x, y, this.size, this.size);
        }
    }
    
    class Triangle {
        
    }

    class Circle {
        
    }

    let currentObject = new Square(colourBox.value, 10);

    sizeBox.addEventListener("change", function(event) {
        if (this.value <= 0) {
            this.value = 1;
        }

        currentObject.size = this.value;
    });

    colourBox.addEventListener("change", function(event) {
        currentObject.colour = this.value;
    });

    


    c.addEventListener("mousemove", function (event) {
        let x = event.pageX - this.offsetLeft;
        let y = event.pageY - this.offsetTop;

        ctx.clearRect(0, 0, c.width, c.height);
        currentObject.draw(ctx, x, y);
        

    });

    




});