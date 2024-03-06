let currentMode = 'black';
const grid = document.querySelector('#grid');
const modeButtons = document.querySelectorAll('.mode-btn');
const clearButton = document.querySelector('#clearBtn');
const toggle = document.querySelector('#toggle');
const modeDisplay = document.querySelector('#modeDisplay');

// Button event listeners
modeButtons.forEach(modeButton => modeButton.addEventListener('click', function(e) {
  setCurrentMode(e);
  console.log('Current mode:', currentMode);
  displayDrawingMode(currentMode);
}));
clearButton.addEventListener('click', clearGrid);
toggle.addEventListener('click', toggleGridlines);

// Display current drawing mode
function displayDrawingMode(currentMode) {
  modeDisplay.className = 'mode-display ' + currentMode;
}

// Toggle grid lines on/off
function toggleGridlines() {
  toggle.classList.toggle('active');
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.classList.toggle('nolines');
  })
}

// Clear grid
function clearGrid() {
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.style.backgroundColor = 'transparent';
  })
}

// Generate eraser mode
function getEraser(box) {
  box.style.backgroundColor = 'transparent';
}

// Generate shading mode with grayscale
function getGrayscale(box) {
  let currentColor = box.style.backgroundColor; // Retrieves current background color

  // Check if the box has no color or is transparent, set default light gray color
  const defaultGray = (
    currentColor === null || 
    currentColor === '' || 
    currentColor === 'transparent')
    ? `rgb(211, 211, 211)`  // Default to light gray if box has no color
    : currentColor;  // Otherwise, use the current color of the box

  const rgbValues = defaultGray.match(/\d+/g);

  // Check if RGB values were extracted 
  if (rgbValues !== null) {
    const rgbNumbers = rgbValues.map(Number);  // Convert RGB values to numbers

    // Calculate a darker shade of gray based on the existing RGB components
    const newGray = `rgb(
      ${Math.max(rgbNumbers[0] - 10, 0)},
      ${Math.max(rgbNumbers[1] - 10, 0)},
      ${Math.max(rgbNumbers[2] - 10, 0)})`;

    return newGray;  // Return the new darker shade of gray
  } else {
    return defaultGray;  // Return the default color if RGB values couldn't be extracted
  }
}

// Generate a random RGB color for Rainbow mode
function getRandomRgbColor() {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
  return `rgb(${R}, ${G}, ${B})`;
}

// Set current drawing mode based on clicked mode button
function setCurrentMode(e) {
  currentMode = e.target.getAttribute('data-mode') || currentMode;
}

// Apply current drawing mode to grid box
function draw(box) {
  if (currentMode === 'shade') {
    box.style.backgroundColor = getGrayscale(box);
  } else if (currentMode === 'rgb') {
    box.style.backgroundColor = getRandomRgbColor();
  } else if (currentMode === 'erase') {
    box.style.backgroundColor = getEraser(box);
  } else {
    box.style.backgroundColor = currentMode;
  }
}

// Sets up event listeners to enable drawing functionality
function setupGridEventListeners() {
  let isDrawing = false;
  const boxes = document.querySelectorAll('.box');

  boxes.forEach(box => {
    box.addEventListener('mousedown', () => {
      isDrawing = true;
      draw(box);
    })
    box.addEventListener('mouseup', () => {
      isDrawing = false;
    })
    box.addEventListener('mouseover', () => {
      if (isDrawing) {
      draw(box);
      }
    })
  })
}

// Changes number of rows and columns based on input value
function changeGridSize(value) {
  gridSize = document.querySelector('#gridSize').textContent = `${value}`;
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
displayDrawingMode(currentMode);