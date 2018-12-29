import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Loadable from "react-loadable";

function loadBrick(brick) {
  return Loadable({
    loader: () => import(`./${brick.module}`),
    loading: props =>
      props.error ? (
        <div>Failed to load brick[{brick.module}]</div>
      ) : (
        <div>Loading brick[{brick.module}] ...</div>
      )
  });
}

class BrickBase extends React.Component {
  constructor(props) {
    super(props);
    let brickName = this.__proto__.constructor.name;
    this.handlers = {};
    let parentHandlers = this.props.handlers.parent || [];
    parentHandlers.map(f => {
      if (typeof f === "function") {
        // remove function name prefix "bound " since function is bound with parent
        this.handlers[f.name.replace("bound ", "")] = f;
      }
      return true;
    });
    let localHandlers = this.props.handlers.local || [];
    localHandlers.map(f => (this.handlers[f.name] = f.bind(this)));
    this.state = props.initState;
    // pre-load sub-bricks
    let bricks = props.bricks || [];
    this.bricks = {};
    bricks.map(brick => {
      if (brick.data.handlers && brick.data.handlers.parentNames) {
        let parentHandlers = [];
        brick.data.handlers.parentNames.map(fname =>
          parentHandlers.push(this.handlers[fname])
        );
        // adding handler functions
        brick.data.handlers.parent = parentHandlers;
      }
      let BrickComp = loadBrick(brick);
      if (brick.data.styles) {
        BrickComp = withStyles(brick.data.styles)(BrickComp);
      }
      // mapping state to props (definied in fromState in brick data)
      let getState = (fromState = {}) => {
        let state = {};
        for (let key in fromState) {
          state[key] = this.state[fromState[key]];
        }
        return state;
      };
      this.bricks[brick.name] = () => (
        <BrickComp {...brick.data} {...getState(brick.data.fromState)} />
      );
      return true;
    });
  }
}

export default BrickBase;
