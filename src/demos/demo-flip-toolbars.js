/**
 * Brick Props:
 *    wrapper    Wrapper of Brick, default is Toolbar, can be any React element of HTML DOM
 *    initState  initial state of Brick from parent
 *    handlers   array of handler functions
 *    toolbars:  array of toolbar definition
 *      - name: default
 *        elements:
 *          - type
 *            title:
 *            icon            optional, for iconButton only
 *            handlers:
 *              - trigger     e.g. "onClick"
 *                handler     name in string if defined in handlers, otherwise should be an non-arrow function
 *                args        optional, for directly function call only.
 **/

import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import FilterListIcon from "@material-ui/icons/FilterList";
import { withStyles } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles/colorManipulator";

import FlipToolbar from "../bricks/flip-toolbars";

// Sample data
function iconButton(title, ItemIcon, handler) {
  return {
    title,
    type: "icon-button",
    icon: ItemIcon,
    events: [
      {
        trigger: "onClick",
        handler
      }
    ]
  };
}
function textBox(wrapper = "span") {
  return {
    type: "text-box",
    wrapper,
    content: function() {
      return this.state.message;
    },
    style: { paddingRight: "1em" }
  };
}
const sampleToolbars = [
  {
    name: "default",
    items: [
      textBox(),
      iconButton("Say Hi", <FilterListIcon />, "sayHi"),
      iconButton("To Deletion Bar", <DeleteIcon />, "toDelete")
    ]
  },
  {
    name: "deletion",
    items: [
      textBox(),
      iconButton("Say Hi", <DeleteIcon />, "doDelete"),
      iconButton("To Deletion Bar", <BorderColorIcon />, "cancelDelete")
    ]
  }
];

const sampleHandlers = [
  function toDelete() {
    this.handlers.flipTo(1);
    this.setState({ message: "Delete or Cancel?" });
  },
  function doDelete() {
    this.handlers.flipTo(0);
    this.setState({ message: "Deleted" });
  },
  function cancelDelete() {
    this.handlers.flipTo(0);
    this.setState({ message: "Cancelled" });
  },
  function sayHi() {
    this.setState({ message: this.state.message.length > 0 ? "" : "Hi" });
  }
];

const sampleInitStates = {
  message: ""
};
// end of sample data

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

function flipTo(selectedToolbar) {
  console.log("flipto:", selectedToolbar);
  this.setState({ selectedToolbar: selectedToolbar });
}
class BrickDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = sampleInitStates;
    this.flipTo = flipTo.bind(this);
  }
  render() {
    const sampleProps = {
      wrapper: Toolbar,
      toolbars: sampleToolbars,
      selectedToolbar: this.state.selectedToolbar,
      handlers: {
        local: sampleHandlers,
        parent: [this.flipTo]
      },
      styles: styles
    };
    return <FlipToolbar {...sampleProps} />;
  }
}
export default BrickDemo;
