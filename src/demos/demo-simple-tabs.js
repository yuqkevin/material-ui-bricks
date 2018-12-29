import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import SimpleTabs from "../bricks/simple-tabs";

let sampleTabs = [
  {
    label: "Tab 1",
    body: <div>This is Tab 1</div>
  },
  {
    label: "Tab 2",
    body: <div>This is Tab 2</div>
  },
  {
    label: "Tab 3",
    body: <div>This is Tab 3</div>
  },
  {
    label: "Tab 4",
    render: () => <div>This is Tab 4</div>
  }
];

function SimpleTabsDemo(props) {
  return <SimpleTabs tabs={sampleTabs} />;
}
export default SimpleTabsDemo;
