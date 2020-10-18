 
import React, { Component } from "react";
import "./Node.css";
import { FaAndroid, FaAngleRight, FaFlag} from "react-icons/fa"
import { fas } from "@fortawesome/free-solid-svg-icons";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isFinish, isStart, row, col, isWall, onMouseDown, onMouseEnter, onMouseUp } = this.props;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    if(isStart)  return <div className={`node ${extraClassName}`} id = {`node-${row}-${col}`} onMouseDown = {() => onMouseDown(row,col)} onMouseEnter = {() => onMouseEnter(row, col)} onMouseUp = {() => onMouseUp(row,col)}><FaAngleRight className = 'icons'></FaAngleRight></div>
    if(isFinish) return <div className={`node ${extraClassName}`} id = {`node-${row}-${col}`} onMouseDown = {() => onMouseDown(row,col)} onMouseEnter = {() => onMouseEnter(row, col)} onMouseUp = {() => onMouseUp(row,col)}><FaFlag className = 'icons flag'></FaFlag></div>
    return <div className={`node ${extraClassName}`} id = {`node-${row}-${col}`} onMouseDown = {() => onMouseDown(row,col)} onMouseEnter = {() => onMouseEnter(row, col)} onMouseUp = {() => onMouseUp(row,col)}></div>;
  }
}

export const DEFAULT_NODE = {
  row: 0,
  col: 0,
};