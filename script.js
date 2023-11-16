const sizeOptions = document.querySelectorAll(".size-option");
const colorOptions = document.querySelectorAll(".color-option");
const priceText = document.querySelector(".price p");
const sellText = document.querySelector(".price span");
const buyButton = document.getElementById("buyButton");
const modal = document.getElementById("myModal");
const closeBtn = modal.querySelector(".close");
const submitBtn = modal.querySelector("#submitBtn");

let selectedColor = null;
let selectedInfo = {};

sizeOptions.forEach((sizeOption) => {
  if (sizeOption.textContent === "S") {
    sizeOption.classList.add("selected");
  }
});

function showColorsBySize(size) {
  colorOptions.forEach((colorOption) => {
    colorOption.style.display =
      colorOption.dataset.size === size ? "flex" : "none";
    if (colorOption.style.display === "flex") {
      colorOption.innerHTML = "";
      colorOption.dataset.colors.split(",").forEach((color, index) => {
        const dot = document.createElement("div");
        dot.style.backgroundColor = color;
        dot.classList.add("color-dot");
        if (index === 0) {
          dot.classList.add("selected");
          selectedColor = dot;
        }
        dot.addEventListener("click", function () {
          colorOption.querySelectorAll(".color-dot").forEach((dot) => {
            dot.classList.remove("selected");
          });
          this.classList.add("selected");
          selectedColor = this;
        });
        colorOption.appendChild(dot);
      });
    }
  });

  switch (size) {
    case "S":
      priceText.textContent = "$49.00";
      sellText.textContent = "$70.00";
      break;
    case "M":
      priceText.textContent = "$54.00";
      sellText.textContent = "$84.00";
      break;
    case "L":
      priceText.textContent = "$56.00";
      sellText.textContent = "$91.00";
      break;
    default:
      break;
  }
}

showColorsBySize("S");

sizeOptions.forEach((sizeOption) => {
  sizeOption.addEventListener("click", function () {
    if (document.querySelector(".size-option.selected")) {
      document
        .querySelector(".size-option.selected")
        .classList.remove("selected");
    }
    this.classList.add("selected");
    showColorsBySize(this.textContent);
    selectedColor = null;
  });
});

buyButton.addEventListener("click", function () {
  modal.style.display = "block";
  const selectedSize = document.querySelector(".size-option.selected");
  const selectedColorOption = document.querySelector(".color-option[data-size='" + selectedSize.textContent + "'] .color-dot.selected");

  selectedInfo = {
    title: "Поводок My Woof",
    color: selectedColorOption.style.backgroundColor,
    size: selectedSize.textContent,
  };
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

const phoneInput = document.getElementById("phoneInput");
phoneInput.addEventListener('keypress', function(e) {
  const key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
  const regex = /^[0-9()+-]+$/;
  if (!regex.test(key)) {
     e.preventDefault();
     return false;
  }
});

phoneInput.addEventListener('input', function() {
  const phoneRegex = /^[0-9()+-]*$/;
  if (!phoneRegex.test(phoneInput.value)) {
    phoneInput.style.color = 'red';
  } else {
    // phoneInput.style.color = 'black';
  }
});
submitBtn.addEventListener("click", function () {
  const nameInput = document.getElementById("nameInput").value;
  const phoneRegex = /^[0-9()+-]+$/;

  if (nameInput.trim() === "" || !phoneRegex.test(phoneInput.value)) {
    if (nameInput.trim() === "") {
      document.getElementById("nameInput").style.borderColor = "red";
    } else {
      document.getElementById("nameInput").style.borderColor = "";
    }
    if (!phoneRegex.test(phoneInput.value)) {
      phoneInput.style.borderColor = "red";
    } else {
      phoneInput.style.borderColor = "";
    }
  } else {
    selectedInfo.phone = phoneInput.value;
    selectedInfo.name = nameInput;
    console.log(selectedInfo);
    modal.style.display = "none";
  }
});
