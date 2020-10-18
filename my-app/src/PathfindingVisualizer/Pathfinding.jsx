import React, { Component } from "react";
import Node from "./Node/Node";
import Dijkstra, { getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { FaAndroid, FaAngleRight, FaEye, FaFlag} from "react-icons/fa";


import "./Pathfinding.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseisPressed: false,
      addWallisClicked: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid: grid });
  }
  animateDijkstra(visitedNodesInOrder, NodesInShortestPathOrder){
    for (let i = 1; i <= visitedNodesInOrder.length-1; i++) {
       if (i === visitedNodesInOrder.length-1){
         setTimeout(() => {
          this.animateShortestPath(NodesInShortestPathOrder);
         },10*i)
         return;                   
       }
       setTimeout(() => {
         const node = visitedNodesInOrder[i];
         document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
       },10*i)
    }
  }
  animateShortestPath(NodesInShortestPathOrder){
    for (let i = 1; i < NodesInShortestPathOrder.length-1; i++){
      setTimeout(() => {
        const node = NodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-onPath'
      }, 50*i)
    }

  }

  visualizeDijkstra(){
    const grid = this.state.grid;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = Dijkstra(startNode, finishNode, grid);
    const NodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, NodesInShortestPathOrder);
  }

  ClearGrid(){
      const grid = this.state.grid.slice();
      for(let row = 0; row < grid.length; row++){
          for (let col = 0; col < grid[0].length; col++){
            const Node = document.getElementById(`node-${row}-${col}`).className
            if(Node !== 'node node-start' && Node !== 'node node-finish'){
                document.getElementById(`node-${row}-${col}`).className = "node"
            }    
          }
      }
      const newgrid = getInitialGrid();
      this.setState({
          grid: newgrid,
          mouseisPressed : false,
      })

  }

  addWall(){
    if(this.state.addWallisClicked){
      this.setState({
        addWallisClicked: false,
      })
    }
    else {
      this.setState({
        addWallisClicked : true,
      })
    }
  }

  render() {
    const { grid } = this.state;
    let gridtorender;
    if (grid) {
      gridtorender = grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { isStart, isFinish } = node;
              return (
                <Node
                  key={nodeIdx}
                  isStart={isStart}
                  isFinish={isFinish}
                  row = {rowIdx}
                  col = {nodeIdx}
                  isWall = {node.isWall}
                  onMouseDown = {(row,col) => this.handleMouseDown(row,col)}
                  onMouseEnter = {(row,col) => this.handleMouseEnter(row,col)}
                  onMouseUp={(row,col) => this.handleMouseUp(row, col)}
                ></Node>
              );
            })}
          </div>
        );
      });
    }
    return (
      <div className = "Page">
        <div className = "taskbar">          
           <div class="navbar">
              <a onClick = {() => this.ClearGrid()}>
                 Clear Grid 
                 <div className = "highlighter"></div>
              </a>
              <a onClick = {() => this.addWall()} > Add Wall</a>           
           </div>
           <div class="legendbar">
              <a href ="#"><FaAngleRight className = "icons"></FaAngleRight>Start Node</a>
              <a href ="#"><FaFlag className = "icons"></FaFlag>End Node</a>
              <a href ="#"><div className = "nodeWall"></div>Wall Node</a>
              <a><div className = "nodevisited"></div>Visited Node</a>
              <a><div className = "nodeonPath"></div>Shortest Path</a>
           </div>
           <button className = "visualizebutton" onClick = {() => this.visualizeDijkstra()}>Visualize!</button>
        </div>       
        <div className="grid">{gridtorender}</div>
    </div>);
  }


  handleMouseUp(row,col){
     //update the grid.
     const newGrid = this.state.grid.slice();
     for (let r = 0; r < newGrid.length; r++){
       for (let c = 0; c < newGrid[0].length; c++){
          if(document.getElementById(`node-${r}-${c}`).className === "node node-wall"){
            const newWallNode = createNode(c,r)
            newWallNode.isWall = true
            newGrid[r][c] = newWallNode
          } 
       }
     }
     this.setState({
       mouseisPressed: false,
       grid : newGrid
      })
     
  }
  handleMouseEnter(row,col){
    if(!this.state.mouseisPressed) return;
    const Node = document.getElementById(`node-${row}-${col}`).className
    if(Node !== 'node node-start' && Node !== 'node node-finish'){
        document.getElementById(`node-${row}-${col}`).className = "node node-wall"
    } 
  }


  handleMouseDown(row,col){
    if(!this.state.addWallisClicked) return;
    const Node = document.getElementById(`node-${row}-${col}`).className
    if(Node !== 'node node-start' && Node !== 'node node-finish'){
        document.getElementById(`node-${row}-${col}`).className = "node node-wall"
    }    
    this.setState({
        mouseisPressed : true,
    })
  }
  
}


const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 30; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col,row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    previousNode: null,
    isWall: false,
  }
} 