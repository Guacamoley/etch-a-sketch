function makeGrid(rows, columns) {
  const sizeSlider = document.getElementById("sizeSlider");
  const container = document.getElementById("grid-container");
  const gridSizeDiv = document.getElementById("gridSize");

  // Clear the existing grid content by removing all child nodes
  container.innerHTML = "";

  gridSizeDiv.textContent = `${rows} x ${columns}`;
  container.style.setProperty("--rows", rows);
  container.style.setProperty("--columns", columns);

  for (let i = 0; i < rows * columns; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.classList.add("grid-square");
    container.appendChild(gridSquare);
  }

  let isDrawing = false;
  let isEraserMode = false;
  let isRainbowMode = false;

  function draw(event) {
    if (isDrawing) {
      if (isEraserMode) {
        event.target.style.backgroundColor = "#F0F0F0"; // Set to the desired "erase" color
      } else if (isRainbowMode) {
        const color = getRandomColor();
        event.target.style.backgroundColor = color;
      } else {
        const color = getColor();
        event.target.style.backgroundColor = color;
      }
    }
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getColor() {
    const colorPicker = document.querySelector(".color-picker");
    return colorPicker.value;
  }

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

  function clearGrid() {
    gridSquares.forEach((square) => {
      square.style.backgroundColor = "#F0F0F0";
    });
  }

  sizeSlider.addEventListener("input", () => {
    const gridSize = sizeSlider.value;
    gridSizeDiv.textContent = `${gridSize} x ${gridSize}`;
    clearGrid();
    makeGrid(gridSize, gridSize);
  });
}

makeGrid(32, 32);
