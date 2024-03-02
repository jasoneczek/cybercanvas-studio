const grid = document.querySelector('#grid');

function createGrid(size) {
  const boxSize = 100 / size;

  for (let i = 0; i < (size * size); i++) {
    const box = document.createElement("div");
    box.classList.add('box');
    box.style.width = `${boxSize}%`;
    box.style.height = `${boxSize}%`;
    grid.appendChild(box);
  }
}

createGrid(16);