export default function GridPoint(x, y, rows, cols, wallSquares) {
    this.x = x; //x location of the grid point
    this.y = y; //y location of the grid point
    this.f = 0; //total cost function
    this.g = 0; //cost function from start to the current grid point
    this.h = 0; //heuristic estimated cost function from current grid point to the goal
    this.neighbors = []; // neighbors of the current grid point
    this.parent = undefined; // immediate source of the current grid point
  
    // update neighbors array for a given grid point
    this.updateNeighbors = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i < cols - 1) {
        if(!wallSquares.includes(`${i+1},${j}`)){
            this.neighbors.push(grid[i + 1][j]);
        }
      }
      if (i > 0) {
        if(!wallSquares.includes(`${i-1},${j}`)){
            this.neighbors.push(grid[i - 1][j]);
        }
      }
      if (j < rows - 1) {
        if(!wallSquares.includes(`${i},${j+1}`)){
        this.neighbors.push(grid[i][j + 1]);
        }
      }
      if (j > 0) {
        if(!wallSquares.includes(`${i},${j-1}`)){
        this.neighbors.push(grid[i][j - 1]);
        }
      }
    };
}