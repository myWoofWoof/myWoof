const sizeOptions = document.querySelectorAll('.size-option');
const colorOptions = document.querySelectorAll('.color-option');
const priceText = document.querySelector('.price p');
const sellText = document.querySelector('.price span');
// Устанавливаем размер "S" в качестве выбранного по умолчанию
sizeOptions.forEach(sizeOption => {
  if (sizeOption.textContent === "S") {
    sizeOption.classList.add('selected');
  }
});

function showColorsBySize(size) {
  colorOptions.forEach(colorOption => {
    colorOption.style.display = 'none';
    if (colorOption.dataset.size === size) {
      colorOption.style.display = 'flex';
      const colors = colorOption.dataset.colors.split(',');
      colorOption.innerHTML = '';
      colors.forEach(color => {
        const dot = document.createElement('div');
        dot.style.backgroundColor = color;
        dot.classList.add('color-dot');
        colorOption.appendChild(dot);
      });
    }
  });

  // Меняем цену в зависимости от выбранного размера
  switch (size) {
    case 'S':
      priceText.textContent = '$49.00';
      sellText.textContent = '$70.00';
      break;
    case 'M':
      priceText.textContent = '$54.00';
      sellText.textContent = '$84.00';
      break;
    case 'L':
      priceText.textContent = '$56.00';
      sellText.textContent = '$91.00';
      break;
    default:
      break;
  }
}

// Показываем цвета и меняем цену при загрузке страницы
showColorsBySize('S');

sizeOptions.forEach(sizeOption => {
  sizeOption.addEventListener('click', function() {
    if (document.querySelector('.size-option.selected')) {
      document.querySelector('.size-option.selected').classList.remove('selected');
    }
    this.classList.add('selected');
    showColorsBySize(this.textContent);
  });
});