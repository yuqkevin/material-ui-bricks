/**
 * Toolbar
 **/

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

import { uiCell } from "./materials";
import BrickBase from "./brick";

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    flex: "1 1 auto",
    justifyContent: "flex-end",
    color: theme.palette.text.secondary
  }
});

class SimpleToolbar extends BrickBase {
  render() {
    const { wrapper, items, classes } = this.props;
    const Wrapper = wrapper || Toolbar;
    return (
      <Wrapper className={classes.root}>
        {items.map((item, idx) =>
          uiCell.bind(this)(item, {
            handlers: this.handlers,
            key: `simple-toolbar-${idx}`
          })
        )}
      </Wrapper>
    );
  }
}
SimpleToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  wrapper: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  handlers: PropTypes.object, // {local: [], parent: []}
  initState: PropTypes.object //init state
};
export default withStyles(styles)(SimpleToolbar);
