import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { withStyles } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles/colorManipulator";

import SimpleToolbar from "../bricks/simple-toolbar";

// Sample data
const sampleToolbarItems = [
  {
    type: "text-box",
    content: function() {
      return `${this.state.message}`;
    },
    wrapper: "span",
    props: {
      style: { paddingRight: "1em" }
    }
  },
  {
    type: "icon-button",
    icon: <FilterListIcon />,
    title: "Select Rows",
    events: [
      {
        trigger: "onClick",
        handler: "sayHi"
      }
    ]
  },
  {
    type: "icon-button",
    icon: <DeleteIcon />,
    title: "Delete",
    events: [
      {
        trigger: "onClick",
        handler: "deleteMessage"
      }
    ]
  }
];

const sampleHandlers = [
  function sayHi() {
    this.setState({ message: "Hello" });
  },
  function deleteMessage() {
    if (window.confirm("Reset message?")) {
      this.setState({ message: "" });
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
