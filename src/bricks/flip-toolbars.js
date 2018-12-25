/**
 * Brick Props:
 *    wrapper    Wrapper of Brick, default is Toolbar, can be any React element of HTML DOM
 *    initState  initial state of Brick from parent
 *    withClasses  customized classes from parent
 *    handlers   dictionary of handler functions
 *    toolbars:  array of toolbar definition
 *      - name: default
 *        elements:
 *          - type
 *            title:
 *            icon            optional, for iconButton only
 *            handlers:
 *              - trigger     e.g. "onClick"
 *                handler     name in string if defined in handlers, otherwise should be an non-arrow function
 *                args        optional, array of parameters for directly function call only.
 **/

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import { IconButtonWithTooltip, Textbar } from "./materials";

function SelectedToolbar(props) {
  const toolbar = props.toolbar;
  return (
    <div>
      {toolbar.elements.map((item, idx) => {
        let key = "flip-toolbar-" + props.pos + "-" + idx;
        switch (item.type) {
          case "icon-button":
            return (
              <IconButtonWithTooltip
                button={item}
                handlers={props.handlers}
                key={key}
              />
            );
          case "dynamic-text":
            let content = item.content(props.params);
            return (
              <Textbar
                content={content}
                key={key}
                wrapper={item.wrapper}
                props={item.props || {}}
              />
            );
          default:
            return <div key={key}>Unknown Item type {item.type}</div>;
        }
      })}
    </div>
  );
}

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    flex: "1 1 100%",
    justifyContent: "flex-end",
    color: theme.palette.text.secondary
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main
        }
      : {
          color: theme.palette.text.primary
        }
});

class Brick extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = {};
    this.props.handlers.map(f => (this.handlers[f.name] = f.bind(this)));
    this.state = props.initState;
  }
  /**
  componentDidUpdate(prevProps) {
    let changed = false;
    for (let key in this.props.initState) {
      if (this.props.initState[key] !== this.state[key]) {
        // Any changes in props.initState will override current state with initState in props
        // CAUTION!!! You're using "Derived State", please design state carefully, otherwise may cause issues:
        //   1. Breaking rule of single source of truth (both props and local event may cause state changes)
        //   2. Will lose local state updates (overlapped parts)
        changed = true;
      }
    }
    if (changed) {
      this.setState(this.props.initState);
    }
  }
**/
  render() {
    const { wrapper, toolbars, withClasses } = this.props;
    const classes = Object.assign(this.props.classes, withClasses);
    const Wrapper = wrapper || Toolbar;
    return (
      <Wrapper
        className={classNames(classes.root, {
          [classes.highlight]: this.state.selectedToolbar > 0
        })}
      >
        <SelectedToolbar
          toolbar={toolbars[this.state.selectedToolbar]}
          pos={this.state.selectedToolbar}
          handlers={this.handlers}
          params={this.state}
        />
      </Wrapper>
    );
  }
}
Brick.propTypes = {
  classes: PropTypes.object.isRequired,
  toolbars: PropTypes.array.isRequired,
  wrapper: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  handlers: PropTypes.array,
  withClasses: PropTypes.object, //for customization
  initState: PropTypes.object //init state
};
export default withStyles(styles)(Brick);
