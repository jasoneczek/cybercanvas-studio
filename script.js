const grid = document.querySelector('#grid');




// Sets up event listeners to enable drawing functionality
function setupGridEventListeners() {
  let isDrawing = false;
  const boxes = document.querySelectorAll('.box');

  boxes.forEach(box => {
    box.addEventListener('mousedown', () => {
      isDrawing = true;
      //draw(box);
      console.log(isDrawing);
    })
    box.addEventListener('mouseup', () => {
      isDrawing = false;
      //draw(box);
      console.log(isDrawing);
    })
    box.addEventListener('mouseover', () => {
      if (isDrawing) {
        //draw(box);
      }
    })
  })
}

// Changes number of rows and columns based on input value
function changeGridSize(value) {
  gridSize = document.querySelector('#gridSize').textContent = `${value} X ${value}`;
  createGrid(value);
}

// Creates a grid of specified size and sets up event listeners
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
  setupGridEventListeners();
}

createGrid(16);