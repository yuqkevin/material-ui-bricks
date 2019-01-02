import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

function uiCellIconButton(conf, options) {
  return (
    <Tooltip title={conf.title} {...options}>
      <IconButton aria-label={conf.title}>{conf.icon}</IconButton>
    </Tooltip>
  );
}
function uiCellTextBox(conf, options, parentBrick) {
  let Wrapper = conf.wrapper || Typography;
  let content = conf.content;
  if (typeof content === "function") {
    content = conf.content.bind(parentBrick)();
  }
  return (
    <Wrapper color="inherit" variant="subtitle1" {...options}>
      {content}
    </Wrapper>
  );
}
export function uiCell(conf, options) {
  let handlers = options.handlers || {};
  let opts = { key: options.key };
  if (conf.events) {
    conf.events.map(evt => {
      if (typeof evt.handler === "string") {
        opts[evt.trigger] = handlers[evt.handler];
      } else if (typeof evt.handler === "function") {
        opts[evt.trigger] = evt.handler;
      }
      return true;
    });
  }
  switch (conf.type) {
    case "icon-button":
      return uiCellIconButton(conf, opts, this);
    case "text-box":
      return uiCellTextBox(conf, opts, this);
    default:
      return <div {...opts}>Unknown UI Cell</div>;
  }
}
export function Textbar(props) {
  let Wrapper = props.wrapper || Typography;
  return (
    <Wrapper color="inherit" variant="subtitle1" {...props.props}>
      {props.content}
    </Wrapper>
  );
}

export function IconButtonWithTooltip(props) {
  let item = props.button;
  let opts = {};
  //const handlers = props.handlers
  if (item.events) {
    item.events.map(evt => {
      if (typeof evt.handler === "string") {
        if (typeof evt.args === "object") {
          opts[evt.trigger] = () =>
            props.handlers[evt.handler].apply(this, evt.args);
        } else {
          opts[evt.trigger] = e => props.handlers[evt.handler](e, props);
        }
      } else if (typeof evt.handler === "function") {
        opts[evt.trigger] = evt.handler.bind(props);
      }
      return true;
    });
  }
  return (
    <Tooltip title={item.title}>
      <IconButton aria-label={item.title} {...opts}>
        {item.icon}
      </IconButton>
    </Tooltip>
  );
}
