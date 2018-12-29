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
import classNames from "classnames";
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
  subtitle: {
    paddingLeft: theme.spacing.unit * 3
  },
  message: {
    paddingLeft: theme.spacing.unit * 3,
    color: theme.palette.secondary.main
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

class TableWithToolbar extends BrickBase {
  render() {
    const { classes, title, subtitle } = this.props;
    let message = this.state.message || "";
    if (typeof message === "string") {
      message = { text: message, highlight: false };
    }
    return (
      <Paper className={classes.root}>
        <Toolbar className={classes.default}>
          <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
              {title}
            </Typography>
          </div>
          <div className={classes.subtitle}>
            <Typography>{subtitle}</Typography>
          </div>
          <div className={classes.message}>
            <Typography
              className={classNames({
                [classes.highlight]: message.highlight || false
              })}
            >
              {message.text}
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
  handlers: { local: [], parent: [] },
  subtitle: "",
  message: ""
};
TableWithToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // {text: <message text>, highlight: <bool>}
  bricks: PropTypes.array,
  handlers: PropTypes.object, // {local: [], parent: []}
  initState: PropTypes.object //init state
};

export default withStyles(styles)(TableWithToolbar);
