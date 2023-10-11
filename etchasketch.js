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

  const colorButton = document.getElementById("colorButton");
  colorButton.addEventListener("click", () => {
    isRainbowMode = false;
    isEraserMode = false;

    colorButton.classList.add("active-button");
    rainbowButton.classList.remove("active-button");
    eraserButton.classList.remove("active-button");
  });

  let isRainbowMode = false;

  const rainbowButton = document.getElementById("rainbowButton");
  rainbowButton.addEventListener("click", () => {
    isRainbowMode = true;
    isEraserMode = false;

    colorButton.classList.remove("active-button");
    rainbowButton.classList.add("active-button");
    eraserButton.classList.remove("active-button");
  });

  isEraserMode = false;

  const eraserButton = document.getElementById("eraserButton");
  eraserButton.addEventListener("click", () => {
    isEraserMode = !isEraserMode;

    colorButton.classList.remove("active-button");
    rainbowButton.classList.remove("active-button");
    eraserButton.classList.add("active-button");
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
