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
const sampleToolbars = [
  {
    name: "default",
    elements: [
      {
        type: "dynamic-text",
        content: params => `${params.message || ""}`,
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
            handler: "flipTo",
            args: [1]
          }
        ]
      }
    ]
  },
  {
    name: "deletion",
    elements: [
      {
        type: "dynamic-text",
        content: params => `${params.selectedRows} rows selected`,
        wrapper: "span",
        props: {
          style: { paddingRight: "1em" }
        },
        events: [
          {
            trigger: "onClick",
            handler: "flipTo",
            args: [0]
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
            handler: "flipTo",
            args: [0]
          }
        ]
      },
      {
        type: "icon-button",
        icon: <BorderColorIcon />,
        title: "Edit content",
        events: [
          {
            trigger: "onClick",
            handler: "alertFlip"
          }
        ]
      }
    ]
  }
];
const sampleHandlers = [
  function flipTo(idx) {
    if (idx === 1) {
      let message = "";
      if (this.state.selectedRows === 0) {
        message = "No row selected";
      }
      this.setState({ selectedToolbar: idx, message });
    } else {
      this.setState({
        selectedToolbar: idx,
        selectedRows: 0,
        message: `Thanks #${this.state.selectedToolbar}!`
      });
    }
  },
  function sayHi(evt, props) {
    this.setState({
      message: `Hi ${props.button.title}!, 5 rows have been selected.`,
      selectedRows: 5
    });
  },
  function alertFlip(evt, props) {
    alert("trigger customer handler and call built-in handler");
    this.handlers.flipTo(0);
  }
];
const sampleInitStates = {
  eventSource: "local",
  selectedRows: 0,
  selectedToolbar: 0,
  highlight: false,
  message: ""
};
// end of sample data

// Definition
const SampleProps = {
  toolbars: sampleToolbars,
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
  return <FlipToolbar {...SampleProps} />;
}
export default withStyles(styles)(BrickDemo);
