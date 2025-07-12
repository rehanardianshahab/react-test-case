function diagonalDifference(matrix) {
    let primary = 0;
    let secondary = 0;
    const size = matrix.length;
  
    for (let i = 0; i < size; i++) {
      primary += matrix[i][i];
      secondary += matrix[i][size - 1 - i];
    }
  
    return Math.abs(primary - secondary);
}

const Matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(diagonalDifference(Matrix));
  