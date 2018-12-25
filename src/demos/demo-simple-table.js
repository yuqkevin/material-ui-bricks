/**
 * SimpleTable Demo
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
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteGoIcon from "@material-ui/icons/Check";
import DownloadIcon from "@material-ui/icons/SaveAlt";
import CancelIcon from "@material-ui/icons/Close";
import { lighten } from "@material-ui/core/styles/colorManipulator";

import FlipToolbars from "../bricks/flip-toolbars";
import SimpleTable from "../bricks/simple-table";

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
const sampleHandlers = [
  function toggleHighlight() {
    this.setState({ highlight: !this.state.highlight });
  }
];
const sampleInitState = {
  hightlight: false,
  order: "asc",
  orderBy: "calories",
  selected: [],
  data: sampleRows,
  page: 0,
  pageSize: 5
};
// sample data for toolbar
const sampleToolbarInitState = {
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
    console.log(props);
  },
  function deletion(evt, props) {
    props.deleteionToggle();
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

const SAMPLE_DATA = {
  initState: sampleInitState,
  table: {
    columns: sampleColumns,
    rows: sampleRows,
    handlers: sampleHandlers
  },
  toolbars: {
    toolbars: sampleToolbars,
    wrapper: Toolbar,
    handlers: sampleToolbarHandlers,
    initState: sampleToolbarInitState
  }
};

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

const tableStyles = theme => ({});

function ToolbarForTable(props) {
  return <FlipToolbars withClasses={props.classes} {...SAMPLE_DATA.toolbars} />;
}

function BrickDemo(props) {
  return (
    <SimpleTable
      withClasses={props.classes}
      title={"Simple Table Demo"}
      table={SAMPLE_DATA.table}
      toolbar={withStyles(toolbarStyles)(ToolbarForTable)}
      initState={SAMPLE_DATA.initState}
    />
  );
}
export default withStyles(tableStyles)(BrickDemo);
