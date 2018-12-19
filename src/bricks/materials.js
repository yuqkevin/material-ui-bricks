import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

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
