const grid = document.querySelector('#grid');



function changeGridSize(value) {
  gridSize = document.querySelector('#gridSize').textContent = `${value} X ${value}`;
  createGrid(value);
}

function createGrid(size) {
  const boxSize = 100 / size;

  grid.innerHTML = '';

  for (let i = 0; i < (size * size); i++) {
    const box = document.createElement("div");
    box.classList.add('box');
    box.style.width = `${boxSize}%`;
    box.style.height = `${boxSize}%`;
    grid.appendChild(box);
  }
}

createGrid(16);