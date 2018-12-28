/**
 * Table With Toolbar
 * .Title
 *  Toolbar (optional)
 *  Table
 *    EnhancedTableHeader (optional)
 *    TableBody
 *    PaginatedTableFooter (optional)
 *
 **/

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import BrickBase from "./brick";

const styles = theme => ({
  root: {
    width: "100%",
    textAlign: "right",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class TableWithToolbar extends BrickBase {
  render() {
    const { classes, title } = this.props;
    console.log(this.bricks);
    return (
      <Paper className={classes.root}>
        <Toolbar className={classes.default}>
          <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
              {title}
            </Typography>
          </div>
          {this.bricks.RightTopToolbar()}
        </Toolbar>
        <div className={classes.tableWrapper}>{this.bricks.MainTable()}</div>
      </Paper>
    );
  }
}

TableWithToolbar.defaultProps = {
  handlers: { local: [], parent: [] }
};
TableWithToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  bricks: PropTypes.array,
  handlers: PropTypes.object, // {local: [], parent: []}
  initState: PropTypes.object //init state
};

export default withStyles(styles)(TableWithToolbar);
