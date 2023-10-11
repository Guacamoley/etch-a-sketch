function makeGrid(rows, columns) {
  // Declare variables for grid
  const sizeSlider = document.getElementById("sizeSlider");
  const container = document.getElementById("grid-container");
  const gridSizeDiv = document.getElementById("gridSize");

  // Clear the existing grid content by removing all child nodes
  container.innerHTML = "";

  // Change text content to the current grid size
  gridSizeDiv.textContent = `${rows} x ${columns}`;
  container.style.setProperty("--rows", rows);
  container.style.setProperty("--columns", columns);

  // Iterate through total number of grid cells and create the drawing area
  for (let i = 0; i < rows * columns; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.classList.add("grid-square");
    container.appendChild(gridSquare);
  }

  // Declare variables for drawing functions
  let isDrawing = false;
  let isEraserMode = false;
  let isRainbowMode = false;

  function draw(event) {
    // Checks if isDrawing is true
    if (isDrawing) {
      if (isEraserMode) {
        event.target.style.backgroundColor = "#F0F0F0"; // Set to the desired "erase" color
      } else if (isRainbowMode) {
        const color = getRandomColor(); // Set current color to a random color
        event.target.style.backgroundColor = color;
      } else {
        const color = getColor(); // Otherwise just use the current selected color
        event.target.style.backgroundColor = color;
      }
    }
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF"; // List of valid arguments for hex colors
    let color = "#";
    for (let i = 0; i < 6; i++) {
      // Loop through and randomly generate a color
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Gets the color from the color picker
  function getColor() {
    const colorPicker = document.querySelector(".color-picker");
    return colorPicker.value;
  }

  // Gets all the grid squares for event listening
  const gridSquares = document.querySelectorAll(".grid-square");

  gridSquares.forEach((square) => {
    square.addEventListener("mouseenter", draw);
    square.addEventListener("mousedown", () => {
      isDrawing = true;
    });
    square.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  });

  const colorButton = setupButton("colorButton");
  const rainbowButton = setupButton("rainbowButton");
  const eraserButton = setupButton("eraserButton");

  // Setup all buttons with one function
  function setupButton(id) {
    const button = document.getElementById(id);
    button.addEventListener("click", () => {
      isRainbowMode = id === "rainbowButton";
      isEraserMode = id === "eraserButton";

      colorButton.classList.remove("active-button");
      rainbowButton.classList.remove("active-button");
      eraserButton.classList.remove("active-button");

      button.classList.add("active-button");
    });
    return button;
  }

  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", clearGrid);

  // Sets the whole grid to one color
  function clearGrid() {
    gridSquares.forEach((square) => {
      square.style.backgroundColor = "#F0F0F0";
    });
  }

  sizeSlider.addEventListener("input", () => {
    const gridSize = sizeSlider.value;
    // Update text content after slider is moved
    gridSizeDiv.textContent = `${gridSize} x ${gridSize}`;
    clearGrid(); // Clear grid and print out a new one with the new size based on the slider
    makeGrid(gridSize, gridSize);
  });
}

makeGrid(32, 32);
