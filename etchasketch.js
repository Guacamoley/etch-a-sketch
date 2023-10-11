function makeGrid(rows, columns) {
  const container = document.getElementById("grid-container");
  const gridSizeDiv = document.getElementById("gridSize");
  gridSizeDiv.textContent = `${rows} x ${columns}`;

  container.style.setProperty("--rows", rows);
  container.style.setProperty("--columns", columns);

  for (let i = 0; i < rows * columns; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.classList.add("grid-square");
    container.appendChild(gridSquare);
  }

  const gridSquares = document.querySelectorAll(".grid-square");
  let isDrawing = false;

  gridSquares.forEach((square) => {
    square.addEventListener("mouseenter", draw);
    square.addEventListener("mousedown", () => {
      isDrawing = true;
    });
    square.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  });

  function draw(event) {
    if (isDrawing) {
      const color = getColor();
      event.target.style.backgroundColor = color;
    }
  }

  function getColor() {
    const colorPicker = document.querySelector(".color-picker");
    return colorPicker.value;
  }

  // Add event listeners for the mode buttons (color, rainbow, eraser) and clear button.
  const colorButton = document.getElementById("colorButton");
  colorButton.addEventListener("click", () => {
    // Implement color mode functionality.
  });

  const rainbowButton = document.getElementById("rainbowButton");
  rainbowButton.addEventListener("click", () => {
    // Implement rainbow mode functionality.
  });

  const eraserButton = document.getElementById("eraserButton");
  eraserButton.addEventListener("click", () => {
    // Implement eraser mode functionality.
  });

  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", clearGrid);

  function clearGrid() {
    gridSquares.forEach((square) => {
      square.style.backgroundColor = "#F0F0F0"; // Set to the desired clear color.
    });
  }
}

makeGrid(32, 32);
