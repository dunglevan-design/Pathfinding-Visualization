
export function BFS(startNode, endNode, grid){
    const numberofrows = grid.length;
    const numberofcols = grid[0].length;
    const queue = []
    var visited = Fillvisited(numberofrows,numberofcols)
    const visitedNodeinOrder = []
    var isFound = false;

    queue.push(startNode)
    visitedNodeinOrder.push(startNode)
    visited[startNode.row][startNode.col] = true;
    while (queue.length > 0 && !isFound){
        const currentNode = queue.shift()
        const Neighbors = FindNeighbors(currentNode, visited, numberofrows, numberofcols); //Find Univisted Neighbors
        Neighbors.forEach(NeighborNode => {
            if(!grid[NeighborNode.row][NeighborNode.col].isWall){
                visited[NeighborNode.row][NeighborNode.col] = true;
                visitedNodeinOrder.push(grid[NeighborNode.row][NeighborNode.col])
                grid[NeighborNode.row][NeighborNode.col].previousNode = currentNode;
                if(grid[NeighborNode.row][NeighborNode.col] === endNode) isFound = true;
                else {
                    queue.push(grid[NeighborNode.row][NeighborNode.col])
                }
            }
        });
    }

    return visitedNodeinOrder

}
export function Fillvisited(numberofrows, numberofcols){
    const visited = []
    for (let row = 0; row < numberofrows; row++) {
        const visitedrow = [];
        for (let col = 0; col < numberofcols; col++) {
          visitedrow.push(false);
        }
        visited.push(visitedrow)
      }
      return visited
}
export function FindNeighbors(node, visited, numberofrows, numberofcols) {
    const r = node.row,
      c = node.col;
    const Neighbors = [];
    if(((r - 1) >= 0) && !visited[r - 1][c]){
       Neighbors.push({ row: r - 1, col: c })
    }
      
    if(((c - 1) >= 0) && !visited[r][c - 1]){
       Neighbors.push({ row: r, col: c - 1 })
    }
  
    if(((r + 1) <= numberofrows-1) && !visited[r + 1][c]){
       Neighbors.push({ row: r + 1, col: c })
    }
    if(((c + 1) <= numberofcols-1) && !visited[r][c + 1]){
       Neighbors.push({ row: r, col: c + 1 })
    }
    return Neighbors;
  }

export function getNodesInShortestPathOrderBFS(finishNode){
    const NodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null){
        NodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return NodesInShortestPathOrder;
}
  