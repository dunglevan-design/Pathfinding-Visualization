export function DFS(startNode, endNode, grid){
    const numberofrows = grid.length;
    const numberofcols = grid[0].length;
    var found = false;
    var visited = Fillvisited(numberofrows, numberofcols)
    const visitedNodeinOrder = []
    found = RecursiveSearchDFS(visitedNodeinOrder,startNode, endNode, grid, visited, numberofrows, numberofcols, found)
    return visitedNodeinOrder

}

export function RecursiveSearchDFS(visitedNodeinOrder, currentNode, endNode, grid, visited, numberofrows, numberofcols, found){
    visited[currentNode.row][currentNode.col] = true
    visitedNodeinOrder.push(currentNode)
    if (currentNode === endNode) return true;
    const Neighbors = FindNeighbors(currentNode, visited, numberofrows, numberofcols); //Find Univisted Neighbors
    //only if not found
    Neighbors.forEach(NeighborNode => {
        if(!grid[NeighborNode.row][NeighborNode.col].isWall && !found){
            grid[NeighborNode.row][NeighborNode.col].previousNode = currentNode
            found = RecursiveSearchDFS(visitedNodeinOrder, grid[NeighborNode.row][NeighborNode.col], endNode, grid, visited, numberofrows, numberofcols, found)
        }
    });
    return found;
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

export function getNodesInShortestPathOrderDFS(finishNode){
    const NodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null){
        NodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return NodesInShortestPathOrder;
}
//exports.DFS = DFS;

  
