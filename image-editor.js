let img = document.getElementById("img");
let Saturate = document.getElementById("Saturate");
let Contrast = document.getElementById("Contrast");
let Brightness = document.getElementById("Brightness");
let Blur = document.getElementById("Blur");
let Sepia = document.getElementById("Sepia");
let Grayscale = document.getElementById("Grayscale");
let HueRotate = document.getElementById("Hue-rotate");
let download = document.getElementById("download");
let upload = document.getElementById("upload");
let reset = document.querySelector("span");
let imgBox = document.querySelector(".img-box");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

upload.onchange = function () {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
  };
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    img.style.display = "none";
    resetValue();
  };
};

let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", function () {
    ctx.filter = `
        saturate(${Saturate.value}%) 
        contrast(${Contrast.value}%)
        brightness(${Brightness.value}%)
        sepia(${Sepia.value}%)
        grayscale(${Grayscale.value})
        blur(${Blur.value}px)
        hue-rotate(${HueRotate.value}deg)
        `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

function resetValue() {
  img.style.filter = "none";
  ctx.filter = `
        saturate(100%) 
        contrast(100%)
        brightness(100%)
        sepia(0%)
        grayscale(0)
        blur(0px)
        hue-rotate(0deg)
        `;
  Saturate.value = "100";
  Contrast.value = "100";
  Brightness.value = "100";
  Sepia.value = "0";
  Blur.value = "0";
  Grayscale.value = "0";
  HueRotate.value = "0";
}

reset.onclick = resetValue;

download.onclick = function () {
  download.href = canvas.toDataURL();
};
