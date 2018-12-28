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
import BrickBase from "./brick";

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

class FlipToolbars extends BrickBase {
  render() {
    const { wrapper, toolbars, classes } = this.props;
    const Wrapper = wrapper || Toolbar;
    return (
      <Wrapper
        className={classNames(classes.root, {
          [classes.highlight]: this.state.highlight
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
FlipToolbars.propTypes = {
  classes: PropTypes.object.isRequired,
  toolbars: PropTypes.array.isRequired,
  wrapper: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  handlers: PropTypes.object, // {local: [], parent: []}
  initState: PropTypes.object //init state
};
export default withStyles(styles)(FlipToolbars);
