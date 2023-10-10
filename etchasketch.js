function makeGrid(rows, columns) {
  const container = document.getElementById("grid-container");
  const gridSizeDiv = document.getElementById("gridSize");
  gridSizeDiv.textContent = `${rows}x${columns}`;

  container.style.setProperty("--rows", rows);
  container.style.setProperty("--columns", columns);

  for (let i = 0; i < rows * columns; i++) {
    const gridSquare = document.createElement("div");
    gridSquare.classList.add("grid-square");
    container.appendChild(gridSquare);
  }
}

makeGrid(32, 32);
