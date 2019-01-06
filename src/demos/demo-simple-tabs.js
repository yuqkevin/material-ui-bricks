import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

import SimpleTabs from "../bricks/simple-tabs";
import { iconButton, textBox, uiCell, getStateFn } from "../bricks/materials";
import { brickRender } from "../bricks/brick";

import DemoBrick from "./demo-table-with-toolbar";

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
const brickConf = {
  name: "Toolbar Tab",
  module: "simple-toolbar",
  data: {
    items: sampleToolbarItems,
    initState: sampleInitStates,
    handlers: {
      local: sampleHandlers
    }
  }
};

let sampleTabs = [
  {
    label: "String",
    body: "The body is a string"
  },
  {
    label: "DOM",
    body: () => (
      <div>
        The body is a render of div DOM:
        <br />
        <pre>() => &lt;div&gt;string&lt;/div&gt;</pre>
      </div>
    )
  },
  {
    label: "TextBox UI Cell",
    body: uiCell(
      textBox("The body is a textbox UI Cell:uiCell(textBox(string))")
    )
  },
  {
    label: "IconButton UI Cell",
    body: uiCell(iconButton("Icon Button UI Cell", <DeleteIcon />))
  },
  {
    label: "Rendered Brick",
    body: <DemoBrick /> //yy pre-rendered brick
  },
  {
    label: "Brick Conf",
    body: brickRender(brickConf) //brick config
  }
];

function SimpleTabsDemo(props) {
  return <SimpleTabs tabs={sampleTabs} />;
}
export default SimpleTabsDemo;
