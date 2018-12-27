import React from "react";
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
    this.handlers = {};
    let parentHandlers = this.props.handlers.parent || [];
    parentHandlers.map(f => {
      if (typeof f === "function") {
        // remove function name prefix "bound " since function is bound with parent
        this.handlers[f.name.replace("bound ", "")] = f;
      }
    });
    let localHandlers = this.props.handlers.local || [];
    localHandlers.map(f => (this.handlers[f.name] = f.bind(this)));
    this.state = props.initState;
    // pre-load sub-bricks
    let bricks = props.bricks || [];
    this.bricks = {};
    bricks.map(
      brick =>
        (this.bricks[brick.name] = {
          component: loadBrick(brick),
          data: brick.data
        })
    );
  }

  handlerInject(TargetComponent, handlers) {
    return class extends React.Component {
      render() {
        return <TargetComponent parentHandlers={handlers || []} />;
      }
    };
  }
}

export default BrickBase;
