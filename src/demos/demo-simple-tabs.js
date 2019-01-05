import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

import SimpleTabs from "../bricks/simple-tabs";
import { iconButton, textBox, uiCell } from "../bricks/materials";

import ToolBarDemo from "./demo-simple-toolbar";

let sampleTabs = [
  {
    label: "Tab 1",
    body: <ToolBarDemo />
  },
  {
    label: "Tab 2",
    body: uiCell(textBox("Hello Tab 2"))
  },
  {
    label: "Tab 3",
    body: uiCell(iconButton("Tab 3 content", <DeleteIcon />))
  },
  {
    label: "Tab 4",
    body: () => <div>This is Tab 4</div>
  }
];

function SimpleTabsDemo(props) {
  return <SimpleTabs tabs={sampleTabs} />;
}
export default SimpleTabsDemo;
