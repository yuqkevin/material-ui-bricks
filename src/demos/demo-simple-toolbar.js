import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { withStyles } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles/colorManipulator";

import SimpleToolbar from "../bricks/simple-toolbar";
import { iconButton, textBox, getStateFn } from "../bricks/materials";

// Sample data
const sampleToolbarItems = [
  textBox(getStateFn("message")),
  iconButton("Say Hi", <FilterListIcon />, "sayHi"),
  iconButton("To Deletion", <DeleteIcon />, "deleteMessage")
];

const sampleHandlers = [
  function sayHi() {
    this.setState({ message: this.state.message ? "" : "Hello" });
  },
  function deleteMessage() {
    if (window.confirm("Delete?")) {
      this.setState({ message: "Deleted" });
    }
  }
];
const sampleInitStates = {
  message: ""
};
// end of sample data

// Definition
const SampleProps = {
  items: sampleToolbarItems,
  wrapper: Toolbar, // to use HTML DOM as wrapper, it can be string like "div",
  handlers: { local: sampleHandlers },
  initState: sampleInitStates
};

const styles = theme => ({
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        }
});

function BrickDemo(props) {
  return <SimpleToolbar {...SampleProps} />;
}
export default withStyles(styles)(BrickDemo);
