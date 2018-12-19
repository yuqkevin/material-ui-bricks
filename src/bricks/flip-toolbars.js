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
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import FilterListIcon from "@material-ui/icons/FilterList";
import { IconButtonWithTooltip, Textbar } from "./materials";
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
      if (this.state.selectedRows === 0) {
        this.setState({ message: "No row selected" });
      } else {
        this.setState({ selectedToolbar: idx });
      }
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
const sampleStates = {
  selectedRows: 0,
  selectedToolbar: 0,
  message: ""
};
// end of sample data

// Definition
const DEFINITION = {
  default: {
    toolbars: sampleToolbars,
    wrapper: Toolbar, // to use HTML DOM as wrapper, it can be string like "div",
    handlers: sampleHandlers,
    states: sampleStates
  }
};

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

class Brick extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = {};
    let handlers = [...DEFINITION.default.handlers, ...(props.handlers || [])];
    handlers.map(f => (this.handlers[f.name] = f.bind(this)));
    this.state = Object.assign(
      DEFINITION.default.states,
      props.initState || {}
    );
  }

  render() {
    const { classes, wrapper, toolbars } = this.props;
    const Wrapper = wrapper;
    return (
      <Wrapper
        className={classNames(classes.root, {
          [classes.highlight]: this.state.selectedToolbar > 0
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
Brick.defaultProps = {
  toolbars: DEFINITION.default.toolbars,
  wrapper: DEFINITION.default.wrapper
};
Brick.propTypes = {
  classes: PropTypes.object.isRequired,
  toolbars: PropTypes.array.isRequired,
  wrapper: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  handlers: PropTypes.array,
  initState: PropTypes.object //init state, default is {}
};
export default withStyles(styles)(Brick);
