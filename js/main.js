let saturate = document.getElementById('saturate')
let contrast = document.getElementById('contrast')
let brightness = document.getElementById('brightness')
let sepia = document.getElementById('sepia')
let grayscale = document.getElementById('grayscale')
let blur = document.getElementById('blur')
let hueRotate = document.getElementById('hue-rotate')

let upload = document.getElementById('upload')
let download = document.getElementById('download')
let img = document.getElementById('img')

let reset = document.querySelector('span')
let imgBox = document.querySelector('.img-box')

//We Use Canvas To Be Able To Download The Filtered Image, Cause JS Download Raw Image Not Filtered
//Canvas Draws The Image In 2D, Then Download Canvas
let canvas = document.getElementById('canvas')
let conText = canvas.getContext('2d')


//Disappear Image Box, Reset and Download Buttons
window.onload = () =>{
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
}

//When Upload an Image, Do The Following:
upload.onchange = () =>{
    //1- Reset All Past Values
    resetValues()
    //2- Appear Image Box, Reset and Download Buttons
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';
    //3- Read The Image
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = () =>{img.src=file.result;}
    img.onload = ()=>{
        //4- When Image Uploaded, Draw A Canvas
        canvas.width = img.width
        canvas.height = img.height
        conText.drawImage(img,0,0,canvas.width,canvas.height)
        //-5 Hide Image
        img.style.display='none'
    }
}

//Use Filters
let filters = document.querySelectorAll('ul li input')
filters.forEach((filter) =>{
    filter.addEventListener('input',()=>{
        conText.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
        //Draw Image (Canvas) With Past Filters
        conText.drawImage(img,0,0,canvas.width,canvas.height)
    })
})

//Download Canvas As PNG
download.onclick = () =>{
    download.href = canvas.toDataURL()
}

//Function to Reset All Values And Draw The Raw Image
function resetValues(){
    conText.filter='none';
    saturate.value='100';
    contrast.value='100';
    brightness.value='100';
    sepia.value='0';
    grayscale.value='0';
    blur.value='0';
    hueRotate.value='0';
    //Draw Image (Canvas) With Past Filters
    conText.drawImage(img,0,0,canvas.width,canvas.height);
}
