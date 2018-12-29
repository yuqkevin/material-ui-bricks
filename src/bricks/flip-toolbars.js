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
            return (
              <Textbar
                content={props.message}
                key={key}
                wrapper={item.wrapper}
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
    flex: "1 1 auto",
    justifyContent: "flex-end",
    color: theme.palette.text.secondary
  }
});

class FlipToolbars extends BrickBase {
  render() {
    const { wrapper, toolbars, classes, selectedToolbar } = this.props;
    const Wrapper = wrapper || Toolbar;
    return (
      <Wrapper className={classes.root}>
        <SelectedToolbar
          toolbar={toolbars[selectedToolbar]}
          selectedToolbar={selectedToolbar}
          handlers={this.handlers}
          params={this.state}
        />
      </Wrapper>
    );
  }
}
FlipToolbars.defaultProps = {
  selectedToolbar: 0
};
FlipToolbars.propTypes = {
  classes: PropTypes.object.isRequired,
  toolbars: PropTypes.array.isRequired,
  wrapper: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  selectedToolbar: PropTypes.number.isRequired,
  handlers: PropTypes.object, // {local: [], parent: []}
  initState: PropTypes.object //init state
};
export default withStyles(styles)(FlipToolbars);
