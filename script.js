const sizeOptions = document.querySelectorAll(".size-option");
const colorOptions = document.querySelectorAll(".color-option");
const priceText = document.querySelector(".price p");
const sellText = document.querySelector(".price span");
let selectedColor = null;

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
          selectedColor = this; // Обновляем выбранный цвет
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

const buyButton = document.getElementById("buyButton");

buyButton.addEventListener("click", function () {
  const selectedSize = document.querySelector(".size-option.selected");
  const selectedColorOption = document.querySelector(".color-option[data-size='" + selectedSize.textContent + "'] .color-dot.selected");

  let selectedInfo = {
    title: "Поводок My Woof",
    color: selectedColorOption.style.backgroundColor,
    size: selectedSize.textContent,
  };

  console.log(selectedInfo);
});

