/*import {BFS, Fillvisited, FindNeighbors} from './BFS'


test('Sum correctly', () => {
    const ReceivedVisited = Fillvisited(2,3)
    expect(ReceivedVisited).toEqual([[false,false,false], [false,false,false]])
})

test('Find correct Neighbor', () => {
    const visited = Fillvisited(2,3)
    const node = {
        row : 0,
        col : 0,
    }
    const ReceivedNeighbor = FindNeighbors(node, visited, 2, 3)
    const ExpectedNeighbor = [{row: 0, col: 1}, {row : 1, col: 0}]
    expect(ReceivedNeighbor).toEqual(
        expect.arrayContaining(ExpectedNeighbor)
        )
})

test('Correct VisitedPath', () => {
    const grid = getInitialGrid()
    const startNode = grid[0][0]
    const endNode   = grid[1][2]
    const ReceivedPath = BFS(startNode, endNode, grid)
    expect(ReceivedPath).toEqual(
        expect.arrayContaining([grid[0][0], grid[1][0], grid[0][1], grid[1][1], grid[0][2], grid[1][2]])
        
        )
})

const createNode = (col,row) => {
    return {
      col,
      row,
      isStart: row === 0 && col === 0,
      isFinish: row === 1 && col === 2,
      previousNode: null,
      isWall: false,
    }
  } 
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 2; row++) {
      const currentRow = [];
      for (let col = 0; col < 3; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };*/


