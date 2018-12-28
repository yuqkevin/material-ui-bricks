/**
 * Table With Toolbar Demo
 *  title
 *  toolbars (optional)
 *  prompt (default null)
 *  Table
 *    columns  array, column definitions
 *    rows     data array
 *    pagsize  intiger (default 0 which meams no pagination)
 *    handlers array of event handlers
 **/

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteGoIcon from "@material-ui/icons/Check";
import DownloadIcon from "@material-ui/icons/SaveAlt";
import CancelIcon from "@material-ui/icons/Close";
import { lighten } from "@material-ui/core/styles/colorManipulator";

import TableWithToolbar from "../bricks/table-with-toolbar";

// Sample data for table
let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}
let sampleRows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0)
];

let sampleColumns = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)"
  },
  { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
  { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" }
];
const sampleTopLevelHandlers = [
  function toggleHighlight() {
    this.setState({ highlight: !this.state.highlight });
  },
  function getHighlight() {
    return this.state.hightlight;
  },
  function toggleCheckBox() {
    this.setState({ hasCheckBox: !this.state.hasCheckBox });
  },
  function getHasCheckBox() {
    return this.state.hasCheckBox;
  }
];
const sampleTableHandlers = [
  function onSelect(evt, props) {
    props.handlers.toggleHighlight();
  }
];
const sampleInitState = {
  hasCheckBox: false,
  highlight: false
};
const sampleTableInitState = {
  order: "asc",
  orderBy: "calories",
  selected: [],
  data: sampleRows,
  page: 0,
  pageSize: 5
};
// sample data for toolbar
const sampleToolbarInitState = {
  hightlight: false,
  selectedRows: 0,
  selectedToolbar: 0,
  message: ""
};
const sampleToolbarHandlers = [
  function flipTo(idx, options) {
    if (idx === 1) {
      let message = "";
      if (this.state.selectedRows === 0) {
        message = "No row selected";
      } else {
        if (this.state.selectedRows > 1) {
          message = `${this.state.selectedRows} rows have been selected`;
        } else {
          message = `${this.state.selectedRows} row has been selected`;
        }
        this.setState({ selectedToolbar: idx, message });
      }
    } else {
      let message = "";
      if (options.action === "DeleteGo") {
        if (this.state.selectedRows > 1) {
          message = `${this.state.selectedRows} rows have been deleted.`;
        } else if (this.state.selectedRows > 0) {
          message = `${this.state.selectedRows} row has been deleted.`;
        }
      }
      this.setState({
        selectedToolbar: idx,
        selectedRows: 0,
        message: message
      });
    }
  },
  function download(evt, props) {
    this.setState({ message: "Downloading ..." });
    console.log(props);
  },
  function deletion(evt, props) {
    let message = "Please select rows you want to delete.";
    if (props.handlers.getHasCheckBox()) {
      message = "";
    }
    this.setState({ message });
    props.handlers.toggleCheckBox();
  },
  function deleteGo(evt, props) {
    this.handlers.flipTo(0, { action: "DeleteGo" });
  },
  function cancel(evt, props) {
    this.handlers.flipTo(0, { action: "Cancel" });
  }
];
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
        title: "Download",
        icon: <DownloadIcon />,
        events: [
          {
            trigger: "onClick",
            handler: "download"
          }
        ]
      },
      {
        type: "icon-button",
        title: "Delete",
        icon: <DeleteIcon />,
        events: [
          {
            trigger: "onClick",
            handler: "deletion"
          }
        ]
      }
    ]
  },
  {
    name: "deletion",
    elements: [
      {
        type: "icon-button",
        title: "DeleteGo",
        icon: <DeleteGoIcon />,
        events: [
          {
            trigger: "onClick",
            handler: "deleteGo"
          }
        ]
      },
      {
        type: "icon-button",
        title: "Cancel",
        icon: <CancelIcon />,
        events: [
          {
            trigger: "onClick",
            handler: "cancel"
          }
        ]
      }
    ]
  }
];

const tableStyles = theme => ({});

const toolbarStyles = theme => ({
  root: {
    textAlign: "right",
    flex: "1 1 auto",
    justifyContent: "flex-end",
    paddingRight: 0
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
        }
});

const SAMPLE_DATA = {
  initState: sampleInitState,
  handlers: {
    local: sampleTopLevelHandlers
  },
  bricks: [
    {
      name: "MainTable",
      module: "sorted-table",
      data: {
        styles: tableStyles,
        table: {
          columns: sampleColumns,
          rows: sampleRows
        },
        initState: sampleTableInitState,
        fromState: {
          hasCheckBox: "hasCheckBox" // props_name: state_name
        },
        handlers: {
          local: sampleTableHandlers,
          parentNames: ["toggleHighlight", "getHighlight"]
        }
      }
    },
    {
      name: "RightTopToolbar", // name in parent
      module: "flip-toolbars",
      data: {
        // should be matched with propTypes definitions
        toolbars: sampleToolbars,
        wrapper: Toolbar,
        styles: toolbarStyles,
        handlers: {
          local: sampleToolbarHandlers,
          parentNames: ["toggleCheckBox", "getHasCheckBox"] // names only, will be loaded with bound function
        },
        initState: sampleToolbarInitState
      }
    }
  ]
};

function BrickDemo(props) {
  return (
    <TableWithToolbar
      withClasses={props.classes}
      title={"Table With Toolbar Demo"}
      bricks={SAMPLE_DATA.bricks}
      handlers={SAMPLE_DATA.handlers}
      initState={SAMPLE_DATA.initState}
    />
  );
}
export default withStyles(tableStyles)(BrickDemo);
