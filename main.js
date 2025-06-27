// BTNS 
let colorPicker = document.querySelector("#colorPicker")
let bgPicker = document.querySelector("#backgroundColorPicker")
let widthPicker = document.querySelector("#brushSize")
let btns = document.querySelectorAll("button")
let canvas = document.querySelector("canvas")
let download = document.querySelector("#download")
let clearBtn = document.querySelector("#clearBtn")
let context = canvas.getContext("2d")
let lastX = 0, lastY = 0
let isDrawing = false
let dataUrl = null
// PICK DESIGN COLOR \
let color = 'red'
colorPicker.addEventListener("change",(e)=>{
    color = e.target.value
    console.log(color)
})

 context.strokeStyle = color;
        context.lineCap = 'round';
        context.lineJoin = 'round';
// PICK BACKGROUND COLOR 
bgPicker.addEventListener("change",(e)=>{
    canvas.style.background = e.target.value // CHANGE CANVAS BACKGROUND COLOR
})

// PICK BACKGRUND SIZE 
widthPicker.addEventListener("change",(e)=>{
    brushSize = e.target.value
})

canvas.addEventListener("mousedown",(e)=>{
    isDrawing = true 
    e.preventDefault ()
    const rect = canvas.getBoundingClientRect ()
    lastX = (e.clientX - 10) - rect.left 
    lastY = (e.clientY - 10) - rect.top
})
canvas.addEventListener("mousemove",(e)=>{
    if (isDrawing === false) return;
    e.preventDefault ()
    const rect = canvas.getBoundingClientRect ()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top
    context.beginPath ()
    context.strokeStyle = color
    context.moveTo (lastX,lastY)
    context.lineTo(x,y)
    context.stroke ()
    lastX = x 
    lastY = y
})

canvas.addEventListener("mouseleave",()=>{
    isDrawing = false
})

canvas.addEventListener("mouseout",()=>{
    isDrawing = false
})

// CLEAR 
clearBtn.addEventListener("click",()=>{
    context.clearRect (0,0,canvas.width,canvas.height)
    alert ("Signature is cleared now !")
})

// DOWNLOAD THE IMAGE 
console.log(download)
download.addEventListener("click",()=>{
    const link = document.createElement('a');
            dataUrl = canvas.toDataURL("image/png")
            link.href = canvas.toDataURL('image/png');
            link.download = 'signature.png';
            link.textContent = 'Download Signature';
            link.style.display = 'block';

            // Append to DOM
            document.querySelector('.download-container').appendChild(link)
})
document.querySelector("#retrieve").addEventListener("click", () => {
    if (!dataUrl) {
        console.log("No signature has been saved yet.");
        return;
    }
    const img = new Image();
    img.src = dataUrl;
    img.alt = "Previous work";
    img.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        previewContainer.innerHTML = '<p>Signature restored to canvas.</p>';
    };
    img.onerror = () => {
        console.log("Failed to load the saved signature.");
    };
});

