/**
Toolbars
  - name: default
    toolbar: <ToolbarDefault />
      icon:
      handler:
  - name: toolbar 1
    toolbar: <Toolbar1 />
  - name: toolbar 2
    toolbar: <Toolbar2 />
  - ...

events
  - name: to_toolbar1
    handler: <handler function>
  - name: to_toolbar2
    handler: <handler function>
  - name: to_toolbar3
    handler: <handler function>
  ...
  **/

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";

// Sample data
const sampleToolbars = [
  {
    name: "default",
    elements: [
      {
        type: "icon-button",
        icon: <FilterListIcon />,
        title: "To Delete",
        handlers: [
          {
            name: "onClick",
            handler: () => flipTo(1)
          }
        ]
      },
      {
        type: "icon-button",
        icon: <DeleteIcon />,
        title: "Delete",
        handlers: [
          {
            name: "onClick",
            handler: () => flipTo(1)
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
        handlers: [
          {
            name: "onClick",
            handler: () => flipTo(0)
          }
        ]
      },
      {
        type: "icon-button",
        icon: <DeleteIcon />,
        title: "Delete",
        handlers: [
          {
            name: "onClick",
            handler: () => flipTo(0)
          }
        ]
      },
      {
        type: "icon-button",
        icon: <BorderColorIcon />,
        title: "Edit content",
        handlers: [
          {
            name: "onClick",
            handler: () => flipTo(0)
          }
        ]
      }
    ]
  }
];

function flipTo(idx) {
  console.log(name);
  this.setState({ selectedToolbar: 1 });
}

function TextInToolbar(props) {
  return (
    <Typography color="inherit" variant="subtitle1">
      {props.message}
    </Typography>
  );
}
function IconButtonInToolbar(props) {
  let item = props.button;
  let opts = {};
  if (item.handlers) {
    item.handlers.map(evt => {
      opts[evt.name] = evt.handler;
      return true;
    });
  }
  flipTo = props.flipTo;
  return (
    <Tooltip title={item.title}>
      <IconButton aria-label={item.title} {...opts}>
        {item.icon}
      </IconButton>
    </Tooltip>
  );
}
function SelectedToolbar(props) {
  const toolbar = props.toolbar;
  const flipToolbarHandler = props.flipToolbarHandler;
  return (
    <div>
      {toolbar.elements.map((item, idx) => {
        let key = "flip-toolbar-" + props.pos + "-" + idx;
        switch (item.type) {
          case "icon-button":
            return (
              <IconButtonInToolbar
                flipTo={flipToolbarHandler}
                button={item}
                key={key}
              />
            );
          case "dynamic-text":
            let content = item.content(props.params);
            return <TextInToolbar content={content} key={key} />;
          default:
            return <div key={key}>Unknown Item type {item.type}</div>;
        }
      })}
    </div>
  );
}

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  actions: {
    textAlign: "right",
    flex: "1 1 100%",
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  },
  message: {
    float: "left",
    paddingLeft: "2em",
    paddingTop: "1em"
  }
});

class FlipToolBars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedToolbar: 0,
      selectedRows: 0
    };
    //flipTo = flipTo.bind(this);
  }

  flipToolbarHandler = idx => {
    this.setState({ selectedToolbar: idx });
  };
  render() {
    const { classes, toolbars, wrapper } = this.props;
    const myToolbars = toolbars || sampleToolbars;
    const Wrapper = wrapper || Toolbar;
    return (
      <Wrapper
        className={classNames(classes.actions, {
          [classes.highlight]: this.state.selectedToolbar > 0
        })}
      >
        <SelectedToolbar
          toolbar={myToolbars[this.state.selectedToolbar]}
          flipToolbarHandler={this.flipToolbarHandler}
          pos={this.state.selectedToolbar}
          params={this.props.params || {}}
        />
      </Wrapper>
    );
  }
}
FlipToolBars.propTypes = {
  classes: PropTypes.object.isRequired,
  toolbars: PropTypes.array,
  wrapper: PropTypes.string
};
export default withStyles(styles)(FlipToolBars);
