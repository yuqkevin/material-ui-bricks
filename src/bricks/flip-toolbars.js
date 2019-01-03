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
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

import SimpleToolbar from "./simple-toolbar";
import BrickBase from "./brick";

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
    const {
      wrapper,
      handlers,
      toolbars,
      classes,
      selectedToolbar
    } = this.props;
    const Wrapper = wrapper || Toolbar;
    const toolbar = toolbars[selectedToolbar];
    return (
      <Wrapper className={classes.root}>
        <SimpleToolbar
          items={toolbar.items}
          handlers={handlers}
          initState={{ message: "" }}
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
  wrapper: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  selectedToolbar: PropTypes.number.isRequired,
  handlers: PropTypes.object, // {local: [], parent: []}
  initState: PropTypes.object //init state
};
export default withStyles(styles)(FlipToolbars);
