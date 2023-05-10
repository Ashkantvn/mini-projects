const Elements = {
    brush: document.querySelector(".brush-button"),
    eraser: document.querySelector(".eraser-button"),
    canvas: document.querySelector(".canvas"),
    save: document.querySelector(".save-button"),
    clear: document.querySelector(".clear-button"),
    range: document.querySelector(".range-input"),
    color: document.querySelector(".color-input")
}



const Brush_data = {
    brush_width: 5,
    brush_color: "#121212",
}



let isDraw = false;




const ctx = Elements.canvas.getContext("2d");



/////set height and width of canvas
const loadEvent = () => {
    Elements.canvas.width = window.innerWidth;
    Elements.canvas.height = window.innerHeight;
    ctx.fillStyle = "#fefefe";
    ctx.fillRect(0,0,Elements.canvas.width,Elements.canvas.height);
}



window.addEventListener("load", loadEvent);



/// save brush data (range and color of inputs)
const brushDataChanger = (event) => {
    switch (event.target.type) {
        case "range":
            Brush_data.brush_width = event.target.value;
            return;
        case "color":
            Brush_data.brush_color = event.target.value;
            return;
        default:
            throw Error("Wrong type");
    }
}



Elements.range.addEventListener("change", brushDataChanger);
Elements.color.addEventListener("change", brushDataChanger);



/// active eraser or brush 
const ActiveButton = (event) => {
    switch (event.target.textContent) {
        case "Eraser":
            event.target.classList.add("active-button");
            Elements.brush.classList.remove("active-button");
            Brush_data.brush_color = "#fefefe";
            return
        case "Brush":
            Brush_data.brush_color = Elements.color.value;
            event.target.classList.add("active-button");
            Elements.eraser.classList.remove("active-button");
            return
        default:
            throw Error("Wrong type")
    }
}



Elements.brush.addEventListener("click", ActiveButton);
Elements.eraser.addEventListener("click", ActiveButton);



///download picture
const saveCanvas = () => {
    const link = document.createElement("a");
    link.href = `${Elements.canvas.toDataURL()}`;
    link.download = "draw.jpg";
    link.click();
}



Elements.save.addEventListener("click", saveCanvas);



/// draw events(drawing and changing brush data)
const draw = (event) => {
    if (!isDraw) return
    ctx.lineWidth = Brush_data.brush_width
    ctx.strokeStyle = Brush_data.brush_color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
}



const touchDraw = (event)=>{
    const touch = event.touches[0];
    const mouseEvent = new MouseEvent("mousemove",{
        clientX:touch.clientX,
        clientY:touch.clientY,
    });
    draw(mouseEvent);
}




Elements.canvas.addEventListener("touchmove", touchDraw);
Elements.canvas.addEventListener("mousemove", draw);



////set start and end drawing
const startDraw = () => {
    ctx.beginPath();
    isDraw = true;
}

const endDraw = () => {
    isDraw = false;
}




Elements.canvas.addEventListener("mousedown", startDraw);
Elements.canvas.addEventListener("touchstart", startDraw);
Elements.canvas.addEventListener("mouseup", endDraw);
Elements.canvas.addEventListener("touchend", endDraw);



///Clear screen 
const clearCanvas = ()=>{
    ctx.fillStyle = "#fefefe"
    ctx.fillRect(0,0,Elements.canvas.width,Elements.canvas.height);
}



Elements.clear.addEventListener("click",clearCanvas);