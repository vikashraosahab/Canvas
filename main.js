// BTNS 
let colorPicker = document.querySelector("#colorPicker")
let bgPicker = document.querySelector("#backgroundPicker")
let btns = document.querySelectorAll("button")
let canvas = document.querySelector("canvas")
let context = canvas.getContext("2d")

context.beginPath ()
context.fillStyle = "blue"
context.fillRect (2,5,200,10)
context.closePath ()    