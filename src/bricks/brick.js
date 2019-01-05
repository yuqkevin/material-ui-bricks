import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Loadable from "react-loadable";

function loadBrick(module) {
  return Loadable({
    loader: () => import(`./${module}`),
    loading: props =>
      props.error ? (
        <div>Failed to load brick[{module}]</div>
      ) : (
        <div>Loading brick[{module}] ...</div>
      )
  });
}

/**
  brick configuration:
    name: <string>
    module: <string>
    data: {
      initState: <object>,
      fromState: {
        nameInState: nameInProps
        ...
      },
      styles: {}
      handlers: {
        local: [],
        parentNames: []
      },
      ....
    }
**/
function brickRender(brick) {
  let that = this || {};
  if (brick.data.handlers && brick.data.handlers.parentNames && that.handlers) {
    let parentHandlers = [];
    brick.data.handlers.parentNames.map(
      fname => that.handlers[fname] && parentHandlers.push(that.handlers[fname])
    );
    // adding handler functions
    brick.data.handlers.parent = parentHandlers;
  }
  // mapping state to props (definied in fromState in brick data)
  let getState = (fromState = {}) => {
    let state = {};
    for (let key in fromState) {
      if (that.state.hasOwnProperty(fromState[key])) {
        state[key] = that.state[fromState[key]];
      }
    }
    return state;
  };
  let BrickComp = loadBrick(brick.module);
  if (brick.data.styles) {
    BrickComp = withStyles(brick.data.styles)(BrickComp);
  }
  return () => (
    <BrickComp {...brick.data} {...getState(brick.data.fromState)} />
  );
}

class BrickBase extends React.Component {
  constructor(props) {
    super(props);
    //let brickName = this.__proto__.constructor.name;
    // 1. set handlers dictionary: this.handlers . (key => function)
    // 2. set parent handlers in definition with handler functions (in definition data)
    // 3. load child bricks  (this.bricks)
    this.handlers = {};
    this.bricks = {};

    // handlers: add parent without "bound" prefix, bounding local
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
    // load sub-bricks
    if (props.bricks) {
      this.brickRender = brickRender.bind(this);
      props.bricks.map(brick => {
        this.bricks[brick.name] = this.brickRender(brick);
        return true;
      });
    }
  }
}
export default BrickBase;
export { brickRender };
