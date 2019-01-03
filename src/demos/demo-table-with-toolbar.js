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
function iconButton(title, ItemIcon, handler) {
  return {
    title,
    type: "icon-button",
    icon: ItemIcon,
    events: [
      {
        trigger: "onClick",
        handler
      }
    ]
  };
}
function textBox(wrapper = "span") {
  return {
    type: "text-box",
    wrapper,
    content: function() {
      return this.state.message;
    },
    style: { paddingRight: "1em" }
  };
}
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
const sampleInitState = {
  hasCheckBox: false,
  hightlight: false,
  selectedRows: [],
  selectedToolbar: 0,
  message: { text: "", highlight: false }
};
const sampleTopLevelHandlers = [
  function updateSelectedRows(rows) {
    let rowsCnt = rows.length;
    let message = "No row selected";
    let highlight = true;
    if (rowsCnt > 1) {
      message = `${rows.length} rows have been selected`;
    } else if (rowsCnt > 0) {
      message = "1 row has been selected";
    } else {
      highlight = false;
    }
    this.setState({
      selectedRows: rows,
      highlight: rowsCnt > 0,
      message: { text: message, highlight },
      selectedToolbar: rowsCnt > 0 ? 1 : 0
    });
  },
  function getSelectedRows() {
    return this.state.selectedRows;
  },
  function toggleCheckBox() {
    let message = this.state.hasCheckBox ? "" : "Please select rows to delete.";
    this.setState({
      hasCheckBox: !this.state.hasCheckBox,
      message,
      selectedRows: [],
      selectedToolbar: this.state.hasCheckBox ? 0 : this.selectedToolbar
    });
  },
  function getHasCheckBox() {
    return this.state.hasCheckBox;
  },
  function deleteSelectedRows() {
    console.log("Do deletion here");
    this.setState({
      hasCheckBox: false,
      selectedRows: [],
      selectedToolbar: 0,
      message: `${this.state.selectedRows.length} rows have been deleted.`
    });
  }
];
const sampleTableHandlers = [
  function onSelect(evt, props) {
    props.handlers.toggleHighlight();
  }
];
const sampleTableInitState = {
  order: "asc",
  orderBy: "calories",
  data: sampleRows,
  page: 0,
  pageSize: 5
};
// sample data for toolbar
const sampleToolbarInitState = {};
const sampleToolbarHandlers = [
  function download() {
    this.setState({ message: "Downloading ..." });
  },
  function deletion() {
    let message = "Please select rows you want to delete.";
    if (this.handlers.getHasCheckBox()) {
      message = "";
    }
    this.setState({ message });
    this.handlers.toggleCheckBox();
  },
  function deleteGo() {
    this.handlers.deleteSelectedRows();
  },
  function cancel() {
    this.handlers.toggleCheckBox();
  }
];
const sampleToolbars = [
  {
    name: "default",
    items: [
      iconButton("Download", <DownloadIcon />, "download"),
      iconButton("To Delete", <DeleteIcon />, "deletion")
    ]
  },
  {
    name: "deletion",
    items: [
      iconButton("Delete", <DeleteGoIcon />, "deleteGo"),
      iconButton("Cancel", <CancelIcon />, "cancel")
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
          hasCheckBox: "hasCheckBox", // props_name: state_name
          selectedRows: "selectedRows"
        },
        handlers: {
          local: sampleTableHandlers,
          parentNames: ["updateSelectedRows"]
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
        fromState: {
          selectedRows: "selectedRows",
          selectedToolbar: "selectedToolbar"
        },
        handlers: {
          local: sampleToolbarHandlers,
          parentNames: [
            "toggleCheckBox",
            "getHasCheckBox",
            "getSelectedRows",
            "deleteSelectedRows"
          ] // names only, will be loaded with bound function
        },
        initState: sampleToolbarInitState
      }
    }
  ]
};

function TableWithToolbarDemo(props) {
  return (
    <TableWithToolbar
      title={"Table With Toolbar Demo"}
      bricks={SAMPLE_DATA.bricks}
      handlers={SAMPLE_DATA.handlers}
      initState={SAMPLE_DATA.initState}
    />
  );
}
export default TableWithToolbarDemo;
