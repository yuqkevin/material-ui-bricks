import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";

import { brickRender } from "../bricks/brick";
import { iconButton, textBox, getStateFn } from "../bricks/materials";

// Sample data
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

const styles = theme => ({
  root: {
    color: "red"
  }
});
// end of sample data

const brickConf = {
  name: "Toolbar Tab",
  module: "simple-toolbar",
  data: {
    items: sampleToolbarItems,
    initState: sampleInitStates,
    handlers: {
      local: sampleHandlers
    },
    styles: styles
  }
};

export default brickRender(brickConf);
