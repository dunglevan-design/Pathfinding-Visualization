//import {DFS, getNodesInShortestPathOrderDFS} from "./DFS.js"
const DFS = require('./DFS.js')


 const number = 5;
 const nodes = [];
 for (let row = 0; row < 2; row++) {
   const currentrow = [];
   for (let col = 0; col < 3; col++) {
     const currentNode = {
       col,
       row,
       isStart: row === 0 && col === 0,
       isFinish: row === 1 && col === 2,
       previousNode : null
     };
     currentrow.push(currentNode);
   }
   nodes.push(currentrow);
 }
 var startNode, endNode;
 nodes.forEach((row) => {
  row.forEach((node) => {
     if (node.isStart) startNode = node;
     else if (node.isFinish) endNode = node;
   });
 });
 const ReceivedvisitedNodeinOrder = (DFS.DFS(startNode, endNode, nodes));
 console.log(ReceivedvisitedNodeinOrder)